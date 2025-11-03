"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, Loader2, Mail, Phone, User, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Validation and UI states
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // OTP verification states
    const [phoneOtp, setPhoneOtp] = useState("");
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneResendDisabled, setPhoneResendDisabled] = useState(false);
    const [emailResendDisabled, setEmailResendDisabled] = useState(false);
    const [phoneResendTimer, setPhoneResendTimer] = useState(0);
    const [emailResendTimer, setEmailResendTimer] = useState(0);
    const [verifyingPhone, setVerifyingPhone] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);

    // Handle countdown timers for OTP resend
    // useEffect(() => {
    //     let phoneInterval, emailInterval;

    //     if (phoneResendTimer > 0) {
    //         phoneInterval = setInterval(() => {
    //             setPhoneResendTimer((prev) => prev - 1);
    //         }, 1000);
    //     } else {
    //         setPhoneResendDisabled(false);
    //     }

    //     if (emailResendTimer > 0) {
    //         emailInterval = setInterval(() => {
    //             setEmailResendTimer((prev) => prev - 1);
    //         }, 1000);
    //     } else {
    //         setEmailResendDisabled(false);
    //     }

    //     return () => {
    //         clearInterval(phoneInterval);
    //         clearInterval(emailInterval);
    //     };
    // }, [phoneResendTimer, emailResendTimer]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear errors when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.phoneNo.trim()) {
            newErrors.phoneNo = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNo)) {
            newErrors.phoneNo = "Please enter a valid 10-digit phone number";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // if (!phoneVerified) {
        //     newErrors.phoneOtp = "Phone number is not verified";
        // }

        // if (!emailVerified) {
        //     newErrors.emailOtp = "Email is not verified";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Register the user
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phoneNo,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            console.log("Registration: ", data)

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Sign in the user
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error || "Failed to sign in");
            }

            // Success - redirect to dashboard
            router.push("/dashboard");

        } catch (error) {
            console.error("Registration error:", error);
            setErrors((prev) => ({
                ...prev,
                form: error.message || "Something went wrong. Please try again.",
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Send OTP to phone
    // const sendPhoneOTP = async () => {
    //     if (!formData.phoneNo || !/^\d{10}$/.test(formData.phoneNo)) {
    //         setErrors((prev) => ({
    //             ...prev,
    //             phoneNo: "Please enter a valid 10-digit phone number",
    //         }));
    //         return;
    //     }

    //     setPhoneResendDisabled(true);
    //     setPhoneResendTimer(30); // 30 seconds cooldown

    //     try {
    //         // In a real app, you would call your API to send OTP
    //         // For demo, we'll simulate it
    //         setPhoneOtpSent(true);
    //         // Mock OTP for demo
    //         console.log("Phone OTP sent (demo): 123456");

    //         // Clear any previous errors
    //         setErrors((prev) => ({ ...prev, phoneOtp: "" }));

    //     } catch (error) {
    //         console.error("Error sending phone OTP:", error);
    //         setErrors((prev) => ({
    //             ...prev,
    //             phoneOtp: "Failed to send OTP. Please try again.",
    //         }));
    //     }
    // };

    // Send OTP to email
    // const sendEmailOTP = async () => {
    //     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    //         setErrors((prev) => ({
    //             ...prev,
    //             email: "Please enter a valid email address",
    //         }));
    //         return;
    //     }

    //     setEmailResendDisabled(true);
    //     setEmailResendTimer(30); // 30 seconds cooldown

    //     try {
    //         // In a real app, you would call your API to send OTP
    //         // For demo, we'll simulate it
    //         setEmailOtpSent(true);
    //         // Mock OTP for demo
    //         console.log("Email OTP sent (demo): 654321");

    //         // Clear any previous errors
    //         setErrors((prev) => ({ ...prev, emailOtp: "" }));

    //     } catch (error) {
    //         console.error("Error sending email OTP:", error);
    //         setErrors((prev) => ({
    //             ...prev,
    //             emailOtp: "Failed to send OTP. Please try again.",
    //         }));
    //     }
    // };

    // Verify phone OTP
    // const verifyPhoneOTP = async () => {
    //     if (!phoneOtp) {
    //         setErrors((prev) => ({
    //             ...prev,
    //             phoneOtp: "Please enter the OTP sent to your phone",
    //         }));
    //         return;
    //     }

    //     setVerifyingPhone(true);

    //     try {
    //         // In a real app, you would verify with your API
    //         // For demo, we'll simulate with a mock OTP
    //         setTimeout(() => {
    //             if (phoneOtp === "123456") { // Mock OTP for demo
    //                 setPhoneVerified(true);
    //                 setErrors((prev) => ({ ...prev, phoneOtp: "" }));
    //             } else {
    //                 setErrors((prev) => ({ ...prev, phoneOtp: "Invalid OTP" }));
    //             }
    //             setVerifyingPhone(false);
    //         }, 1000);
    //     } catch (error) {
    //         console.error("Error verifying phone OTP:", error);
    //         setErrors((prev) => ({
    //             ...prev,
    //             phoneOtp: "Failed to verify OTP. Please try again.",
    //         }));
    //         setVerifyingPhone(false);
    //     }
    // };

    // Verify email OTP
    // const verifyEmailOTP = async () => {
    //     if (!emailOtp) {
    //         setErrors((prev) => ({
    //             ...prev,
    //             emailOtp: "Please enter the OTP sent to your email",
    //         }));
    //         return;
    //     }

    //     setVerifyingEmail(true);

    //     try {
    //         // In a real app, you would verify with your API
    //         // For demo, we'll simulate with a mock OTP
    //         setTimeout(() => {
    //             if (emailOtp === "654321") { // Mock OTP for demo
    //                 setEmailVerified(true);
    //                 setErrors((prev) => ({ ...prev, emailOtp: "" }));
    //             } else {
    //                 setErrors((prev) => ({ ...prev, emailOtp: "Invalid OTP" }));
    //             }
    //             setVerifyingEmail(false);
    //         }, 1000);
    //     } catch (error) {
    //         console.error("Error verifying email OTP:", error);
    //         setErrors((prev) => ({
    //             ...prev,
    //             emailOtp: "Failed to verify OTP. Please try again.",
    //         }));
    //         setVerifyingEmail(false);
    //     }
    // };

    // Format time for countdown display
    const formatTime = (seconds) => {
        return `${seconds}s`;
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
                        Create an Account
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join KaushalSetu to explore career paths and find your perfect fit
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">
                                    First Name
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <User className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`pl-10 ${errors.firstName ? "border-red-500 dark:border-red-500" : ""}`}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">
                                    Last Name
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <User className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`pl-10 ${errors.lastName ? "border-red-500 dark:border-red-500" : ""}`}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Phone number with OTP verification */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNo" className="text-sm font-medium">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    id="phoneNo"
                                    name="phoneNo"
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    className={`pl-10 ${errors.phoneNo ? "border-red-500 dark:border-red-500" : ""}`}
                                    disabled={phoneVerified}
                                />
                            </div>
                            {errors.phoneNo && (
                                <p className="text-xs text-red-500 mt-1">{errors.phoneNo}</p>
                            )}
                        </div>

                        {/* Email with OTP verification */}
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
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`pl-10 ${errors.email ? "border-red-500 dark:border-red-500" : ""}`}
                                    disabled={emailVerified}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`pl-10 ${errors.password ? "border-red-500 dark:border-red-500" : ""}`}
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
                                {errors.password && (
                                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Lock className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`pl-10 ${errors.confirmPassword ? "border-red-500 dark:border-red-500" : ""}`}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Form error */}
                            {errors.form && (
                                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.form}</p>
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
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            {/* Sign in link */}
                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}