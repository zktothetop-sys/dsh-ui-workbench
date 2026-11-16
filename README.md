# DSH 界面工作台 / DSH UI Workbench

把 Codex UI、会话进度和紧凑布局整合为一个 DeepSeek Harness 插件。版本 **1.0.0**。

A single DSH plugin combining Codex UI 2.0.19, conversation progress 0.3.0 and custom layout 0.4.1.

## 功能

- 44px 六图标侧栏，保留原生插件、自动化、浏览、创建、更新与头像操作。
- 淡蓝灰外层与圆角面板，保留原生工作区和聊天布局。
- 会话标题下拉菜单，集中显示模式、子智能体、后台任务和会话视图。
- 快捷键、按钮、会话时间及“翻历史”提示按区域悬停显示，保留键盘操作。
- 左下角固定紧凑工具栏，支持目标、任务与全局展开/收起；新聊天同样保留工具位置。
- 保留原生关键词会话命名。专家、PUA、回退等按钮调用已经安装的原插件；本包不内置这些独立功能。

## 安装 / Install

兼容 DSH `>=0.2.0-rc.1 <0.3.0-0`，Node `^22.19.0 || >=24.0.0`。

在 DSH **插件 → 添加插件 → 安装第三方插件**的“包名或地址”中填入：

```text
https://github.com/zktothetop-sys/dsh-ui-workbench
```

市场索引收录后，也可在对应市场搜索 **DSH 界面工作台**或 **dsh-ui-workbench**，选择 1.0.0 安装。GitHub Releases 提供同版本安装包和 SHA-256 校验。安装完成后刷新页面；如 DSH 提示重启，按提示处理。

For DSH Desktop's bundled CLI:

```text
dsh plugin --profile desktop add "https://github.com/zktothetop-sys/dsh-ui-workbench"
```

## 已有独立 UI / Existing UI plugins

将本整合包放在原 UI bundle 之后。原生兼容 patch 会停用同一索引树中此前声明的独立 Codex UI、会话进度和旧 sidebar-status 入口。手写 profile/home 配置若再次启用旧 UI，请停用重复入口。原有文件与配置保留。内置 Codex UI 随本整合包更新。

## 卸载与恢复 / Restore

在 DSH 插件管理中移除 `dsh-ui-workbench` **整个 bundle**，按 DSH 提示重启并刷新。DSH 会从原配置重新装配已有插件。仅停用运行树里的 `ui-workbench` 叶节点会保留兼容 patch；退出整个 bundle 才会恢复原配置。

## 诊断 / Diagnostics

原生日志记录挂载与错误。状态接口 `/api/dsh-ui-workbench/status` 由 DSH 原生身份检查保护，仅返回组件版本。也可在包目录运行：

```text
node scripts/diagnostics.mjs --out "new-diagnostics.json"
```

诊断仅校验包内文件与版本，不读取会话、账号或模型配置。包内不含作者的聊天、凭据或私人记录。

## 验证 / Validation

运行时代码与已验证的整合版本完全一致：31 项紧凑布局、46 项标题菜单和 10 项原生 SDK 生命周期检查已通过；安装包另有文件完整性、重定位和诊断检查。SDK 检查使用受控 React/服务，布局检查使用实际控制器的隔离 DOM fixture；这些结果不等于已经覆盖所有 DSH 版本与系统。

## 来源与许可 / Credits and licensing

- [Codex UI 2.0.19](https://github.com/MichengAI/dsh-codex-ui)：Apache-2.0；原许可证随包保留。
- [dsh-conv-progress 0.3.0](https://github.com/picklerick422/dsh-conv-progress)：BSD-3-Clause；原许可证随包保留。
- 自定义整合与布局：免费下载安装并在 DeepSeek Harness 中使用；其他权利由作者保留，见 LICENSE。第三方组件继续按其各自许可证授权。

具体改动与第三方声明见 THIRD_PARTY_NOTICES.md。问题反馈：[GitHub Issues](https://github.com/zktothetop-sys/dsh-ui-workbench/issues)。
