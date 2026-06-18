// ===================================================================
// firebase-config.js
//
// EDIT THIS FILE with your own Firebase project's settings.
//
// 1. https://console.firebase.google.com -> Add project (free Spark
//    plan is enough, no billing required).
// 2. Project settings (gear icon) -> General -> "Your apps" -> Add app
//    -> Web (</>) -> register it -> copy the firebaseConfig object
//    shown there and paste it below, replacing the placeholder values.
// 3. Build > Authentication -> Get started -> Sign-in method -> enable
//    "Google".
// 4. Build > Firestore Database -> Create database -> Start in
//    production mode -> then paste the contents of firestore.rules
//    (in this folder) into the Rules tab and Publish.
//
// See README.md for the full step-by-step setup, including how to
// make yourself an admin.
// ===================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsMN8Vbqjp34p6_0xqt8yd2PdvjbPE67Q",
  authDomain: "dealshubofficial.firebaseapp.com",
  projectId: "dealshubofficial",
  storageBucket: "dealshubofficial.firebasestorage.app",
  messagingSenderId: "137265492078",
  appId: "1:137265492078:web:b529eeec9234ccf21b367f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Where the referral link sends shoppers. Change if your shop URL changes.
export const SHOP_URL = "https://www.dealshubofficial.com/shop";

// Shown in headers/footers across the site.
export const SITE_NAME = "Dealshub Creators";
