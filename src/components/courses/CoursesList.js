// "use client";

// import { useState, useMemo, useEffect, useCallback } from "react";
// import { useCourses } from "@/hooks/useCourses";
// import CourseCard from "@/components/styles/CourseCard";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/styles/ui/select";
// import { ArrowUpDown, Search, X, ChevronUp, Info } from "lucide-react";
// import { useSearchParams } from "next/navigation";

// export default function CoursesList() {
//   const searchParams = useSearchParams();
//   const [sortBy, setSortBy] = useState("newest");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceRange, setPriceRange] = useState("all");
//   const [fieldFilter, setFieldFilter] = useState("all");
//   const [cityFilter, setCityFilter] = useState("all");
//   const [durationFilter, setDurationFilter] = useState("all");
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [filtersFromUrl, setFiltersFromUrl] = useState(false);

//   const { data: courses = [], isLoading, isError } = useCourses();

//   // Read URL parameters on component mount
//   useEffect(() => {
//     const city = searchParams.get("city");
//     const field = searchParams.get("field");
//     const search = searchParams.get("search");
//     const price = searchParams.get("price");
//     const duration = searchParams.get("duration");
//     const sort = searchParams.get("sort");

//     if (city) setCityFilter(city);
//     if (field) setFieldFilter(field);
//     if (search) setSearchTerm(search);
//     if (price) setPriceRange(price);
//     if (duration) setDurationFilter(duration);
//     if (sort) setSortBy(sort);

//     if (city || field || search || price || duration || sort) {
//       setFiltersFromUrl(true);
//       const timer = setTimeout(() => setFiltersFromUrl(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [searchParams]);

//   // Sync URL with current filters
//   useEffect(() => {
//     const params = new URLSearchParams();

//     if (cityFilter !== "all") params.set("city", cityFilter);
//     if (fieldFilter !== "all") params.set("field", fieldFilter);
//     if (searchTerm) params.set("search", searchTerm);
//     if (priceRange !== "all") params.set("price", priceRange);
//     if (durationFilter !== "all") params.set("duration", durationFilter);
//     if (sortBy !== "newest") params.set("sort", sortBy);

//     const newUrl = `${window.location.pathname}?${params.toString()}`;
//     window.history.replaceState({}, "", newUrl);
//   }, [cityFilter, fieldFilter, searchTerm, priceRange, durationFilter, sortBy]);

//   // Show Back to Top button when scrolled down
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = useCallback(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   // Filter & Sort logic
//   const filteredAndSortedCourses = useMemo(() => {
//     let list = [...courses];

//     // Search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       list = list.filter(
//         (course) =>
//           course.title?.toLowerCase().includes(term) ||
//           course.description?.toLowerCase().includes(term) ||
//           course.provider?.name?.toLowerCase().includes(term)
//       );
//     }

//     // Price filter
//     if (priceRange !== "all") {
//       list = list.filter((course) => {
//         const price = Number(course.price) || 0;
//         switch (priceRange) {
//           case "under-1000":
//             return price < 1000;
//           case "1000-2000":
//             return price >= 1000 && price <= 2000;
//           case "2000-3000":
//             return price >= 2000 && price <= 3000;
//           case "over-3000":
//             return price > 3000;
//           default:
//             return true;
//         }
//       });
//     }

//     // Field filter
//     if (fieldFilter !== "all") {
//       list = list.filter((course) => course.field === fieldFilter);
//     }

//     // City filter
//     if (cityFilter !== "all") {
//       list = list.filter((course) => course.city === cityFilter);
//     }

//     // Duration filter
//     if (durationFilter !== "all") {
//       list = list.filter((course) => {
//         const duration = Number(course.duration) || 0;
//         switch (durationFilter) {
//           case "short":
//             return duration <= 60;
//           case "medium":
//             return duration > 60 && duration <= 120;
//           case "long":
//             return duration > 120;
//           default:
//             return true;
//         }
//       });
//     }

//     // Sort
//     switch (sortBy) {
//       case "name":
//         return list.sort((a, b) => a.title.localeCompare(b.title));
//       case "price-low":
//         return list.sort(
//           (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
//         );
//       case "price-high":
//         return list.sort(
//           (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
//         );
//       case "rating":
//         return list.sort((a, b) => {
//           const ratingA = parseFloat(a.ratings?.average_rating) || 0;
//           const ratingB = parseFloat(b.ratings?.average_rating) || 0;
//           return ratingB - ratingA; // Highest rated first
//         });
//       case "duration":
//         return list.sort(
//           (a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0)
//         );
//       case "newest":
//       default:
//         return list.sort(
//           (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
//         );
//     }
//   }, [
//     courses,
//     searchTerm,
//     priceRange,
//     fieldFilter,
//     cityFilter,
//     durationFilter,
//     sortBy,
//   ]);

//   // Unique options
//   const uniqueFields = useMemo(
//     () => [...new Set(courses.map((c) => c.field))].sort(),
//     [courses]
//   );
//   const uniqueCities = useMemo(
//     () => [...new Set(courses.map((c) => c.city))].sort(),
//     [courses]
//   );

//   const clearAllFilters = useCallback(() => {
//     setSearchTerm("");
//     setPriceRange("all");
//     setFieldFilter("all");
//     setCityFilter("all");
//     setDurationFilter("all");
//     setSortBy("newest");
//     window.history.replaceState({}, "", window.location.pathname);
//   }, []);

//   const hasActiveFilters = useMemo(() => {
//     return (
//       searchTerm ||
//       priceRange !== "all" ||
//       fieldFilter !== "all" ||
//       cityFilter !== "all" ||
//       durationFilter !== "all"
//     );
//   }, [searchTerm, priceRange, fieldFilter, cityFilter, durationFilter]);

//   // Loading Skeleton
//   const LoadingSkeleton = () => (
//     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {[...Array(8)].map((_, i) => (
//         <div key={i} className="animate-pulse bg-white rounded-2xl h-64"></div>
//       ))}
//     </div>
//   );

//   if (isLoading)
//     return (
//       <div className="min-h-screen p-12">
//         <LoadingSkeleton />
//       </div>
//     );
//   if (isError)
//     return (
//       <div className="min-h-screen flex items-center justify-center p-12 text-center text-red-600">
//         Failed to load courses. Please try again later.
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-6 py-12">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Discover Our Courses
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Explore our comprehensive collection of courses designed to help you
//             grow and succeed
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="bg-gradient-to-br from-slate-50 to-slate-300 focus:outline-blue-600 rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
//           <div className="mb-6 relative max-w-md mx-auto">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 " />
//             <input
//               type="text"
//               placeholder="Search courses, instructors, or topics..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-blue-600 focus:ring-2 focus:ring-blue-primary focus:border-transparent transition-all duration-200"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
//             {/* Price Filter */}
//             <Select value={priceRange} onValueChange={setPriceRange}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary focus:border-blue-primary hover:border-slate-400 transition-all">
//                 <Info className="h-4 w-4 text-blue-primary" />
//                 <SelectValue placeholder="Price Range" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">All Prices</SelectItem>
//                 <SelectItem value="under-1000">Under $1,000</SelectItem>
//                 <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
//                 <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
//                 <SelectItem value="over-3000">Over $3,000</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Field Filter */}
//             <Select value={fieldFilter} onValueChange={setFieldFilter}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <Search className="h-4 w-4 text-emerald-500" />
//                 <SelectValue placeholder="Field" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">All Fields</SelectItem>
//                 {uniqueFields.map((f) => (
//                   <SelectItem key={f} value={f}>
//                     {f}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* City Filter */}
//             <Select value={cityFilter} onValueChange={setCityFilter}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <Search className="h-4 w-4 text-purple-500" />
//                 <SelectValue placeholder="City" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">All Cities</SelectItem>
//                 {uniqueCities.map((c) => (
//                   <SelectItem key={c} value={c}>
//                     {c}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Duration Filter */}
//             <Select value={durationFilter} onValueChange={setDurationFilter}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <ArrowUpDown className="h-4 w-4 text-orange-500" />
//                 <SelectValue placeholder="Duration" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">Any Duration</SelectItem>
//                 <SelectItem value="short">Short (&lt;=60h)</SelectItem>
//                 <SelectItem value="medium">Medium (61-120h)</SelectItem>
//                 <SelectItem value="long">Long (&gt;120h)</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Sort Filter */}
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <ArrowUpDown className="h-4 w-4 text-pink-500" />
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="name">Name (A-Z)</SelectItem>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="rating">Highest Rated</SelectItem>
//                 <SelectItem value="duration">Duration</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {hasActiveFilters && (
//             <div className="flex justify-end mt-2">
//               <button
//                 onClick={clearAllFilters}
//                 className="flex items-center text-sm text-blue-primary hover:text-blue-primary-hover transition-colors duration-200"
//               >
//                 <X className="h-4 w-4 mr-1" />
//                 Clear All Filters
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing{" "}
//             <span className="font-semibold">
//               {filteredAndSortedCourses.length}
//             </span>{" "}
//             of <span className="font-semibold">{courses.length}</span> courses
//           </p>
//         </div>

//         {/* Courses Grid */}
//         {filteredAndSortedCourses.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Search className="h-12 w-12 text-slate-400" />
//             </div>
//             <h3 className="text-xl font-semibold mb-2">No courses found</h3>
//             <p className="text-gray-600 mb-4">
//               {searchTerm || hasActiveFilters
//                 ? "No courses match your current filters. Try adjusting your search criteria."
//                 : "No courses available at the moment."}
//             </p>
//             {hasActiveFilters && (
//               <button
//                 onClick={clearAllFilters}
//                 className="inline-flex items-center px-4 py-2 bg-blue-primary text-white rounded-lg hover:bg-blue-primary-hover transition-colors duration-200"
//               >
//                 Clear All Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredAndSortedCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="transform hover:scale-105 transition-transform duration-200"
//               >
//                 <CourseCard course={course} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Back to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 p-3 bg-blue-primary text-white rounded-full shadow-lg hover:bg-blue-primary-hover transition-colors duration-200 z-50"
//           title="Back to top"
//         >
//           <ChevronUp className="h-5 w-5" />
//         </button>
//       )}
//     </div>
//   );
// }





// "use client";

// import { useState, useMemo, useEffect, useCallback } from "react";
// import { useAllCourses } from "@/hooks/useCourses"; // استخدمنا الـ hook الجديد
// import CourseCard from "@/components/styles/CourseCard";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/styles/ui/select";
// import { ArrowUpDown, Search, X, ChevronUp, Info } from "lucide-react";
// import { useSearchParams } from "next/navigation";

// export default function CoursesList() {
//   const searchParams = useSearchParams();
//   const [sortBy, setSortBy] = useState("newest");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priceRange, setPriceRange] = useState("all");
//   const [fieldFilter, setFieldFilter] = useState("all");
//   const [cityFilter, setCityFilter] = useState("all");
//   const [durationFilter, setDurationFilter] = useState("all");
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   // جلب كل الكورسات دفعة واحدة
//   const { data: courses = [], isLoading, isError } = useAllCourses();

//   // Read URL parameters on component mount
//   useEffect(() => {
//     const city = searchParams.get("city");
//     const field = searchParams.get("field");
//     const search = searchParams.get("search");
//     const price = searchParams.get("price");
//     const duration = searchParams.get("duration");
//     const sort = searchParams.get("sort");

//     if (city) setCityFilter(city);
//     if (field) setFieldFilter(field);
//     if (search) setSearchTerm(search);
//     if (price) setPriceRange(price);
//     if (duration) setDurationFilter(duration);
//     if (sort) setSortBy(sort);
//   }, [searchParams]);

//   // Sync URL with current filters
//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (cityFilter !== "all") params.set("city", cityFilter);
//     if (fieldFilter !== "all") params.set("field", fieldFilter);
//     if (searchTerm) params.set("search", searchTerm);
//     if (priceRange !== "all") params.set("price", priceRange);
//     if (durationFilter !== "all") params.set("duration", durationFilter);
//     if (sortBy !== "newest") params.set("sort", sortBy);

//     const newUrl = `${window.location.pathname}?${params.toString()}`;
//     window.history.replaceState({}, "", newUrl);
//   }, [cityFilter, fieldFilter, searchTerm, priceRange, durationFilter, sortBy]);

//   // Show Back to Top button
//   useEffect(() => {
//     const handleScroll = () => setShowScrollTop(window.scrollY > 300);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = useCallback(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   // Filter & Sort logic
//   const filteredAndSortedCourses = useMemo(() => {
//     let list = [...courses];

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       list = list.filter(
//         (course) =>
//           course.title?.toLowerCase().includes(term) ||
//           course.description?.toLowerCase().includes(term) ||
//           course.provider?.name?.toLowerCase().includes(term)
//       );
//     }

//     if (priceRange !== "all") {
//       list = list.filter((course) => {
//         const price = Number(course.price) || 0;
//         switch (priceRange) {
//           case "under-1000": return price < 1000;
//           case "1000-2000": return price >= 1000 && price <= 2000;
//           case "2000-3000": return price >= 2000 && price <= 3000;
//           case "over-3000": return price > 3000;
//           default: return true;
//         }
//       });
//     }

//     if (fieldFilter !== "all") list = list.filter((course) => course.field === fieldFilter);
//     if (cityFilter !== "all") list = list.filter((course) => course.city === cityFilter);
//     if (durationFilter !== "all") {
//       list = list.filter((course) => {
//         const duration = Number(course.duration) || 0;
//         switch (durationFilter) {
//           case "short": return duration <= 60;
//           case "medium": return duration > 60 && duration <= 120;
//           case "long": return duration > 120;
//           default: return true;
//         }
//       });
//     }

//     switch (sortBy) {
//       case "name": return list.sort((a, b) => a.title.localeCompare(b.title));
//       case "price-low": return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
//       case "price-high": return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
//       case "rating": return list.sort((a, b) => (parseFloat(b.ratings?.average_rating) || 0) - (parseFloat(a.ratings?.average_rating) || 0));
//       case "duration": return list.sort((a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0));
//       case "newest":
//       default: return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     }
//   }, [courses, searchTerm, priceRange, fieldFilter, cityFilter, durationFilter, sortBy]);

//   const uniqueFields = useMemo(() => [...new Set(courses.map((c) => c.field))].sort(), [courses]);
//   const uniqueCities = useMemo(() => [...new Set(courses.map((c) => c.city))].sort(), [courses]);

//   const clearAllFilters = useCallback(() => {
//     setSearchTerm(""); setPriceRange("all"); setFieldFilter("all"); setCityFilter("all"); setDurationFilter("all"); setSortBy("newest");
//     window.history.replaceState({}, "", window.location.pathname);
//   }, []);

//   const hasActiveFilters = useMemo(() => {
//     return searchTerm || priceRange !== "all" || fieldFilter !== "all" || cityFilter !== "all" || durationFilter !== "all";
//   }, [searchTerm, priceRange, fieldFilter, cityFilter, durationFilter]);

//   const LoadingSkeleton = () => (
//     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {[...Array(8)].map((_, i) => (
//         <div key={i} className="animate-pulse bg-white rounded-2xl h-64"></div>
//       ))}
//     </div>
//   );

//   if (isLoading) return <div className="min-h-screen p-12"><LoadingSkeleton /></div>;
//   if (isError) return <div className="min-h-screen flex items-center justify-center p-12 text-red-600">Failed to load courses. Please try again later.</div>;

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="container mx-auto px-6 py-12">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Courses</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">Explore our comprehensive collection of courses designed to help you grow and succeed</p>
//         </div>

//         {/* Filters */}
//         <div className="bg-gradient-to-br from-slate-50 to-slate-300 rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
//           {/* Search Input */}
//           <div className="mb-6 relative max-w-md mx-auto">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 " />
//             <input type="text" placeholder="Search courses, instructors, or topics..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-blue-600 focus:ring-2 focus:ring-blue-primary focus:border-transparent transition-all duration-200" />
//           </div>

//           {/* Filters Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
//             {/* Price Filter */}
//             <Select value={priceRange} onValueChange={setPriceRange}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary focus:border-blue-primary hover:border-slate-400 transition-all">
//                 <Info className="h-4 w-4 text-blue-primary" />
//                 <SelectValue placeholder="Price Range" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">All Prices</SelectItem>
//                 <SelectItem value="under-1000">Under $1,000</SelectItem>
//                 <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
//                 <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
//                 <SelectItem value="over-3000">Over $3,000</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Field Filter */}
//             <Select value={fieldFilter} onValueChange={setFieldFilter}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <Search className="h-4 w-4 text-emerald-500" />
//                 <SelectValue placeholder="Field" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">All Fields</SelectItem>
//                 {uniqueFields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
//               </SelectContent>
//             </Select>

//             {/* City Filter */}
//             <Select value={cityFilter} onValueChange={setCityFilter}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <Search className="h-4 w-4 text-purple-500" />
//                 <SelectValue placeholder="City" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">All Cities</SelectItem>
//                 {uniqueCities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
//               </SelectContent>
//             </Select>

//             {/* Duration Filter */}
//             <Select value={durationFilter} onValueChange={setDurationFilter}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <ArrowUpDown className="h-4 w-4 text-orange-500" />
//                 <SelectValue placeholder="Duration" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="all">Any Duration</SelectItem>
//                 <SelectItem value="short">Short (&lt;=60h)</SelectItem>
//                 <SelectItem value="medium">Medium (61-120h)</SelectItem>
//                 <SelectItem value="long">Long (&gt;120h)</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Sort Filter */}
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
//                 <ArrowUpDown className="h-4 w-4 text-pink-500" />
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg border border-slate-200">
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="name">Name (A-Z)</SelectItem>
//                 <SelectItem value="price-low">Price: Low to High</SelectItem>
//                 <SelectItem value="price-high">Price: High to Low</SelectItem>
//                 <SelectItem value="rating">Highest Rated</SelectItem>
//                 <SelectItem value="duration">Duration</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {hasActiveFilters && (
//             <div className="flex justify-end mt-2">
//               <button onClick={clearAllFilters} className="flex items-center text-sm text-blue-primary hover:text-blue-primary-hover transition-colors duration-200">
//                 <X className="h-4 w-4 mr-1" /> Clear All Filters
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing <span className="font-semibold">{filteredAndSortedCourses.length}</span> of <span className="font-semibold">{courses.length}</span> courses
//           </p>
//         </div>

//         {/* Courses Grid */}
//         {filteredAndSortedCourses.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Search className="h-12 w-12 text-slate-400" />
//             </div>
//             <h3 className="text-xl font-semibold mb-2">No courses found</h3>
//             <p className="text-gray-600 mb-4">
//               {searchTerm || hasActiveFilters
//                 ? "No courses match your current filters. Try adjusting your search criteria."
//                 : "No courses available at the moment."}
//             </p>
//             {hasActiveFilters && (
//               <button onClick={clearAllFilters} className="inline-flex items-center px-4 py-2 bg-blue-primary text-white rounded-lg hover:bg-blue-primary-hover transition-colors duration-200">
//                 Clear All Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredAndSortedCourses.map((course) => (
//               <div key={course.id} className="transform hover:scale-105 transition-transform duration-200">
//                 <CourseCard course={course} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Back to Top Button */}
//       {showScrollTop && (
//         <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-blue-primary text-white rounded-full shadow-lg hover:bg-blue-primary-hover transition-colors duration-200 z-50" title="Back to top">
//           <ChevronUp className="h-5 w-5" />
//         </button>
//       )}
//     </div>
//   );
// }












"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useAllCourses } from "@/hooks/useCourses";
import CourseCard from "@/components/styles/CourseCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/styles/ui/select";
import { ArrowUpDown, Search, X, ChevronUp, Info } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CoursesList() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const { data: courses = [], isLoading, isError } = useAllCourses();

  // Read URL parameters
  useEffect(() => {
    const city = searchParams.get("city");
    const field = searchParams.get("field");
    const search = searchParams.get("search");
    const price = searchParams.get("price");
    const duration = searchParams.get("duration");
    const sort = searchParams.get("sort");

    if (city) setCityFilter(city);
    if (field) setFieldFilter(field);
    if (search) setSearchTerm(search);
    if (price) setPriceRange(price);
    if (duration) setDurationFilter(duration);
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Sync URL with current filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (cityFilter !== "all") params.set("city", cityFilter);
    if (fieldFilter !== "all") params.set("field", fieldFilter);
    if (searchTerm) params.set("search", searchTerm);
    if (priceRange !== "all") params.set("price", priceRange);
    if (durationFilter !== "all") params.set("duration", durationFilter);
    if (sortBy !== "newest") params.set("sort", sortBy);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [cityFilter, fieldFilter, searchTerm, priceRange, durationFilter, sortBy]);

  // Scroll top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filter & Sort
  const filteredAndSortedCourses = useMemo(() => {
    let list = [...courses];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (course) =>
          course.title?.toLowerCase().includes(term) ||
          course.description?.toLowerCase().includes(term) ||
          course.provider?.name?.toLowerCase().includes(term)
      );
    }

    if (priceRange !== "all") {
      list = list.filter((course) => {
        const price = Number(course.price) || 0;
        switch (priceRange) {
          case "under-1000": return price < 1000;
          case "1000-2000": return price >= 1000 && price <= 2000;
          case "2000-3000": return price >= 2000 && price <= 3000;
          case "over-3000": return price > 3000;
          default: return true;
        }
      });
    }

    if (fieldFilter !== "all") list = list.filter((course) => course.field === fieldFilter);
    if (cityFilter !== "all") list = list.filter((course) => course.city === cityFilter);
    if (durationFilter !== "all") {
      list = list.filter((course) => {
        const duration = Number(course.duration) || 0;
        switch (durationFilter) {
          case "short": return duration <= 60;
          case "medium": return duration > 60 && duration <= 120;
          case "long": return duration > 120;
          default: return true;
        }
      });
    }

    switch (sortBy) {
      case "name": return list.sort((a, b) => a.title.localeCompare(b.title));
      case "price-low": return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
      case "price-high": return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
      case "rating": return list.sort((a, b) => (parseFloat(b.ratings?.average_rating) || 0) - (parseFloat(a.ratings?.average_rating) || 0));
      case "duration": return list.sort((a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0));
      case "newest":
      default: return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }, [courses, searchTerm, priceRange, fieldFilter, cityFilter, durationFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);
  const currentCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    scrollToTop();
  };

  const uniqueFields = useMemo(() => [...new Set(courses.map((c) => c.field))].sort(), [courses]);
  const uniqueCities = useMemo(() => [...new Set(courses.map((c) => c.city))].sort(), [courses]);

  const clearAllFilters = useCallback(() => {
    setSearchTerm(""); 
    setPriceRange("all"); 
    setFieldFilter("all"); 
    setCityFilter("all"); 
    setDurationFilter("all"); 
    setSortBy("newest");
    setCurrentPage(1);
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchTerm || priceRange !== "all" || fieldFilter !== "all" || cityFilter !== "all" || durationFilter !== "all";
  }, [searchTerm, priceRange, fieldFilter, cityFilter, durationFilter]);

  const LoadingSkeleton = () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-2xl h-64"></div>
      ))}
    </div>
  );

  if (isLoading) return <div className="min-h-screen p-12"><LoadingSkeleton /></div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center p-12 text-red-600">Failed to load courses. Please try again later.</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our comprehensive collection of courses designed to help you grow and succeed</p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-300 rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
          {/* Search Input */}
          <div className="mb-6 relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 " />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-blue-600 focus:ring-2 focus:ring-blue-primary focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary focus:border-blue-primary hover:border-slate-400 transition-all">
                <Info className="h-4 w-4 text-blue-primary" />
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border border-slate-200">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-1000">Under $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                <SelectItem value="over-3000">Over $3,000</SelectItem>
              </SelectContent>
            </Select>

            {/* Field Filter */}
            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
                <Search className="h-4 w-4 text-emerald-500" />
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border border-slate-200">
                <SelectItem value="all">All Fields</SelectItem>
                {uniqueFields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
                <Search className="h-4 w-4 text-purple-500" />
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border border-slate-200">
                <SelectItem value="all">All Cities</SelectItem>
                {uniqueCities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Duration Filter */}
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
                <ArrowUpDown className="h-4 w-4 text-orange-500" />
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border border-slate-200">
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="short">Short (&lt;=60h)</SelectItem>
                <SelectItem value="medium">Medium (61-120h)</SelectItem>
                <SelectItem value="long">Long (&gt;120h)</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 shadow-sm px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-primary hover:border-slate-400 transition-all">
                <ArrowUpDown className="h-4 w-4 text-pink-500" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border border-slate-200">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end mt-2">
              <button onClick={clearAllFilters} className="flex items-center text-sm text-blue-primary hover:text-blue-primary-hover transition-colors duration-200">
                <X className="h-4 w-4 mr-1" /> Clear All Filters
              </button>
            </div>
          )}
        </div>

               {/* Results Count */}
       <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{currentCourses.length}</span> of <span className="font-semibold">{courses.length}</span> courses
         </p>
       </div>


        {/* Courses Grid */}
        {currentCourses.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || hasActiveFilters
                ? "No courses match your current filters. Try adjusting your search criteria."
                : "No courses available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
            {currentCourses.map((course) => (
              <div key={course.id} className="transform hover:scale-105 transition-transform duration-200">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => goToPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-primary text-white" : ""}`}>{i + 1}</button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-blue-primary text-white rounded-full shadow-lg hover:bg-blue-primary-hover transition-colors duration-200 z-50" title="Back to top">
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
