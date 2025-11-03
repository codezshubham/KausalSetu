"use client"

import Link from "next/link"
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
    ArrowRight,
    Heart,
    ExternalLink,
    BookOpen,
    Users,
    Target,
    Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Footer() {
    const quickLinks = [
        { name: "Find Colleges", href: "/colleges", icon: GraduationCap },
        { name: "Career Paths", href: "/careers", icon: Target },
        { name: "Aptitude Test", href: "/aptitude", icon: BookOpen },
        { name: "Timeline", href: "/timeline", icon: Calendar },
        { name: "About Us", href: "/about", icon: Users },
        { name: "Contact", href: "/contact", icon: Phone }
    ]

    const resources = [
        { name: "Admission Guide", href: "/guides/admission" },
        { name: "Scholarship Info", href: "/scholarships" },
        { name: "Exam Preparation", href: "/preparation" },
        { name: "Study Materials", href: "/materials" },
        { name: "Success Stories", href: "/stories" },
        { name: "FAQ", href: "/faq" }
    ]

    const examLinks = [
        { name: "JEE Main/Advanced", href: "/exams/jee" },
        { name: "NEET", href: "/exams/neet" },
        { name: "CLAT", href: "/exams/clat" },
        { name: "CAT", href: "/exams/cat" },
        { name: "GATE", href: "/exams/gate" },
        { name: "State Board Exams", href: "/exams/boards" }
    ]

    const socialLinks = [
        { icon: Facebook, href: "https://facebook.com/kaushalsetu", name: "Facebook" },
        { icon: Twitter, href: "https://twitter.com/kaushalsetu", name: "Twitter" },
        { icon: Instagram, href: "https://instagram.com/kaushalsetu", name: "Instagram" },
        { icon: Linkedin, href: "https://linkedin.com/company/kaushalsetu", name: "LinkedIn" },
        { icon: Youtube, href: "https://youtube.com/kaushalsetu", name: "YouTube" }
    ]

    return (
        <footer className="rounded-t-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>

            <div className="relative z-10 ">
                {/* Newsletter Section */}
                <div className="border-b border-white/20 dark:border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Stay Updated with KaushalSetu
                                </h3>
                                <p className="text-slate-200 dark:text-slate-300 text-lg">
                                    Get the latest updates on admissions, entrance exams, scholarships, and career opportunities directly in your inbox.
                                </p>
                                <div className="flex items-center gap-4 mt-4">
                                    <Badge variant="secondary" className="bg-green-500/30 text-green-300 border-green-500/50 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
                                        <Users className="h-3 w-3 mr-1" />
                                        50K+ Subscribers
                                    </Badge>
                                    <Badge variant="secondary" className="bg-blue-500/30 text-blue-300 border-blue-500/50 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
                                        Weekly Updates
                                    </Badge>
                                </div>
                            </div>
                            <div className="lg:text-right">
                                <div className="inline-flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="bg-white/20 border-white/30 text-white placeholder:text-slate-300 focus:bg-white/30 focus:border-white/50 transition-colors min-w-[300px] dark:bg-white/10 dark:border-white/20 dark:placeholder:text-slate-400 dark:focus:bg-white/20"
                                    />
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap text-white">
                                        Subscribe
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-300 dark:text-slate-400 mt-2">
                                    No spam, unsubscribe anytime. We respect your privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <GraduationCap className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        KaushalSetu
                                    </h2>
                                    <p className="text-sm text-slate-300 dark:text-slate-400">Bridging Skills & Opportunities</p>
                                </div>
                            </div>

                            <p className="text-slate-200 dark:text-slate-300 mb-6 leading-relaxed">
                                Empowering students with comprehensive career guidance, college information, and skill development opportunities.
                                Your trusted companion in the journey towards academic and professional success.
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-slate-200 dark:text-slate-300">
                                    <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                    <span className="text-sm">New Delhi, India</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-200 dark:text-slate-300">
                                    <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                                    <span className="text-sm">+91 1234567890</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-200 dark:text-slate-300">
                                    <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                                    <span className="text-sm">support@kaushalsetu.com</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <Link
                                            key={index}
                                            href={social.href}
                                            className="w-10 h-10 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <social.icon className="h-5 w-5 text-slate-200 group-hover:text-white dark:text-slate-300 transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                            <div className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="flex items-center gap-3 text-slate-200 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors group"
                                    >
                                        <link.icon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                        <span className="text-sm">{link.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
                            <div className="space-y-3">
                                {resources.map((resource, index) => (
                                    <Link
                                        key={index}
                                        href={resource.href}
                                        className="block text-slate-200 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors text-sm group"
                                    >
                                        <span className="flex items-center gap-2">
                                            {resource.name}
                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Popular Exams */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Popular Exams</h3>
                            <div className="space-y-3">
                                {examLinks.map((exam, index) => (
                                    <Link
                                        key={index}
                                        href={exam.href}
                                        className="block text-slate-200 hover:text-white dark:text-slate-300 dark:hover:text-white transition-colors text-sm group"
                                    >
                                        <span className="flex items-center gap-2">
                                            {exam.name}
                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 dark:border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-300 dark:text-slate-400">
                                <p>© 2024 KaushalSetu. All rights reserved.</p>
                                <div className="flex items-center gap-1">
                                    <span>Made with</span>
                                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                                    <span>for students in India</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <Link href="/privacy" className="text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                                <Link href="/cookies" className="text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                                <Link href="/sitemap" className="text-slate-300 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors">
                                    Sitemap
                                </Link>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 pt-6 border-t border-white/10 dark:border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Users className="h-5 w-5 text-blue-400" />
                                    <div>
                                        <div className="text-xl font-bold text-white">50K+</div>
                                        <div className="text-xs text-slate-300 dark:text-slate-400">Students Helped</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-green-400" />
                                    <div>
                                        <div className="text-xl font-bold text-white">1000+</div>
                                        <div className="text-xs text-slate-300 dark:text-slate-400">Colleges Listed</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <Target className="h-5 w-5 text-purple-400" />
                                    <div>
                                        <div className="text-xl font-bold text-white">95%</div>
                                        <div className="text-xs text-slate-300 dark:text-slate-400">Success Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}