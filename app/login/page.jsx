// app/signin/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks/index";
import { setToken } from "../../lib/store/features/authSlice"

export default function SignInPage() {
    const { data: session, status } = useSession()
    const dispatch = useAppDispatch()
    // const selector = useAppSelector()
    const {token} = useAppSelector((state) => state.auth)
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const error = searchParams.get("error");

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: true,
    });

    // UI states
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState(error || "");

    // Effect to store token when session changes
    useEffect(() => {
        if (status === "authenticated" && session) {
            // Store the session token in Redux and localStorage
            dispatch(setToken({
                accessToken: session?.accessToken || session.user?.token,
                user: {
                    id: session.user.id,
                    email: session.user.email,
                }
            }));

            

            // If we have a callback URL, navigate there
            if (callbackUrl) {
                router.push(callbackUrl);
            }
        }
    }, [session, status, dispatch, router, callbackUrl]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear form error when user types
        if (formError) {
            setFormError("");
        }
    };

    // Handle checkbox change
    const handleCheckboxChange = (checked) => {
        setFormData((prev) => ({
            ...prev,
            rememberMe: checked,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setFormError("Please enter both email and password");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (status === "authenticated") {
                console.log("Session: ", session.user.email)
                // return <p>Signed in as {session.user.email}</p>
            }

            console.log("Session: ", session)

            if (result?.error) {
                setFormError(result.error === "CredentialsSignin"
                    ? "Invalid email or password"
                    : result.error);
                setIsSubmitting(false);
                return;
            }

            // Redirect to the callbackUrl or dashboard
            router.push(callbackUrl);

        } catch (error) {
            console.error("Sign in error:", error);
            setFormError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    // Handle forgotten password
    const handleForgotPassword = () => {
        router.push("/forgot-password");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Back button */}
            <div className="w-full max-w-md mb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/')}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to home
                </Button>
            </div>

            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to your KaushalSetu account to continue your journey
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Remember me checkbox */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="rememberMe"
                                checked={formData.rememberMe}
                                onCheckedChange={handleCheckboxChange}
                            />
                            <Label
                                htmlFor="rememberMe"
                                className="text-sm font-medium cursor-pointer"
                            >
                                Remember me for 30 days
                            </Label>
                        </div>

                        {/* Form error */}
                        {formError && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                                <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
                            </div>
                        )}

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>

                        {/* Sign up link */}
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>

                {/* OAuth providers */}
                <div className="bg-white dark:bg-gray-800 py-6 px-6 shadow rounded-lg sm:px-10">
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => signIn('google', { callbackUrl })}
                                className="w-full"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                    </g>
                                </svg>
                                Google
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => signIn('github', { callbackUrl })}
                                className="w-full"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}