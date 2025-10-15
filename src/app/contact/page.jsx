"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/styles/ui/card"
import { Button } from "@/components/styles/ui/button"
import { Input } from "@/components/styles/ui/input"
import { Textarea } from "@/components/styles/ui/textarea"
import { Label } from "@/components/styles/ui/label"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/styles/ui/accordion"
import { Send, CheckCircle, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "Simply browse our course catalog, select a course, and click 'Enroll Now'.",
    },
    {
      question: "Can I get a refund?",
      answer: "Yes, we offer a 30-day money-back guarantee on all courses.",
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes, you'll receive a certificate of completion for each course you finish.",
    },
    {
      question: "Do you provide lifetime access?",
      answer: "Yes, once you enroll in a course, you get lifetime access to its materials.",
    },
    {
      question: "Is there any support if I face issues?",
      answer: "Of course, our support team is available via email and live chat.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We’re here to help you with anything related to our courses and services.
          </p>
        </div>
      </section>

      {/* <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-12"> */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 grid lg:grid-cols-2 gap-12">

        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="bg-input border-border resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Right Side: Live Chat + FAQ */}
        <div className="space-y-8">
          {/* Live Chat */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-primary">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Live Chat Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Get instant help from our support team. Available during business hours.
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    Start Live Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ with Accordion */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h3>
              <Accordion type="multiple" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger value={`faq-${i}`}>{faq.question}</AccordionTrigger>
                    <AccordionContent value={`faq-${i}`}>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
