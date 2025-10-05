# shark-env-guard

> 🔒 A lightweight, zero-dependency (except `dotenv`) utility to **validate required environment variables at startup**.  
> Fail fast if any critical config is missing — before your app crashes in production!

[![npm version](https://img.shields.io/npm/v/shark-env-guard.svg?style=flat)](https://www.npmjs.com/package/shark-env-guard)
[![npm downloads](https://img.shields.io/npm/dm/shark-env-guard.svg)](https://www.npmjs.com/package/shark-env-guard)

## ✨ Features

- ✅ Validates that required env vars exist and are **not empty**
- ✅ Auto-loads `.env` file using `dotenv`
- ✅ Exits process immediately on missing vars (safe for production)
- ✅ Optional: throw error instead (great for testing)
- ✅ Zero runtime dependencies (only `dotenv` as peer)
- ✅ Works with **CommonJS** (`require`) — no build step needed
- ✅ Tiny, readable, and well-documented

## 📦 Install

```js
npm install shark-env-guard
```

## 🚀 Usage (ES Modules)
> Make sure your `package.json` has `"type": "module"`.

> Place this at the very top of your main file (e.g., server.js, index.js):
```js
`import { envGuard } from 'shark-env-guard';`

💡 Note: This package is published as an ES Module. If you're using CommonJS (require), you'll need to use dynamic import:

`const { envGuard } = await import('shark-env-guard');`

// Ensure these env vars are present before starting the app
envGuard(['PORT', 'MONGO_URI', 'JWT_SECRET']);
```

## 🧪 In Tests (throw error instead of exiting)
```js
import envGuard  from 'shark-env-guard';

try {
  envGuard(['API_KEY'], { throwOnError: true });
} catch (err) {
  console.error('Missing config:', err.message);
}
```

## 💡 Why Use This?

> Without validation, your app might:

- Crash minutes after deployment
- Leak secrets due to misconfiguration
- Connect to the wrong database

> `shark-env-guard` fails fast during startup — so you catch config issues before they cause downtime.

## 📁 How It Works

1. Automatically loads `.env` (via `dotenv`)
2. Checks if all variables in your list exist and are non-empty
3. If any are missing → logs error and exits process (or throws if `throwOnError: true`)


## 📜 License

> MIT © Ali Elsharkawy

