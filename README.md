# Kalpataru Saha — Personal Portfolio Website

An ultra-refined, wide-screen, pure OLED black (`#000000`) monochrome portfolio website designed and built for **Kalpataru Saha**, a Computer Science & Engineering (AI & ML) undergraduate at **Netaji Subhas Engineering College, Kolkata (MAKAUT)**.

---

## 🎨 Design Philosophy: Wide-Screen Asymmetric Architecture

- **Wide Viewport Container**:
  - Replaces narrow centralized wrappers with a natural full-screen container (`width: 92vw; max-width: 1480px; margin: 0 auto;`).
  - Strict left-anchored typography (`text-align: left`)—no middle-axis stacking or centered body text.
  - Edge-to-edge (`100vw`) sticky top navbar with pinned brand monogram on the far left, and navigation links + **Resume ↗** on the far right.
- **Asymmetric Section Grid (`280px` : `1fr`)**:
  - **Left Sticky Column (`280px`)**: Sticky uppercase section index numbers (e.g. `01 // ABOUT`, `02 // PROJECTS`, `03 // SKILLS`, `04 // EDUCATION`, `05 // CONTACT`) anchored to the left margin, each accompanied by a clean monochrome inline SVG glyph.
  - **Right Content Column (`1fr`)**: Expansive multi-column content stretching across the remaining screen width.
- **Strict Monochrome Palette**:
  - Background: Pure black (`#000000`).
  - Typography: `#FFFFFF` (Headings, titles, active links), `#E4E4E7` (Accents), `#A1A1AA` (Body paragraphs), `#71717A` (Monospace labels, dates, tech tags).
  - Borders & Dividers: `1px solid #1A1A1A` / `#27272A`. Zero bright colors, heavy drop shadows, or colored glows.

---

## 📐 Custom Monochrome Inline SVG Graphics

Every graphic is rendered natively inline as lightweight, resolution-independent SVG vectors:
1. **Hero Geometric Wireframe Graphic**:
   - Concentric orbital rings, coordinate axes, outer tech crosshairs, and a rotating 3D wireframe polyhedron (`@keyframes rotatePolyhedron`) layered behind a circular monochrome portrait photo (`profile.jpg`).
2. **About Neural Topographic Contour Graphic**:
   - A multi-layer SVG network diagram depicting interconnected machine learning nodes, data flow paths, and generative contour waves.
3. **Projects Technical Architectural Schematics**:
   - **Gallery**: Photo frame layout with an inner AES-256-GCM encryption vault shield.
   - **BingeLog**: Desktop and mobile device silhouettes with a bidirectional cloud sync waveform.
   - **SparkJS**: Radiant `{ }` code brackets emitting interactive AST spark nodes.
   - **Hotel Management System**: An architectural room matrix grid showing occupied, reserved, and available suite units.
4. **Skills Corner Crosshairs**:
   - Subtle geometric corner crosshairs (`+`) marking each unboxed domain quadrant.
5. **Contact & Footer Dot-Wave Graphic**:
   - Full-width sinusoidal dot-wave vector spanning the footer boundary, leading into the minimal bottom copyright metadata.

---

## 🏛️ Section Breakdown

### 1. Hero Section (`1.4fr : 1fr` Split)
- **Left Column**: Live status pill (`Open to Internships & Technical Projects`), oversized display title (`Hi, I’m Kalpataru Saha`), concise role subtitle (`Computer Science & AI/ML Undergraduate — Kolkata, India`), core narrative bio, dual CTA buttons (`Explore Work` & `Contact Me`), and institution/timezone metadata.
- **Right Column**: Circular monochrome portrait photo framed over the rotating geometric wireframe vector illustration.

### 2. About (`01 // ABOUT`)
- Wide split layout (`1.3fr : 0.7fr`) featuring Kalpataru's academic progression at NSEC Kolkata, hands-on engineering mindset, and athletic/oratorical discipline, paired with the inline neural contour illustration.

### 3. Projects (`02 // PROJECTS`)
- 4 borderless horizontal project rows (`1.4fr : 0.8fr`) with interactive focus-dimming (hovering over any project dims surrounding projects to `0.45` opacity):
  - **Gallery** (`https://github.com/saha-cmd/Gallery`) — Android Media & AES-256-GCM Encrypted Vault App (Kotlin, Jetpack Compose, Room, Material 3, Biometrics).
  - **BingeLog (PC & Mobile)** (`https://github.com/saha-cmd`) — Cross-Platform Entertainment Tracker (Electron, React, Kotlin, Jetpack Compose, Google Drive Sync).
  - **SparkJS** (`https://github.com/saha-cmd/SparkJS`) — Browser-Based JavaScript Learning Environment (JavaScript, HTML5 Canvas, Tailwind CSS, Monaco Editor).
  - **Hotel Management System GUI** (`https://github.com/saha-cmd`) — Python & Tkinter Hotel Administration Desktop App (Python, Tkinter, SQLite, ReportLab).

### 4. Skills (`03 // SKILLS`)
- 2×2 open typographic grid with corner crosshairs (`+`):
  - *Languages*: Python, Kotlin, C++, C, JavaScript, SQL, HTML, VBA.
  - *Frameworks & UI*: Jetpack Compose, React, Tkinter, Tailwind CSS.
  - *Developer Tools & Storage*: Android Studio, Electron, Room / SQLite, Git, MS Excel, MS Word, MS PowerPoint.
  - *Core Disciplines & Natural Languages*: AI & Machine Learning, Software Engineering, Database Management, Process Automation · English, Hindi, Bengali (Full), Gujarati, Punjabi (Spoken).

### 5. Education & Honors (`04 // EDUCATION`)
- Side-by-side 2-column spread (`1fr : 1fr`):
  - *Left Column*: Score-free academic timeline (B.Tech CSE AI/ML Expected 2029, JEE Mains NTA, CBSE Class XII 2025, CBSE Class X 2023) omitting all percentages and ranks.
  - *Right Column*: Leadership & Extracurricular Discipline (Inter-House School Captain, Abacus Champion, Bengali Recitation Champion & Orator, 1st Place 100m Sprint Gold, Football Trophies).

### 6. Contact & Footer (`05 // CONTACT`)
- Oversized headline: *"Let’s build something meaningful."*
- One-click copyable email (`sahakalpa3010@gmail.com`) and phone (`+91-9547979364`) with interactive `"copy"` pills and toast confirmation.
- Large direct link rows for **GitHub** (`@saha-cmd`), **LinkedIn**, and **Instagram** (`@hrn.kalpa`).
- Full-width dot-wave SVG and copyright line.

---

## ✨ Full-Screen Ambient Particle Background Canvas

- **Fixed Layering (`#particle-canvas`)**: Positioned fixed at `z-index: 0` (`pointer-events: none;`) behind all content elements.
- **3 Monochrome Depth Tiers**: Foreground specks (with 20% technical square specks), midground dots, and background dust.
- **Physics & Motion**: Organic sinusoidal wave drift, smooth viewport edge wrapping, gentle cursor repulsion within `120px`, faint constellation lines within `110px`, and scroll parallax.
- **Battery & Accessibility**: Automatically pauses when the browser tab is hidden (`visibilitychange`), and renders a clean static starfield when `prefers-reduced-motion: reduce` is detected.

---

## 📁 Repository Structure

```
Port-Folio/
├── index.html                           # Wide-screen asymmetric editorial layout & inline SVGs
├── profile.jpg                          # Developer photo avatar
├── server.js                            # Zero-dependency local Node.js static server
├── README.md                            # Complete design & architectural documentation
├── css/
│   └── style.css                        # Pure black wide-screen styles, asymmetric grid & SVG keyframes
├── js/
│   └── main.js                          # Particle canvas, mobile drawer, ScrollSpy & clipboard copy
└── assets/
    ├── avatar-fallback.svg              # Vector avatar fallback
    ├── hotel-system-preview.svg         # Tkinter GUI application preview
    └── Kalpataru_Saha_Resume.pdf        # Downloadable printable resume document
```

---

## 💻 How to Run Locally

### Option 1: Direct Double-Click (Zero Dependencies)
Double-click `index.html` in your file explorer to open it directly in any modern browser.

### Option 2: Local Node.js Server
From the project folder, run:
```bash
# Standard local preview
node server.js

# Expose to local network (Wi-Fi preview on mobile)
node server.js --host
```
Then visit [http://127.0.0.1:3000/](http://127.0.0.1:3000/) on your desktop or the printed **Network URL** on your mobile device.
