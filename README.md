# 🚀 Ayush Soni — Full-Stack SDE Portfolio Website

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live_Demo-Portfolio_Website-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-ayush-soni.vercel.app)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Overview

Welcome to the official repository of **Ayush Soni's** developer portfolio website — a state-of-the-art, high-performance, dark/light mode web application engineered using **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Three.js / React Three Fiber**.

This application presents a 1:1 exact pixel-perfect design replica featuring custom interactive magnetic brand badges, MacOS browser window project mockups, an infinite auto-scrolling services bento carousel, dynamic RayBeams canvas physics, and a multi-lingual greeting preloader.

---

## ✨ Key Features & UX Innovations

- 🎭 **Preloader Transition Curtain**: Multi-lingual greeting ticker featuring cubic-bezier exit curve `[0.76, 0, 0.24, 1]` with bottom curved curtain arch.
- 🧲 **Magnetic Proximity Tech Stack**: 44+ interactive brand badges with 8-nearest-neighbor cursor proximity pull and smooth physics springs.
- 🎡 **Infinite Auto-Scrolling Carousel**: Drag-enabled, touch-responsive services showcase with 2-second interval loop and spring snapping.
- 💻 **MacOS Desktop Project Frames**: Interactive browser window mockups featuring traffic light dots, domain pill header, and radial spotlight mouse tracking.
- 🌓 **Seamless Theme Engine**: Instant Dark/Light mode toggle with persistent CSS variables and HSL color design system.
- 🔮 **RayBeams Canvas Effect**: Metallic strip mesh canvas background with specular lighting calculations.
- ⚡ **Lightning Fast Performance**: Built on Vite with sub-600ms production bundle builds and zero runtime errors.

---

## 🛠️ Technology Stack

### **Frontend & UI Core**
| Technology | Description |
| :--- | :--- |
| **React 19** | Component-driven UI architecture with modern hooks |
| **Vite v8** | Ultra-fast Next-Gen frontend build tool |
| **Tailwind CSS** | Utility-first styling framework with custom CSS variable design tokens |
| **Framer Motion** | Complex UI transitions, layout animations, and gesture tracking |
| **Three.js & R3F** | 3D graphics rendering and interactive canvas geometry |
| **Lenis Smooth Scroll** | High-precision inertia smooth scrolling |

### **Backend & Database Core**
- **Runtime & Frameworks**: Node.js, Express.js, Flask, Django REST Framework
- **Databases**: MongoDB (Mongoose), MySQL, Redis
- **Real-Time Communication**: Socket.io (WebSockets)
- **AI & LLMs**: OpenAI API, Google Gemini Pro API, OpenCV, MediaPipe, NumPy
- **Cloud & Infrastructure**: AWS (EC2/S3), Nutanix Architecture (HCI, AOS, AHV Hypervisor, Prism Central)
- **Security & DevOps**: JWT, BcryptJS, Speakeasy (2FA/MFA), Docker, GitHub Actions (CI/CD), Postman, Linux (Ubuntu)

---

## 💼 Featured Projects

### 1. 🚀 [Prepzo — Full-Stack AI Career Accelerator](https://github.com/ayushsoni05/Prepzo)
> *AI-powered interview preparation & placement acceleration platform.*
- **Tech Stack**: React 19, Node.js, Express.js, MongoDB, OpenAI API, Gemini Pro, Tailwind CSS
- **Features**: Real-time AI mock interviews, structured JSON resume parsing, custom feedback rubrics, and analytics dashboards.

### 2. 🛍️ [Glimmr — Full-Stack E-Commerce Platform](https://github.com/ayushsoni05/Glimmr)
> *High-performance modern e-commerce application with real-time inventory management.*
- **Tech Stack**: React, Redux Toolkit, Node.js, Express.js, MongoDB, Stripe API, Socket.io
- **Features**: Instant search filtering, real-time order tracking via WebSockets, OAuth 2.0 authentication, and secure checkout.

### 3. 🖐️ [Hand Gesture Recognition System](https://github.com/ayushsoni05/Hand-Gesture-Recognition)
> *Real-time computer vision gesture control interface.*
- **Tech Stack**: Python, OpenCV, MediaPipe, NumPy, Flask
- **Features**: Low-latency hand landmark tracking, custom gesture mapping, and touchless system volume/brightness control.

---

## 📂 Project Structure

```text
Portfolio-website/
├── public/
│   ├── assets/           # Project screenshots, logos, and profile images
│   ├── favicon.svg       # Brand favicon logo
│   └── icons.svg         # SVG sprite sheet
├── src/
│   ├── components/
│   │   ├── Contact/      # Contact section & RayBeams canvas background
│   │   ├── Experience/   # Experience timeline & Education cards
│   │   ├── Hero/         # Hero section & rotating title animations
│   │   ├── Projects/     # MacOS browser frame project showcase
│   │   ├── Services/     # Infinite auto-scrolling bento carousel
│   │   ├── TechStack/    # Magnetic proximity 44+ brand badge grid
│   │   ├── Navbar.jsx    # Glassmorphism header navbar
│   │   ├── Preloader.jsx # Multi-lingual curtain preloader
│   │   └── SectionHeader.jsx # Reusable section title typography
│   ├── context/          # Theme Context (Dark/Light Mode)
│   ├── data/             # Structured project & experience data
│   ├── hooks/            # Custom hooks (useMediaQuery, useReducedMotion)
│   ├── App.jsx           # Main App layout & route assembly
│   ├── main.jsx          # React DOM root entry point
│   └── index.css         # Core CSS variable design system & Tailwind directives
├── vercel.json           # Vercel SPA rewrite configuration
├── vite.config.js        # Vite build configuration
└── package.json          # Dependency manifest
```

---

## 💻 Local Development Setup

Follow these steps to run the portfolio locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ayushsoni05/Portfolio-AyushSoni.git
   cd Portfolio-AyushSoni
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

This project is configured for instant single-click deployment on **Vercel** with automatic SPA route rewrites:

```bash
# Deploy via Vercel CLI
npx vercel --prod
```

Or connect the repository `ayushsoni05/Portfolio-AyushSoni` directly in your **[Vercel Dashboard](https://vercel.com/)**.

---

## 👨‍💻 About Ayush Soni

- 🎓 **Education**: B.E. in Computer Science Engineering at **Chitkara University** (CGPA: 7.97 / 10.0)
- 🏆 **Competitive Programming**: 300+ DSA Problems Solved on LeetCode & CodeChef | **Top 3** in Coding Ninjas Contest (Top 1.5% Nationally)
- 📍 **Location**: Didwana, Rajasthan, India
- 📧 **Email**: [aayushsonisoni58@gmail.com](mailto:aayushsonisoni58@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/ayush-soni05](https://www.linkedin.com/in/ayush-soni05)
- 🐙 **GitHub**: [github.com/ayushsoni05](https://github.com/ayushsoni05)

---

<div align="center">

Designed & Engineered with ❤️ by **Ayush Soni**  
© 2026 Ayush Soni. All rights reserved.

</div>
