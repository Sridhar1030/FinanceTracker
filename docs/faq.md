# ❓ Frequently Asked Questions

Common questions and answers about PennyTracker.

## 🚀 General Questions

### What is PennyTracker?

PennyTracker is an intelligent finance tracker that automatically monitors your spending habits through message scraping and provides insightful analytics to help you make informed financial decisions.

### Is PennyTracker free to use?

Yes! PennyTracker is open-source and free to use. You can also host it on your own infrastructure.

### What makes PennyTracker different from other finance apps?

- **Automatic transaction detection** from SMS and messages
- **Open-source** - full control over your data
- **Privacy-first** - your data stays secure
- **Modern UI** with responsive design
- **Real-time analytics** with interactive charts

## 🔐 Security & Privacy

### Is my financial data secure?

Yes! PennyTracker uses enterprise-grade security:
- All data is encrypted in transit and at rest
- Firebase Authentication for secure user management
- Your data never leaves your control
- Regular security audits and updates

### How does message scraping work?

PennyTracker analyzes transaction messages from banks and financial institutions to automatically categorize and track your expenses. The processing happens locally and securely.

### Do you store my banking credentials?

No! PennyTracker never stores banking credentials or passwords. We only process transaction notifications that you receive via SMS or email.

### Can I delete my data?

Yes, you have full control over your data. You can delete your account and all associated data at any time from the user settings.

## 🛠️ Technical Questions

### What technologies does PennyTracker use?

**Frontend:**
- React 18 with Vite
- Tailwind CSS for styling
- Redux Toolkit for state management
- Recharts for data visualization

**Backend:**
- Node.js with Express
- Firebase for authentication and database
- AWS S3 for file storage
- Redis for caching

### Can I run PennyTracker on my own server?

Yes! PennyTracker is open-source. Follow our [Installation Guide](./installation.md) to set up your own instance.

### What are the system requirements?

**Minimum:**
- Node.js v16+
- 4GB RAM
- 2GB storage

**Recommended:**
- Node.js v18+
- 8GB RAM
- 5GB storage

### Does PennyTracker work on mobile?

Yes! PennyTracker has a responsive design that works perfectly on mobile browsers. We're also planning a native mobile app.

## 💰 Features & Usage

### How do I add transactions manually?

1. Go to the "Add Transaction" page
2. Fill in the amount, category, and description
3. Select the transaction type (Debit/Credit)
4. Click "Save Transaction"

### Can I set spending limits?

Yes! Go to the Budget section to:
- Set monthly limits for different categories
- Get notifications when approaching limits
- Track your progress throughout the month

### How do I export my data?

You can export your transaction data in multiple formats:
- PDF reports with charts and summaries
- Excel/CSV files for further analysis
- JSON format for developers

### What categories are available?

Default categories include:
- 🍕 Food & Dining
- 🚗 Transportation
- 🎬 Entertainment
- 🛒 Shopping
- 🏠 Bills & Utilities
- 💼 Business
- 🏥 Healthcare
- 🎓 Education

You can also create custom categories.

### How accurate is the automatic categorization?

Our machine learning algorithm achieves 85-90% accuracy. You can always manually correct categorizations, and the system learns from your corrections.

## 🔧 Troubleshooting

### I can't log in. What should I do?

1. **Check your internet connection**
2. **Verify your credentials** - ensure email and password are correct
3. **Clear browser cache** and try again
4. **Check if you're using the correct login method** (email/Google)
5. **Reset your password** if needed

If the problem persists, [contact support](https://github.com/Sridhar1030/FinanceTracker/issues).

### My transactions aren't showing up

**Possible causes:**
- **Sync delay** - wait a few minutes and refresh
- **Date filters** - check if you're viewing the correct month/year
- **Category filters** - ensure no filters are hiding transactions
- **Permission issues** - check if message access is enabled

### The app is running slowly

**Try these solutions:**
1. **Clear browser cache** and reload
2. **Close other tabs** to free up memory
3. **Check your internet connection**
4. **Update your browser** to the latest version
5. **Restart the application**

### I'm getting error messages

**Common errors and solutions:**

| Error | Solution |
|:---:|:---|
| "Network Error" | Check internet connection, try again |
| "Authentication Failed" | Log out and log back in |
| "Data Not Found" | Ensure you're viewing the correct date range |
| "Permission Denied" | Check your account permissions |

### Charts aren't displaying correctly

1. **Refresh the page**
2. **Check if you have data** for the selected period
3. **Try a different browser**
4. **Disable browser extensions** that might interfere
5. **Update your browser**

## 🚀 Development Questions

### How can I contribute to PennyTracker?

We welcome contributions! Check our [Contributing Guide](./contributing.md) for details on:
- Setting up the development environment
- Code style guidelines
- Submitting pull requests
- Reporting bugs

### How do I report a bug?

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with detailed information:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, version)

### Can I request new features?

Absolutely! We love feature requests. Please:
1. **Search existing requests** first
2. **Open a feature request issue**
3. **Describe the problem** and proposed solution
4. **Engage in discussion** with the community

### How often is PennyTracker updated?

- **Bug fixes**: Released as needed
- **Minor features**: Monthly releases
- **Major features**: Quarterly releases
- **Security updates**: Immediate

## 📱 Mobile & Browser Support

### Which browsers are supported?

**Fully Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Limited Support:**
- Internet Explorer (not recommended)
- Older browser versions

### Is there a mobile app?

Currently, PennyTracker is a web application optimized for mobile browsers. A native mobile app is in our roadmap for 2024.

### Can I use PennyTracker offline?

Basic viewing functionality works offline thanks to service workers. However, data synchronization requires an internet connection.

## 💳 Payment & Billing

### Is PennyTracker really free?

Yes! The core application is completely free and open-source. 

### Are there any premium features?

Currently, all features are free. We're considering optional premium features in the future, but the core functionality will always remain free.

### How do you sustain the project?

PennyTracker is maintained by passionate developers and the open-source community. We accept donations and contributions to keep the project running.

## 🔄 Data Migration

### Can I import data from other finance apps?

We support importing from:
- CSV files (custom format)
- Excel spreadsheets
- Bank statement PDFs (manual process)

Check our [Import Guide](./data-import.md) for detailed instructions.

### How do I backup my data?

Your data is automatically backed up in Firebase. You can also:
- Export regular data backups
- Use Firebase's built-in backup features
- Set up automated exports

### What happens if I want to switch to another app?

You can export all your data in standard formats (CSV, JSON) to import into other applications. We believe in data portability and don't lock you in.

## 🆘 Still Need Help?

If your question isn't answered here:

1. **Search the documentation** in the `/docs` folder
2. **Check GitHub issues** for similar questions
3. **Join the discussion** in GitHub Discussions
4. **Create a new issue** with the "question" label

### Contact Options

| Type | Method | Response Time |
|:---:|:---:|:---:|
| **Bug Reports** | GitHub Issues | 2-3 business days |
| **Feature Requests** | GitHub Issues | 1 week |
| **General Questions** | GitHub Discussions | 3-5 business days |
| **Security Issues** | Private email | 24 hours |

---

**Last Updated**: December 2024  
**Don't see your question?** [Ask us!](https://github.com/Sridhar1030/FinanceTracker/issues/new)