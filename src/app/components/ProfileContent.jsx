"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/styles/ui/card";
import { Button } from "@/components/styles/ui/button";
import { Input } from "@/components/styles/ui/input";
import { Textarea } from "@/components/styles/ui/textarea";
import { Badge } from "@/components/styles/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/styles/ui/avatar";
import {
    Edit,
    Save,
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Upload,
    Loader2,
    ClipboardList
} from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";
import { getAvatarSrc, getUserInitials } from "@/utils/avatar";


export default function ProfileContent() {
    const {
        user,
        editData,
        isEditing,
        isSaving,
        isUploading,
        activeTab,
        setActiveTab,
        handleEdit,
        handleCancel,
        handleSave,
        handleInputChange,
        handleAvatarUpload,
    } = useProfile();

    const formatDate = (dateString) =>
        dateString
            ? new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : "Not specified";

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
                <p className="text-gray-600">
                    Manage your personal information and account settings
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border border-gray-200 shadow-sm overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                        <CardContent className="pt-0">
                            <div className="text-center -mt-12">
                                <div className="relative inline-block">
                                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-md">
                                        <AvatarImage
                                            src={getAvatarSrc(editData)}
                                            alt={editData.name || "User"}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
                                            {getUserInitials(editData)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <label
                                            htmlFor="avatar-upload"
                                            className={`absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            {isUploading ? (
                                                <Loader2 className="w-4 h-4 text-gray-700 animate-spin" />
                                            ) : (
                                                <Upload className="w-4 h-4 text-gray-700" />
                                            )}
                                            <input
                                                id="avatar-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    handleAvatarUpload(e.target.files[0])
                                                }
                                                disabled={isUploading}
                                            />
                                        </label>
                                    )}
                                </div>

                                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                    {editData.name}
                                </h2>
                                <Badge
                                    variant="secondary"
                                    className="mb-4 bg-blue-100 text-blue-800 border-blue-200"
                                >
                                    {editData.role}
                                </Badge>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center justify-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined {formatDate(editData.created_at)}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${editData.status === "active"
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                                }`}
                                        />
                                        <span className="capitalize">
                                            {editData.status || "inactive"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs */}
                    <Card className="border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                            <div className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("personal")}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${activeTab === "personal"
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                    Personal Info
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <CardTitle className="text-gray-900">
                                    Personal Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal details and how others see you
                                </CardDescription>
                            </div>
                            {!isEditing ? (
                                <Button
                                    onClick={handleEdit}
                                    className="border-gray-30 hover:bg-gray-50"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleCancel}
                                        variant="outline"
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4 mr-2" />
                                        )}
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </CardHeader>

                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.name || ""}
                                            onChange={(e) =>
                                                handleInputChange("name", e.target.value)
                                            }
                                            className="focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                                            {user.name || "Not provided"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={editData.email || ""}
                                            onChange={(e) =>
                                                handleInputChange("email", e.target.value)
                                            }
                                            className="focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                                            {user.email || "Not provided"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.phone || ""}
                                            onChange={(e) =>
                                                handleInputChange("phone", e.target.value)
                                            }
                                            className="focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                                            {user.phone || "Not provided"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Location
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.city || ""}
                                            onChange={(e) =>
                                                handleInputChange("city", e.target.value)
                                            }
                                            className="focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="City, Country"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md">
                                            {user.city || "Not provided"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                {isEditing ? (
                                    <Textarea
                                        value={editData.bio || ""}
                                        onChange={(e) =>
                                            handleInputChange("bio", e.target.value)
                                        }
                                        rows={4}
                                        className="focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Tell us about yourself..."
                                    />
                                ) : (
                                    <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-md leading-relaxed">
                                        {user.bio || "No bio provided yet."}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
