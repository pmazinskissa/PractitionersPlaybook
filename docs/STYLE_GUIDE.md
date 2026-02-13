# Protective Life Brand Style Guide

> All tools and applications built in this repository must adhere to Protective Life's brand identity.
> Reference: [Protective Frontify Brand Portal](https://protective.frontify.com/d/2EGcgWWVP7sw)

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Purple (Primary)** | `#4C12A1` | `rgb(76, 18, 161)` | Primary brand color, headings, primary buttons, active states |
| **Cyan Blue (Secondary)** | `#50C3FF` | `rgb(80, 195, 255)` | Secondary brand color, accents, secondary buttons, header backgrounds |
| **Teal (Accent)** | `#5FC8D7` | `rgb(95, 200, 215)` | Supporting accent, highlights, decorative elements |

### Functional Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Red (Error/Warning)** | `#DA291C` | `rgb(218, 41, 28)` | Errors, warnings, "Don't" indicators, destructive actions |
| **Link Blue** | `#007BBD` | `rgb(0, 123, 189)` | Hyperlinks |

### Neutral Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Black** | `#000000` | `rgb(0, 0, 0)` | Primary text |
| **Dark Gray** | `#555555` | `rgb(85, 85, 85)` | Secondary text |
| **Medium Gray** | `#707070` | `rgb(112, 112, 112)` | Muted text, borders |
| **Light Gray** | `#F8F8F8` | `rgb(248, 248, 248)` | Hover backgrounds, subtle fills |
| **White** | `#FFFFFF` | `rgb(255, 255, 255)` | Backgrounds, button text on dark |

### Hover / Interactive States

| Element | Default | Hover |
|---------|---------|-------|
| Primary Purple | `#4C12A1` | `#7D55C7` / `rgb(125, 85, 199)` |
| Secondary Cyan | `#50C3FF` | `#9AE6FF` / `rgb(154, 230, 255)` |
| Navigation text | `rgba(0,0,0,0.70)` | `rgba(0,0,0,0.90)` |

---

## Typography

### Font Families

| Role | Font | Fallback |
|------|------|----------|
| **Display / Headings** | `FS Albert Pro-Bold` | `Arial, Helvetica, sans-serif` |
| **Body / UI** | `Open Sans` | `Arial, Helvetica, sans-serif` |
| **Condensed / Captions** | `Open Sans Condensed` | `Arial Narrow, sans-serif` |

### Type Scale

| Element | Size | Weight | Line Height | Font |
|---------|------|--------|-------------|------|
| **H1** | 24px | 700 (Bold) | 1.3 | FS Albert Pro-Bold |
| **H2** | 36px | 700 (Bold) | 1.3 | FS Albert Pro-Bold |
| **H3** | 20px | 700 (Bold) | 1.3 | FS Albert Pro-Bold |
| **Body** | 16px | 400 (Regular) | 1.5 | Open Sans |
| **Navigation** | 13-14px | 600 (Semi-Bold) | 1.4 | Open Sans |
| **Buttons** | 15px | 400-600 | 1.3 | Open Sans |
| **Captions** | 14px | 400 | 1.4 | Open Sans Condensed |
| **Quotes** | 80px | 700 | 1.2 | FS Albert Pro-Bold |

---

## Buttons

### Primary Button
```css
.btn-primary {
  background-color: #4C12A1;
  color: #FFFFFF;
  border: 2px solid #4C12A1;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.btn-primary:hover {
  background-color: #7D55C7;
  border-color: #7D55C7;
}
```

### Secondary Button
```css
.btn-secondary {
  background-color: #50C3FF;
  color: #FFFFFF;
  border: 2px solid #50C3FF;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.btn-secondary:hover {
  background-color: #9AE6FF;
  border-color: #9AE6FF;
}
```

### Tertiary / Outline Button
```css
.btn-tertiary {
  background-color: #FFFFFF;
  color: #4C12A1;
  border: 2px solid #4C12A1;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-tertiary:hover {
  background-color: #F8F8F8;
}
```

---

## CSS Variables

Use these variables in all new tools and applications for consistency:

```css
:root {
  /* Primary */
  --pl-purple: #4C12A1;
  --pl-cyan: #50C3FF;
  --pl-teal: #5FC8D7;

  /* Functional */
  --pl-red: #DA291C;
  --pl-link: #007BBD;

  /* Neutrals */
  --pl-black: #000000;
  --pl-dark-gray: #555555;
  --pl-gray: #707070;
  --pl-light-gray: #F8F8F8;
  --pl-white: #FFFFFF;

  /* Hover States */
  --pl-purple-hover: #7D55C7;
  --pl-cyan-hover: #9AE6FF;

  /* Typography */
  --font-display: 'FS Albert Pro-Bold', Arial, Helvetica, sans-serif;
  --font-body: 'Open Sans', Arial, Helvetica, sans-serif;
  --font-condensed: 'Open Sans Condensed', 'Arial Narrow', sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 30px;
  --radius-search: 26px;
}
```

---

## Component Patterns

### Cards
```css
.card {
  background: var(--pl-white);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

### Form Inputs
```css
.input {
  font-family: var(--font-body);
  font-size: 16px;
  padding: 10px 16px;
  border: 1px solid var(--pl-gray);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s ease;
}
.input:focus {
  border-color: var(--pl-purple);
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 18, 161, 0.15);
}
```

### Search Bar
```css
.search-bar {
  font-family: var(--font-body);
  font-size: 14px;
  padding: 8px 16px;
  border: 1px solid var(--pl-gray);
  border-radius: var(--radius-search);
}
```

### Links
```css
a {
  color: var(--pl-link);
  text-decoration: underline;
}
a:hover {
  color: var(--pl-purple);
}
```

### Do's & Don'ts Pattern
```css
.do-block {
  border-left: 4px solid var(--pl-cyan);
  padding: var(--space-md);
  background: rgba(80, 195, 255, 0.05);
}
.dont-block {
  border-left: 4px solid var(--pl-red);
  padding: var(--space-md);
  background: rgba(218, 41, 28, 0.05);
}
```

### Quote Block
```css
.quote {
  font-family: var(--font-display);
  font-size: 80px;
  color: var(--pl-purple);
  line-height: 1.2;
}
```

---

## Usage Notes

- **Primary purple** is the dominant brand color — use it for key interactive elements and headings.
- **Cyan blue** is the secondary accent — use it for supporting visuals, secondary actions, and highlights.
- **Always use pill-shaped buttons** (`border-radius: 30px`) for all call-to-action buttons.
- **FS Albert Pro-Bold** is for display/headings only. **Open Sans** is for everything else.
- Maintain accessible contrast ratios — especially white text on purple and cyan backgrounds.
- When FS Albert Pro-Bold is unavailable (e.g., web without font license), fall back to `Arial` bold for headings.
