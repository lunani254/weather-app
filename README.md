# Weather App 🌦️

A decoupled weather application built with a **Next.js** frontend and a **Laravel** backend, leveraging the OpenWeatherMap API to provide real-time weather data. The app features a modern, visually appealing design with a glassmorphism aesthetic, a user-friendly interface for searching weather by city or geolocation, and a toggle for switching between Celsius and Fahrenheit units.

## Project Overview

This project implements a weather app in a **decoupled architecture**, where the frontend (Next.js with TypeScript) communicates with a backend API (Laravel) via AJAX requests. The backend fetches weather data from the [OpenWeatherMap API](https://openweathermap.org/api) and serves it to the frontend. The app is designed to be both functional and visually appealing, with a focus on advanced programming practices such as type safety, modular code structure, and elegant design patterns.

### Features
- **Location-Based Weather**: Automatically fetches the user’s location weather using geolocation, with a fallback to Nairobi if geolocation is unavailable.
- **City Search**: Allows users to search for weather by city name or latitude/longitude coordinates.
- **Unit Toggle**: Switch between Celsius and Fahrenheit with real-time data updates.
- **Modern Design**: Implements a glassmorphism UI with a purple-to-blue-cyan gradient background, inspired by modern design trends.
- **Responsive Layout**: Adapts seamlessly to different screen sizes, with a horizontal forecast layout for better usability.
- **Error Handling**: Displays user-friendly error messages for failed API requests or invalid inputs.

### Architecture
The app follows a decoupled architecture:
- **Frontend (Next.js)**: Built with Next.js 14, TypeScript, and Tailwind CSS. Uses the Fetch API for AJAX requests to the backend.
- **Backend (Laravel)**: Built with Laravel 11, providing API endpoints to fetch weather data from OpenWeatherMap.
- **OpenWeatherMap API**: Provides current weather and forecast data, accessed via the backend to keep the API key secure.

### Wireframe and Design Choices
The app’s layout is inspired by the wireframe provided on [page 2 of the project document](https://docs.google.com/document/d/1b2c0PGxCRV34K06jz_D_OGpPKPR7CrVByB8OYmL33xY/edit?tab=t.0). However, I’ve made the following design improvements:
- **Horizontal Forecast**: Instead of placing the forecast below the current weather (as in the wireframe), I positioned it on the right in a horizontal layout for better space utilization and a more compact design.
- **Glassmorphism**: Added a glassmorphism effect to cards for a modern, visually appealing look, enhancing the purple-to-blue-cyan gradient background.
- **Sticky Search Bar**: Made the search bar sticky at the top, spanning almost the full width, for easier access across the app.

These improvisations improve usability while maintaining the core functionality outlined in the wireframe.

## Project Structure
- `weather-app-frontend/`: The Next.js frontend, built with TypeScript and Tailwind CSS.
- `weather-app-backend/`: The Laravel backend, providing API endpoints to fetch weather data.

## Prerequisites
Before running the app, ensure you have the following installed:
- [Node.js](https://nodejs.org) (v16 or later) for the frontend.
- [PHP](https://www.php.net) (v8.1 or later) and [Composer](https://getcomposer.org) for the backend.
- A free [OpenWeatherMap API key](https://openweathermap.org/api) (sign up to get one).

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/lunani254/weather-app.git
cd weather-app
