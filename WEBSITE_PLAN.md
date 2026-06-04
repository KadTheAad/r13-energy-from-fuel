# R1.3 Visual Notebook Website Plan

## Summary

Build a statically hosted Vite website for `R1.3.md`, matching the generated open-notebook/lab-desk concept while using mostly regenerated image assets for sharper, cleaner visuals.

The site will be a single-page visual notebook with anchored sections:

`Cover -> Project Map -> Combustion -> Fossil Fuels -> Biofuels -> Fuel Cells -> Summit Defense -> Reflection -> Sources`

## Key Implementation Changes

- Create a Vite static app with an open notebook/lab desk background, torn-paper section spreads, marker highlights, tape, handwritten annotations, chemistry sketches, and tactile image-like navigation.
- Use image generation to create production assets inspired by the concept:
  - Full-page notebook/lab desk background.
  - Four large clickable image-buttons: `Combustion`, `Fossil Fuels`, `Biofuels`, `Fuel Cells`.
  - Topic graphics for each section.
  - Optional small sticker/icon assets for `Project Map`, `Summit Defense`, `Reflection`, and `Sources`.
- Keep UI text code-native for readability and accessibility; use image assets for buttons, decorative labels, topic cards, and notebook visuals.
- Structure content from `R1.3.md` into project-ready sections:
  - Each topic gets 2-3 paragraphs.
  - Each topic gets 3 formative check questions.
  - Each topic gets 1 cited read-more source.
  - Each topic gets 1 related visual.
  - Optional video links can be included as watch stickers/buttons.
- Add a Summit Defense section with three argument-prep panels:
  - Fossil fuel challenges and why alternatives matter.
  - Biofuel benefits and challenges.
  - Fuel cell benefits and challenges.
- Add a short Reflection section to support the homework paragraph.
- Add a clear Sources section grouped by topic.

## Interfaces And Structure

- Public interface is static only: no backend, no API, no database.
- Main app sections will be addressable by hash links:
  - `#cover`
  - `#map`
  - `#combustion`
  - `#fossil-fuels`
  - `#biofuels`
  - `#fuel-cells`
  - `#summit-defense`
  - `#reflection`
  - `#sources`
- Content/data should be stored in a small local data module so topic sections can render consistently.
- The Vite build output will be deployable from `dist/` to any static host.

## Visual Direction

- Match the generated concept closely, but correct the wording:
  - Use "IB Chemistry", not "HL Project."
  - Use the exact project title "Energy from Fuel."
  - Use the guiding question from `R1.3.md`.
- Section color identities:
  - Combustion: orange/red flame palette.
  - Fossil Fuels: charcoal/yellow industrial palette.
  - Biofuels: green/amber plant palette.
  - Fuel Cells: cyan/blue hydrogen palette.
- Avoid generic web cards and normal buttons.
- Buttons should look like pasted paper/image cutouts with hover motion, shadows, and tactile click feedback.

## Verification Plan

- Run the Vite dev server and inspect in browser.
- Verify desktop and mobile layouts.
- Compare implementation screenshots against the concept image for:
  - Notebook/lab-desk composition.
  - Four image-button treatment.
  - Bold marker typography feel.
  - Section colors.
  - Bottom/path navigation.
  - No generic card-grid drift.
- Check accessibility basics:
  - Image-buttons have readable text and `alt` labels.
  - Keyboard navigation works.
  - Contrast remains readable over paper textures.
- Run production build and confirm `dist/` works for static hosting.

## Assumptions

- Chosen stack: Vite app.
- Chosen asset strategy: mostly regenerated assets using the concept as style reference.
- The concept image at `/Users/khaledadib/.codex/generated_images/019e923f-a855-7b03-b341-368d8ca8eec5/ig_0e08cfdc5736793a016a2158e66b3081918a1190270c6cad95.png` is the visual reference.
- The site will be one page with anchored sections, not separate pages.
- Research sources should be reliable and cited clearly during implementation.
- A git repo should be initialized/used, with the finished site committed after implementation.
