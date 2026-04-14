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

---

## 🚀 Quick Start (5 minutes - No Database Required)

The fastest way to get SmartAttend running locally with demo data.

### Prerequisites

- **Node.js**: 20+ (check with `node --version`)
- **npm** or **yarn** (comes with Node.js)
- **Modern web browser** with GPS support (optional, for attendance features)

### Installation & Running

```bash
# 1. Clone the repository
git clone <repository-url>
cd smart-attendance-20

# 2. Install dependencies
npm install

# 3. Start development server (no configuration needed!)
npm run dev

# 4. Open in browser
# → Navigate to http://localhost:8080
# → You should see the SmartAttend landing page
```

**That's it!** Demo mode uses in-memory data, so:
- ✅ No database setup required
- ✅ Pre-loaded with sample data
- ✅ Data resets on server restart (expected)
- ✅ Perfect for testing and exploration

### First Steps

1. **Register as a lecturer**: Navigate to `/register` and create an account
2. **Login**: Use your credentials at `/login`
3. **Create a session**: Go to Dashboard → "Create New Session"
4. **Share with students**: Share the QR code or attendance link
5. **Mark attendance**: Use the attendance link to test the student flow

---

## 📦 Prerequisites in Detail

### Node.js Version

- **Minimum**: Node.js 20.x
- **Recommended**: Node.js 22.x (latest LTS)
- **Check version**: 
  ```bash
  node --version
  ```

### Why Node 20+?

The project uses modern JavaScript features like `import.meta.dirname` which require Node 20 or higher.

### Installation Guides

<details>
<summary><b>macOS</b></summary>

Using Homebrew (recommended):
```bash
brew install node
```

Or download from: https://nodejs.org/

</details>

<details>
<summary><b>Windows</b></summary>

1. Download installer from: https://nodejs.org/
2. Run the installer and follow prompts
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**Note**: PowerShell users can also use Chocolatey:
```powershell
choco install nodejs
```

</details>

<details>
<summary><b>Linux (Ubuntu/Debian)</b></summary>

```bash
sudo apt update
sudo apt install nodejs npm
```

Or using NodeSource repository for latest versions:
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

</details>

---

## ⚙️ Environment Configuration

### Development Mode (Default - No Config Needed)

By default, the app runs in **demo mode** with in-memory data:

```bash
npm run dev
```

This works immediately without any `.env` file!

### Custom Configuration (Optional)

To customize port, JWT secret, or other settings:

1. **Copy the template**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your values:
   ```env
   NODE_ENV=development
   PORT=8080
   JWT_SECRET=your-secret-key
   ```

3. **Restart the server**:
   ```bash
   npm run dev
   ```

### Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | No | `development` | Set to `production` for deployments |
| `PORT` | No | `8080` | Server port (change if 8080 is in use) |
| `JWT_SECRET` | Yes* | N/A | Secret for JWT tokens (use strong random in production) |
| `DATABASE_URL` | No | (empty) | PostgreSQL connection string (for persistent data) |
| `BASE_URL` | No | `http://localhost:8080` | Server URL (used internally) |
| `FRONTEND_URL` | No | `http://localhost:8080` | Frontend URL (required in production for CORS) |
| `VITE_PUBLIC_BUILDER_KEY` | No | (empty) | Builder.io API key (optional) |
| `PING_MESSAGE` | No | `pong` | Message for `/api/ping` endpoint |

\* Generated automatically in development if not provided

### Port Already in Use?

If port 8080 is occupied:

```bash
# Linux/macOS - find process using port 8080
lsof -i :8080

# Windows - find process using port 8080
netstat -ano | findstr :8080
```

Or use a different port:

```bash
PORT=3001 npm run dev
```

---

## 🗄️ Database Setup (Optional - For Persistent Data)

SmartAttend works great in-memory, but you can optionally connect to PostgreSQL for persistent data.

### Why Use a Database?

- **Persistent data** - Attendance records survive server restarts
- **Multi-instance** - Multiple server instances can share data
- **Production-ready** - Required for live deployments
- **Scalability** - Better for large datasets

### With Supabase (Easiest)

1. **Create account**: https://supabase.com (free tier available)

2. **Create project** and note your PostgreSQL connection string

3. **Update `.env`**:
   ```env
   DATABASE_URL=postgresql://user:password@host:6543/postgres
   ```

4. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

5. **Run migrations** (if any):
   ```bash
   npx prisma migrate deploy
   ```

6. **Restart server**:
   ```bash
   npm run dev
   ```

### With Local PostgreSQL

<details>
<summary><b>macOS (Homebrew)</b></summary>

```bash
# Install PostgreSQL
brew install postgresql@15

# Start service
brew services start postgresql@15

# Create database
createdb smartattend

# Connection string
postgresql://localhost/smartattend
```

</details>

<details>
<summary><b>Windows</b></summary>

1. Download installer: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Note the password for `postgres` user
4. Connection string: `postgresql://postgres:PASSWORD@localhost/smartattend`

</details>

<details>
<summary><b>Docker</b></summary>

```bash
docker run --name smartattend-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=smartattend \
  -p 5432:5432 \
  -d postgres:15

# Connection string
postgresql://postgres:yourpassword@localhost/smartattend
```

</details>

---

## 🛠️ Development Commands

```bash
# Start development server (frontend + backend with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Type checking
npm run typecheck

# Code formatting
npm run format.fix
```

---

## 🏗️ Project Structure

```
smart-attendance-20/
├── client/                   # React frontend (SPA)
│   ├── components/ui/        # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── pages/                # Route components
│   │   ├── Index.tsx         # Landing page
│   │   ├── Login.tsx         # Lecturer login
│   │   ├── Register.tsx      # Lecturer registration
│   │   ├── Dashboard.tsx     # Lecturer dashboard
│   │   ├── CreateSession.tsx # Create class session
│   │   ├── AttendPage.tsx    # Student attendance marking
│   │   └── AttendanceList.tsx # View attendance records
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # Entry point
│   └── global.css            # Global styles
├── server/                   # Express backend
│   ├── routes/               # API route handlers
│   │   ├── auth.ts           # Authentication
│   │   ├── sessions.ts       # Session management
│   │   └── attendance.ts     # Attendance tracking
│   ├── utils/                # Server utilities
│   └── index.ts              # Server setup & routes
├── shared/                   # Shared types
│   ├── api.ts                # API interfaces
│   └── types.ts              # TypeScript types
├── .env.example              # Environment template
├── vite.config.ts            # Frontend build config
├── vite.config.server.ts     # Backend build config
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # TailwindCSS config
└── package.json              # Dependencies & scripts
```

---

## 📱 Using the Application

### For Lecturers

#### 1. Registration & Authentication
- Navigate to `/register` to create account
- Login at `/login` with email and password
- Credentials stored with hashed passwords (bcrypt)

#### 2. Create a Class Session
- Go to Dashboard → "Create New Session"
- Enter class details:
  - **Class Title**: Course name or class identifier
  - **Course Code**: Course/module code
  - **Location**: Set actual classroom location via GPS
  - **Attendance Radius**: Distance students must be within (default: 50m)
- Session ID and QR code generated automatically

#### 3. Manage Sessions
- **Activate Session**: Students can mark attendance only for active sessions
- **Deactivate**: Pauses attendance marking without ending session
- **End Session**: Permanently closes session (can't be reopened)
- **View Attendance**: See all students who marked attendance
- **Export Data**: Download attendance as CSV for records

#### 4. Share with Students
- **QR Code**: Show on projector or share image
- **Attendance Link**: Share `/attend?code=SESSION_CODE` URL directly
- **Session Code**: Students can manually enter the code

### For Students

#### 1. Access Attendance
- **Scan QR Code**: Use phone camera or QR scanner app
- **Direct Link**: Click link provided by lecturer
- **Enter Code**: Manually enter session code if provided

#### 2. Mark Attendance
- Enter your **full name** (required)
- Enter your **student index number** (required)
- **Allow GPS access** when browser asks (location permission)
- **Submit**: Confirm attendance

#### 3. Verification
- System verifies you're within classroom radius
- Timestamp recorded automatically
- Confirmation message displayed if successful
- Error message if outside attendance area

---

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Restricts API access to authorized origins
- **Location Verification**: Prevents remote attendance marking
- **Role-Based Access**: Lecturers and students have separate permissions

---

## 🚀 Production Deployment

### Build for Production

```bash
# Build everything (frontend + backend)
npm run build

# Output: dist/ folder ready for deployment
```

### Run Production Build Locally

```bash
# Start production server
npm start

# Verify it works at http://localhost:8080
```

### Environment Variables for Production

Create `.env` with production values:

```env
NODE_ENV=production
PORT=8080
JWT_SECRET=use-a-strong-random-secret
DATABASE_URL=postgresql://prod-user:prod-pass@prod-host:5432/smartattend
BASE_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### Deployment Platforms

<details>
<summary><b>Vercel (Recommended)</b></summary>

Vercel is optimized for full-stack Next.js-like apps:

1. Push code to GitHub
2. Connect repository on Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

https://vercel.com/docs

</details>

<details>
<summary><b>Render</b></summary>

Render supports full-stack deployments:

1. Connect GitHub repository
2. Create "Web Service"
3. Build command: `npm run build`
4. Start command: `npm start`
5. Set environment variables

https://render.com/docs

</details>

<details>
<summary><b>Railway</b></summary>

Railway provides simple deployment:

1. Connect GitHub repository
2. Set environment variables
3. Deploy with automatic build

https://railway.app/docs

</details>

<details>
<summary><b>Docker</b></summary>

For custom deployments, use Docker:

```dockerfile
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t smartattend .
docker run -p 8080:8080 smartattend
```

</details>

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### "Cannot find module..." error

**Cause**: Dependencies not installed  
**Solution**:
```bash
npm install
```

#### "Port 8080 already in use"

**Cause**: Another service is using port 8080  
**Solution**:
```bash
PORT=3001 npm run dev
```

#### "TypeScript errors" but server still runs

**Cause**: TypeScript compilation issues  
**Solution**:
```bash
npm run typecheck  # See detailed errors
```

#### GPS/Location not working

**Causes**:
- HTTPS required (except localhost)
- Browser permission denied
- GPS unavailable indoors

**Solutions**:
- Allow location access when browser asks
- Use HTTPS in production
- Test indoors with larger radius

#### Database connection fails

**Cause**: Invalid DATABASE_URL  
**Solution**:
```bash
# Verify connection string format
postgresql://user:password@host:port/database

# Test connection
psql postgresql://your-connection-string
```

#### Build fails with "prisma not found"

**Cause**: Dependencies not installed  
**Solution**:
```bash
npm install
npm run build
```

### Platform-Specific Issues

<details>
<summary><b>Windows PowerShell</b></summary>

**Issue**: `npm start` doesn't work  
**Solution**: Use `npm run dev` instead or use Git Bash

**Issue**: Can't set environment variables  
**Solution**: Create `.env` file instead:
```env
NODE_ENV=development
PORT=8080
```

</details>

<details>
<summary><b>macOS M1/M2 (Apple Silicon)</b></summary>

**Issue**: Native modules don't compile  
**Solution**: Install Rosetta 2:
```bash
softwareupdate --install-rosetta
```

</details>

<details>
<summary><b>Linux (WSL2 on Windows)</b></summary>

**Issue**: GPS/Geolocation not available  
**Solution**: Normal - WSL doesn't have GPS hardware access. Test on real device or browser with GPS simulator.

</details>

---

## 📚 Tech Stack Details

### Frontend

- **React 18** - UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router 6** - Client-side routing
- **TailwindCSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built, beautiful components
- **React Hook Form** - Form state management
- **TanStack Query** - Server state management
- **QRCode.react** - QR code generation
- **Lucide React** - Icon library

### Backend

- **Express.js** - Web framework
- **Node.js 20+** - JavaScript runtime
- **TypeScript** - Type-safe server code
- **Prisma** - Database ORM (optional)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Development

- **Vitest** - Unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Format with Prettier: `npm run format.fix`
- Write meaningful commit messages
- Add tests for new features

---

## 📋 Features Roadmap

- [ ] **Enhanced Security**
  - JWT refresh tokens
  - Password reset via email
  - Two-factor authentication (2FA)

- [ ] **Advanced Features**
  - Facial recognition verification
  - Bulk student import from CSV
  - Analytics dashboard with charts
  - Mobile native apps (React Native)

- [ ] **Integrations**
  - LMS integration (Moodle, Canvas, Google Classroom)
  - Email notifications
  - SMS alerts for absent students
  - Calendar synchronization

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Boaz Kwabena Kyei**

- GitHub: [@Boaz-30](https://github.com/Boaz-30)
- Project: SmartAttend Attendance System

---

## 🙏 Acknowledgments

Built with modern web technologies:
- [React](https://reactjs.org/) - UI framework
- [Express](https://expressjs.com/) - Backend framework
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Components
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide](https://lucide.dev/) - Icons

---

<div align="center">
  <p><strong>SmartAttend</strong> - Modernizing Education with Technology</p>
  <p>Made with ❤️ for educators and students</p>
  <p>⭐ If you find this helpful, please star the repository!</p>
</div>
