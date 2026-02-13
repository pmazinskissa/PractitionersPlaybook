import { Router } from 'express';
import { getActiveTheme, getThemeAssetPath } from '../services/theme.service.js';

const router = Router();

router.get('/active', (_req, res) => {
  try {
    const theme = getActiveTheme();
    res.json({ data: theme });
  } catch (err) {
    res.status(500).json({ error: { message: 'Failed to load theme' } });
  }
});

router.get('/logo', (_req, res) => {
  const logoPath = getThemeAssetPath(getActiveTheme().logo);
  if (logoPath) {
    res.sendFile(logoPath);
  } else {
    res.status(404).json({ error: { message: 'Logo not found' } });
  }
});

router.get('/favicon', (_req, res) => {
  const faviconPath = getThemeAssetPath(getActiveTheme().favicon);
  if (faviconPath) {
    res.sendFile(faviconPath);
  } else {
    res.status(404).json({ error: { message: 'Favicon not found' } });
  }
});

export default router;
