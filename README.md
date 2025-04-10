# ShipWell - Smart Logistics Platform

## Overview

ShipWell is a comprehensive logistics and shipping management platform that allows users to track, manage, and optimize their shipping operations. The application provides real-time tracking, multiple transportation methods, and an intuitive user interface.

## Features

- **Real-Time Package Tracking**: Monitor your shipments in real-time with interactive map visualization
- **Multi-Modal Transport**: Support for various shipping methods including road, air, and sea transportation
- **Search Functionality**: Find locations quickly with smart address suggestions and location search
- **Interactive Maps**: View shipping routes and location details with integrated map functionality
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **UI Components**: Radix UI, Lucide React icons
- **Maps & Visualization**: Mapbox GL, React Map GL, Deck.gl
- **State Management**: Redux Toolkit
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (latest LTS version)
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd shipwell
```

2. Install dependencies
```bash
yarn install
# or
npm install
```

3. Start the development server
```bash
yarn dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/frontend/src/components` - React components used throughout the application
- `/frontend/src/components/ui` - Reusable UI components 
- `/frontend/src/pages` - Page components for different routes
- `/frontend/src/assets` - Static assets like images
- `/frontend/src/hooks` - Custom React hooks
- `/frontend/src/api` - API interaction utilities

## Deployment

To build the application for production:

```bash
yarn build
# or
npm run build
```

The build output will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- HackToFuture 3.0 for the opportunity to develop this project
- All team members who contributed to the development
