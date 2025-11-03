"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "../lib/store/hooks/index";
// import { getToken } from "next-auth/jwt"

export default function Navbar() {
    const {token} = useAppSelector((state) => state.auth)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { data: session, status } = useSession()

    const isSignedIn = !!session

    // console.log("Token -> ", token)

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Aptitude Test", href: "/aptitude" },
        { name: "Career Paths", href: "/careers" },
        { name: "Colleges", href: "/colleges" },
        { name: "Timeline", href: "/timeline" },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl text-foreground">KaushalSetu</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side - Theme toggle and Auth */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        {!isSignedIn ? (
                            <>
                                <Button onClick={() => signIn()}>
                                    Sign In
                                </Button>
                                <Button onClick={() => router.push('/register')}>
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center">
                                <div className="relative group">
                                    <button className="flex items-center focus:outline-none">
                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
                                            <span className="text-sm font-medium">
                                                {session?.user?.name?.charAt(0) || "U"}
                                            </span>
                                        </div>
                                    </button>

                                    <div className="absolute right-0 mt-2 w-48 py-2 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="px-4 py-2 border-b border-border">
                                            <p className="text-sm font-medium">{session?.user?.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                                        >
                                            Settings
                                        </Link>
                                        <div className="border-t border-border mt-2 pt-2">
                                            <button
                                                onClick={() => {
                                                    signOut({ callbackUrl: '/' })
                                                    localStorage.removeItem("token")
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {isSignedIn && (
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
                                {session?.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-sm font-medium">
                                        {session?.user?.name?.charAt(0) || "U"}
                                    </span>
                                )}
                            </div>
                        )}
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm border-t border-border">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {!isSignedIn ? (
                                <>
                                    <div className="px-3 py-2">
                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                setIsOpen(false);
                                                signIn();
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                    <div className="px-3 py-2">
                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                setIsOpen(false);
                                                router.push('/register');
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="px-3 py-2">
                                    <Button
                                        className="w-full"
                                        onClick={() => {
                                            setIsOpen(false);
                                            signOut({ callbackUrl: '/' });
                                            localStorage.removeItem("token")
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}