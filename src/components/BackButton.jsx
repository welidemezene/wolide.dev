import { useNavigate } from 'react-router-dom'

const BackButton = ({ fallbackPath = '/', className = '' }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate(fallbackPath)
        }
    }

    return (
        <button
            onClick={handleBack}
            className={`inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 font-medium ${className}`}
            aria-label="Go back"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
        </button>
    )
}

export default BackButton 