import { createApp } from './app.js';
import { config } from './config/env.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`[Server] Running on http://localhost:${config.port} (${config.nodeEnv})`);
  console.log(`[Server] Content directory: ${config.contentDir}`);
  console.log(`[Server] Active theme: ${config.activeTheme}`);
});
