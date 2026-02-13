import { Router } from 'express';
import { testConnection } from '../config/database.js';
import { config } from '../config/env.js';
import fs from 'fs';

const router = Router();

router.get('/', async (_req, res) => {
  const dbOk = await testConnection();
  const contentOk = fs.existsSync(config.contentDir);

  const status = dbOk && contentOk ? 'ok' : 'error';
  const statusCode = status === 'ok' ? 200 : 503;

  res.status(statusCode).json({
    data: {
      status,
      db: dbOk,
      content: contentOk,
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
