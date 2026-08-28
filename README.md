# 🌸 Raksha Bandhan • A Gift of Love 🎁

An interactive, skeuomorphic web application celebrating **Raksha Bandhan** with tactile unboxing experiences, digital ceremony rituals, personal memory time capsules, and ambient Indian acoustic chimes.

![Raksha Bandhan Celebration](https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **👑 Artisanal 3D Rakhi Ceremony**:
  - Tactile skeuomorphic medallions with ruby beads, gold filigree, and braided silk cords.
  - Interactive wrist-tying ceremony with golden celebratory confetti bursts.
  - Multiple selectable traditional styles (*Royal Kundan*, *Sacred Rudraksha*, *Floral Peacock*, *Golden Zari*).

- **🪔 The Sacred Brass Aarti Thali**:
  - Handcrafted brass plate with embossed mandala engravings.
  - Interactive rituals: light the clay Diya lamp, apply auspicious Roli-Kumkum & Akshat Tilak, offer traditional sweets (Kaju Katli & Besan Ladoo), ring the temple bell, and perform full circular Aarti.

- **📸 Stitched Leather Memory Capsule**:
  - Vintage polaroid photo album framed in deep burgundy stitched leather with brass mounting corners.
  - Built-in photo filter switcher (*Golden Warmth*, *Vintage Sepia*, *Vivid Original*).
  - High-performance `LazyImage` intersection observer loading with shimmer placeholders and zoom lightbox.
  - Sibling photo upload and management with local storage persistence.

- **🎁 3D Crimson Velvet Gift Treasure**:
  - Interactive velvet unboxing with metallic clasps and satin ribbons.
  - Lifetime sibling vouchers (*Midnight Snack Treat Pass*, *Emergency Secret Keeper*, *Win Any Argument Pass*, *Lifetime Protector*).
  - One-click claim and redeem feedback animations.

- **💌 Confidential Wax-Sealed Epistle**:
  - Skeuomorphic vintage envelope with a 3D crimson wax seal.
  - Tactile seal-cracking animation with realistic audio feedback and sliding parchment letter.

- **📻 Retro Wooden Cassette Player**:
  - Built-in zero-dependency Web Audio API synthesizer for Raag Bilawal sitar/flute chimes, tanpura drone, and puja bells.
  - Spinning tape spools, animated LED indicator, and dynamic VU level equalizer.
  - Support for uploading custom personal sibling audio tracks.

- **⚙️ Live Customization & Sharing Studio**:
  - Real-time editing for sibling names, heartfelt quotes, surprise notes, and envelope letters.
  - Native Web Share API integration and one-click clipboard link sharing.
  - Automatic `localStorage` synchronization.

- **🌸 Ambient Festive Particles**:
  - Canvas-based falling flower petals, sparkling gold dust, and diya embers with debounced window resizing.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Bootstrap 5](https://getbootstrap.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Native Browser **Web Audio API** (Polyphonic Oscillator Synthesizer)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Animations**: CSS3 3D Transforms, Skeuomorphic Lighting Models & Transitions

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/raksha-bandhan-gift.git
   cd raksha-bandhan-gift
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to view the app.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready static assets will be output to the `dist/` directory.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

6. **Type check / Linting**:
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```text
├── index.html                  # HTML entry point with web fonts and Bootstrap CDN
├── metadata.json               # Application metadata
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind build configuration
├── src/
│   ├── main.tsx                # React application bootstrap
│   ├── App.tsx                 # Main application layout and state manager
│   ├── types.ts                # TypeScript interfaces and design types
│   ├── index.css               # Skeuomorphic styles, lighting models & gradients
│   ├── components/
│   │   ├── SkeuoRakhi.tsx       # 3D interactive Rakhi tying ceremony
│   │   ├── PujaThali.tsx        # Brass Aarti thali with Diya & rituals
│   │   ├── SkeuoGiftBox.tsx     # 3D velvet gift box & voucher cards
│   │   ├── WaxSealLetter.tsx    # Wax-sealed confidential letter envelope
│   │   ├── MemoryGallery.tsx    # Leather-bound polaroid photo album
│   │   ├── LazyImage.tsx        # Intersection Observer lazy image loader
│   │   ├── CassettePlayer.tsx   # Retro wooden cassette deck player
│   │   ├── CustomizeSection.tsx # Real-time personal customization studio
│   │   └── FestiveParticles.tsx # Background canvas petal and gold dust animation
│   ├── hooks/
│   │   └── useDebouncedResize.ts# Debounced window resize performance hook
│   └── utils/
│       └── audioSynth.ts        # Web Audio API acoustic chimes & melody synthesizer
```

---

## 🌐 Deployment

This application is a static Single-Page Application (SPA) and can be deployed anywhere with ease:

- **GitHub Pages**: Deploy the `dist` folder directly via GitHub Actions.
- **Vercel**: Import the GitHub repository and use the standard Vite preset.
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **Cloud Run / Docker**: Deploy with static file serving (nginx or node).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

Made with ❤️ for **Raksha Bandhan**.
