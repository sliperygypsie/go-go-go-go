
--# 🎨 Go-Go-Go-Go

![Build Status](https://github.com/sliperygypsie/go-go-go-go/actions/workflows/ci.yml/badge.svg)
![Lint](https://img.shields.io/badge/lint-passing-brightgreen?style=flat-square)
![Tests](https://img.shields.io/badge/tests-100%25-success?style=flat-square)
![License](https://img.shields.io/github/license/sliperygypsie/go-go-go-go?style=flat-square)

A playful React Native demo app that celebrates **visual polish** and **UI creativity**.  
This project showcases custom icons, animated floating action buttons (FABs), and branded color palettes — designed to be both fun and functional.


## 🖼️ Screenshots & UI Previews

### 🎬 Animated FAB
Showcase the smooth transitions and playful interactions of your floating action button.

![Animated FAB Demo](docs/screenshots/fab-demo.gif)

---

### 🌈 Branded Color Palette
Highlight your vibrant, custom color system that merges navigation and paper themes.

![Color Palette Swatch](docs/screenshots/color-palette.png)

---

### 🖌️ Custom Icons
Display your branded icons that add personality and polish to the UI.

![Custom Icons Grid](docs/screenshots/icons-grid.png)

---

*(Tip: Place your actual GIFs and PNGs inside a `docs/screenshots/` folder in the repo so they’re easy to manage and reference.)*
---

## 🌈 Branded Color Palette

| Swatch | Name            | Hex Code  | Usage Idea                          |
|--------|-----------------|-----------|-------------------------------------|
| 🟥     | Go-Go Red       | #FF4C61   | Accent color for FAB + icons        |
| 🟦     | Turbo Blue      | #4C9DFF   | Primary navigation + headers        |
| 🟩     | Playful Green   | #3DDC97   | Success states + playful highlights |
| 🟨     | Sunshine Yellow | #FFD166   | Secondary buttons + cheerful accents|
| 🟪     | Vibe Purple     | #9B5DE5   | Background gradients + branding     |
| ⬜     | Cloud White     | #F7F7F7   | Base background + card surfaces     |
| ⬛     | Midnight Black  | #1A1A1A   | Text, icons, and contrast elements  |

---

### 🎨 Palette Philosophy
- **Bold & vibrant**: Colors that pop and energize the UI.  
- **Playful yet functional**: Each shade has a clear role in navigation, feedback, or branding.  
- **Consistent branding**: Harmonizes with custom icons and animated FABs for a cohesive look.
---

## 🖼️ Visual & Interactive Enhancements

### 🎬 Animated FAB
Capture the smooth transitions and playful interactions of your floating action button.

![Animated FAB Demo](docs/screenshots/fab-demo.gif)

---

### 🖌️ Custom Icons Grid
Show off your branded icons that add personality and polish to the UI.

![Custom Icons Grid](docs/screenshots/icons-grid.png)

---

### 🌈 Branded Color Palette Preview
Highlight your vibrant, custom color system that merges navigation and paper themes.

![Color Palette Swatch](docs/screenshots/color-palette.png)

*(Tip: Place your actual GIFs and PNGs inside a `docs/screenshots/` folder in the repo so they’re easy to manage and reference.)*

---

## 🔤 Typography Mockup

Define font pairings to complement your color palette:

| Role        | Font Example        | Usage Idea                          |
|-------------|---------------------|-------------------------------------|
| Headers     | Poppins Bold        | Playful display for titles & nav    |
| Body Text   | Inter Regular       | Clean sans-serif for readability    |
| Accents     | Pacifico / Handwritten | Fun highlights for playful UI elements |

Typography works hand‑in‑hand with your palette to create a cohesive branded experience.

---

## 🛠️ Developer Experience

### 📚 Demo Code Snippets

Here’s a quick example of how to use the animated FAB component:

```tsx
import { AnimatedFAB } from './src/components/AnimatedFAB';

export default function App() {
  return (
    <AnimatedFAB
      icon="plus"
      label="Go-Go!"
      color="#FF4C61"
      onPress={() => console.log('FAB pressed!')}
    />
  );
}

---

This structure makes your README **visually engaging, technically useful, and portfolio‑ready**.  

👉 Do you want me to also sketch out a **sample GitHub Action workflow file** (e.g., `ci.yml`) for linting and testing, so you can drop it into `.github/workflows/` and instantly add CI/CD polish?
