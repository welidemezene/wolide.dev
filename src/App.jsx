import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import BackgroundAnimation from './components/BackgroundAnimation'

import { ThemeProvider } from './context/ThemeContext'

function AppContent() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [location])

  // Add smooth scrolling behavior
  useEffect(() => {
    // Enable smooth scrolling for the entire app
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <BackgroundAnimation />
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <div className="pt-0 md:pt-24 lg:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      {/* Floating Action Buttons */}
      <div
        className="
          fixed z-[1000] flex flex-col gap-3 bottom-4 left-0 right-0 items-center w-full pointer-events-none sm:right-4 sm:left-auto sm:items-end
        "
        style={{
          maxWidth: '100vw',
        }}
      >
        {/* <div className="pointer-events-auto">
          {/* AI Assistant button or iframe 
        </div> */}
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
