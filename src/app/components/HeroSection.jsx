"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import { MapPin, BookOpen, Loader2, ChevronDown, Sparkles, ArrowRight, AlertCircle, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCities } from "@/hooks/useCities"
import { useFields } from "@/hooks/useFields"

const HeroSection = memo(() => {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedField, setSelectedField] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const [error, setError] = useState(null)
  const [showTooltip, setShowTooltip] = useState(false)

  const { data: cities = [], isLoading: isCitiesLoading, error: citiesError } = useCities()
  const { data: fields = [], isLoading: isFieldsLoading, error: fieldsError } = useFields()

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!selectedCity && !selectedField) {
      const timer = setTimeout(() => setShowTooltip(true), 4000)
      return () => clearTimeout(timer)
    }
    setShowTooltip(false)
  }, [selectedCity, selectedField])

  const handleSearch = useCallback(() => {
    if (!selectedCity && !selectedField) {
      setError("Please select at least one option to search")
      return
    }
    setError(null)
    setIsSearching(true)

    const params = new URLSearchParams()
    if (selectedCity) params.append("city", selectedCity)
    if (selectedField) params.append("field", selectedField)

    setTimeout(() => {
      router.push(`/courses?${params.toString()}`) // Changed from /search to /courses
    }, 300)
  }, [selectedCity, selectedField, router])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      },
    },
  }

  const apiError = citiesError || fieldsError

  return (
    <div className="-mx-4 -mt-6">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/10 to-cyan-400/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div

          // className="relative z-10 container mx-auto flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center min-h-screen"
          className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center px-6 md:px-8 pt-24 pb-16 text-center min-h-screen"

          variants={containerVariants}
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <Sparkles className="h-10 w-10 text-cyan-300" />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance"
          >
            Discover Your Perfect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300">
              Learning Journey
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed text-pretty"
          >
            Connect with top-rated courses and expert instructors. Transform your skills with personalized learning
            experiences tailored to your goals.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-5xl relative">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute -top-16 left-0 right-0 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl flex items-center justify-center shadow-lg border border-red-400/50"
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6 md:p-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-500 hover:bg-white/15">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="relative flex-1 group">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-300 z-10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <select
                    className="w-full appearance-none rounded-2xl py-5 pl-14 pr-12 text-white bg-slate-800/60 border border-cyan-400/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 cursor-pointer hover:bg-slate-800/80 backdrop-blur-sm"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={isCitiesLoading || isSearching}
                    aria-label="Select a city"
                  >
                    <option value="" disabled hidden>
                      {isCitiesLoading ? "Loading cities..." : "Choose Your City"}
                    </option>
                    {cities?.map((city) => (
                      <option key={city} value={city} className="bg-slate-800 text-white">
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 pointer-events-none">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                  {isCitiesLoading && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="h-5 w-5 text-cyan-300 animate-spin" />
                    </div>
                  )}
                  <AnimatePresence>
                    {showTooltip && !selectedCity && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-0 top-full mt-3 bg-white text-slate-800 px-4 py-2 rounded-xl text-sm shadow-xl z-20 border border-slate-200"
                      >
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-slate-200 transform rotate-45"></div>
                        Start by selecting your city
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative flex-1 group">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-300 z-10">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <select
                    className="w-full appearance-none rounded-2xl py-5 pl-14 pr-12 text-white bg-slate-800/60 border border-cyan-400/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 cursor-pointer hover:bg-slate-800/80 backdrop-blur-sm"
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    disabled={isFieldsLoading || isSearching}
                    aria-label="Select a field"
                  >
                    <option value="" disabled hidden>
                      {isFieldsLoading ? "Loading fields..." : "Choose Your Field"}
                    </option>
                    {fields?.map((field) => (
                      <option key={field} value={field} className="bg-slate-800 text-white">
                        {field}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-300 pointer-events-none">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                  {isFieldsLoading && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="h-5 w-5 text-cyan-300 animate-spin" />
                    </div>
                  )}
                </div>

                <button
                  className="flex-none flex items-center justify-center py-5 px-8 lg:px-10 rounded-2xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 focus:ring-4 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-xl hover:shadow-cyan-500/50 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  onClick={handleSearch}
                  disabled={isSearching || isCitiesLoading || isFieldsLoading}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="mr-3 h-5 w-5" />
                      <span>Find Courses</span>
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                {apiError ? (
                  <div className="text-red-300 flex items-center justify-center bg-red-500/10 rounded-lg py-2 px-4">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Unable to load options. Please refresh the page.</span>
                  </div>
                ) : (
                  <div className="text-white/60 text-sm">
                    Select your preferences to discover personalized course recommendations
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>10,000+ Active Students</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>500+ Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>50+ Course Categories</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
})

HeroSection.displayName = "HeroSection"

export default HeroSection
