import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { getPaymentInfo, paymentConfig, formatCurrency } from '../config/paymentConfig'

const BuyCoffee = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState('ETB')
    const [selectedAmount, setSelectedAmount] = useState(paymentConfig.currencies.ETB.defaultAmount)
    const [customAmount, setCustomAmount] = useState('')
    const [message, setMessage] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [showBankDetails, setShowBankDetails] = useState(false)
    const [errors, setErrors] = useState({})
    const [attemptCount, setAttemptCount] = useState(0)
    const [lastAttemptTime, setLastAttemptTime] = useState(0)
    const modalRef = useRef(null)
    const contentRef = useRef(null)
    const coffeeWindowRef = useRef(null)

    const currentCurrencyConfig = paymentConfig.currencies[selectedCurrency]
    const coffeeAmounts = currentCurrencyConfig.coffeeAmounts

    // Security: Rate limiting (max 5 attempts per minute)
    const RATE_LIMIT_ATTEMPTS = 5
    const RATE_LIMIT_WINDOW = 60000 // 1 minute in milliseconds

    useEffect(() => {
        if (isOpen && modalRef.current) {
            gsap.fromTo(modalRef.current,
                {
                    opacity: 0,
                    scale: 0.9,
                    x: 50
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                }
            )
        }
    }, [isOpen])

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && coffeeWindowRef.current && !coffeeWindowRef.current.contains(event.target)) {
                // Check if click is not on the floating button
                const floatingButton = event.target.closest('button[aria-label="Buy Wolde a Coffee"]')
                if (!floatingButton) {
                    handleClose()
                }
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Security: Input validation
    const validateInput = () => {
        const newErrors = {}
        const amount = getFinalAmount()

        // Check if rate limited
        const now = Date.now()
        if (now - lastAttemptTime < RATE_LIMIT_WINDOW && attemptCount >= RATE_LIMIT_ATTEMPTS) {
            newErrors.rateLimit = `Too many attempts. Please wait ${Math.ceil((RATE_LIMIT_WINDOW - (now - lastAttemptTime)) / 1000)} seconds.`
            return newErrors
        }

        // Validate amount
        if (!amount || amount <= 0) {
            newErrors.amount = 'Please enter a valid amount.'
        } else if (amount < currentCurrencyConfig.minAmount) {
            newErrors.amount = `Minimum amount is ${formatCurrency(currentCurrencyConfig.minAmount, selectedCurrency)}.`
        } else if (amount > currentCurrencyConfig.maxAmount) {
            newErrors.amount = `Maximum amount is ${formatCurrency(currentCurrencyConfig.maxAmount, selectedCurrency)}.`
        }

        // Validate custom amount format
        if (customAmount && !/^\d+(\.\d{0,2})?$/.test(customAmount)) {
            newErrors.customAmount = 'Please enter a valid amount (e.g., 10.50).'
        }

        // Validate message length
        if (message.length > 500) {
            newErrors.message = 'Message must be less than 500 characters.'
        }

        setErrors(newErrors)
        return newErrors
    }

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency)
        setSelectedAmount(paymentConfig.currencies[currency].defaultAmount)
        setCustomAmount('')
        setErrors({})
    }

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount)
        setCustomAmount('')
        setErrors({})
    }

    const handleCustomAmountChange = (e) => {
        const value = e.target.value
        // Security: Only allow valid numeric input
        if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
            setCustomAmount(value)
            if (value !== '') {
                const numValue = parseFloat(value)
                if (numValue > 0) {
                    setSelectedAmount(numValue)
                }
            }
        }
        setErrors({})
    }

    const handleMessageChange = (e) => {
        const value = e.target.value
        // Security: Sanitize input
        const sanitizedValue = value.replace(/[<>]/g, '')
        setMessage(sanitizedValue)
        setErrors({})
    }

    const getFinalAmount = () => {
        return customAmount ? parseFloat(customAmount) : selectedAmount
    }

    const handleBuyCoffee = async () => {
        // Security: Validate input first
        const validationErrors = validateInput()
        if (Object.keys(validationErrors).length > 0) {
            return
        }

        const amount = getFinalAmount()

        // Security: Rate limiting
        const now = Date.now()
        if (now - lastAttemptTime < RATE_LIMIT_WINDOW) {
            setAttemptCount(prev => prev + 1)
        } else {
            setAttemptCount(1)
            setLastAttemptTime(now)
        }

        setIsProcessing(true)

        try {
            // Security: Simulate secure processing with timeout
            await new Promise((resolve) => {
                setTimeout(resolve, 1500)
            })

            const paymentInfo = getPaymentInfo(amount, selectedCurrency)

            if (paymentInfo.type === 'bank') {
                setShowBankDetails(true)
            } else {
                // Security: Open external links safely
                const newWindow = window.open(paymentInfo.url, '_blank', 'noopener,noreferrer')
                if (!newWindow) {
                    alert('Please allow popups to proceed with payment.')
                }
            }
        } catch (error) {
            console.error('Payment processing error:', error)
            setErrors({ general: 'An error occurred. Please try again.' })
        } finally {
            setIsProcessing(false)
            setIsOpen(false)
        }
    }

    const handleClose = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                opacity: 0,
                scale: 0.9,
                x: 50,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    setIsOpen(false)
                    setShowBankDetails(false)
                    setErrors({})
                    setMessage('')
                }
            })
        } else {
            setIsOpen(false)
            setShowBankDetails(false)
            setErrors({})
            setMessage('')
        }
    }

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            // Show success message
            const notification = document.createElement('div')
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50'
            notification.textContent = 'Copied to clipboard!'
            document.body.appendChild(notification)
            setTimeout(() => document.body.removeChild(notification), 2000)
        } catch (error) {
            console.error('Failed to copy:', error)
            alert('Failed to copy to clipboard. Please copy manually.')
        }
    }

    const BankDetailsModal = () => {
        const paymentInfo = getPaymentInfo(getFinalAmount(), selectedCurrency)

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={handleClose}
                ></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Bank Transfer Details
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Transfer {formatCurrency(paymentInfo.amount, paymentInfo.currency)} to the account below
                        </p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bank Name:</span>
                                <button
                                    onClick={() => copyToClipboard(paymentInfo.bankName)}
                                    className="text-blue-500 hover:text-blue-600 text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-gray-900 dark:text-white font-semibold">{paymentInfo.bankName}</p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Name:</span>
                                <button
                                    onClick={() => copyToClipboard(paymentInfo.accountName)}
                                    className="text-blue-500 hover:text-blue-600 text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-gray-900 dark:text-white font-semibold">{paymentInfo.accountName}</p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Number:</span>
                                <button
                                    onClick={() => copyToClipboard(paymentInfo.accountNumber)}
                                    className="text-blue-500 hover:text-blue-600 text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-gray-900 dark:text-white font-semibold">{paymentInfo.accountNumber}</p>
                        </div>

                        {paymentInfo.swiftCode && (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SWIFT Code:</span>
                                    <button
                                        onClick={() => copyToClipboard(paymentInfo.swiftCode)}
                                        className="text-blue-500 hover:text-blue-600 text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <p className="text-gray-900 dark:text-white font-semibold">{paymentInfo.swiftCode}</p>
                            </div>
                        )}

                        {paymentInfo.branchCode && (
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Branch Code:</span>
                                    <button
                                        onClick={() => copyToClipboard(paymentInfo.branchCode)}
                                        className="text-blue-500 hover:text-blue-600 text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <p className="text-gray-900 dark:text-white font-semibold">{paymentInfo.branchCode}</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Important Notes:</h3>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            <li>• Please include your name as reference</li>
                            <li>• Transfer amount: {formatCurrency(paymentInfo.amount, paymentInfo.currency)}</li>
                            <li>• You'll receive confirmation via email</li>
                            <li>• Thank you for your support! ☕</li>
                        </ul>
                    </div>

                    <button
                        onClick={handleClose}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                    >
                        Got it! I'll transfer the money
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Floating Coffee Button - Positioned above AI Assistant */}
            <button
                onClick={() => setIsOpen(true)}
                className="buy-coffee-btn"
                aria-label="Buy Wolde a Coffee"
            >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21h18v-2H2v2zm6.4-6.5c.8.8 2 .8 2.8 0L17 10.3c.4-.4.4-1 0-1.4l-2.8-2.8c-.8-.8-2-.8-2.8 0L6.4 13.1c-.4.4-.4 1 0 1.4z" />
                    <path d="M12 2L9 5h6l-3-3z" />
                </svg>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ☕
                </div>
            </button>

            {/* Main Modal - Right Side Popup */}
            {isOpen && !showBankDetails && (
                <div
                    ref={modalRef}
                    className="
                        fixed inset-0 z-[1001] flex items-end justify-end p-2
                        sm:items-end sm:justify-end
                    "
                >
                    <div
                        ref={coffeeWindowRef}
                        className="
                            relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
                            w-full max-w-xs sm:max-w-md mx-2
                            max-h-[90vh] overflow-y-auto
                            p-6
                        "
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-2xl flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M2 21h18v-2H2v2zm6.4-6.5c.8.8 2 .8 2.8 0L17 10.3c.4-.4.4-1 0-1.4l-2.8-2.8c-.8-.8-2-.8-2.8 0L6.4 13.1c-.4.4-.4 1 0 1.4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Buy Wolde a Coffee</h3>
                                        <p className="text-xs opacity-90">Support his work! ☕</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-white/80 hover:text-white transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content with Scrollbar */}
                        <div
                            ref={contentRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#d1d5db #f3f4f6'
                            }}
                        >
                            {/* Error Display */}
                            {Object.keys(errors).length > 0 && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    {Object.values(errors).map((error, index) => (
                                        <p key={index} className="text-red-600 dark:text-red-400 text-sm">
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {/* Currency Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Choose your currency:
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleCurrencyChange('USD')}
                                        className={`py-4 px-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${selectedCurrency === 'USD'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-xl font-semibold">🇺🇸 USD</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">International</div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleCurrencyChange('ETB')}
                                        className={`py-4 px-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${selectedCurrency === 'ETB'
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-md'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="text-xl font-semibold">🇪🇹 ETB</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Local</div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Amount Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Choose an amount ({selectedCurrency}):
                                </label>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {coffeeAmounts.map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => handleAmountSelect(amount)}
                                            className={`py-4 px-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${selectedAmount === amount && !customAmount
                                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 shadow-md'
                                                : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md'
                                                }`}
                                        >
                                            <span className="text-lg font-semibold">{formatCurrency(amount, selectedCurrency)}</span>
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Or enter a custom amount:
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{currentCurrencyConfig.symbol}</span>
                                        <input
                                            type="text"
                                            value={customAmount}
                                            onChange={handleCustomAmountChange}
                                            placeholder="0.00"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Leave a message (optional):
                                </label>
                                <textarea
                                    value={message}
                                    onChange={handleMessageChange}
                                    placeholder="Thanks for the coffee! ☕"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all duration-200"
                                    rows="3"
                                    maxLength="500"
                                ></textarea>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {message.length}/500 characters
                                </p>
                            </div>

                            {/* Total */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {formatCurrency(getFinalAmount(), selectedCurrency)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleClose}
                                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBuyCoffee}
                                    disabled={!getFinalAmount() || getFinalAmount() <= 0 || isProcessing || Object.keys(errors).length > 0}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Buy Coffee</span>
                                            <span>☕</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bank Details Modal */}
            {showBankDetails && <BankDetailsModal />}
            <style>{`
  .buy-coffee-btn {
    position: fixed;
    bottom: 1rem;
    right: 5.5rem;
    z-index: 50;
    background: linear-gradient(90deg, #f59e42 0%, #fbbf24 100%);
    color: white;
    padding: 1rem;
    border-radius: 9999px;
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 640px) {
    .buy-coffee-btn {
      left: 50%;
      right: auto;
      transform: translateX(10%);
      bottom: 1rem;
    }
  }
`}</style>
        </>
    )
}

export default BuyCoffee 