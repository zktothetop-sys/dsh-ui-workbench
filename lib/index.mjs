import fs from 'node:fs';
import * as market from '../vendor/codex-ui/lib/index.mjs';
import * as sidebar from '../vendor/codex-ui/lib/sidebar-plugin.mjs';
import * as theme from '../vendor/codex-ui/lib/theme-plugin.mjs';
import * as composer from '../vendor/codex-ui/lib/composer-plugin.mjs';
import * as settings from '../vendor/codex-ui/lib/settings-skin-plugin.mjs';
import * as desktopMenu from '../vendor/codex-ui/lib/desktop-menu-plugin.mjs';
import { ConvProgressService } from '../vendor/conv-progress/lib/index.js';

export const name = 'dsh-ui-workbench';
export const inject = ['webServer'];
const manifest = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const components = Object.freeze({ market: '2.0.19', progress: '0.3.0', layout: '0.4.1' });

export function apply(ctx) {
  // Child Fibers retain their native service injection and disposal ownership.
  // Session-title stays disabled, matching the accepted keyword-title behavior.
  for (const plugin of [sidebar, theme, composer, settings, desktopMenu, market]) ctx.plugin(plugin);
  ctx.plugin(ConvProgressService, { debug: false });
  ctx.effect(() => {
    const server = ctx.get('webServer');
    const dispose = server.register({
      kind: 'exact', path: '/api/dsh-ui-workbench/status',
      handler(request, response) {
        const connection = ctx.get('connection');
        if (!connection || typeof connection.requestRejection !== 'function') {
          response.writeHead(503, { 'content-type': 'application/json; charset=utf-8' });
          response.end(JSON.stringify({ error: 'connection service unavailable' }));
          return;
        }
        const rejection = connection.requestRejection(request);
        if (rejection) {
          response.writeHead(rejection, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
          response.end(JSON.stringify({ error: rejection === 401 ? 'authentication required' : 'request rejected' }));
          return;
        }
        response.writeHead(200, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
        response.end(JSON.stringify({ name, version: manifest.version, components, sessionTitle: 'native', debug: false }));
      },
    });
    ctx.logger?.info?.(`dsh-ui-workbench ${manifest.version}: market 2.0.19, progress 0.3.0, layout 0.4.1 mounted`);
    return () => { dispose?.(); };
  }, 'dsh-ui-workbench: status');
}
