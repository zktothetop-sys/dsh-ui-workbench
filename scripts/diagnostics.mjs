import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = fs.realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('DSH 界面整合插件诊断\nnode scripts/diagnostics.mjs [--out 诊断文件.json]\n仅核对本包版本和文件完整性，不读取会话、账号、Cookie 或模型配置。');
  process.exit(0);
}
if (args.length && (args.length !== 2 || args[0] !== '--out')) throw new Error('用法：node scripts/diagnostics.mjs [--out 诊断文件.json]');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const integrity = JSON.parse(fs.readFileSync(path.join(root, 'integrity.json'), 'utf8'));
const problems = [];
for (const item of integrity.files) {
  const relative = item.path;
  if (typeof relative !== 'string' || path.isAbsolute(relative) || relative.split(/[\\/]/).includes('..')) {
    problems.push({ file: String(relative), reason: 'invalid manifest path' });
    continue;
  }
  const file = path.resolve(root, relative);
  try {
    if (!fs.lstatSync(file).isFile()) throw new Error('not a regular file');
    const bytes = fs.readFileSync(file);
    const digest = crypto.createHash('sha256').update(bytes).digest('hex');
    if (bytes.length !== item.bytes || digest !== item.sha256) problems.push({ file: relative, reason: 'content mismatch' });
  } catch (error) { problems.push({ file: relative, reason: error.message }); }
}
const report = {
  name: manifest.name, version: manifest.version, checkedAt: new Date().toISOString(),
  node: process.version, components: integrity.components,
  checkedFiles: integrity.files.length, passed: problems.length === 0, problems,
  scope: 'package files only; no conversation, account, credential or model configuration',
};
if (args[0] === '--out') fs.writeFileSync(path.resolve(args[1]), JSON.stringify(report, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
