import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="max-w-md mx-auto text-center px-4">
                {/* 404 Number */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary/20 select-none">
                        404
                    </h1>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-3xl font-bold text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Let's get you back on track to your career journey.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/">
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>

                    <Button variant="outline" size="lg" className="gap-2" asChild>
                        <Link href="/colleges">
                            <Search className="w-4 h-4" />
                            Explore Colleges
                        </Link>
                    </Button>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                        Popular pages:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/aptitude"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            Aptitude Test
                        </Link>
                        <Link
                            href="/careers"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            Career Paths
                        </Link>
                        <Link
                            href="/timeline"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                            Timeline
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}