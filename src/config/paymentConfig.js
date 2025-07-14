// Payment Configuration for Buy Coffee Feature
// Configured for dual currency support (USD and ETB) with separate bank accounts

export const paymentConfig = {
    // USD Bank Account (for international transfers)
    usdBank: {
        enabled: true,
        bankName: 'Your USD Bank Name', // e.g., 'Commercial Bank of Ethiopia'
        accountName: 'Your Full Name',
        accountNumber: 'Your USD Account Number',
        swiftCode: 'Your SWIFT Code', // Required for international transfers
        branchCode: 'Your Branch Code', // if available
        currency: 'USD',
        description: 'International bank transfer in USD',
        instructions: 'Transfer to USD account - please include your name as reference'
    },

    // ETB Bank Account (for local transfers)
    etbBank: {
        enabled: true,
        bankName: 'Your ETB Bank Name', // e.g., 'Commercial Bank of Ethiopia'
        accountName: 'Your Full Name',
        accountNumber: 'Your ETB Account Number',
        swiftCode: 'Your SWIFT Code', // if available
        branchCode: 'Your Branch Code', // if available
        currency: 'ETB',
        description: 'Local bank transfer in Ethiopian Birr',
        instructions: 'Transfer to local account - please include your name as reference'
    },

    // PayPal (if you have access)
    paypal: {
        enabled: false,
        buttonId: 'YOUR_PAYPAL_BUTTON_ID',
        url: 'https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID',
        description: 'Support via PayPal (USD)',
        currency: 'USD'
    },

    // Ko-fi (supports multiple currencies)
    kofi: {
        enabled: false,
        username: 'your-ko-fi-username',
        url: 'https://ko-fi.com/your-ko-fi-username',
        description: 'Support via Ko-fi (USD)',
        currency: 'USD'
    },

    // Buy Me a Coffee
    buymeacoffee: {
        enabled: false,
        username: 'your-buymeacoffee-username',
        url: 'https://www.buymeacoffee.com/your-buymeacoffee-username',
        description: 'Buy me a coffee to support my work!',
        currency: 'USD'
    },

    // Currency Settings
    currencies: {
        USD: {
            symbol: '$',
            name: 'US Dollar',
            minAmount: 1,
            maxAmount: 1000,
            defaultAmount: 5,
            coffeeAmounts: [3, 5, 10, 15, 25],
            bankAccount: 'usdBank'
        },
        ETB: {
            symbol: 'ETB',
            name: 'Ethiopian Birr',
            minAmount: 50,
            maxAmount: 10000,
            defaultAmount: 200,
            coffeeAmounts: [100, 200, 500, 1000, 2000],
            bankAccount: 'etbBank'
        }
    },

    // Default settings
    default: {
        currency: 'ETB', // Default currency
        exchangeRate: {
            USD: 55.5, // Approximate USD to ETB rate (update as needed)
            EUR: 60.2, // Approximate EUR to ETB rate (update as needed)
        }
    }
}

// Helper function to get the active payment processor
export const getActivePaymentProcessor = (currency = 'ETB') => {
    if (currency === 'USD' && paymentConfig.usdBank.enabled) return 'usdBank'
    if (currency === 'ETB' && paymentConfig.etbBank.enabled) return 'etbBank'
    if (paymentConfig.paypal.enabled) return 'paypal'
    if (paymentConfig.kofi.enabled) return 'kofi'
    if (paymentConfig.buymeacoffee.enabled) return 'buymeacoffee'
    return 'etbBank' // Default to ETB bank
}

// Helper function to get payment information
export const getPaymentInfo = (amount, currency = 'ETB', processor = null) => {
    const activeProcessor = processor || getActivePaymentProcessor(currency)

    switch (activeProcessor) {
        case 'usdBank':
            return {
                type: 'bank',
                bankName: paymentConfig.usdBank.bankName,
                accountName: paymentConfig.usdBank.accountName,
                accountNumber: paymentConfig.usdBank.accountNumber,
                swiftCode: paymentConfig.usdBank.swiftCode,
                branchCode: paymentConfig.usdBank.branchCode,
                amount: amount,
                currency: 'USD',
                instructions: paymentConfig.usdBank.instructions
            }
        case 'etbBank':
            return {
                type: 'bank',
                bankName: paymentConfig.etbBank.bankName,
                accountName: paymentConfig.etbBank.accountName,
                accountNumber: paymentConfig.etbBank.accountNumber,
                swiftCode: paymentConfig.etbBank.swiftCode,
                branchCode: paymentConfig.etbBank.branchCode,
                amount: amount,
                currency: 'ETB',
                instructions: paymentConfig.etbBank.instructions
            }
        case 'paypal':
            return {
                type: 'paypal',
                url: `${paymentConfig.paypal.url}&amount=${amount}`,
                currency: 'USD',
                amountUSD: amount
            }
        case 'kofi':
            return {
                type: 'kofi',
                url: `${paymentConfig.kofi.url}?amount=${amount * 100}`,
                currency: 'USD'
            }
        case 'buymeacoffee':
            return {
                type: 'buymeacoffee',
                url: paymentConfig.buymeacoffee.url,
                currency: 'USD'
            }
        default:
            return getPaymentInfo(amount, currency, 'etbBank')
    }
}

// Helper function to format currency
export const formatCurrency = (amount, currency = 'ETB') => {
    if (currency === 'ETB') {
        return `ETB ${amount.toLocaleString('en-ET')}`
    } else if (currency === 'USD') {
        return `$${amount.toFixed(2)}`
    }
    return `${currency} ${amount.toFixed(2)}`
}

// Helper function to convert USD to ETB
export const convertUSDToETB = (usdAmount) => {
    return usdAmount * paymentConfig.default.exchangeRate.USD
}

// Helper function to convert ETB to USD
export const convertETBToUSD = (etbAmount) => {
    return etbAmount / paymentConfig.default.exchangeRate.USD
}

export default paymentConfig 