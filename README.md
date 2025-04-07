# BetBuddy - Online Betting Platform

A React TypeScript frontend application for a betting platform with digital wallet functionality.

## Features

- **User Authentication**

  - Register and login with form validation
  - JWT-based authentication
  - Protected routes

- **Betting System**

  - Place bets with real-time balance updates
  - View betting history with pagination
  - Cancel active bets

- **Wallet Management**

  - View transaction history
  - Real-time balance updates
  - Proper currency formatting

- **Responsive Design**
  - Mobile-friendly layout
  - Adaptive navigation

## Tech Stack

- React 19
- TypeScript
- React Router 7
- React Query (TanStack Query)
- Axios for API calls
- Zod for form validation
- shadcn/ui components
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/BMRicardas/bet-buddy.git
   cd bet-buddy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. In a separate terminal, clone and start the mock API:

   ```bash
   git clone https://github.com/MantasBuga/mock-api.git
   cd mock-api
   npm install
   ```

5. **Important**: Before starting the API, you need to manually add CORS support to the API. Open `api.js` file and add the following lines at the top section:

   ```javascript
   const cors = require("cors");
   ```

   And then add this line after creating the Express app:

   ```javascript
   app.use(cors());
   ```

6. Start the API server:

   ```bash
   npm start
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

## API Setup

The application requires the backend API to be running. The API server runs on port 3000 and is available at:

```
http://localhost:3000
```

The API documentation can be accessed at:

```
http://localhost:3000/docs
```

## Project Structure

```
src/
├── api/                  # API configuration and queries
├── components/           # Reusable UI components
├── contexts/             # React context providers
├── layouts/              # Page layouts
├── pages/                # Route components
├── routes/               # Routing configuration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Application Flow

1. Users can register for a new account or log in with existing credentials
2. Once logged in, users can place bets with a minimum amount of €1.00
3. Bets have a 30% chance of winning (simulated by the mock API)
4. Users can view their betting history and cancel active bets
5. Transaction history shows all financial activities

## Development Notes

- The application is configured to work with the mock API at `http://localhost:3000`
- Protected routes require authentication
- The app maintains user session using localStorage
- API calls use axios with an interceptor for authentication tokens

## Future Improvements

- Add dark mode toggle
- Implement real-time updates with WebSockets
- Add multi-language support
- Add comprehensive test coverage
- Implement bet history filtering
- Add more betting options and categories

## Repositories

- Frontend: [https://github.com/BMRicardas/bet-buddy](https://github.com/BMRicardas/bet-buddy)
- Mock API: [https://github.com/MantasBuga/mock-api](https://github.com/MantasBuga/mock-api)

## License

This project is licensed under the MIT License.
