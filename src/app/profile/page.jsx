// "use client"

// import { useState, useEffect } from "react"
// import { useAuthStore } from "@/store/useAuthStore"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/styles/ui/card"
// import { Button } from "@/components/styles/ui/button"
// import { Input } from "@/components/styles/ui/input"
// import { Textarea } from "@/components/styles/ui/textarea"
// import { Badge } from "@/components/styles/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/styles/ui/avatar"
// import { Skeleton } from "@/components/styles/ui/skeleton"
// import Link from "next/link"
// import {
//     Edit,
//     Save,
//     X,
//     User,
//     Mail,
//     Phone,
//     MapPin,
//     Calendar,
//     Upload,
//     Shield,
//     Globe,
//     Link as LinkIcon,
//     GraduationCap,
//     Briefcase,
//     Award,
//     BookOpen,
//     Loader2 // Added Loader2 for loading state
// } from "lucide-react"
// import { toast } from "sonner"
// import { getAvatarSrc, getUserInitials } from "@/utils/avatar"

// export default function ProfilePage() {
//     const { user, fetchProfile, updateProfile } = useAuthStore()
//     const [isEditing, setIsEditing] = useState(false)
//     const [isSaving, setIsSaving] = useState(false)
//     const [isUploading, setIsUploading] = useState(false) // Added for avatar upload loading
//     const [editData, setEditData] = useState({})
//     const [isLoading, setIsLoading] = useState(true)
//     const [activeTab, setActiveTab] = useState("personal")

//     // Fetch profile from store on mount
//     useEffect(() => {
//         const loadProfile = async () => {
//             try {
//                 await fetchProfile()
//                 toast.success("Profile loaded successfully")
//             } catch (err) {
//                 console.error("Failed to fetch profile:", err)
//                 toast.error("Failed to load profile")
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         loadProfile()
//     }, [fetchProfile])

//     useEffect(() => {
//         if (user) {
//             setEditData({ ...user }) // Create a copy to avoid reference issues
//         }
//     }, [user])

//     const handleEdit = () => setIsEditing(true)

//     const handleCancel = () => {
//         setIsEditing(false)
//         setEditData({ ...user }) // Reset to original user data
//         toast.info("Changes cancelled")
//     }

//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const payload = {
//                 name: editData.name,
//                 email: editData.email,
//                 phone: editData.phone,
//                 city: editData.city,
//                 bio: editData.bio,
//             };

//             await updateProfile(payload);
//             setIsEditing(false);
//             toast.success("Profile updated successfully");
//         } catch (err) {
//             console.error("Failed to update profile:", err);
//             if (err.errors) {
//                 Object.values(err.errors).forEach((messages) =>
//                     toast.error(messages.join(", "))
//                 );
//             } else {
//                 toast.error(err.message || "Failed to update profile");
//             }
//         } finally {
//             setIsSaving(false);
//         }
//     };



//     const handleInputChange = (field, value) => {
//         setEditData((prev) => ({ ...prev, [field]: value }))
//     }

//     // ✅ رفع الصورة (Avatar)
//     const handleAvatarUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         // Validate file type and size
//         if (!file.type.startsWith("image/")) {
//             toast.error("Please select an image file");
//             return;
//         }

//         if (file.size > 5 * 1024 * 1024) {
//             // 5MB limit
//             toast.error("Image size must be less than 5MB");
//             return;
//         }

//         setIsUploading(true);
//         toast.info("Uploading avatar...");

//         try {
//             const formData = new FormData();
//             formData.append("avatar", file);

//             // Update profile with the new avatar
//             await updateProfile(formData);

//             // Refresh the profile to get updated data including the new avatar URL
//             await fetchProfile();

//             toast.success("Avatar updated successfully");
//         } catch (error) {
//             console.error("Upload error:", error);
//             toast.error(error.message || "Failed to upload avatar");
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     const formatDate = (dateString) =>
//         dateString
//             ? new Date(dateString).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//             })
//             : "Not specified"

//     if (isLoading) {
//         return (
//             <div className="max-w-6xl mx-auto px-4 py-8">
//                 <div className="mb-8">
//                     <Skeleton className="h-9 w-48 mb-2" />
//                     <Skeleton className="h-5 w-64" />
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                     {/* Profile Card Skeleton */}
//                     <div className="lg:col-span-1">
//                         <Card className="border border-gray-200 shadow-sm">
//                             <CardContent className="pt-6">
//                                 <div className="text-center">
//                                     <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
//                                     <Skeleton className="h-6 w-40 mx-auto mb-2" />
//                                     <Skeleton className="h-5 w-20 mx-auto mb-4" />
//                                     <div className="space-y-2">
//                                         <Skeleton className="h-4 w-32 mx-auto" />
//                                         <Skeleton className="h-4 w-24 mx-auto" />
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>

//                     {/* Details Card Skeleton */}
//                     <div className="lg:col-span-3">
//                         <Card className="border border-gray-200 shadow-sm">
//                             <CardHeader>
//                                 <Skeleton className="h-6 w-48" />
//                             </CardHeader>
//                             <CardContent className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {[...Array(4)].map((_, i) => (
//                                         <div key={i}>
//                                             <Skeleton className="h-4 w-32 mb-2" />
//                                             <Skeleton className="h-10 w-full" />
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div>
//                                     <Skeleton className="h-4 w-20 mb-2" />
//                                     <Skeleton className="h-24 w-full" />
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     if (!user) {
//         return (
//             <div className="max-w-4xl mx-auto px-4 py-16 text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                     <User className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-900">Profile not found</h2>
//                 <p className="text-gray-600 mb-6">Unable to load profile information</p>
//                 <Button onClick={() => window.location.reload()}>
//                     Try Again
//                 </Button>
//             </div>
//         )
//     }

//     return (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
//                 <p className="text-gray-600">Manage your personal information and account settings</p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                 {/* Profile Sidebar */}
//                 <div className="lg:col-span-1 space-y-6">
//                     <Card className="border border-gray-200 shadow-sm overflow-hidden">
//                         <div className="h-20 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
//                         <CardContent className="pt-0">
//                             <div className="text-center -mt-12">
//                                 <div className="relative inline-block">
//                                     <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-md">
//                                         <AvatarImage
//                                             src={getAvatarSrc(editData)}
//                                             alt={editData.name || 'User'}
//                                             className="object-cover"
//                                         />
//                                         <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
//                                             {getUserInitials(editData)}
//                                         </AvatarFallback>
//                                     </Avatar>
//                                     {isEditing && (
//                                         <label
//                                             htmlFor="avatar-upload"
//                                             className={`absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
//                                                 }`}
//                                         >
//                                             {isUploading ? (
//                                                 <Loader2 className="w-4 h-4 text-gray-700 animate-spin" />
//                                             ) : (
//                                                 <Upload className="w-4 h-4 text-gray-700" />
//                                             )}
//                                             <input
//                                                 id="avatar-upload"
//                                                 type="file"
//                                                 accept="image/*"
//                                                 className="hidden"
//                                                 onChange={handleAvatarUpload}
//                                                 disabled={isUploading}
//                                             />
//                                         </label>
//                                     )}
//                                 </div>

//                                 <h2 className="text-xl font-semibold text-gray-900 mb-1">{editData.name}</h2>
//                                 <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
//                                     {editData.role}
//                                 </Badge>

//                                 <div className="space-y-2 text-sm text-gray-600">
//                                     <div className="flex items-center justify-center gap-2">
//                                         <Calendar className="w-4 h-4" />
//                                         <span>Joined {formatDate(editData.created_at)}</span>
//                                     </div>
//                                     <div className="flex items-center justify-center gap-2">
//                                         <div
//                                             className={`w-2 h-2 rounded-full ${editData.status === "active" ? "bg-green-500" : "bg-gray-400"
//                                                 }`}
//                                         />
//                                         <span className="capitalize">{editData.status || "inactive"}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Navigation Tabs */}
//                     <Card className="border border-gray-200 shadow-sm">
//                         <CardContent className="p-4">
//                             <div className="space-y-1">
//                                 <button
//                                     onClick={() => setActiveTab("personal")}
//                                     className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${activeTab === "personal" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
//                                 >
//                                     <User className="w-4 h-4" />
//                                     Personal Info
//                                 </button>
//                             </div>
//                             <div className="space-y-1">
//                                 <Link
//                                     href="/enrollments"
//                                     className="w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-50"
//                                 >
//                                     <User className="w-4 h-4" />
//                                     Enrollments
//                                 </Link>
//                             </div>

//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="lg:col-span-3">
//                     <Card className="border border-gray-200 shadow-sm">
//                         <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
//                             <div>
//                                 <CardTitle className="text-gray-900">Personal Information</CardTitle>
//                                 <CardDescription>Update your personal details and how others see you</CardDescription>
//                             </div>
//                             {!isEditing ? (
//                                 <Button
//                                     onClick={handleEdit}
//                                     variant="outline"
//                                     className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                                 >
//                                     <Edit className="w-4 h-4 mr-2" />
//                                     Edit Profile
//                                 </Button>
//                             ) : (
//                                 <div className="flex gap-2">
//                                     <Button
//                                         onClick={handleCancel}
//                                         variant="outline"
//                                         className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                                     >
//                                         <X className="w-4 h-4 mr-2" />
//                                         Cancel
//                                     </Button>
//                                     <Button
//                                         onClick={handleSave}
//                                         disabled={isSaving}
//                                         className="bg-blue-600 hover:bg-blue-700 text-white"
//                                     >
//                                         {isSaving ? (
//                                             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                                         ) : (
//                                             <Save className="w-4 h-4 mr-2" />
//                                         )}
//                                         {isSaving ? "Saving..." : "Save Changes"}
//                                     </Button>
//                                 </div>
//                             )}
//                         </CardHeader>

//                         <CardContent className="pt-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                                         <User className="w-4 h-4" />
//                                         Full Name
//                                     </label>
//                                     {isEditing ? (
//                                         <Input
//                                             value={editData.name || ""}
//                                             onChange={(e) => handleInputChange("name", e.target.value)}
//                                             className="focus:ring-blue-500 focus:border-blue-500"
//                                         />
//                                     ) : (
//                                         <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">{user.name || "Not provided"}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                                         <Mail className="w-4 h-4" />
//                                         Email Address
//                                     </label>
//                                     {isEditing ? (
//                                         <Input
//                                             type="email"
//                                             value={editData.email || ""}
//                                             onChange={(e) => handleInputChange("email", e.target.value)}
//                                             className="focus:ring-blue-500 focus:border-blue-500"
//                                         />
//                                     ) : (
//                                         <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">{user.email || "Not provided"}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                                         <Phone className="w-4 h-4" />
//                                         Phone Number
//                                     </label>
//                                     {isEditing ? (
//                                         <Input
//                                             value={editData.phone || ""}
//                                             onChange={(e) => handleInputChange("phone", e.target.value)}
//                                             className="focus:ring-blue-500 focus:border-blue-500"
//                                         />
//                                     ) : (
//                                         <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">{user.phone || "Not provided"}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                                         <MapPin className="w-4 h-4" />
//                                         Location
//                                     </label>
//                                     {isEditing ? (
//                                         <Input
//                                             value={editData.city || ""}
//                                             onChange={(e) => handleInputChange("city", e.target.value)}
//                                             className="focus:ring-blue-500 focus:border-blue-500"
//                                             placeholder="City, Country"
//                                         />
//                                     ) : (
//                                         <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">{user.city || "Not provided"}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
//                                 {isEditing ? (
//                                     <Textarea
//                                         value={editData.bio || ""}
//                                         onChange={(e) => handleInputChange("bio", e.target.value)}
//                                         rows={4}
//                                         className="focus:ring-blue-500 focus:border-blue-500"
//                                         placeholder="Tell us about yourself..."
//                                     />
//                                 ) : (
//                                     <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md leading-relaxed">
//                                         {user.bio || "No bio provided yet."}
//                                     </p>
//                                 )}
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     )
// }


"use client";

import { useProfile } from "@/hooks/useProfile";
import ProfileContent from "@/app/components/ProfileContent";
import { Button } from "@/components/styles/ui/button";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useProfile();


  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">
          Profile not found
        </h2>
        <p className="text-gray-600 mb-6">
          Unable to load profile information
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return <ProfileContent />;
}
