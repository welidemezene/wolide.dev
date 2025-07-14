import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackButton from '../components/BackButton'
import { projects } from '../data/projects'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const pageRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    const categories = [
        { id: 'all', name: 'All Projects' },
        { id: '3d', name: '3D & WebGL' },
        { id: 'web', name: 'Web Development' },
        { id: 'animation', name: 'Animations' },
        { id: 'game', name: 'Games' }
    ]

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    useEffect(() => {
        // Page entrance animation
        gsap.fromTo(pageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        )

        // Animate project cards with ScrollTrigger
        const cards = pageRef.current.querySelectorAll('.project-card')
        gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: pageRef.current.querySelector('.projects-grid'),
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [filteredProjects])

    const handleLiveDemoClick = (url, projectTitle) => {
        if (url === '#') {
            alert(`Live demo for ${projectTitle} is coming soon!`)
        } else {
            window.open(url, '_blank', 'noopener,noreferrer')
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
                        My <span className="text-blue-500">Projects</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A collection of my work showcasing 3D web experiences, interactive animations,
                        and modern web applications. Each project represents different aspects of my skills.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="project-card group">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500">
                                    {/* Project Image */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                            style={{ imageRendering: 'crisp-edges' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Live Demo Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <button
                                                onClick={() => handleLiveDemoClick(project.liveUrl, project.title)}
                                                className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
                                            >
                                                <span className="relative z-10 flex items-center space-x-2">
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    <span className="text-sm sm:text-base">Live Demo</span>
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex space-x-2 sm:space-x-3">
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-center group/btn text-sm sm:text-base"
                                            >
                                                <span className="group-hover/btn:text-blue-500 transition-colors duration-300">
                                                    View Details
                                                </span>
                                            </Link>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 sm:px-4 py-2 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-center group/btn text-sm sm:text-base"
                                            >
                                                <span className="group-hover/btn:text-blue-500 dark:group-hover/btn:text-blue-600 transition-colors duration-300">
                                                    GitHub
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No projects found matching your criteria.
                        </div>
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setSelectedCategory('all')
                            }}
                            className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-300"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects 