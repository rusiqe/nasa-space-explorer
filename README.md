# NASA Space Explorer - Software Engineer Coding Challenge

## 🚀 Project Overview

This is a full-stack web application built for the Software Engineer coding challenge. The application utilizes NASA's Open APIs to showcase space-related data through an interactive and engaging user interface.

### Challenge Requirements Met:
- ✅ React Frontend with user interface for NASA data interaction
- ✅ Node.js Backend with Express server as API intermediary
- ✅ Data Visualization with intuitive and visually appealing presentation
- ✅ NASA API Integration with multiple endpoints
- ✅ Error handling and loading states
- ✅ Responsive design
- ✅ Clean code structure and best practices

## 🛠 Technology Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Chart.js for data visualization

**Backend:**
- Node.js
- Express.js
- TypeScript
- Axios for NASA API calls
- CORS middleware
- Environment variable management

## 🌟 Features

### Core Features:
- **Astronomy Picture of the Day (APOD)**: Daily stunning space images with descriptions
- **Mars Rover Photos**: Browse photos from Curiosity, Opportunity, and Spirit rovers
- **Near Earth Objects (NEO)**: Track asteroids and comets approaching Earth
- **Earth Polychromatic Imaging Camera (EPIC)**: Real-time Earth images from space

### Interactive Features:
- Date picker for APOD historical browsing
- Mars rover photo filtering by camera and date
- NEO search with size and distance visualization
- Responsive design for all screen sizes
- Loading states and error handling
- Search and filter functionality

### Bonus Features:
- Real-time data updates
- Interactive charts and graphs
- Mobile-first responsive design
- Performance optimization
- Comprehensive error handling

## 📁 Project Structure

```
nasa-space-explorer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── types/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- NASA API key (get one at https://api.nasa.gov/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rusiqe/nasa-space-explorer.git
   cd nasa-space-explorer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Edit .env file and add your NASA API key:
   # NASA_API_KEY=your_nasa_api_key_here
   # NASA_API_BASE_URL=https://api.nasa.gov
   # PORT=3001
   # NODE_ENV=development
   # FRONTEND_URL=http://localhost:3000
   
   # Build the TypeScript code
   npm run build
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Frontend environment variables are already configured in .env
   # REACT_APP_API_URL=http://localhost:3001
   # REACT_APP_NAME=NASA Space Explorer
   # REACT_APP_VERSION=1.0.0
   ```

### Running the Application

#### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev     # Starts backend in development mode with hot reload
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start       # Starts frontend in development mode with hot reload
```

#### Option 2: Production Mode

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run build   # Build TypeScript to JavaScript
npm start       # Start production server
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run build   # Build optimized production bundle
npm install -g serve
serve -s build  # Serve production build
```

### Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

### 🔧 Environment Configuration

#### Backend (.env)
```bash
# NASA API Configuration
NASA_API_KEY=your_nasa_api_key_here
NASA_API_BASE_URL=https://api.nasa.gov

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=NASA Space Explorer
REACT_APP_VERSION=1.0.0
```

### 🧪 Testing the Setup

1. **Test Backend API**:
   ```bash
   curl http://localhost:3001/health
   curl http://localhost:3001/api/nasa/apod
   ```

2. **Test Frontend**: 
   Navigate to http://localhost:3000 and verify:
   - ✅ APOD images load
   - ✅ Mars rover photos display
   - ✅ Navigation works
   - ✅ Error handling functions

### 🚨 Troubleshooting

#### Common Issues:

**Backend won't start:**
- Check if Node.js version is 18+
- Verify `.env` file exists with NASA_API_KEY
- Run `npm run build` before `npm start`
- Check if port 3001 is available

**Frontend won't connect to backend:**
- Ensure backend is running on port 3001
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` in frontend `.env`

**NASA API Rate Limiting:**
- Get a personal API key from https://api.nasa.gov/
- Replace `DEMO_KEY` in backend `.env`
- Wait for rate limit to reset (typically 1 hour)

**Build Errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version compatibility

### 📊 Available Scripts

#### Backend Scripts:
```bash
npm run dev      # Development mode with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run lint     # Run ESLint
npm test         # Run tests
```

#### Frontend Scripts:
```bash
npm start        # Development mode with hot reload
npm run build    # Build optimized production bundle
npm test         # Run tests
npm run lint     # Run ESLint
```

## 📊 NASA API Endpoints Used

1. **APOD (Astronomy Picture of the Day)**
   - Endpoint: `/planetary/apod`
   - Features: Historical browsing, HD images, explanations

2. **Mars Rover Photos**
   - Endpoint: `/mars-photos/api/v1/rovers/{rover}/photos`
   - Features: Multi-rover support, camera filtering, date selection

3. **Near Earth Objects (NEO)**
   - Endpoint: `/neo/rest/v1/feed`
   - Features: Asteroid tracking, size visualization, approach dates

4. **EPIC (Earth Images)**
   - Endpoint: `/EPIC/api/natural/images`
   - Features: Real-time Earth imagery, date-based browsing

## 🎨 Design Decisions

### Frontend Architecture:
- **Component-based structure**: Reusable components for scalability
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS for rapid development
- **React Router**: Client-side routing for smooth navigation

### Backend Architecture:
- **Express.js**: Lightweight and flexible web framework
- **Controller pattern**: Separation of concerns for maintainability
- **Service layer**: NASA API abstraction and data processing
- **Error handling**: Comprehensive error management

## 🔧 Development Process Documentation

### Phase 1: Project Setup ✅
- [x] Project structure creation
- [x] README.md documentation
- [x] Git repository initialization
- [x] Technology stack selection

### Phase 2: Backend Development ✅
- [x] Express server setup
- [x] NASA API integration
- [x] Route configuration
- [x] Error handling implementation

### Phase 3: Frontend Development ✅
- [x] React application setup
- [x] Component architecture
- [x] API service integration
- [x] UI/UX implementation
- [x] TypeScript integration
- [x] Error handling and loading states

### Phase 4: Data Visualization ✅
- [x] Interactive date pickers
- [x] Mars rover photo galleries
- [x] NEO data visualization
- [x] Responsive design
- [x] Performance optimization
- [x] Real-time NASA API integration

### Phase 5: Testing & Deployment ✅
- [x] TypeScript compilation
- [x] Error boundary implementation
- [x] API integration testing
- [x] Production build optimization
- [x] Environment configuration

## 📈 Performance Considerations

- Image lazy loading for Mars rover photos
- API response caching
- Debounced search inputs
- Optimized bundle size
- Progressive loading states

## 🧪 Testing Strategy

- Unit tests for utility functions
- Component testing with React Testing Library
- API integration tests
- End-to-end testing with Cypress

## 🚀 Deployment

The application will be deployed on:
- **Frontend**: Vercel
- **Backend**: Render/Heroku

## 🎯 Next Steps

1. ✅ Initialize GitHub repository
2. ✅ Set up backend Express server
3. ✅ Implement NASA API integration
4. ✅ Create React frontend
5. ✅ Add data visualization components
6. ✅ Implement responsive design
7. ✅ Fix TypeScript compilation errors
8. ✅ Enable real NASA API integration
9. ✅ Verify all features working correctly
10. ⚡ Deploy to production (Optional)

## 📝 Development Log

**2025-07-06 20:03**: Project initiated, README created, planning phase completed
**2025-07-06 20:05**: Backend development completed - Express server, NASA API integration, comprehensive error handling
**2025-07-06 20:10**: GitHub repository created and code pushed successfully
**2025-07-06 20:15**: Backend server tested and validated - all NASA API endpoints functional
**2025-07-16 13:30**: Frontend development completed - React app with TypeScript, NASA API integration
**2025-07-16 13:35**: Fixed TypeScript compilation errors and enabled real NASA API integration
**2025-07-16 13:40**: Verified all Mars rovers (Curiosity, Opportunity, Spirit) working correctly
**2025-07-16 13:50**: Updated git with all fixes and improvements
**Current Status**: Full-Stack Application Complete ✅ | Ready for Production
**Features**: APOD viewer, Mars rover photos, NEO tracking, EPIC Earth images

---

*This project is built as part of a Software Engineer coding challenge, showcasing full-stack development skills with React, Node.js, and data visualization.*
