# Demo Authentication System

## ⚠️ Important Notice

**This is a DEMO-ONLY authentication system for UI/UX demonstration purposes.**

This implementation uses **client-side session storage** and does **NOT** provide real security. It is designed to:
- Simulate a realistic authentication flow for demos and prototypes
- Allow developers to build and test UI without setting up a full auth backend
- Be easily replaceable with a production-ready authentication provider

**DO NOT use this in production.** Replace it with a real authentication solution before deploying to production.

---

## 📁 File Structure

The demo auth system consists of the following files:

```
lib/
├── fakeAuth.ts          # Core auth module (signIn, signOut, isAuthenticated, getUser)
└── withFakeAuth.tsx     # Route protection hook and HOC

components/
└── ui/
    └── toast.tsx        # Toast notification component for auth feedback

app/
├── (auth)/
│   └── login/
│       └── page.tsx     # Login page (wired to fake auth)
├── dashboard/
│   ├── layout.tsx       # Dashboard layout with logout button
│   └── page.tsx         # Dashboard page (protected with auth guard)
└── modals/
    └── auth-modal.tsx   # Auth modal with Google/Microsoft buttons
```

---

## 🔧 How It Works

### Session Storage

The fake auth system stores session data in **`sessionStorage`**, which:
- ✅ Clears automatically when the browser tab/window closes
- ✅ Is NOT shared across tabs (more secure than `localStorage`)
- ✅ Simulates a real session-based auth system
- ❌ Does NOT persist across browser restarts (by design)

### Session Structure

```typescript
{
  user: {
    id: "demo-user-001",
    name: "Demo User",
    email: "demo@example.com",
    provider: "google" | "microsoft" | "github" | "email"
  },
  expiresAt: 1702345678900  // Unix timestamp (30 min TTL)
}
```

### Time-To-Live (TTL)

- **Default:** 30 minutes
- **Configurable:** Pass `ttlMinutes` parameter to `signIn()`
- **Auto-cleanup:** Expired sessions are automatically removed

---

## 🚀 Usage Guide

### Signing In

```typescript
import { signIn } from "@/lib/fakeAuth";

// Sign in with a provider
await signIn("google");        // Google OAuth (simulated)
await signIn("microsoft");     // Microsoft OAuth (simulated)
await signIn("github");        // GitHub OAuth (simulated)
await signIn("email");         // Email/password (simulated)

// Custom TTL (in minutes)
await signIn("google", 60);    // 60-minute session
```

### Signing Out

```typescript
import { signOut } from "@/lib/fakeAuth";

signOut();  // Clears session and redirects to home
```

### Checking Authentication

```typescript
import { isAuthenticated } from "@/lib/fakeAuth";

if (isAuthenticated()) {
  // User is signed in
} else {
  // Redirect to login
}
```

### Getting User Data

```typescript
import { getUser } from "@/lib/fakeAuth";

const user = getUser();
if (user) {
  console.log(user.name);      // "Demo User"
  console.log(user.email);     // "demo@example.com"
  console.log(user.provider);  // "google"
}
```

### Protecting Routes

```typescript
"use client";

import { useFakeAuthGuard } from "@/lib/withFakeAuth";

export default function ProtectedPage() {
  const { isLoading } = useFakeAuthGuard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <div>Protected content</div>;
}
```

---

## 🎨 Customizing Fake User Data

To change the demo user details, edit `lib/fakeAuth.ts`:

```typescript
// Line 52-56 in lib/fakeAuth.ts
const DEMO_USER_BASE = {
  id: 'your-custom-id',
  name: 'Your Name',
  email: 'your@email.com',
};
```

To change the session TTL default:

```typescript
// Line 50 in lib/fakeAuth.ts
const DEFAULT_TTL_MINUTES = 60;  // Change from 30 to 60 minutes
```

---

## 🔄 Migration to Real Auth

### Option 1: NextAuth.js (Recommended for Next.js)

**Install:**
```bash
npm install next-auth
```

**Replace fake auth calls:**

| Fake Auth | NextAuth |
|-----------|----------|
| `signIn("google")` | `signIn("google", { callbackUrl: "/dashboard" })` |
| `signOut()` | `signOut({ callbackUrl: "/" })` |
| `isAuthenticated()` | `const { data: session } = useSession(); return !!session;` |
| `getUser()` | `const { data: session } = useSession(); return session?.user;` |
| `useFakeAuthGuard()` | Use NextAuth middleware or `useSession()` hook |

**Example:**
```typescript
// Before (fake auth)
import { signIn } from "@/lib/fakeAuth";
await signIn("google");

// After (NextAuth)
import { signIn } from "next-auth/react";
await signIn("google", { callbackUrl: "/dashboard" });
```

**Resources:**
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js Google Provider](https://next-auth.js.org/providers/google)

---

### Option 2: Firebase Authentication

**Install:**
```bash
npm install firebase
```

**Replace fake auth calls:**

| Fake Auth | Firebase |
|-----------|----------|
| `signIn("google")` | `signInWithPopup(auth, googleProvider)` |
| `signOut()` | `signOut(auth)` |
| `isAuthenticated()` | `onAuthStateChanged(auth, (user) => !!user)` |
| `getUser()` | `auth.currentUser` |
| `useFakeAuthGuard()` | Use `onAuthStateChanged` in `useEffect` |

**Example:**
```typescript
// Before (fake auth)
import { signIn } from "@/lib/fakeAuth";
await signIn("google");

// After (Firebase)
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
await signInWithPopup(auth, provider);
```

**Resources:**
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)

---

### Option 3: Supabase Auth

**Install:**
```bash
npm install @supabase/supabase-js
```

**Replace fake auth calls:**

| Fake Auth | Supabase |
|-----------|----------|
| `signIn("google")` | `supabase.auth.signInWithOAuth({ provider: "google" })` |
| `signOut()` | `supabase.auth.signOut()` |
| `isAuthenticated()` | `const { data: { session } } = await supabase.auth.getSession(); return !!session;` |
| `getUser()` | `const { data: { user } } = await supabase.auth.getUser(); return user;` |
| `useFakeAuthGuard()` | Use `supabase.auth.onAuthStateChange()` |

**Resources:**
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase OAuth](https://supabase.com/docs/guides/auth/social-login)

---

## 🧪 Testing the Demo Auth

### Manual Test Checklist

- [ ] **Sign in via auth modal (Google)**: Click "Get Started" → "Continue with Google" → Redirects to `/dashboard`
- [ ] **Sign in via auth modal (Microsoft)**: Click "Get Started" → "Continue with Microsoft" → Redirects to `/dashboard`
- [ ] **Sign in via login page (Google)**: Navigate to `/login` → Click "Google" → Redirects to `/dashboard`
- [ ] **Sign in via login page (GitHub)**: Navigate to `/login` → Click "Github" → Redirects to `/dashboard`
- [ ] **Sign in via email form**: Navigate to `/login` → Fill form → Click "Sign In" → Redirects to `/dashboard`
- [ ] **Route protection**: Open `/dashboard` in incognito → Redirects to `/login`
- [ ] **Logout**: Sign in → Click "Sign Out" in sidebar → Redirects to `/`
- [ ] **Session expiry**: Sign in → Manually change `expiresAt` in DevTools → Refresh → Redirects to `/login`

### Browser DevTools Inspection

1. Open DevTools (F12)
2. Go to **Application** → **Session Storage** → `http://localhost:3000`
3. Look for key: `resustack_demo_session`
4. Inspect the session object structure

---

## 🛠️ Troubleshooting

### Issue: "User is not redirected to dashboard after sign-in"

**Solution:** Check browser console for errors. Ensure `useRouter()` from `next/navigation` is imported correctly.

### Issue: "Session expires immediately"

**Solution:** Check that `sessionStorage` is not being cleared by browser extensions or privacy settings.

### Issue: "Toast notification doesn't appear"

**Solution:** Ensure `<Toast>` component is rendered in the component tree and `useToast()` hook is called correctly.

### Issue: "Dashboard is accessible without sign-in"

**Solution:** Ensure `useFakeAuthGuard()` is called at the top of the dashboard page component.

---

## 📝 Code Snippets

### Custom Sign-In Flow

```typescript
"use client";

import { useState } from "react";
import { signIn } from "@/lib/fakeAuth";
import { useRouter } from "next/navigation";

export function CustomSignInButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", 60); // 60-minute session
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSignIn} disabled={loading}>
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}
```

### Protected Component

```typescript
"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, getUser } from "@/lib/fakeAuth";

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    }
  }, []);

  if (!user) return null;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Provider: {user.provider}</p>
    </div>
  );
}
```

---

## 🔐 Security Considerations

### Why This Is NOT Secure

1. **Client-side only**: No server validation
2. **Easily bypassed**: Anyone can manipulate `sessionStorage`
3. **No CSRF protection**: Vulnerable to cross-site attacks
4. **No token refresh**: Sessions expire without renewal
5. **No rate limiting**: Unlimited sign-in attempts

### Production Requirements

For production, you MUST implement:
- ✅ Server-side session validation
- ✅ Secure HTTP-only cookies
- ✅ CSRF token protection
- ✅ Rate limiting on auth endpoints
- ✅ OAuth 2.0 / OpenID Connect standards
- ✅ Multi-factor authentication (MFA)
- ✅ Audit logging

---

## 📚 Additional Resources

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [MDN: Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

---

## 📞 Support

If you encounter issues with the demo auth system:
1. Check this README for troubleshooting steps
2. Review the inline code comments in `lib/fakeAuth.ts`
3. Ensure all dependencies are installed (`npm install`)
4. Test in a clean browser session (incognito mode)

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**License:** MIT
