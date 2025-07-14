# AI Assistant & Buy Coffee Features Setup Guide

This guide explains how to set up and customize the AI Assistant and Buy Coffee features that have been integrated into your portfolio website.

## 🚀 Features Overview

### 1. AI Assistant
- **Location**: Floating button on bottom-right of every page
- **Functionality**: Chat interface that helps visitors learn about your work
- **Features**: 
  - Predefined responses about your skills, projects, experience
  - Typing indicators and smooth animations
  - Mobile-responsive design
  - Dark/light mode support

### 2. Buy Coffee (Ethiopian Birr Support)
- **Location**: Floating button on bottom-left of every page
- **Functionality**: Support system for visitors to buy you coffee in Ethiopian Birr (ETB)
- **Features**:
  - Local bank transfer integration
  - Ethiopian Birr currency support
  - Custom amount selection (100, 200, 500, 1000, 2000 ETB)
  - Bank details display with copy-to-clipboard functionality
  - Optional message field
  - Secure local payment processing

## ⚙️ Setup Instructions

### AI Assistant Configuration

The AI Assistant is ready to use out of the box! It includes predefined responses for common questions about:

- **Skills & Technologies**: React, Three.js, GSAP, etc.
- **Projects**: Your portfolio projects
- **Contact Information**: Email, LinkedIn, GitHub, Upwork
- **Experience**: Your background and expertise
- **Hiring**: Availability for work opportunities

#### Customizing AI Responses

To customize the AI responses, edit the `predefinedResponses` object in `src/components/AIAssistant.jsx`:

```javascript
const predefinedResponses = {
    'hello': "Your custom greeting message",
    'skills': "Your custom skills description",
    'projects': "Your custom projects description",
    // ... add more responses
}
```

### Buy Coffee Configuration (Ethiopian Birr)

#### Step 1: Configure Your Bank Details

Edit `src/config/paymentConfig.js` and update your local bank information:

```javascript
localBank: {
    enabled: true,
    bankName: 'Commercial Bank of Ethiopia', // Your bank name
    accountName: 'Woldemedihn Mezene', // Your full name
    accountNumber: '1000123456789', // Your account number
    swiftCode: 'CBETETAA', // Your bank's SWIFT code (if available)
    branchCode: '001', // Your branch code (if available)
    currency: 'ETB',
    description: 'Local bank transfer in Ethiopian Birr',
    instructions: 'Transfer to local bank account - please include your name as reference'
}
```

#### Step 2: Customize Amounts (Optional)

The default amounts are set for Ethiopian Birr:
- **Minimum**: 50 ETB
- **Maximum**: 10,000 ETB
- **Default**: 200 ETB
- **Preset amounts**: 100, 200, 500, 1000, 2000 ETB

You can customize these in `src/config/paymentConfig.js`:

```javascript
default: {
    currency: 'ETB',
    minAmount: 50,
    maxAmount: 10000,
    defaultAmount: 200,
    coffeeAmounts: [100, 200, 500, 1000, 2000], // Customize these amounts
    exchangeRate: {
        USD: 55.5, // Update with current exchange rate
        EUR: 60.2, // Update with current exchange rate
    }
}
```

#### Step 3: Update Exchange Rates (Optional)

If you want to show USD equivalents, update the exchange rates in the config file. You can find current rates at:
- [XE Currency Converter](https://www.xe.com/currencyconverter/)
- [OANDA](https://www.oanda.com/currency-converter/)

## 🏦 How Local Bank Integration Works

### For Visitors:
1. Click the coffee cup button
2. Choose an amount in Ethiopian Birr
3. Add an optional message
4. Click "Buy Coffee"
5. View your bank details in a modal
6. Copy account information to clipboard
7. Complete the transfer through their bank

### For You:
1. Visitors will transfer money to your local bank account
2. They'll include their name as reference
3. You'll receive the money directly in your Ethiopian bank account
4. No international fees or currency conversion issues

## 🎨 Customization Options

### Styling

Both components use Tailwind CSS and can be easily customized:

- **Colors**: Update gradient classes (e.g., `from-blue-600 to-purple-600`)
- **Positioning**: Modify the `fixed bottom-6` classes
- **Animations**: Adjust GSAP animation parameters
- **Dark Mode**: Components automatically support dark mode

### Content

- **AI Assistant**: Update responses in the component
- **Buy Coffee**: Update text and descriptions
- **Bank Details**: Update your bank information in the config
- **Footer**: Modify the footer section that mentions these features

## 📱 Mobile Responsiveness

Both features are fully responsive and work well on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🔧 Advanced Customization

### Adding New AI Responses

To add new response categories, update the `getBotResponse` function in `AIAssistant.jsx`:

```javascript
const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('your-keyword')) {
        return predefinedResponses.yourNewResponse
    }
    // ... existing logic
}
```

### Alternative Payment Methods

If you want to add other payment methods later, you can enable them in the config:

```javascript
// PayPal (if you have access)
paypal: {
    enabled: true,
    buttonId: 'YOUR_PAYPAL_BUTTON_ID',
    url: 'https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID',
    description: 'Support via PayPal (USD)',
    currency: 'USD'
}

// Ko-fi
kofi: {
    enabled: true,
    username: 'your-ko-fi-username',
    url: 'https://ko-fi.com/your-ko-fi-username',
    description: 'Support via Ko-fi (USD)',
    currency: 'USD'
}
```

## 🚀 Deployment

The features are ready to deploy! Just make sure to:

1. ✅ Update your bank details in the configuration
2. ✅ Test the AI Assistant responses
3. ✅ Verify bank information is correct
4. ✅ Deploy to your hosting platform

## 📞 Support

If you need help with:
- Setting up bank details
- Customizing responses
- Styling modifications
- Adding other payment methods

Feel free to reach out or check the component files for detailed implementation.

## ✨ Features in Action

- **AI Assistant**: Click the chat bubble on the bottom-right
- **Buy Coffee**: Click the coffee cup on the bottom-left → Choose ETB amount → View bank details
- **Bank Integration**: Secure local transfers in Ethiopian Birr
- **Copy to Clipboard**: Easy copying of bank details
- **Footer Integration**: See the features mentioned in the footer
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: GSAP-powered animations throughout

## 💡 Tips for Success

1. **Keep exchange rates updated** if you show USD equivalents
2. **Test the bank details** with a small amount first
3. **Monitor your bank account** for incoming transfers
4. **Respond to supporters** who leave messages
5. **Update AI responses** based on common questions you receive

Enjoy your new interactive portfolio features with Ethiopian Birr support! 🎉☕ 