# A Birthday Surprise ❤️

A handcrafted, animated birthday journey in seven chapters, built with React + Vite,
Framer Motion, Lottie and Lucide icons.

1. **Welcome** – 3D gift box that opens, teddy bear holding a heart, floating hearts & clouds
2. **A Birthday Wish From Miles Away** – bunting banner, balloons, blooming flowers, interactive cake (tap to blow out the candles → confetti → a special wish)
3. **Our Little World** – animated phone chat with typing indicators, two characters texting, hearts flying between phones, "And There Is More…"
4. **The Engagement** – dusk garden with fairy lights, rings drifting together (tap them), the couple reaching for each other, "Forever"
5. **Things I Cannot Wait to Do With You** – seven painted "firsts" slides with a tap-to-reveal note
6. **The Mystery Gift** – a box that opens slowly, a glowing heart rises, the sky turns into a starry night
7. **A Message From My Heart** – line-by-line final letter, rose petals, fireworks, "Start Our Story Again"

Also: background music (starts only after the first tap), play/pause + mute controls,
a journey progress bar, and a mobile-first layout.

---

## Run it

You need [Node.js](https://nodejs.org) 20.19+ (or 22+).

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

Tip while editing: add `?chapter=5` to the URL to jump straight to a chapter.

## Make it yours

**All text lives in one file: `src/config.js`.** Every message, letter, dream, chat line,
button label, name and date is there. Edit, save, and the page updates.

- `partnerName` – optional, shown on the loading screen and in the tab title
- `birthdayDate` / `engagementDate` – optional; they only appear if you fill them in

### Background music

`public/audio/background-music.mp3` is a gentle, original piano loop generated for this
project. Replace it with your song if you like (same file name, or change
`media.backgroundMusic`). Volume is `media.musicVolume`.

## Deploy (free)

```bash
npm run build
```

- **Netlify:** drag the `dist` folder onto https://app.netlify.com/drop — or connect the repo (`netlify.toml` is included).
- **Vercel:** `npx vercel` in this folder, or import the repo on vercel.com (`vercel.json` is included).

Then send the link to your favorite person. ❤️

## Project structure

```
src/
  config.js                 ← all personal text & media paths
  App.jsx                   ← the journey: screens, transitions, progress, audio
  screens/                  ← one file (+ css) per chapter
  components/
    illustrations/          ← SVG/CSS art: gift box, teddy, cake, rings, couple, scenes…
    effects/                ← hearts, stars, petals, fireflies, confetti, fireworks
    ui/                     ← buttons, music player, loader, Lottie
  assets/lottie/            ← Lottie animations (heartbeat, sparkles)
public/audio/               ← background music
scripts/make_assets.py      ← regenerates the Lottie files & music (optional)
```
