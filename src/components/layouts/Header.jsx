"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/styles/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/styles/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/styles/ui/avatar";
import { Separator } from "@/components/styles/ui/separator";
import {
    Menu,
    X,
    Globe,
    User,
    LogOut,
    Settings,
    BookOpen,
    Loader2,
    Bell,
    Search,
    GraduationCap,
    Heart,
} from "lucide-react";
import { useState, useCallback, useEffect, memo } from "react";
import { routes } from "@/utils/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-hot-toast";
import { getAvatarSrc, getUserInitials } from "@/utils/avatar";


const Header = memo(() => {
    const pathname = usePathname();
    const router = useRouter();

    // Use the proper auth store state - separate selectors to avoid infinite loop
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const loading = useAuthStore((state) => state.loading);
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const logout = useAuthStore((state) => state.logout);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);



    const avatarSrc = getAvatarSrc(user);
    console.log("Avatar src for user:", avatarSrc); // <-- هنا هنعرف الرابط النهائي


    // Initialize auth on component mount
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    const handleLogout = async () => {
        setLoggingOut(true);
        closeMobileMenu();

        try {
            await logout();
            toast.success("Logged out successfully");
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        } finally {
            setLoggingOut(false);
        }
    };





    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold tracking-tight">
                        <span className="text-slate-800 group-hover:text-blue-600 transition-colors duration-300">Learn</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">oria</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {routes.map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            className={`relative px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50 ${pathname === route.path ? "font-medium" : ""
                                }`}
                        >
                            {route.name}
                            {pathname === route.path && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                    {/* Search Button - Only on larger screens */}
                    {/* <Button 
            variant="ghost" 
            size="sm" 
            className="hidden lg:flex h-9 w-9 p-0 hover:bg-slate-100 rounded-lg"
          >
            <Search className="h-4 w-4 text-slate-600" />
          </Button> */}

                    {/* Language Switcher */}
                    {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-slate-100 rounded-lg">
                <Globe className="h-4 w-4 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="cursor-pointer">
                <span className="mr-2">🇺🇸</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="mr-2">🇸🇦</span>
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="mr-2">🇪🇸</span>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="mr-2">🇫🇷</span>
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

                    {/* Notifications - Only for authenticated users */}
                    {isAuthenticated && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-slate-100 rounded-lg">
                                    <Bell className="h-4 w-4 text-slate-600" />
                                    {/* Notification badge */}
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">3</span>
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-0">
                                <div className="p-4 border-b border-slate-100">
                                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                                    <p className="text-sm text-slate-500">You have 3 unread notifications</p>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    <DropdownMenuItem className="p-4 cursor-pointer hover:bg-slate-50">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    New course available
                                                </p>
                                                <p className="text-sm text-slate-500 truncate">
                                                    Advanced React Patterns is now available
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                </div>
                                <div className="p-3 border-t border-slate-100">
                                    <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                                        View all notifications
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Authentication Section */}
                    {loading ? (
                        <div className="h-9 w-9 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                        </div>
                    ) : isAuthenticated && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-13 w-13 rounded-full p-0 hover:ring-2 hover:ring-blue-200 transition-all">
                                    <Avatar className="h-12 w-12 border-2 border-slate-200 hover:border-blue-300 transition-colors">
                                        <AvatarImage
                                            src={getAvatarSrc(user)}
                                            alt={user?.name || 'User'}
                                            className="object-cover"
                                            onError={(e) => { e.currentTarget.src = "/default-avatar.png"; }}

                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-medium">
                                            {getUserInitials(user)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Online status indicator */}
                                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-0">
                                {/* User Info Header */}
                                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                                            <AvatarImage
                                                src={getAvatarSrc(user)}
                                                alt={user?.name || 'User'}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-medium">
                                                {getUserInitials(user)}
                                            </AvatarFallback>                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900 truncate">{user?.name}</p>
                                            <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                                            {user?.role && (
                                                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1 capitalize">
                                                    {user.role}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="flex items-center px-4 py-2 cursor-pointer hover:bg-slate-50">
                                            <User className="mr-3 h-4 w-4 text-slate-500" />
                                            <span>View Profile</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    {/* <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center px-4 py-2 cursor-pointer hover:bg-slate-50">
                      <Settings className="mr-3 h-4 w-4 text-slate-500" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem> */}

                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/enrollments"
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-slate-50"
                                        >
                                            <GraduationCap className="mr-3 h-4 w-4 text-slate-500" />
                                            <span>Enrolled Courses</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/wishlists"
                                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-slate-50"
                                        >
                                            <Heart className="mr-3 h-4 w-4 text-slate-500" />
                                            <span>My Wishlist</span>
                                        </Link>
                                    </DropdownMenuItem>

                                </div>

                                <DropdownMenuSeparator />

                                {/* Logout */}
                                <div className="py-1">
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className="flex items-center px-4 py-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 hover:bg-red-50"
                                    >
                                        {loggingOut ? (
                                            <>
                                                <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                                                <span>Signing out...</span>
                                            </>
                                        ) : (
                                            <>
                                                <LogOut className="mr-3 h-4 w-4" />
                                                <span>Sign out</span>
                                            </>
                                        )}
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" asChild className="text-slate-600 hover:text-blue-600 font-medium">
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                                asChild
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile menu toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden h-9 w-9 p-0 hover:bg-slate-100"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {mobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-5 w-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-5 w-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white border-t border-slate-200 shadow-lg"
                    >
                        <nav className="flex flex-col p-4 space-y-1">
                            {/* Navigation Items */}
                            {routes.map((route, index) => (
                                <motion.div
                                    key={route.path}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={route.path}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${pathname === route.path
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                        onClick={closeMobileMenu}
                                    >
                                        {route.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Search in mobile */}
                            {/* <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: routes.length * 0.1 }}
                            >
                                <button className="flex items-center space-x-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                    <Search size={20} />
                                    <span>Search</span>
                                </button>
                            </motion.div> */}

                            {/* Mobile Auth Section */}
                            {isAuthenticated && user ? (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: (routes.length + 1) * 0.1 }}
                                    className="pt-4 border-t border-slate-200 space-y-3"
                                >
                                    {/* User Profile Card */}
                                    {/* <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg">
                                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                            <AvatarImage
                                                src={getAvatarSrc(user)}
                                                alt={user?.name || 'User'}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-medium">
                                                {getUserInitials(user)}
                                            </AvatarFallback>                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-slate-900 truncate text-sm">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            {user.role && (
                                                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 mt-1 capitalize">
                                                    {user.role}
                                                </span>
                                            )}
                                        </div>
                                    </div> */}

                                    {/* Profile Actions */}
                                    {/* <Link
                                        href="/profile"
                                        className="flex items-center space-x-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        <User size={20} />
                                        <span>View Profile</span>
                                    </Link> */}

                                    {/* <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </Link> */}

                                    <button
                                        onClick={handleLogout}
                                        disabled={loggingOut}
                                        className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {loggingOut ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <LogOut size={20} />
                                        )}
                                        <span>{loggingOut ? "Signing out..." : "Sign out"}</span>
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: (routes.length + 1) * 0.1 }}
                                    className="pt-4 border-t border-slate-200 space-y-3"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                        asChild
                                        onClick={closeMobileMenu}
                                    >
                                        <Link href="/login">
                                            <User className="mr-2 h-4 w-4" />
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button
                                        className="w-full justify-start bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                                        asChild
                                        onClick={closeMobileMenu}
                                    >
                                        <Link href="/register">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Get Started
                                        </Link>
                                    </Button>
                                </motion.div>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
});

Header.displayName = "Header";

export default Header;