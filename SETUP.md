# SmartAttend - Complete Setup Guide for Developers

This guide walks you through setting up SmartAttend for development, with step-by-step instructions and explanations.

---

## 📋 Step 1: Prerequisites Check

Before starting, verify you have the required software installed.

### Check Node.js

Open your terminal/command prompt and run:

```bash
node --version
```

**Expected output**: Should show version 20.x or higher (e.g., `v22.0.0`)

### If Node.js is not installed:

#### Option A: Use NodeSource (Linux/WSL)
```bash
# For Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm
```

#### Option B: Homebrew (macOS)
```bash
brew install node
```

#### Option C: Official Installer (Windows/macOS)
Download from: https://nodejs.org/ → Click "LTS" button → Install

#### Option D: Docker (if you have Docker)
```bash
docker run -it node:22 /bin/bash
```

### Verify Installation

After installing, verify both Node and npm work:

```bash
node --version    # Should show v20.x or higher
npm --version     # Should show 8.x or higher
```

If you don't see version numbers, restart your terminal/command prompt.

---

## 🔽 Step 2: Get the Code

### Using Git (Recommended)

```bash
# Clone the repository
git clone <repository-url>

# Navigate into the project
cd smart-attendance-20

# Verify you're in the right place
ls                # macOS/Linux
dir               # Windows - should see: client/, server/, package.json, etc.
```

### Without Git

1. Download the project as ZIP from GitHub
2. Extract the folder
3. Open terminal/command prompt
4. Navigate to the extracted folder:
   ```bash
   cd smart-attendance-20
   ```

---

## 📦 Step 3: Install Dependencies

All required packages are listed in `package.json`. Install them with:

```bash
npm install
```

**What's happening**: npm reads `package.json` and downloads all required libraries into the `node_modules` folder. This might take 2-5 minutes.

**Expected output** (at the end):
```
added 500+ packages in 2m
```

**If you see errors**:
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json` file
- Run `npm install` again

---

## 🚀 Step 4: Start the Development Server

Now start the application:

```bash
npm run dev
```

**Expected output** (look for these lines):
```
VITE v6.2.0  ready in 245 ms

➜  Local:   http://localhost:8080/
➜  press h to show help
```

**Success!** The server is running. Keep this terminal window open.

---

## 🌐 Step 5: Open in Browser

Open your web browser and go to:

```
http://localhost:8080
```

You should see:
- SmartAttend landing page with:
  - "SmartAttend" title
  - Description about attendance system
  - "Get Started" button
  - "Login" link

If you don't see this, check:
- The terminal is still running (should show `Local: http://localhost:8080`)
- Try refreshing the page (Ctrl+R or Cmd+R)
- Check port 8080 is not blocked by firewall

---

## 👤 Step 6: Test the Application

### Register as Lecturer

1. Click **"Get Started"** button
2. You'll be redirected to `/register` page
3. Fill in:
   - **Full Name**: Your name (e.g., "Dr. Jane Smith")
   - **Email**: Any email address (e.g., "jane@example.com")
   - **Password**: Any password (e.g., "test123456")
4. Click **"Register"**
5. You should see success message

### Login

1. Click **"Login"** link in the header
2. Enter the email and password you just created
3. Click **"Login"**
4. You should see the **Dashboard** with:
   - "Welcome, [Your Name]" message
   - "Create New Session" button
   - Possibly empty sessions list

### Create a Session

1. Click **"Create New Session"** button
2. Fill in the form:
   - **Class Title**: "Introduction to Web Development" (any name)
   - **Course Code**: "CS101" (any code)
   - **Location**: Click "Set Current Location" - allow location access if asked
   - **Attendance Radius**: 50 meters (default is fine)
3. Click **"Create Session"**
4. You should see:
   - Success message
   - QR Code displayed
   - Session added to your sessions list

### Test Attendance Marking

1. From the sessions list, click **"View QR"** or **"Open Attendance Link"**
2. This will open the attendance page where students would mark attendance
3. On the attendance page:
   - Enter a name (e.g., "John Doe")
   - Enter a student number (e.g., "12345")
   - Click "Allow" for location permission
   - Click "Mark Attendance"
4. You should see:
   - Success message (if within location radius)
   - Attendance recorded with timestamp

### View Attendance Records

1. Go back to Dashboard
2. Click on a session
3. Click **"View Attendance"**
4. You should see:
   - List of students who marked attendance
   - Names, student numbers, and timestamps
   - Option to export as CSV

---

## 🔧 Step 7: Understanding the Project Structure

Now that it's running, here's what you're looking at:

```
smart-attendance-20/
├── client/                 # Frontend (React) - what users see
│   ├── pages/             # Page components (pages that appear at different routes)
│   │   ├── Index.tsx      # Home page (/)
│   │   ├── Login.tsx      # Login page (/login)
│   │   ├── Register.tsx   # Register page (/register)
│   │   ├── Dashboard.tsx  # Lecturer dashboard (/dashboard)
│   │   └── ...            # More pages
│   ├── components/ui/     # Reusable UI parts (buttons, forms, dialogs, etc.)
│   └── App.tsx            # Main app file with routing setup
│
├── server/                # Backend (Express/Node.js) - handles API requests
│   ├── routes/            # Route handlers (auth, sessions, attendance)
│   │   ├── auth.ts        # Login/register logic
│   │   ├── sessions.ts    # Session creation/management
│   │   └── attendance.ts  # Attendance tracking
│   └── index.ts           # Server setup and route registration
│
├── shared/                # Code shared between frontend & backend
│   └── types.ts           # TypeScript type definitions
│
├── package.json           # Project dependencies and scripts
├── .env.example           # Template for environment variables
├── vite.config.ts         # Frontend build configuration
└── vite.config.server.ts  # Backend build configuration
```

### Key Files to Know

- **`package.json`**: Lists all dependencies and npm scripts
- **`client/App.tsx`**: Defines all routes and page connections
- **`.env.example`**: Shows what environment variables are available
- **`server/index.ts`**: Defines all API endpoints

---

## 🛠️ Step 8: Making Changes

### Editing Frontend Code

1. Open `client/pages/Dashboard.tsx` in your code editor
2. Make a small change (e.g., change button text)
3. Save the file
4. Check your browser - **it automatically updates!** (Hot reload)

This works for all React files in the `client/` folder.

### Editing Backend Code

1. Open `server/index.ts` in your code editor
2. Make a small change (e.g., change log message)
3. Save the file
4. The server automatically restarts in the terminal
5. Browser may automatically refresh

---

## 📝 Step 9: Available Commands

In your terminal, you can run:

```bash
# Development (what you've been using)
npm run dev

# Create production build
npm run build
# Output: dist/ folder ready to deploy

# Test the production build locally
npm run build
npm start

# Check TypeScript for errors
npm run typecheck

# Format code (automatically fixes style)
npm run format.fix

# Run tests
npm test
```

---

## 🌍 Step 10: Stop the Server

To stop the development server:

**In the terminal**:
- Press `Ctrl+C` (Windows/Linux)
- Or `Cmd+C` (macOS)

You should see:
```
^C
```

The server has stopped. You can start it again anytime with `npm run dev`.

---

## ⚙️ Step 11: Using a Custom Port (If 8080 is Busy)

If you get error "Port 8080 already in use":

```bash
# Use port 3000 instead
PORT=3000 npm run dev

# Or on Windows:
$env:PORT=3000; npm run dev
```

Then open http://localhost:3000 in your browser.

---

## 📁 Step 12: Project Configurations

### `.env.example` vs `.env`

- **`.env.example`** (in git) - Template showing all variables
- **`.env`** (create yourself) - Your actual secret values

To use custom configuration:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your values:
   ```env
   NODE_ENV=development
   PORT=8080
   JWT_SECRET=my-secret-key
   ```

3. Restart: `npm run dev`

---

## 🗄️ Step 13: Database (Optional)

The app works fine with in-memory data (no database needed for development).

**To use a real database** (PostgreSQL):

### Quick Setup with Supabase

1. Go to https://supabase.com
2. Sign up for free account
3. Create a new project
4. Get the PostgreSQL connection string
5. In `.env`:
   ```env
   DATABASE_URL=postgresql://...your-connection-string...
   ```
6. Restart the server: `npm run dev`

---

## 📚 Step 14: Next Steps

### To Learn More

1. **Read the code**: Start with `client/App.tsx` to see routing
2. **Check README.md**: Full documentation of features
3. **Explore components**: Look at `client/pages/Dashboard.tsx` to understand structure
4. **API docs**: See `server/index.ts` for all available endpoints

### To Add Features

1. **New page**: Create file in `client/pages/MyPage.tsx`
2. **New route**: Add to `client/App.tsx`
3. **New API endpoint**: Add to `server/index.ts`

---

## 🐛 Troubleshooting

### Problem: "npm command not found"

**Solution**: Node.js not installed or not in PATH
- Restart terminal/command prompt
- Or reinstall Node.js

### Problem: "Port 8080 already in use"

**Solution**: Another app is using that port
- Use different port: `PORT=3000 npm run dev`
- Or close the other app

### Problem: Changes not showing in browser

**Solution**: Try these steps:
1. Manually refresh browser (Ctrl+R or Cmd+R)
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check terminal - does it show compilation errors?
4. Restart with `npm run dev`

### Problem: "TypeError: Cannot find module..."

**Solution**: Dependencies not installed properly
- Run: `npm install` again
- Or: Delete `node_modules` folder and run `npm install`

### Problem: GPS/Location not working

**Solutions**:
- Allow location permission when browser asks
- Use HTTPS (except for localhost)
- Test on real device instead of emulator
- Set larger attendance radius (for testing)

### Problem: Authentication not working

**Solutions**:
- Try registering a new account (email must be unique)
- Check browser console for errors (F12)
- Check terminal for server errors
- Clear browser cookies and try again

---

## 📞 Getting Help

1. **Check README.md**: Comprehensive documentation
2. **Check server logs**: Look at terminal output while running `npm run dev`
3. **Check browser console**: Press F12, click Console tab for frontend errors
4. **Check GitHub issues**: See if others had same problem
5. **Ask for help**: Share the error message and what you were doing

---

## ✅ Checklist - You're All Set!

- [ ] Node.js installed (version 20+)
- [ ] Project cloned or downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Browser showing app at http://localhost:8080
- [ ] Able to register and login
- [ ] Able to create a session
- [ ] Able to mark attendance
- [ ] Able to see attendance records

If all checked, you're ready to develop!

---

## 💡 Pro Tips

1. **Use VS Code**: Great free editor with built-in terminal
2. **Open two terminals**: One for `npm run dev`, one for running commands
3. **Use browser DevTools**: Press F12 to see errors
4. **Check git status**: `git status` to see what you changed
5. **Commit often**: `git add . && git commit -m "description"`

---

**Happy coding!** 🚀

If you have questions or issues, refer to README.md or check the terminal output for error messages.
