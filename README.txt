Amazon One Firebase integration patch

Files:
- src/firebase.js: Vite Firebase initialization using environment variables
- src/context/OneContext.jsx: Firebase Auth, profile document persistence, favorites/cart/interests/settings sync, assistant history helpers
- src/pages/OneLogin.jsx: existing login UI wired to Firebase email/password registration, sign-in, reset email; demo buttons no longer bypass auth
- firestore.rules: per-user data access restrictions
- .env.example: environment variable template

Install:
  npm install firebase

Setup:
1. Copy .env.example to .env in the same directory as package.json.
2. Fill in all six VITE_FIREBASE_* values from Firebase Console > Project settings > Your apps.
3. Enable Authentication > Sign-in method > Email/Password.
4. Create Firestore Database.
5. Publish firestore.rules in Firestore > Rules.
6. Restart Vite: npm run dev.

Note: OneAssistant still needs a small integration to call saveAssistantMessage and loadAssistantHistory. The context methods are provided; they are not automatically invoked by OneAssistant yet.
