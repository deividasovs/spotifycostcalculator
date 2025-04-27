# Spotify Calculator

A React application that calculates how much you've cost Spotify in the past 30 days based on your listening habits.

## Features

- Authenticate with your Spotify account
- View how much your streaming has cost Spotify in the last 30 days
- Clean, Spotify-like UI

## How It Works

The app calculates your "cost" to Spotify based on the following formula:
- Number of tracks you've listened to for 30 seconds or longer * $0.005

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Spotify Developer account

### Setting Up a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Log in with your Spotify account
3. Click "Create An App"
4. Give your app a name and description
5. Once created, click "Edit Settings"
6. Add `http://localhost:3000/#/callback` as a Redirect URI
7. If you plan to deploy to GitHub Pages, also add: `https://YOUR_GITHUB_USERNAME.github.io/spotify-calculator/#/callback` (replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)
8. Save your changes
9. Note your Client ID on the main app page

### Installation

1. Clone this repository
```
git clone https://github.com/yourusername/spotify-calculator.git
cd spotify-calculator
```

2. Install dependencies
```
npm install
```

3. Create environment files:

For local development, create a `.env.development` file:
```
REACT_APP_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
REACT_APP_REDIRECT_URI=http://localhost:3000/#/callback
HTTPS=true
```

For production (GitHub Pages), create a `.env.production` file:
```
REACT_APP_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
REACT_APP_REDIRECT_URI=https://YOUR_GITHUB_USERNAME.github.io/spotify-calculator/#/callback
```

Replace `YOUR_SPOTIFY_CLIENT_ID` with the Client ID from your Spotify Developer Dashboard and `YOUR_GITHUB_USERNAME` with your GitHub username.

4. Configure GitHub Pages by updating the `homepage` field in `package.json`:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/spotify-calculator",
```

5. Start the development server
```
npm start
```

6. Open https://localhost:3000 in your browser

> **Note:** Your browser might warn you about the secure connection because we're using HTTPS with a development certificate. You'll need to click "Advanced" and "Proceed to localhost (unsafe)" to access the site.

## Deployment to GitHub Pages

1. Make sure your `homepage` in `package.json` and redirect URIs in the Spotify Dashboard are correctly set up.

2. Deploy to GitHub Pages:
```
npm run deploy
```

3. Your app will be available at `https://YOUR_GITHUB_USERNAME.github.io/spotify-calculator/`

## Tech Stack

- React
- TypeScript
- React Router
- Styled Components
- Spotify Web API

## Limitations

- The Spotify API only provides the most recently played tracks (up to 50), so for a complete 30-day history, the app would need to periodically fetch and store this data.
- We're assuming all tracks returned have been played for at least 30 seconds, as the Spotify API doesn't provide exact play duration for history.

## License

This project is licensed under the MIT License.
