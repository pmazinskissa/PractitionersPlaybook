import type { ThemeConfig } from '@playbook/shared';

export function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement;

  // Colors
  const colors = theme.colors;
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primary-light', colors.primary_light);
  root.style.setProperty('--color-primary-hover', colors.primary_hover);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-surface', colors.surface);
  root.style.setProperty('--color-success', colors.success);
  root.style.setProperty('--color-error', colors.error);
  root.style.setProperty('--color-warning', colors.warning);
  root.style.setProperty('--color-text-primary', colors.text_primary);
  root.style.setProperty('--color-text-secondary', colors.text_secondary);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--color-link', colors.link);

  // Typography
  const typography = theme.typography;
  root.style.setProperty('--font-heading', typography.heading_font);
  root.style.setProperty('--font-body', typography.body_font);
  root.style.setProperty('--font-mono', typography.mono_font);
  root.style.setProperty('--font-base-size', typography.base_size);
  root.style.setProperty('--line-height', String(typography.line_height));

  // Border radius
  root.style.setProperty('--radius-button', theme.border_radius.button);
  root.style.setProperty('--radius-card', theme.border_radius.card);
  root.style.setProperty('--radius-input', theme.border_radius.input);

  // Update page title
  document.title = `${theme.organization_name} Training`;
}
