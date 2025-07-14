import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import BackButton from '../components/BackButton'
import { getProjectById } from '../data/projects'

const ProjectDetail = () => {
    const { id } = useParams()
    const pageRef = useRef(null)
    const [showPrivatePopup, setShowPrivatePopup] = useState(false)

    // Get project data from centralized data source
    const project = getProjectById(id)

    // Redirect to projects page if project not found
    if (!project) {
        return <Navigate to="/projects" replace />
    }

    const handleGitHubClick = (e) => {
        // If it's the portfolio project and GitHub URL is '#', show private popup
        if (project.id === 'portfolio' && project.githubUrl === '#') {
            e.preventDefault()
            setShowPrivatePopup(true)
            // Hide popup after 3 seconds
            setTimeout(() => setShowPrivatePopup(false), 3000)
        }
    }

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0)

        // Page entrance animation
        gsap.fromTo(pageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        )

        // Animate content sections
        const sections = pageRef.current.querySelectorAll('.content-section')
        gsap.fromTo(sections,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.2
            }
        )
    }, [id])

    return (
        <div ref={pageRef} className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                {/* Back Button */}
                <div className="mb-8">
                    <BackButton fallbackPath="/projects" />
                </div>

                {/* Project Header */}
                <div className="content-section mb-8 sm:mb-12">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {project.title}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            {project.description}
                        </p>
                    </div>

                    {/* Project Image */}
                    <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden mb-6 sm:mb-8">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {project.featured && (
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Featured Project
                            </div>
                        )}
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Live Demo</span>
                        </a>
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleGitHubClick}
                            className="inline-flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>View Code</span>
                        </a>
                    </div>
                </div>

                {/* Project Details */}
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Description */}
                        <div className="content-section">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Project</h2>
                            <div className="bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                    {project.longDescription}
                                </p>
                            </div>
                        </div>

                        {/* Challenges & Solutions */}
                        <div className="content-section">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenges & Solutions</h2>
                            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Challenges</h3>
                                    <ul className="space-y-2">
                                        {project.challenges.map((challenge, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">{challenge}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">Solutions</h3>
                                    <ul className="space-y-2">
                                        {project.solutions.map((solution, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">{solution}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Info */}
                        <div className="content-section">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Info</h3>
                            <div className="bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl space-y-4">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Category</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{project.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Status</p>
                                    <p className="text-green-600 dark:text-green-400 font-medium">Completed</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Year</p>
                                    <p className="text-gray-900 dark:text-white font-medium">2024</p>
                                </div>
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="content-section">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
                            <div className="bg-white/50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Private Repository Popup */}
            {showPrivatePopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowPrivatePopup(false)}></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl transform transition-all duration-300 scale-100">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Private Repository</h3>
                            <p className="text-gray-600 dark:text-gray-400">This project's source code is private and not publicly accessible.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectDetail 