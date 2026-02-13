import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Project root is 4 levels up from packages/backend/src/config/
const projectRoot = path.resolve(__dirname, '../../../../');

dotenv.config({ path: path.resolve(projectRoot, '.env') });

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://playbook:playbook@localhost:5432/playbook',
  contentDir: path.resolve(projectRoot, process.env.CONTENT_DIR || 'content'),
  activeTheme: process.env.ACTIVE_THEME || 'default',
};
