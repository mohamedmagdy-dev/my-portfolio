# Mohamed Magdy — Personal Portfolio

A modern, high-performance creative development portfolio engineered with React 19, Vite, Tailwind CSS v4, and GSAP 3. The application demonstrates advanced web animation patterns, inertial smooth scrolling, kinetic typography, momentum-based interactive carousels, and synchronized state management.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?style=flat-square)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88ce02.svg?style=flat-square)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)

---

## Overview

This repository houses the source code for the personal portfolio of Mohamed Magdy, a Frontend and Creative Developer based in Alexandria, Egypt. The project is designed with an engineering-first emphasis on visual fidelity, micro-interactions, and fluid timeline orchestration without sacrificing accessibility or runtime performance.

---

## Key Features

- **Kinetic Typography & Variable Fonts**: Dynamic letter-level animation using GSAP `SplitText` paired with interactive variable font variations responsive to pointer movement.
- **Physics-Based Magnetic Interactions**: Spring-damped elastic cursor tracking (`gsap.quickTo`) on primary call-to-action triggers and custom interactive cursors.
- **Inertial Smooth Scrolling**: Global scroll normalization via GSAP `ScrollSmoother` integrated with responsive mobile navigation freeze controls and dynamic refresh invalidation (`invalidateOnRefresh`).
- **Sequenced Website Preloader**: Multi-phase reveal sequencing coordinating geometric card splits and scale expansion driven by central Zustand stores.
- **Inertia Draggable Work Slider**: Seamless infinite horizontal project loop powered by GSAP `InertiaPlugin` and `Draggable`, with velocity-based skew distortions.
- **Interactive Video Portal Reveal**: Pinned SVG mask expansion scaling dynamically into high-definition project showcase videos.
- **Scattered Text Marquee**: Scroll-driven character scatter and reassembly orchestrated through nested container animations and `SplitText`.
- **My Journey Timeline**: Multi-stage pinned career evolution narrative with random character dispersal and layered full-viewport transitions.
- **Pinned Toolkit Carousel**: Fake horizontal scroll runway showcasing engineering competencies with responsive dynamic offset tracking.
- **Reversible Navigation State Machine**: Scoped mobile navigation menu utilizing a single reversible GSAP timeline to prevent animation collisions and desync states.

---

## Architecture & Tech Stack

```mermaid
graph TD
    App[App Component] --> Header[Header & Mobile Nav]
    App --> CustomCursor[Custom Cursor]
    App --> Loader[Website Loader]
    App --> SmoothWrapper[ScrollSmoother Wrapper]
    SmoothWrapper --> Hero[Hero Section]
    SmoothWrapper --> MainContent[Main Content]

    MainContent --> HorizontalSlider[Horizontal Slider]
    MainContent --> SelectedWork[Selected Work Showcase]
    MainContent --> WorkSlider[Horizontal Work Slider]
    MainContent --> AboutMe[About Me Story]
    MainContent --> VideoRevel[Video Mask Reveal]
    MainContent --> TextMarquee[Scattered Text Marquee]
    MainContent --> MyJourney[My Journey Timeline]
    MainContent --> MyToolKit[My Toolkit Carousel]

    ZustandLoader[useLoaderStore] -.-> App
    ZustandLoader -.-> Loader
    ZustandLoader -.-> Hero
    ZustandScroll[useScrollStore] -.-> Header
    ZustandScroll -.-> SmoothWrapper
```

### Core Technologies

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime & Framework** | React 19.2 | Core component architecture and concurrent rendering |
| **Build Tooling** | Vite 8.3 | High-speed ESM development server and Rollup production bundler |
| **Animation Engine** | GSAP 3.15 + `@gsap/react` | Timeline orchestration, `ScrollSmoother`, `ScrollTrigger`, `Draggable`, `InertiaPlugin`, and `SplitText` |
| **Styling** | Tailwind CSS v4.3 | Utility-first CSS engine with native CSS theme variables |
| **State Management** | Zustand 5.0 | Lightweight, decoupled global reactive stores for loader and scroll handlers |
| **Routing** | React Router 8.4 | Client-side page navigation with Single Page Application rewrites |
| **Code Quality** | ESLint 10 | Strict linting rules with React Hooks and React Refresh configurations |

---

## Project Structure

```text
my-portfolio/
├── public/
│   ├── images/                # Project snapshots and showcases
│   ├── videos/                # High-definition video assets
│   └── favicon/               # Webmanifest and multi-resolution app icons
├── src/
│   ├── assets/
│   │   └── images/            # Static brand assets and vector logos
│   ├── components/
│   │   ├── animatedComponents/# ScrollSmoother wrapper and kinetic components
│   │   ├── AboutMe.jsx        # Interactive word-by-word highlighted narrative
│   │   ├── CustomCursor.jsx   # Spring-damped custom pointer tracking
│   │   ├── Header.jsx         # Sticky navigation bar and mobile menu drawer
│   │   ├── HeroSection.jsx    # Hero banner with kinetic typography and magnetics
│   │   ├── HorizontalSlider.jsx # Continuous infinite ticker marquee
│   │   ├── HorizontalWorkSlider.jsx # Inertia-driven project carousel with velocity skews
│   │   ├── MainContent.jsx    # Primary portfolio view coordinator
│   │   ├── MyJourney.jsx      # Multi-phase pinned journey timeline
│   │   ├── MyToolKit.jsx      # Pinned horizontal toolkit card deck
│   │   ├── SelectedWork.jsx   # Curated featured projects list
│   │   ├── TextMarquee.jsx    # Kinetic character scattering scroll marquee
│   │   ├── VideoRevel.jsx     # Pinned SVG mask zooming video portal
│   │   └── WebsiteLoader.jsx  # Multi-stage introductory preloader
│   ├── Pages/
│   │   └── HomePage.jsx       # Root view composition
│   ├── store/
│   │   ├── useLoaderStore.js  # Global preloader progress and transition state
│   │   └── useScrollStore.js  # ScrollSmoother instance registry
│   ├── styles/
│   │   └── App.css            # Tailwind theme tokens and root design variables
│   ├── utils/
│   │   └── horizontalLoop.js  # Infinite seamless GSAP loop utility
│   ├── App.jsx                # Application shell and lifecycle orchestration
│   └── main.jsx               # React DOM entry point
├── eslint.config.js           # Flat ESLint configuration
├── vercel.json                # SPA rewrite rules for production deployment
├── vite.config.js             # Vite configuration with Tailwind CSS plugin
└── package.json               # Manifest dependencies and run scripts
```

---

## Prerequisites

Ensure your local development environment meets the following minimum requirements:

- **Node.js**: `>= 18.0.0` (LTS recommended)
- **Package Manager**: `npm` (`>= 9.0.0`) or `pnpm` (`>= 8.0.0`)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mohamedmagdy-dev/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 4. Build for Production

```bash
npm run build
```

Production artifacts will be generated in the `dist/` directory.

### 5. Preview Production Bundle

```bash
npm run preview
```

### 6. Linting

```bash
npm run lint
```

---

## Deployment

The application is optimized for deployment on **Vercel** or any static hosting platform supporting SPA routing. A `vercel.json` configuration is included to handle client-side routing rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## License

This project is licensed under the MIT License.
