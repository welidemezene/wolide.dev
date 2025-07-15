import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import BackButton from '../components/BackButton'
import { submitContactForm, validateContactForm } from '../utils/emailService'

const Contact = () => {
    const pageRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [formErrors, setFormErrors] = useState({})

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/welidemezene',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/welidemedhinmezene/',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@welideTech',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        },
        {
            name: 'Upwork',
            url: 'https://www.upwork.com/freelancers/~013cb970d785aad5d1',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 641 512">
                    <path d="M494.7 295.6c-50.3 0-83.5-38.9-92.8-53.9c11.9-95.3 46.8-125.4 92.8-125.4c45.5 0 80.9 36.4 80.9 89.7s-35.4 89.7-80.9 89.7zm0-237.8c-81.9 0-127.8 53.4-141 108.4c-14.9-28-25.9-65.5-34.5-100.3H206v141c0 51.1-23.3 89-68.8 89s-71.6-37.8-71.6-89l.5-141H.8v141c0 41.1 13.3 78.4 37.6 105.1c25 27.5 59.2 41.8 98.8 41.8c78.8 0 133.8-60.4 133.8-146.9V112.1c8.2 31.2 27.8 91.1 65.3 143.6l-35 199.4h66.4l23.1-141.3c7.6 6.3 15.7 12 24.2 17c22.2 14 47.7 21.9 73.9 22.8c0 0 4 .2 6.1 .2c81.2 0 145.9-62.9 145.9-147.8s-64.8-148.1-146-148.1z" />
                </svg>
            )
        }
    ]

    useEffect(() => {
        // Page entrance animation
        gsap.fromTo(pageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        )

        // Animate form elements
        const formElements = pageRef.current.querySelectorAll('.form-element')
        gsap.fromTo(formElements,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1
            }
        )
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)
        setFormErrors({})

        // Validate form
        const validation = validateContactForm(formData)
        if (!validation.isValid) {
            setFormErrors(validation.errors)
            setIsSubmitting(false)
            return
        }

        try {
            const result = await submitContactForm(formData)

            if (result.success) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', subject: '', message: '' })

                // Show appropriate message based on fallback
                if (result.fallback) {
                    setSubmitStatus('fallback')
                }
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
            console.error('Form submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Back Button */}
                <div className="mb-8">
                    <BackButton />
                </div>

                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                        Get In <span className="text-blue-500">Touch</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        I'm always interested in hearing about new opportunities and exciting projects.
                        Feel free to reach out if you'd like to collaborate or just want to say hello!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Contact Form */}
                    <div className="space-y-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send me a message</h3>

                        {/* Success/Error Messages */}
                        {submitStatus === 'success' && (
                            <div className="bg-green-500/20 border border-green-500/30 text-green-600 dark:text-green-400 p-4 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Thank you! Your message has been sent successfully. I'll get back to you soon.</span>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'fallback' && (
                            <div className="bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 p-4 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>Email client opened. Please send the email manually and I'll respond as soon as possible.</span>
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Sorry! There was an error sending your message. Please try again or contact me directly.</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-element">
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ${formErrors.name
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
                                        }`}
                                    placeholder="Your name"
                                />
                                {formErrors.name && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                                )}
                            </div>

                            <div className="form-element">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ${formErrors.email
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
                                        }`}
                                    placeholder="your.email@example.com"
                                />
                                {formErrors.email && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                                )}
                            </div>

                            <div className="form-element">
                                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ${formErrors.subject
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
                                        }`}
                                    placeholder="What's this about?"
                                />
                                {formErrors.subject && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>
                                )}
                            </div>

                            <div className="form-element">
                                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none ${formErrors.message
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
                                        }`}
                                    placeholder="Tell me about your project..."
                                />
                                {formErrors.message && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                                )}
                            </div>

                            <div className="form-element">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6">Let's connect</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                I'm currently available for freelance work and exciting opportunities.
                                Whether you have a project in mind or just want to chat, I'd love to hear from you.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow me</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-300 hover:scale-110 ${link.name === 'GitHub' ? 'hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50' :
                                            link.name === 'LinkedIn' ? 'hover:text-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20' :
                                                link.name === 'YouTube' ? 'hover:text-red-800 hover:bg-red-50/50 dark:hover:bg-red-900/20' :
                                                    link.name === 'Upwork' ? 'hover:text-green-800 hover:bg-green-50/50 dark:hover:bg-green-900/20' :
                                                        'hover:text-blue-700 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                                            }`}
                                        aria-label={link.name}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact details</h4>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l8 6.99 8-6.99V20H4z" />
                                    </svg>
                                    <span>
                                        <a href="mailto:woldemedihnmezene@gmail.com" className="hover:text-blue-500 transition-colors duration-300 align-middle">
                                            woldemedihnmezene@gmail.com
                                        </a>
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Addis Ababa, Ethiopia</span>
                                </div>
                            </div>

                            {/* Direct Email Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => {
                                        const mailtoLink = `mailto:woldemedihnmezene@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry')}&body=${encodeURIComponent('Hello Woldemedihn,\n\nI would like to discuss a project with you.\n\nBest regards,')}`;
                                        window.location.href = mailtoLink;
                                    }}
                                    className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Send Direct Email</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact 