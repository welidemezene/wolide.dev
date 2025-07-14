// Email service utilities for contact form handling

// Option 1: Using FormSubmit.co (free service)
export const submitToFormSubmit = async (formData) => {
    try {
        const response = await fetch('https://formsubmit.co/woldemedihnmezene@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                _subject: `Portfolio Contact: ${formData.subject}`,
                _captcha: false, // Disable captcha for better UX
                _template: 'table' // Use table template for better formatting
            })
        });

        if (response.ok) {
            return { success: true, message: 'Email sent successfully!' };
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('FormSubmit error:', error);
        throw error;
    }
};

// Option 2: Using Web3Forms (alternative free service)
export const submitToWeb3Forms = async (formData) => {
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_key: 'YOUR_WEB3FORMS_KEY', // You'll need to get this from web3forms.com
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                from_name: formData.name,
                replyto: formData.email
            })
        });

        const result = await response.json();

        if (result.success) {
            return { success: true, message: 'Email sent successfully!' };
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Web3Forms error:', error);
        throw error;
    }
};

// Option 3: Mailto fallback (works without external services)
export const createMailtoLink = (formData) => {
    const emailContent = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from: ${window.location.href}
Date: ${new Date().toLocaleString()}
  `.trim();

    const mailtoLink = `mailto:woldemedihnmezene@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${formData.subject}`)}&body=${encodeURIComponent(emailContent)}`;

    return mailtoLink;
};

// Main email submission function with fallback
export const submitContactForm = async (formData) => {
    try {
        // Try FormSubmit first
        return await submitToFormSubmit(formData);
    } catch (error) {
        console.log('FormSubmit failed, using mailto fallback');

        // Fallback to mailto
        const mailtoLink = createMailtoLink(formData);
        window.open(mailtoLink, '_blank');

        return {
            success: true,
            message: 'Email client opened. Please send the email manually.',
            fallback: true
        };
    }
};

// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Form validation
export const validateContactForm = (formData) => {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
        errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}; 