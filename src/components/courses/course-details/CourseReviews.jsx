"use client";

import { useState, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseEnrollment, useEnrollCourse } from "@/hooks/useCourseEnrollment";
import {
    useCourseReviews,
    useAddReview,
    useUpdateReview,
    useDeleteReview,
} from "@/hooks/useCourseReviews";
import { Button } from "@/components/styles/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/styles/ui/card";
import { Textarea } from "@/components/styles/ui/textarea";
import { Label } from "@/components/styles/ui/label";
import { toast } from "react-hot-toast";
import { Star, Loader2, Edit, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/styles/ui/dialog";

/* ⭐ Utility to generate avatar bg */
const avatarColors = ["bg-blue-light text-blue-primary", "bg-green-100 text-green-700", "bg-pink-100 text-pink-700", "bg-yellow-100 text-yellow-700"];
const getAvatarStyle = (name = "U") => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
};

/* ========== Star Rating ========== */
const StarRating = ({ rating, onRatingChange, editable = false, size = 20 }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => editable && onRatingChange(star)}
                className={`${editable ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
                disabled={!editable}
            >
                <Star
                    size={size}
                    className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"}
                />
            </button>
        ))}
    </div>
);

/* ========== Review Form ========== */
const ReviewForm = ({ onSubmit, isSubmitting, onCancel, initialData }) => {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [title, setTitle] = useState(initialData?.title || "");
    const [comment, setComment] = useState(initialData?.comment || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return toast.error("Please select a rating");
        if (!title.trim()) return toast.error("Please add a title for your review");

        onSubmit({ rating, title: title.trim(), comment: comment.trim() });

        if (!initialData) {
            setRating(0);
            setTitle("");
            setComment("");
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                    {initialData ? "✏️ Edit Your Review" : "📝 Write a Review"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Your Rating *</Label>
                        <StarRating rating={rating} onRatingChange={setRating} editable />
                    </div>

                    <div>
                        <Label>Review Title *</Label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add a title for your review..."
                            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-primary"
                            required
                            maxLength={100}
                        />
                    </div>

                    <div>
                        <Label>Your Review *</Label>
                        <Textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your detailed experience..."
                            rows={4}
                            required
                            className="mt-1 rounded-lg"
                            maxLength={1000}
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" disabled={isSubmitting || !title.trim() || rating === 0}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {initialData ? "Updating..." : "Submitting..."}
                                </>
                            ) : initialData ? "Update Review" : "Submit Review"}
                        </Button>
                        {onCancel && (
                            <Button type="button" variant="outline" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

/* ========== Single Review Item ========== */
const ReviewItem = ({ review, onEdit, onDelete, isOwner }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const avatarStyle = getAvatarStyle(review.user?.name || "U");

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            await onDelete(review.id);
            toast.success("Review deleted successfully");
        } catch {
            toast.error("Failed to delete review");
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    return (
        <>
            <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            {review.user?.avatar ? (
                                <img
                                    src={review.user.avatar}
                                    alt={review.user?.name || "User"}
                                    className="w-13 h-13 rounded-full object-cover border"
                                />
                            ) : (
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${avatarStyle}`}
                                >
                                    {(review.user?.name || "U")[0]}
                                </div>
                            )}

                            <div>
                                <p className="font-medium text-foreground">{review.user?.name || "Anonymous"}</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <StarRating rating={review.rating} />
                    </div>

                    {review.title && (
                        <h4 className="font-semibold text-lg mb-1 text-foreground">{review.title}</h4>
                    )}
                    <p className="text-foreground/80 mb-4">{review.comment}</p>

                    {isOwner && (
                        <div className="flex gap-2 pt-3 border-t border-border">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(review)}
                                disabled={isDeleting}
                            >
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => setShowConfirm(true)}
                                disabled={isDeleting}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Review</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this review? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirm(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteConfirm} disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

/* ========== Main Component ========== */
export default function CourseReviews({ course }) {
    const [page] = useState(1);
    const [editingReview, setEditingReview] = useState(null);

    const { user, isAuthenticated } = useAuthStore();
    const { isEnrolled, hasCompleted, isLoading, refetch } = useCourseEnrollment(course.id);
    const enrollMutation = useEnrollCourse(course.id);

    const { data: reviewsData, isLoading: reviewsLoading, error } = useCourseReviews(course.id, page);
    const addReviewMutation = useAddReview();
    const updateReviewMutation = useUpdateReview();
    const deleteReviewMutation = useDeleteReview();

    const userReview = reviewsData?.data?.find((r) => r.user_id === user?.id);

    const normalReviews = reviewsData?.data || [];
    const featuredReviews = course?.featured_reviews || [];

    /* Derived rating info */
    const ratings = [...featuredReviews, ...normalReviews];
    const averageRating = useMemo(() => {
        if (!ratings.length) return 0;
        return (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1);
    }, [ratings]);

    /* Handlers */
    const handleEnroll = () => {
        enrollMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Enrolled successfully!");
                refetch();
            },
            onError: () => toast.error("Failed to enroll"),
        });
    };

    const handleAddReview = (data) => {
        addReviewMutation.mutate({ courseId: course.id, data }, {
            onSuccess: () => toast.success("Review added successfully!"),
            onError: () => toast.error("Failed to add review"),
        });
    };

    const handleUpdateReview = (data) => {
        const toastId = toast.loading("Updating review...");
        updateReviewMutation.mutate(
            { reviewId: editingReview.id, data },
            {
                onSuccess: () => {
                    toast.success("Review updated successfully!", { id: toastId });
                    setEditingReview(null);
                },
                onError: () => toast.error("Failed to update review", { id: toastId }),
            }
        );
    };

    const handleDeleteReview = (id) => deleteReviewMutation.mutateAsync(id);

    if (error) return <p className="text-center text-destructive">Error loading reviews</p>;

    return (
        <section className="mt-12">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">Reviews & Ratings</h2>
                {ratings.length > 0 && (
                    <div className="flex items-center gap-2 text-lg font-semibold text-yellow-600">
                        <Star className="fill-yellow-400 text-yellow-400" size={20} />
                        {averageRating}/5
                        <span className="text-muted-foreground text-sm">({ratings.length} reviews)</span>
                    </div>
                )}
            </div>

            {/* Enrollment Section */}
            <Card className="mb-6">
                <CardContent className="pt-6 text-center">
                    {!isAuthenticated ? (
                        <p className="text-blue-primary font-medium">Please log in to enroll</p>
                    ) : isLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    ) : !isEnrolled ? (
                        <Button onClick={handleEnroll} disabled={enrollMutation.isLoading}>
                            {enrollMutation.isLoading ? "Enrolling..." : "Enroll in this Course"}
                        </Button>
                    ) : hasCompleted ? (
                        <p className="text-green-600 font-medium">🎓 You've completed this course!</p>
                    ) : (
                        <p className="text-amber-600 font-medium">✅ You're currently enrolled</p>
                    )}
                </CardContent>
            </Card>

            {/* Review Form */}
            {isAuthenticated && hasCompleted && !editingReview && !userReview && (
                <ReviewForm onSubmit={handleAddReview} isSubmitting={addReviewMutation.isLoading} />
            )}
            {editingReview && (
                <ReviewForm
                    onSubmit={handleUpdateReview}
                    isSubmitting={updateReviewMutation.isLoading}
                    onCancel={() => setEditingReview(null)}
                    initialData={editingReview}
                />
            )}

            {/* Featured Reviews */}
            {featuredReviews.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">🌟 Featured Reviews</h3>
                    <div className="space-y-4">
                        {featuredReviews.map((review) => (
                            <ReviewItem
                                key={review.id}
                                review={review}
                                onEdit={setEditingReview}
                                onDelete={handleDeleteReview}
                                isOwner={isAuthenticated && user?.id === review.user?.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Normal Reviews */}
            {/* <div className="space-y-4">
                {reviewsLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-primary" />
                ) : normalReviews.length > 0 ? (
                    normalReviews.map((review) => (
                        <ReviewItem
                            key={review.id}
                            review={review}
                            onEdit={setEditingReview}
                            onDelete={handleDeleteReview}
                            isOwner={isAuthenticated && user?.id === review.user?.id}
                        />
                    ))
                ) : (
                    <Card>
                        <CardContent className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                            <Star className="h-6 w-6 text-muted-foreground/50" />
                            No reviews yet.
                            {isAuthenticated && hasCompleted && (
                                <p className="text-sm mt-2 text-amber-600">Be the first to review!</p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div> */}
        </section>
    );
}
