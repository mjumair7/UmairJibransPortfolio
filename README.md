# Umair Jibran Portfolio — enhanced version

## Files
- `index.html` — complete portfolio page
- `styles.css` — responsive editorial styling + custom interaction states
- `script.js` — custom scroll/reveal/tilt/ticker interactions + project demos
- `assets/Mohammed_Umair_Jibran_Resume.pdf` — resume used by the Resume section

## Run locally
Open `index.html` directly, or serve this folder with any static server (recommended so the embedded PDF behaves consistently):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## What changed
- Added a dedicated Resume section with an embedded PDF preview, open-in-new-tab button, and download button.
- Removed reliance on AOS; reveals and scroll interactions are custom vanilla JavaScript.
- Added scroll progress, scroll-direction-reactive ticker, timeline fill, pointer spotlight, restrained 3D tilt, magnetic buttons, and an interactive hero system map.
- Preserved / rebuilt the CAN-FD, RF, tap-to-donate, Split, and Shopify interactive demos.
- Shifted the visual language from generic gradient cards to an editorial off-white / ink / cobalt / acid palette with more asymmetry and varied section composition.
- Includes reduced-motion fallbacks and mobile navigation.

## Before deployment
If you want LinkedIn/GitHub buttons in the contact panel, add your exact profile URLs rather than placeholders.
