# 🤝 Contributing Guidelines

Thank you for your interest in contributing to PennyTracker! This guide will help you get started with contributing to the project.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Found a bug? Help us fix it!
- Check existing issues first to avoid duplicates
- Use the bug report template
- Include reproduction steps and environment details

### ✨ Feature Requests
- Have an idea for a new feature?
- Open a feature request issue
- Describe the problem and proposed solution
- Discuss with maintainers before implementation

### 📝 Documentation
- Improve existing documentation
- Add missing documentation
- Fix typos and grammar
- Translate documentation

### 🔧 Code Contributions
- Fix bugs and implement features
- Improve performance
- Add tests
- Refactor code for better maintainability

## 🚀 Getting Started

### 1. Fork the Repository

```bash
# Click the 'Fork' button on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/FinanceTracker.git
cd FinanceTracker

# Add upstream remote
git remote add upstream https://github.com/Sridhar1030/FinanceTracker.git
```

### 2. Set Up Development Environment

Follow the [Installation Guide](./installation.md) to set up your local development environment.

### 3. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/amazing-feature

# Or for bug fixes
git checkout -b fix/issue-description
```

### Branch Naming Convention

| Type | Format | Example |
|:---:|:---:|:---:|
| **Feature** | `feature/description` | `feature/expense-categories` |
| **Bug Fix** | `fix/issue-description` | `fix/login-redirect-bug` |
| **Documentation** | `docs/description` | `docs/api-reference-update` |
| **Refactor** | `refactor/description` | `refactor/expense-service` |
| **Test** | `test/description` | `test/transaction-validation` |

## 💻 Development Workflow

### 1. Make Your Changes

```bash
# Make your changes in the appropriate files
# Follow the coding standards outlined below
```

### 2. Test Your Changes

```bash
# Test frontend
cd FrontEnd
npm run lint
npm run build

# Test backend
cd BackEnd
npm run dev
```

### 3. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git add .
git commit -m "feat: add expense category filtering"

# Or for bug fixes
git commit -m "fix: resolve login redirect issue"

# Or for documentation
git commit -m "docs: update API reference for expenses"
```

#### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### 4. Push Your Changes

```bash
git push origin feature/amazing-feature
```

### 5. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Fill out the PR template
4. Link any related issues
5. Wait for review

## 📏 Coding Standards

### Frontend (React)

#### File Structure
```
src/
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.jsx
│   │   ├── ComponentName.module.css (if needed)
│   │   └── index.js
│   └── index.js
├── pages/
├── store/
└── utils/
```

#### Naming Conventions
- **Components**: PascalCase (`UserProfile.jsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

#### Code Style
```jsx
// Use functional components with hooks
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const UserProfile = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // Side effects here
  }, [userId]);

  return (
    <div className="user-profile">
      {/* Component JSX */}
    </div>
  );
};

export default UserProfile;
```

#### Props Validation
```jsx
import PropTypes from 'prop-types';

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func
};

UserProfile.defaultProps = {
  onUpdate: () => {}
};
```

### Backend (Node.js)

#### File Structure
```
src/
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
├── config/
└── utils/
```

#### Naming Conventions
- **Files**: camelCase (`userController.js`)
- **Functions**: camelCase (`getUserById`)
- **Classes**: PascalCase (`UserService`)
- **Constants**: UPPER_SNAKE_CASE (`DATABASE_URL`)

#### Code Style
```javascript
// Use async/await for asynchronous operations
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const user = await userService.findById(id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export { getUserById };
```

#### Error Handling
```javascript
// Use consistent error handling
class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CustomError';
  }
}

// Error middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

### CSS/Styling

Use Tailwind CSS utility classes:

```jsx
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">Title</h2>
  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
    Action
  </button>
</div>

// Avoid custom CSS unless necessary
// If custom CSS is needed, use CSS modules or styled-components
```

## 🧪 Testing Guidelines

### Frontend Testing

```jsx
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import UserProfile from './UserProfile';
import store from '../store';

describe('UserProfile', () => {
  test('renders user name correctly', () => {
    render(
      <Provider store={store}>
        <UserProfile userId="123" />
      </Provider>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('handles edit button click', () => {
    const onEdit = jest.fn();
    render(
      <Provider store={store}>
        <UserProfile userId="123" onEdit={onEdit} />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith('123');
  });
});
```

### Backend Testing

```javascript
// API testing with Jest and Supertest
import request from 'supertest';
import app from '../app.js';

describe('User API', () => {
  test('GET /api/auth/:id should return user data', async () => {
    const response = await request(app)
      .get('/api/auth/123')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
  });

  test('GET /api/auth/:id should return 404 for invalid user', async () => {
    const response = await request(app)
      .get('/api/auth/invalid-id')
      .set('Authorization', 'Bearer valid-token')
      .expect(404);

    expect(response.body.success).toBe(false);
  });
});
```

## 📝 Documentation Standards

### Code Comments

```javascript
/**
 * Calculates the monthly expense summary for a user
 * @param {string} userId - The user's Firebase UID
 * @param {number} year - The year (YYYY format)
 * @param {number} month - The month (1-12)
 * @returns {Promise<Object>} Monthly expense summary with categories
 * @throws {Error} When user is not found or invalid date
 */
const calculateMonthlySummary = async (userId, year, month) => {
  // Implementation here
};
```

### README Updates

When adding new features, update relevant documentation:

- Main README.md
- API documentation
- Installation guide
- Architecture docs

## 🔍 Code Review Process

### Submitting for Review

1. **Self-review**: Review your own code before submitting
2. **Run tests**: Ensure all tests pass
3. **Update docs**: Update documentation if needed
4. **Small PRs**: Keep PRs focused and small
5. **Clear description**: Explain what and why

### Review Checklist

**For Reviewers:**

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations
- [ ] Error handling is proper
- [ ] Code is readable and maintainable

**For Contributors:**

- [ ] Feature works as intended
- [ ] No breaking changes (or documented)
- [ ] Tests cover edge cases
- [ ] Performance is acceptable
- [ ] Code is well-documented

## 🚨 Issue Guidelines

### Bug Reports

Use the bug report template and include:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]
```

### Feature Requests

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## 🏷️ Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Notes

For each release, include:

- New features
- Bug fixes
- Breaking changes
- Migration guide (if needed)
- Known issues

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: For security issues

### Response Times

- **Bug reports**: 2-3 business days
- **Feature requests**: 1 week
- **Pull requests**: 3-5 business days
- **Security issues**: 24 hours

## 🎉 Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Special thanks in major releases

Thank you for contributing to PennyTracker! 🙏

---

**Questions?** Feel free to open an issue or reach out to the maintainers.