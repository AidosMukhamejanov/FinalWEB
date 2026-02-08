# LIGHTS OUT – Sim Racing Team Backend

# Project Overview

LIGHTS OUT is a backend and frontend application for managing a Sim Racing Team.  
It allows users to register, login, view their profile, and manage racing events.  
The project is designed with security, modular architecture, and external API integration (weather info) in mind.  

Key Features:

- User authentication with JWT and bcrypt password hashing
- CRUD operations for race events (title, track, car, date, optional flag)
- External API integration to fetch real-time weather for race track
- Personalized dashboard displaying user's events
- Modular Express backend with MongoDB

## Setup and Installation

### Prerequisites

- Node.js
- npm
- MongoDB
- Git

### env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_openweathermap_api_key



