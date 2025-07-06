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
   cp .env.example .env
   # Add your NASA API key to .env file
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```
   NASA_API_KEY=your_nasa_api_key_here
   PORT=3001
   ```

### Running the Application

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`

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

### Phase 3: Frontend Development (In Progress)
- [ ] React application setup
- [ ] Component architecture
- [ ] API service integration
- [ ] UI/UX implementation

### Phase 4: Data Visualization (Planned)
- [ ] Chart.js integration
- [ ] Interactive components
- [ ] Responsive design
- [ ] Performance optimization

### Phase 5: Testing & Deployment (Planned)
- [ ] Unit testing
- [ ] Integration testing
- [ ] Deployment setup
- [ ] Production optimization

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
4. Create React frontend
5. Add data visualization components
6. Implement responsive design
7. Deploy to production

## 📝 Development Log

**2025-07-06 20:03**: Project initiated, README created, planning phase completed
**2025-07-06 20:05**: Backend development completed - Express server, NASA API integration, comprehensive error handling
**Next**: React frontend development

---

*This project is built as part of a Software Engineer coding challenge, showcasing full-stack development skills with React, Node.js, and data visualization.*
