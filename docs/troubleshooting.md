# 🚨 Troubleshooting Guide

Solutions to common issues you might encounter while using PennyTracker.

## 🔐 Authentication Issues

### Can't Login / Authentication Failed

**Symptoms:**
- Login page shows "Authentication failed" error
- Redirected back to login after entering credentials
- "Invalid credentials" message

**Solutions:**

1. **Check your credentials**
   ```bash
   # Verify you're using the correct email and password
   # Try the demo credentials: test1@gmail.com / 123456
   ```

2. **Clear browser cache and cookies**
   ```
   Chrome: Settings → Privacy → Clear browsing data
   Firefox: Settings → Privacy → Clear Data
   Safari: Safari → Clear History
   ```

3. **Try incognito/private mode**
   - Test if the issue persists in a private browsing session

4. **Check Firebase configuration**
   ```javascript
   // Verify environment variables in .env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

5. **Reset password**
   - Use the "Forgot Password" link on the login page

### Firebase Connection Issues

**Symptoms:**
- "Firebase: Error (auth/network-request-failed)" message
- Unable to connect to authentication service

**Solutions:**

1. **Check internet connection**
   ```bash
   # Test connectivity
   ping google.com
   ping firebase.google.com
   ```

2. **Verify Firebase project settings**
   - Ensure Firebase project is active
   - Check authentication providers are enabled
   - Verify domain is whitelisted in Firebase console

3. **Check firewall/proxy settings**
   - Ensure Firebase domains aren't blocked
   - Whitelist: `*.firebaseapp.com`, `*.googleapis.com`

## 🗄️ Database Issues

### Data Not Loading / Empty Dashboard

**Symptoms:**
- Dashboard shows loading spinner indefinitely
- No transactions displayed
- Empty charts and analytics

**Solutions:**

1. **Check user permissions**
   ```javascript
   // Verify Firebase Realtime Database rules
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

2. **Verify database connection**
   ```bash
   # Check backend logs for database errors
   cd BackEnd
   npm run dev
   
   # Look for Firebase connection errors
   ```

3. **Test API endpoints**
   ```bash
   # Test basic connectivity
   curl http://localhost:3000/api/auth/your_user_id
   
   # Should return user data if working correctly
   ```

4. **Check date filters**
   - Ensure you're viewing the correct month/year
   - Try different date ranges

### Firebase Database Permission Denied

**Symptoms:**
- "Permission denied" errors in console
- CORS errors when accessing Firebase

**Solutions:**

1. **Update Firebase security rules**
   ```json
   {
     "rules": {
       ".read": "auth != null",
       ".write": "auth != null",
       "user": {
         "$uid": {
           ".read": "$uid === auth.uid",
           ".write": "$uid === auth.uid"
         }
       }
     }
   }
   ```

2. **Check authentication token**
   ```javascript
   // Verify JWT token is being sent with requests
   // Check browser Network tab for Authorization header
   ```

## 🌐 API and Network Issues

### API Request Failures

**Symptoms:**
- "Network Error" messages
- Failed API requests in browser console
- Timeouts

**Solutions:**

1. **Check backend server status**
   ```bash
   # Ensure backend is running
   cd BackEnd
   npm run dev
   
   # Should show: "Server is running on port 3000"
   ```

2. **Verify CORS configuration**
   ```javascript
   // Check BackEnd/src/app.js CORS settings
   app.use(cors({
     origin: function (origin, callback) {
       const allowedOrigins = process.env.CORS_ORIGIN
         ? process.env.CORS_ORIGIN.split(",")
         : ["*"];
       // ... rest of CORS config
     }
   }));
   ```

3. **Test API endpoints manually**
   ```bash
   # Test health endpoint
   curl http://localhost:3000/
   
   # Test protected endpoint
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        http://localhost:3000/api/auth/your_user_id
   ```

4. **Check environment variables**
   ```bash
   # Verify .env files are properly configured
   cat BackEnd/.env
   cat FrontEnd/.env
   ```

### CORS Errors

**Symptoms:**
- "CORS policy" errors in browser console
- Failed cross-origin requests

**Solutions:**

1. **Update CORS_ORIGIN in backend .env**
   ```env
   # For development
   CORS_ORIGIN=http://localhost:5173
   
   # For production
   CORS_ORIGIN=https://your-domain.com
   ```

2. **Restart backend server**
   ```bash
   cd BackEnd
   npm run dev
   ```

3. **Check preflight requests**
   - Ensure OPTIONS requests are handled correctly
   - Verify Access-Control headers are set

## 📱 Frontend Issues

### Application Won't Start

**Symptoms:**
- Blank page or build errors
- "Module not found" errors
- Vite build failures

**Solutions:**

1. **Clear node_modules and reinstall**
   ```bash
   cd FrontEnd
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**
   ```bash
   node --version
   # Should be v16+ (recommended v18+)
   
   # If using nvm:
   nvm use 18
   ```

3. **Verify environment variables**
   ```bash
   # Check if .env file exists and has correct values
   cat FrontEnd/.env
   ```

4. **Check for port conflicts**
   ```bash
   # If port 5173 is in use
   npx kill-port 5173
   
   # Or use different port
   npm run dev -- --port 3001
   ```

### Build Failures

**Symptoms:**
- "Build failed" errors
- TypeScript errors
- Missing dependencies

**Solutions:**

1. **Fix dependency issues**
   ```bash
   # Update dependencies
   npm update
   
   # Audit and fix vulnerabilities
   npm audit fix
   ```

2. **Check for TypeScript errors**
   ```bash
   # Run type checking
   npx tsc --noEmit
   ```

3. **Clear Vite cache**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### Styling Issues / CSS Not Loading

**Symptoms:**
- Broken layout
- Missing styles
- Tailwind classes not working

**Solutions:**

1. **Verify Tailwind configuration**
   ```javascript
   // Check tailwind.config.js
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     // ... rest of config
   }
   ```

2. **Check CSS imports**
   ```javascript
   // Ensure index.css is imported in main.jsx
   import './index.css'
   ```

3. **Rebuild the project**
   ```bash
   npm run build
   npm run dev
   ```

## ☁️ AWS/Storage Issues

### Image Upload Failures

**Symptoms:**
- Profile picture upload fails
- "Access denied" errors for S3
- Upload timeout errors

**Solutions:**

1. **Check AWS credentials**
   ```env
   # Verify BackEnd/.env has correct AWS config
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   AWS_S3_BUCKET=your_bucket_name
   ```

2. **Verify S3 bucket permissions**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject",
           "s3:DeleteObject"
         ],
         "Resource": "arn:aws:s3:::your-bucket/*"
       }
     ]
   }
   ```

3. **Check CORS configuration for S3**
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

4. **Test file upload manually**
   ```bash
   # Test with curl
   curl -X POST http://localhost:3000/api/upload \
        -H "Authorization: Bearer YOUR_TOKEN" \
        -F "image=@test-image.jpg"
   ```

## 🔧 Development Issues

### Hot Reload Not Working

**Symptoms:**
- Changes don't reflect automatically
- Need to manually refresh browser

**Solutions:**

1. **Check Vite configuration**
   ```javascript
   // vite.config.js
   export default defineConfig({
     plugins: [react()],
     server: {
       watch: {
         usePolling: true, // Add this if on WSL/Docker
       },
     },
   })
   ```

2. **Restart development server**
   ```bash
   cd FrontEnd
   npm run dev
   ```

### Module Resolution Issues

**Symptoms:**
- "Module not found" errors
- Import path issues

**Solutions:**

1. **Check import paths**
   ```javascript
   // Use relative imports for local files
   import Component from './Component'
   import utils from '../utils/helpers'
   
   // Use absolute imports for node_modules
   import React from 'react'
   ```

2. **Verify file extensions**
   ```javascript
   // Include .jsx extension for clarity
   import UserProfile from './UserProfile.jsx'
   ```

3. **Check case sensitivity**
   ```javascript
   // Ensure exact case match
   import Dashboard from './Dashboard' // Not './dashboard'
   ```

## 📊 Performance Issues

### Slow Loading / High Memory Usage

**Symptoms:**
- Slow page loads
- Browser becomes unresponsive
- High memory consumption

**Solutions:**

1. **Optimize images**
   ```bash
   # Use optimized image formats
   # Implement lazy loading for images
   ```

2. **Check for memory leaks**
   ```javascript
   // Use React DevTools Profiler
   // Check for unnecessary re-renders
   // Clean up useEffect hooks properly
   ```

3. **Implement code splitting**
   ```javascript
   // Lazy load components
   const Dashboard = lazy(() => import('./Dashboard'));
   ```

4. **Optimize API calls**
   ```javascript
   // Implement pagination
   // Use caching with Redux
   // Debounce search inputs
   ```

## 🔍 Debugging Tools

### Browser Developer Tools

1. **Console Tab**
   - Check for JavaScript errors
   - Look for network request failures
   - Monitor API responses

2. **Network Tab**
   - Verify API requests are being made
   - Check response status codes
   - Monitor request/response headers

3. **Application Tab**
   - Check localStorage and sessionStorage
   - Verify service worker status
   - Monitor cache usage

### Backend Debugging

```bash
# Enable debug logging
DEBUG=* npm run dev

# Monitor API requests
tail -f /var/log/application.log

# Check memory usage
node --inspect src/index.js
```

### React DevTools

1. **Install React DevTools extension**
2. **Use Profiler** to identify performance issues
3. **Inspect component tree** and props
4. **Monitor state changes** in Redux

## 📞 Getting Help

If these solutions don't resolve your issue:

### Before Reporting

1. **Check console for errors**
2. **Try in incognito mode**
3. **Test with different browser**
4. **Clear cache and cookies**
5. **Restart the application**

### Reporting Issues

Include this information:

```markdown
**Environment:**
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari + version]
- Node.js version: [output of `node --version`]
- npm version: [output of `npm --version`]

**Error Details:**
- Console errors (copy/paste)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

**Configuration:**
- Are you using custom environment variables?
- Any modifications to the codebase?
- Using different ports?
```

### Quick Fixes Checklist

- [ ] Restart the application
- [ ] Clear browser cache
- [ ] Check internet connection
- [ ] Verify environment variables
- [ ] Update dependencies
- [ ] Check for port conflicts
- [ ] Try incognito mode
- [ ] Check console for errors

---

**Still having issues?** [Create an issue](https://github.com/Sridhar1030/FinanceTracker/issues/new) with detailed information.