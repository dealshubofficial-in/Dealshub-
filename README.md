# Dealshub Creators — setup guide

A small affiliate/creator site: anyone can apply, you approve them in an
admin panel, and approved creators get a unique link that logs every click
before forwarding the shopper to dealshubofficial.com/shop.

Pages:
- `index.html` — public landing page, pitches the program
- `dashboard.html` — creator sign-in, application form, status + referral link
- `admin.html` — your review panel (approve / reject)
- `r.html` — the actual link people click; logs the click, then redirects
- `firebase-config.js` — the one file you must edit
- `firestore.rules` — security rules to paste into Firestore
- `firebase.json` — hosting config, if you deploy via the Firebase CLI

## 1. Create a Firebase project
Go to https://console.firebase.google.com → **Add project**. The free
Spark plan is enough — no credit card needed for this build.

## 2. Register a Web app and get your config
Project settings (gear icon, top left) → **General** → "Your apps" →
**Add app** → Web (`</>`). Give it any nickname. Firebase shows you a
`firebaseConfig` object — copy it.

Open `firebase-config.js` in this folder and paste your values in place
of the `YOUR_...` placeholders.

## 3. Turn on Google sign-in
Build → **Authentication** → Get started → **Sign-in method** → enable
**Google**.

## 4. Create the database
Build → **Firestore Database** → **Create database** → start in
**production mode** (any region close to your customers is fine).

Then go to the **Rules** tab and replace the contents with everything in
`firestore.rules` from this folder, then **Publish**.

## 5. Make yourself an admin
In Firestore, manually create a collection called `admins`. Add one
document where the **Document ID** is the exact email address you'll
use to sign in (e.g. `you@gmail.com`) — the fields inside don't matter,
add anything like `{ role: "admin" }`. Add one document per admin you
want.

## 6. Run it locally (optional, to test before deploying)
Any static file server works, e.g. with Python:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`. Note: Google sign-in popups require
`localhost` or a real domain to be in Authentication → Settings →
**Authorized domains** (localhost is included by default).

## 7. Deploy to Firebase Hosting
```
npm install -g firebase-tools
firebase login
firebase init hosting   # choose "use an existing project", pick this one
firebase deploy
```
Firebase gives you a live URL like `https://your-project.web.app`. Add
that domain under Authentication → Settings → Authorized domains if it
isn't there automatically.

## How it works day to day
- Share `index.html` (your live URL) to recruit creators.
- Creators sign in on `dashboard.html` and fill out a short form.
- You review applications at `admin.html` and approve or reject.
- On approval, each creator gets a unique code and a link shaped like
  `your-url/r.html?code=THEIRCODE`.
- Every time someone clicks that link, a click is logged, then they're
  bounced straight to `https://www.dealshubofficial.com/shop?ref=THEIRCODE`.
- Creators see their total click count on their own dashboard; you see
  it too, per creator, in the admin panel.

## Important limitation: clicks, not sales
This tracks **link clicks**, not purchases or commission. Dealshub's
storefront runs on Odoo, which this project doesn't touch — there's no
way for this site to know whether a click turned into an order. If you
want real commission tracking, the common next step is to give each
approved creator their own discount/coupon code inside Odoo and
reconcile orders against those codes manually, or build a server-side
integration with Odoo's API later. The `?ref=THEIRCODE` parameter is
included on every redirect so you have a hook for that down the line.

## Customizing
- Site name, shop URL: top of `firebase-config.js`.
- Colors/fonts: CSS variables at the top of `styles.css`.
- Application form fields: the `<form>` in `dashboard.html`.
