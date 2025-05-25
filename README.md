
## Bench

**Bench** is a lightweight full-stack web application built with Angular and Firebase, designed to help fitness enthusiasts publish workout articles and track daily calorie intake. It showcases modern front-end development practices, clean architecture, and seamless backend integration.

---

## Features

- **Article Management**  
  - Create, edit, and delete workout and nutrition articles  
  - Rich-text content with image support for enhanced readability  
- **Calorie Tracker**  
  - Log meals with ingredient-level calorie data  
  - Real-time calculation of total daily calories  
- **Live Reload**  
  - Automatic rebuild and reload on source changes via `ng serve`  
- **Testing & CI/CD**  
  - Unit tests with Karma & Jasmine  
  - End-to-end tests with Protractor  
  - GitHub Actions pipeline for build, test, and Firebase deployment  

---

## Technology Stack

- **Framework**: Angular (Components, Services, Routing)  
- **Language**: TypeScript, HTML5, SCSS  
- **Backend**: Firebase Authentication, Firestore database, Hosting  
- **Testing**: Karma & Jasmine (unit), Protractor (e2e)  
- **CI/CD**: GitHub Actions + Firebase CLI  
- **Design Assets**: Fitness-themed icons from Flaticon  

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/avariable2/bench.git
   cd bench
    ```

2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Run development server**

   ```bash
   ng serve
   ```

   Open your browser at `http://localhost:4200`; the app rebuilds on each file change.

---

## Production Build & Deployment

* **Build for production**

  ```bash
  ng build --prod
  ```

  Artifacts are output to the `dist/bench` directory.
* **Deploy to Firebase**
  Ensure you have logged in via `firebase login` and initialized your project. Then:

  ```bash
  firebase deploy
  ```

---

## Project Structure

```
bench/
├── .github/           # GitHub Actions workflows
├── src/
│   ├── app/           # Angular modules, components, services
│   ├── assets/        # Images, icons
│   └── environments/  # Environment-specific settings
├── e2e/               # End-to-end tests
├── angular.json       # Angular CLI configuration
└── package.json       # npm scripts and dependencies
```

---

## How It Works

1. **Front-end**

   * Modular architecture: feature modules for blog and tracker
   * Reactive forms and Angular Services for API interactions
2. **Back-end**

   * Firebase Firestore stores articles and meal logs
   * Firebase Authentication secures user access
3. **Deployment**

   * Continuous integration builds and tests on each push
   * Automatic deployment to Firebase Hosting on merge to `main`

---

## Getting Started

Clone, install, and serve as above, then explore:

* **`/articles`** to manage posts
* **`/tracker`** to log meals and view calorie totals

Dive into the `src/app` folder to review component structure, service patterns, and Firestore integration. Feedback and contributions are welcome!

---

## License

MIT License — see [LICENSE](LICENSE) for details.

```
```
