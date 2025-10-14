"use client"
import { Card, CardContent } from "@/components/styles/ui/card"
import { Button } from "@/components/styles/ui/button"
import { BookOpen, Users, Target, Lightbulb, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
    const values = [
        {
            icon: <BookOpen className="h-8 w-8" />,
            title: "Quality Education",
            description:
                "We aim to provide accessible, modern, and engaging education that empowers learners to grow and succeed.",
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Community Driven",
            description:
                "Our vision is to build a supportive learning community where collaboration and knowledge-sharing thrive.",
        },
        {
            icon: <Lightbulb className="h-8 w-8" />,
            title: "Innovation",
            description:
                "Using modern technology and design to deliver seamless and impactful learning experiences.",
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Global Vision",
            description:
                "Breaking geographical barriers to make education accessible for learners worldwide in the near future.",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                        >
                            A Next-Generation
                            <span className="text-blue-600"> Learning Platform</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
                        >
                            This project is currently in its early development phase. The goal is to build a modern e-learning
                            platform that showcases innovation, accessibility, and high-quality user experience.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-0 shadow-xl rounded-2xl">
                                <CardContent className="p-12 text-center">
                                    <Target className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                                    <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        To demonstrate the potential of a scalable, user-focused online education platform.
                                        While this is not yet a live product, the project highlights the vision of making
                                        education more accessible, engaging, and effective for learners everywhere.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-foreground mb-4">Core Values</h2>
                            <p className="text-lg text-muted-foreground">
                                The principles that guide the development of this platform
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="text-center rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <CardContent className="p-8">
                                            <div className="text-blue-600 mb-5 flex justify-center">{value.icon}</div>
                                            <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                                            <p className="text-muted-foreground">{value.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Looking Ahead</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            This project is currently in a beta phase and serves as a foundation for future development.
                            Features such as real user enrollments, instructor onboarding, and community engagement
                            are part of the long-term vision.
                        </p>
                    </div>
                </div>
            </section>

            {/* Current Status */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Current Status</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            The platform is fully developed and ready for use. At this stage, it is being presented as a showcase project
                            to highlight its features and potential. Official launch will follow after forming the necessary partnerships
                            and agreements with training providers and institutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                            A Platform Built for the Future of Learning
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10">
                            While the platform is already complete, we are working on establishing collaborations before the official launch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Explore the Demo
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Get In Touch
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
