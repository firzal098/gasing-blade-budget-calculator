<div align="center">
  <h1>Spinning Top Stat Budget Calculator</h1>
  <p>A web-based tool to help balance game stats for a spinning top based on a point-buy system.</p>
</div>

---

This application is a simple but powerful calculator built to help game designers or players theory-craft builds for a "spinning top" game. It operates on a budget system where a total number of "Build Points" are allocated between two primary stats: **Durability** and **Max RPM**.

The core relationship is defined by the formula:
`Total Points = Durability + (Max RPM / Ratio)`

## ✨ Features

- **Dynamic Stat Allocation**: Adjusting one stat automatically recalculates the other to stay within the total point budget.
- **Adjustable Budget**: Set the total "Build Points" available for a build.
- **Archetype Presets**: Quickly jump to common build types like "Tank," "Balanced," or "Stamina/Power."
- **Advanced Tuning**: An "Advanced Options" section allows for tweaking the "RPM-to-Durability Ratio," which controls the relative cost between the two stats.

## 🛠️ Underlying Technology

This project is built with a modern, fast, and efficient front-end stack:

- **Framework**: **React 19** for building the user interface with components.
- **Build Tool**: **Vite** provides an extremely fast development server and optimized build process.
- **Styling**: **Tailwind CSS v4** is used for utility-first styling. It's integrated directly via the new `@tailwindcss/vite` plugin, which simplifies the setup and leverages Lightning CSS for maximum performance.
- **Language**: JavaScript (ESM) with JSX.

The setup is minimal and performant, requiring no complex configuration for PostCSS or other CSS preprocessors, as the Vite plugin handles everything.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (or your package manager of choice)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/gasing-budget-calculator.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd budget-calculator
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

To start the Vite development server, run:
```sh
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

### Building for Production

To create an optimized production build, run:
```sh
npm run build
```
The output files will be in the `dist` directory.
