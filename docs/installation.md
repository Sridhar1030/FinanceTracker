# 🚀 Installation Guide

Complete step-by-step installation guide for PennyTracker development environment.

## 📋 Prerequisites

Before installing PennyTracker, ensure you have the following tools installed:

### Required Software

| Tool | Minimum Version | Recommended | Download Link |
|:---:|:---:|:---:|:---:|
| **Node.js** | v16.0.0 | v18.x LTS | [Download](https://nodejs.org/) |
| **npm** | v8.0.0 | Latest | Included with Node.js |
| **Git** | v2.20.0 | Latest | [Download](https://git-scm.com/) |

### Optional Tools

| Tool | Purpose | Download Link |
|:---:|:---:|:---:|
| **VS Code** | Recommended IDE | [Download](https://code.visualstudio.com/) |
| **Postman** | API testing | [Download](https://www.postman.com/) |
| **MongoDB Compass** | Database GUI | [Download](https://www.mongodb.com/products/compass) |

## 🔧 System Requirements

### Minimum Requirements
- **OS**: Windows 10, macOS 10.15, or Ubuntu 18.04+
- **RAM**: 4 GB
- **Storage**: 2 GB free space
- **Internet**: Required for dependencies and Firebase

### Recommended Requirements
- **OS**: Latest stable versions
- **RAM**: 8 GB or more
- **Storage**: 5 GB free space
- **Internet**: Broadband connection

## 📥 Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Sridhar1030/FinanceTracker.git

# Navigate to project directory
cd FinanceTracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd BackEnd

# Install dependencies
npm install

# Create environment file
cp .env.sample .env
```

**Edit `BackEnd/.env` with your configuration:**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_s3_bucket_name

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd FrontEnd

# Install dependencies
npm install

# Create environment file (if needed)
touch .env
```

**Edit `FrontEnd/.env` (optional):**

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 🔑 Service Configuration

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Authentication**
   - Go to Authentication → Sign-in method
   - Enable Email/Password and Google providers

3. **Setup Realtime Database**
   - Go to Realtime Database
   - Create database
   - Set security rules:

```json
{
  "rules": {
    "user": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

4. **Generate Service Account**
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Download the JSON file
   - Extract the required fields for `.env`

### AWS Setup

1. **Create AWS Account**
   - Sign up at [AWS Console](https://aws.amazon.com/)

2. **Create S3 Bucket**
   ```bash
   # Using AWS CLI (optional)
   aws s3 mb s3://your-pennytracker-bucket
   ```

3. **Create IAM User**
   - Go to IAM → Users → Add User
   - Create user with programmatic access
   - Attach policy: `AmazonS3FullAccess`
   - Save access keys for `.env`

4. **Configure CORS for S3**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["http://localhost:5173", "https://your-domain.com"],
       "ExposeHeaders": []
     }
   ]
   ```

## ✅ Verification

### 1. Test Backend

```bash
cd BackEnd
npm run dev
```

You should see:
```
Server is running on port 3000
```

Test the health endpoint:
```bash
curl http://localhost:3000/
# Should return: "Hello World"
```

### 2. Test Frontend

```bash
cd FrontEnd
npm run dev
```

You should see:
```
Local:   http://localhost:5173/
Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173`

### 3. Test Integration

1. Try logging in with demo credentials:
   - Email: `test1@gmail.com`
   - Password: `123456`

2. Verify that data loads correctly in the dashboard

## 🔧 Development Tools Setup

### VS Code Extensions

Install these recommended extensions:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Git Configuration

```bash
# Set your Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main
```

## 🚨 Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check Node.js version
node --version

# If using nvm (recommended):
nvm install 18
nvm use 18
```

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

#### Firebase Connection Issues
- Verify your `.env` file has correct Firebase credentials
- Check Firebase project settings
- Ensure Realtime Database is enabled

#### AWS S3 Issues
- Verify AWS credentials in `.env`
- Check S3 bucket permissions
- Ensure CORS is configured correctly

#### Module Not Found Errors
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

If you encounter issues:

1. Check the [troubleshooting guide](./troubleshooting.md)
2. Search [existing issues](https://github.com/Sridhar1030/FinanceTracker/issues)
3. Create a [new issue](https://github.com/Sridhar1030/FinanceTracker/issues/new) with:
   - Operating system and version
   - Node.js version
   - Error messages
   - Steps to reproduce

## 🎉 Next Steps

After successful installation:

1. Read the [Quick Start Guide](./quick-start.md)
2. Explore the [API Reference](./api-reference.md)
3. Check out the [Development Guide](./frontend-development.md)
4. Review the [Contributing Guidelines](./contributing.md)

---

**Installation Complete!** 🎊

You're now ready to start developing with PennyTracker!