# Archery Score Tracker

A Progressive Web App (PWA) for tracking archery scores, built with React, Vite, TailwindCSS, and Firebase.

## Features
- Email/password authentication (Firebase)
- Role-based access (admin/user)
- Log, edit, and delete scores
- View score history and weekly averages
- Chart display (Recharts)
- Export scores to CSV/PDF
- Offline support (PWA)
- Responsive, mobile-first UI

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Add Firebase config:**
   - Copy your Firebase config to `src/firebaseConfig.js` (see template in file).
3. **Run locally:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

## Firebase Setup
- Create a Firebase project.
- Enable Email/Password authentication.
- Create Firestore database.
- Add your config to `src/firebaseConfig.js`.

## Deployment
- GitHub Actions workflow will build and deploy to GitHub Pages.

## PWA Installation
- App can be installed from Safari (iOS) and Chrome (Android).
- Offline viewing of score history is supported.

## File Structure
```
src/
  components/
  pages/
  hooks/
  context/
```

## License
MIT
