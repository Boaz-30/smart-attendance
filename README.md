# SmartAttend - Smart Attendance Record System

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-4.x-green?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-blue?logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vite-6.x-purple?logo=vite" alt="Vite" />
</div>

## 📋 Overview

SmartAttend is a modern, GPS-enabled attendance tracking system that revolutionizes how educational institutions manage student attendance. Using QR codes and geolocation verification, it ensures students are physically present in classrooms while providing lecturers with powerful tools to monitor and export attendance data.

### ✨ Key Features

- **🔐 Secure Authentication** - Lecturer registration and login system
- **📱 QR Code Generation** - Unique QR codes for each class session
- **🗺️ GPS Verification** - Location-based attendance validation
- **⚡ Real-time Tracking** - Live attendance monitoring
- **📊 Data Export** - CSV export functionality for record keeping
- **🎯 Session Management** - Create, activate, and end sessions
- **📋 Attendance Reports** - Detailed analytics and reporting
- **🌐 Responsive Design** - Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Modern web browser with GPS support

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd smart-attendance-20
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:8080
   ```

## 🏗️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful, reusable components
- **React Router 6** - Client-side routing
- **TanStack Query** - Server state management
- **QRCode.react** - QR code generation
- **Lucide React** - Beautiful icons

### Backend

- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe server development
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools

- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework

## 📁 Project Structure

```
smart-attendance-20/
├── client/                   # Frontend React application
│   ├── components/ui/        # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route components
│   │   ├── Index.tsx        # Landing page
│   │   ├── Login.tsx        # Lecturer login
│   │   ├── Register.tsx     # Lecturer registration
│   │   ├── Dashboard.tsx    # Lecturer dashboard
│   │   ├── CreateSession.tsx # Session creation
│   │   ├── SessionDetails.tsx # Session management
│   │   ├── AttendPage.tsx   # Student attendance
│   │   └── AttendanceList.tsx # Attendance reports
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── global.css           # Global styles
├── server/                  # Backend Express application
│   ├── routes/              # API route handlers
│   │   ├── auth.ts          # Authentication endpoints
│   │   ├── sessions.ts      # Session management
│   │   └── attendance.ts    # Attendance tracking
│   └── index.ts             # Server configuration
├── shared/                  # Shared types and utilities
│   └── types.ts             # TypeScript interfaces
└── public/                  # Static assets
```

## 🎯 Usage Guide

### For Lecturers

1. **Registration & Login**

   - Create an account at `/register`
   - Login at `/login` with your credentials

2. **Create a Session**

   - Navigate to Dashboard → "Create New Session"
   - Fill in class details (title, course, date/time)
   - Set classroom location using GPS
   - Define attendance radius (recommended: 50m)

3. **Share with Students**

   - View the generated QR code
   - Share the QR code or attendance link
   - Monitor real-time attendance

4. **Manage Sessions**
   - Toggle session active/inactive status
   - End sessions permanently
   - View attendance lists
   - Export data as CSV

### For Students

1. **Access Attendance**

   - Scan the QR code provided by lecturer
   - Or visit the shared attendance link

2. **Mark Attendance**

   - Enter your full name
   - Provide student index number
   - Allow GPS location access
   - Confirm attendance (if within range)

3. **Verification**
   - System verifies you're within classroom radius
   - Attendance recorded with timestamp
   - Confirmation message displayed

## 🔧 API Documentation

### Authentication Endpoints

```typescript
POST /api/auth/register
Body: { name: string, email: string, password: string }
Response: { message: string, user: User }

POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: User }
```

### Session Management

```typescript
POST /api/sessions
Headers: { Authorization: "Bearer <token>" }
Body: CreateSessionRequest
Response: ClassSession

GET /api/sessions
Headers: { Authorization: "Bearer <token>" }
Response: ClassSession[]

PUT /api/sessions/:id/toggle
Headers: { Authorization: "Bearer <token>" }
Response: ClassSession

PUT /api/sessions/:id/end
Headers: { Authorization: "Bearer <token>" }
Response: ClassSession
```

### Attendance Tracking

```typescript
POST /api/attendance
Body: AttendanceRequest
Response: { message: string, record: AttendanceRecord }

GET /api/sessions/:id/attendance
Headers: { Authorization: "Bearer <token>" }
Response: AttendanceRecord[]

GET /api/sessions/:id/export
Headers: { Authorization: "Bearer <token>" }
Response: CSV file download
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Application URLs
BASE_URL=http://localhost:8080

# Security (in production, use proper secrets)
JWT_SECRET=your-secret-key
PING_MESSAGE=pong
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Options

- **Vercel** - Frontend deployment
- **Render/Railway** - Full-stack deployment
- **Docker** - Containerized deployment
- **Traditional VPS** - Manual server setup

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run typecheck
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## 📋 Features Roadmap

- [ ] **Enhanced Security**

  - JWT token refresh mechanism
  - Password reset functionality
  - Two-factor authentication

- [ ] **Advanced Features**

  - Facial recognition integration
  - Bulk student import
  - Analytics dashboard
  - Mobile applications

- [ ] **Integrations**
  - LMS integration (Moodle, Canvas)
  - Email notifications
  - SMS alerts
  - Calendar synchronization

## 🐛 Known Issues

- GPS accuracy may vary indoors
- Requires HTTPS for location services in production
- Limited to modern browsers with geolocation support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Boaz Kwabena Kyei**

- GitHub: [@Boaz-30](https://github.com/Boaz-30)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Express](https://expressjs.com/)
- UI components by [Radix UI](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">
  <p>Made with ❤️ for modern education</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
