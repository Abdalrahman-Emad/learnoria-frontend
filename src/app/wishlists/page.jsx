"use client";

import { Button } from "@/components/styles/ui/button";
import { Trash2, BookmarkMinus } from "lucide-react";
import Link from "next/link";
import CourseCard from "@/components/styles/CourseCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function MyWishlistPage() {
    const {
        wishlist,
        loading,
        removeFromWishlist,
        clearWishlist,
    } = useWishlist();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-lg text-muted-foreground">
                Loading your wishlist...
            </div>
        );
    }

    if (!loading && wishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <BookmarkMinus className="h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold text-foreground">Your wishlist is empty</h2>
                <p className="text-muted-foreground">
                    Browse courses and add them to your wishlist to see them here.
                </p>
                <Link href="/courses">
                    <Button className="mt-4">Browse Courses</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <Button
                    onClick={clearWishlist}
                    className="flex items-center gap-2"
                >
                    <Trash2 className="h-5 w-5" />
                    Clear Wishlist
                </Button>
            </div>

            {/* ✅ Wishlist Grid باستخدام CourseCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((course) => (
                    <div key={course.id} className="relative group">
                        <CourseCard course={course} />

                        {/* زرار الحذف من الـ Wishlist */}
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromWishlist(course.id)}
                            className="absolute top-52 right-3 text-red-500 hover:text-red-600 cursor-pointer scale-125 p-1"
                        >
                            <BookmarkMinus className="h-9 w-9" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
