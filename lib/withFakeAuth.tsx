"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/fakeAuth";

/**
 * DEMO-ONLY CLIENT-SIDE AUTH GUARD HOOK
 * 
 * ⚠️ WARNING: This is a client-side only auth guard for demo purposes.
 * DO NOT use this in production. In a real app, you should:
 * 
 * 1. Use server-side authentication with middleware
 * 2. Validate sessions on the server
 * 3. Use secure HTTP-only cookies
 * 4. Implement proper CSRF protection
 * 
 * This hook is easily bypassed by anyone who knows how to use browser DevTools.
 * It's only meant to simulate the UX of a protected route.
 * 
 * Migration Guide:
 * Replace this with:
 * - NextAuth: useSession() hook + middleware
 * - Firebase: onAuthStateChanged() + security rules
 * - Supabase: useUser() hook + RLS policies
 * 
 * @example
 * ```typescript
 * export default function DashboardPage() {
 *   const { isLoading } = useFakeAuthGuard();
 *   
 *   if (isLoading) {
 *     return <LoadingSpinner />;
 *   }
 *   
 *   return <div>Protected content</div>;
 * }
 * ```
 */
export function useFakeAuthGuard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication status
        const authenticated = isAuthenticated();

        if (!authenticated) {
            // Redirect to login if not authenticated
            router.push("/login");
        } else {
            // User is authenticated, allow access
            setIsLoading(false);
        }
    }, [router]);

    return { isLoading };
}

/**
 * Higher-Order Component (HOC) for protecting routes (alternative to hook).
 * 
 * ⚠️ WARNING: This is a demo-only auth guard. See useFakeAuthGuard() docs above.
 * 
 * @example
 * ```typescript
 * const ProtectedDashboard = withFakeAuth(DashboardPage);
 * export default ProtectedDashboard;
 * ```
 */
export function withFakeAuth<P extends object>(
    Component: React.ComponentType<P>
) {
    return function ProtectedComponent(props: P) {
        const { isLoading } = useFakeAuthGuard();

        if (isLoading) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">Loading...</p>
                    </div>
                </div>
            );
        }

        return <Component {...props} />;
    };
}
