import { createApp } from './app.js';
import { config } from './config/env.js';
import { initOAuth } from './services/oauth.service.js';

const app = createApp();

// Initialize OAuth (non-fatal if it fails)
initOAuth().catch((err) => {
  console.warn(`[OAuth] Initialization failed: ${err.message}`);
});

app.listen(config.port, () => {
  console.log(`[Server] Running on http://localhost:${config.port} (${config.nodeEnv})`);
  console.log(`[Server] Content directory: ${config.contentDir}`);
  console.log(`[Server] Active theme: ${config.activeTheme}`);
  console.log(`[Server] OAuth provider: ${config.oauthProvider}`);
  console.log(`[Server] Dev auth bypass: ${config.devAuthBypass}`);
});
