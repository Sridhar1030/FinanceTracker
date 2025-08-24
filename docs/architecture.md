# 🏗️ System Architecture

Comprehensive overview of PennyTracker's system architecture and design decisions.

## 🎯 Architecture Overview

PennyTracker follows a modern **3-tier architecture** with a React frontend, Node.js backend, and Firebase/AWS cloud services.

```mermaid
graph TB
    subgraph "Client Layer"
        A[React Frontend]
        B[Mobile Browser]
        C[Desktop Browser]
    end
    
    subgraph "Application Layer"
        D[Express.js Server]
        E[Authentication Middleware]
        F[API Routes]
        G[Business Logic]
    end
    
    subgraph "Data Layer"
        H[Firebase Auth]
        I[Firebase Realtime DB]
        J[AWS S3]
        K[Redis Cache]
    end
    
    subgraph "External Services"
        L[SMS/Message Scraping]
        M[Banking APIs]
        N[Notification Services]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    E --> F
    F --> G
    
    G --> H
    G --> I
    G --> J
    G --> K
    
    G --> L
    G --> M
    G --> N
```

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx
├── Router
│   ├── PublicRoute
│   │   └── Login.jsx
│   └── ProtectedRoute
│       ├── Dashboard.jsx
│       ├── UserPage.jsx
│       ├── TransactionTable.jsx
│       ├── Yearly.jsx
│       ├── AboutUs.jsx
│       └── Help.jsx
├── Shared Components
│   ├── SideBar.jsx
│   ├── Footer.jsx
│   └── card.jsx
└── Redux Store
    ├── expensesSlice.js
    └── store configuration
```

### State Management Flow

```mermaid
graph LR
    A[User Action] --> B[Component]
    B --> C[Redux Action]
    C --> D[Async Thunk]
    D --> E[API Call]
    E --> F[Backend]
    F --> G[Database]
    G --> F
    F --> E
    E --> H[Redux Store]
    H --> I[Component Re-render]
```

### Technology Stack

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| **Build Tool** | Vite | Fast development builds and HMR |
| **Framework** | React 18 | Component-based UI library |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **State Management** | Redux Toolkit | Predictable state container |
| **Routing** | React Router | Client-side navigation |
| **Charts** | Recharts | Data visualization |
| **HTTP Client** | Axios | Promise-based HTTP requests |

## 🔧 Backend Architecture

### Service Layer Pattern

```
Express App
├── Middleware Layer
│   ├── CORS Configuration
│   ├── Authentication
│   └── Error Handling
├── Route Layer
│   ├── Auth Routes
│   ├── Expense Routes
│   ├── User Routes
│   └── Upload Routes
├── Controller Layer
│   ├── Request Validation
│   ├── Business Logic
│   └── Response Formatting
├── Service Layer
│   ├── Database Operations
│   ├── External API Calls
│   └── Business Rules
└── Model Layer
    ├── User Model
    ├── Transaction Model
    └── Budget Model
```

### Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant M as Middleware
    participant R as Router
    participant Ctrl as Controller
    participant S as Service
    participant DB as Database
    
    C->>M: HTTP Request
    M->>M: Authentication
    M->>M: CORS Check
    M->>R: Route Match
    R->>Ctrl: Call Controller
    Ctrl->>Ctrl: Validate Input
    Ctrl->>S: Call Service
    S->>DB: Database Query
    DB->>S: Result
    S->>Ctrl: Processed Data
    Ctrl->>C: JSON Response
```

### Technology Stack

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| **Runtime** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Web application framework |
| **Authentication** | Firebase Admin | User authentication and authorization |
| **Database** | Firebase Realtime DB | NoSQL real-time database |
| **Cache** | Redis | In-memory data caching |
| **File Storage** | AWS S3 | Object storage for images |
| **Security** | JWT | Token-based authentication |

## 🗄️ Data Architecture

### Database Schema (Firebase Realtime DB)

```json
{
  "user": {
    "$userId": {
      "id": "string",
      "name": "string",
      "email": "string",
      "profession": "string",
      "profile": {
        "profilePicUrl": "string"
      },
      "expenses": {
        "$expenseId": {
          "amount": "number",
          "category": "string",
          "date": "timestamp",
          "description": "string",
          "type": "Debited|Credited"
        }
      },
      "budgets": {
        "monthly": {
          "Food": "number",
          "Transportation": "number",
          "Entertainment": "number"
        }
      },
      "messages": {
        "$messageId": {
          "content": "string",
          "sender": "string",
          "timestamp": "timestamp",
          "parsed": {
            "amount": "number",
            "type": "string",
            "category": "string"
          }
        }
      }
    }
  }
}
```

### Data Flow Patterns

#### 1. Transaction Processing

```mermaid
graph TD
    A[SMS/Message Input] --> B[Message Parser]
    B --> C[Amount Extraction]
    C --> D[Category Classification]
    D --> E[Transaction Creation]
    E --> F[Budget Update]
    F --> G[Notification Check]
    G --> H[Database Store]
```

#### 2. Real-time Updates

```mermaid
graph LR
    A[Database Change] --> B[Firebase Listener]
    B --> C[Redux Store Update]
    C --> D[Component Re-render]
    D --> E[UI Update]
```

## 🔐 Security Architecture

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant FB as Firebase Auth
    participant B as Backend
    participant DB as Database
    
    U->>F: Login Credentials
    F->>FB: Authenticate
    FB->>F: ID Token
    F->>B: Login Request + ID Token
    B->>FB: Verify Token
    FB->>B: User Info
    B->>DB: Store/Update User
    DB->>B: Success
    B->>F: JWT Access Token
    F->>F: Store Token
```

### Security Measures

| Layer | Security Feature | Implementation |
|:---:|:---:|:---|
| **Frontend** | Input Validation | React form validation |
| **Frontend** | XSS Protection | React built-in escaping |
| **Backend** | Authentication | Firebase ID token verification |
| **Backend** | Authorization | JWT token validation |
| **Backend** | CORS Protection | Express CORS middleware |
| **Database** | Access Control | Firebase security rules |
| **Storage** | File Upload Security | Multer with file type validation |
| **Transport** | HTTPS | SSL/TLS encryption |

### Data Encryption

```mermaid
graph LR
    A[Sensitive Data] --> B[AES Encryption]
    B --> C[Base64 Encoding]
    C --> D[Database Storage]
    D --> E[Base64 Decoding]
    E --> F[AES Decryption]
    F --> G[Plain Text]
```

## 🚀 Deployment Architecture

### AWS Deployment

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "Compute"
            A[EC2 Instance]
            B[Load Balancer]
        end
        
        subgraph "Storage"
            C[S3 Bucket]
            D[CloudFront CDN]
        end
        
        subgraph "Networking"
            E[Route 53 DNS]
            F[VPC]
        end
    end
    
    subgraph "External Services"
        G[Firebase]
        H[Redis Cloud]
    end
    
    I[Users] --> E
    E --> B
    B --> A
    A --> C
    A --> G
    A --> H
    C --> D
```

### Scalability Considerations

| Component | Scaling Strategy | Implementation |
|:---:|:---:|:---|
| **Frontend** | CDN Distribution | AWS CloudFront |
| **Backend** | Horizontal Scaling | Multiple EC2 instances + Load Balancer |
| **Database** | Firebase Auto-scaling | Firebase handles scaling automatically |
| **Cache** | Redis Clustering | Redis Cloud cluster mode |
| **Storage** | S3 Auto-scaling | AWS S3 automatic scaling |

## 📊 Performance Architecture

### Optimization Strategies

#### Frontend Optimizations

```mermaid
graph TD
    A[Code Splitting] --> B[Lazy Loading]
    B --> C[Bundle Optimization]
    C --> D[Image Optimization]
    D --> E[Caching Strategy]
    E --> F[Service Worker]
```

#### Backend Optimizations

```mermaid
graph TD
    A[Response Caching] --> B[Database Indexing]
    B --> C[Connection Pooling]
    C --> D[Compression]
    D --> E[Rate Limiting]
    E --> F[Load Balancing]
```

### Monitoring & Observability

| Metric | Tool | Purpose |
|:---:|:---:|:---|
| **Application Performance** | Firebase Performance | Monitor app performance |
| **Error Tracking** | Firebase Crashlytics | Track and report errors |
| **User Analytics** | Firebase Analytics | User behavior insights |
| **Infrastructure** | AWS CloudWatch | Server and resource monitoring |
| **Real User Monitoring** | Web Vitals | Core web vitals tracking |

## 🔄 Integration Patterns

### External Service Integration

```mermaid
graph TB
    A[PennyTracker Core] --> B[Message Processing Service]
    A --> C[Banking API Gateway]
    A --> D[Notification Service]
    A --> E[Analytics Service]
    
    B --> F[SMS Providers]
    C --> G[Bank APIs]
    D --> H[Email/Push Services]
    E --> I[Analytics Platforms]
```

### Event-Driven Architecture

```mermaid
graph LR
    A[Transaction Created] --> B[Event Bus]
    B --> C[Budget Checker]
    B --> D[Category Classifier]
    B --> E[Notification Sender]
    B --> F[Analytics Tracker]
```

## 📈 Future Architecture Considerations

### Microservices Migration Path

```mermaid
graph TB
    subgraph "Current Monolith"
        A[Express.js App]
    end
    
    subgraph "Future Microservices"
        B[Auth Service]
        C[Transaction Service]
        D[Budget Service]
        E[Notification Service]
        F[Analytics Service]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
```

### Technology Evolution

| Current | Future Option | Benefits |
|:---:|:---:|:---|
| **Express.js** | NestJS | Better TypeScript support, modular architecture |
| **Firebase Realtime DB** | PostgreSQL + Prisma | Better data relationships, type safety |
| **Manual Deployment** | Docker + Kubernetes | Container orchestration, auto-scaling |
| **Basic Monitoring** | Comprehensive APM | Better observability and debugging |

---

This architecture is designed to be scalable, maintainable, and secure while providing excellent user experience and developer productivity.