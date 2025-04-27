import SpotifyWebApi from 'spotify-web-api-js';

// Your Spotify application credentials
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'https://deividasovs.github.io/spotifycostcalculator/callback';

// Spotify API scope needed for our app
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-state',
];

// Cost per track streamed for at least 30 seconds (in USD)
export const COST_PER_TRACK = 0.005;

// Spotify Web API instance
const spotifyApi = new SpotifyWebApi();

// Generate the authorization URL for Spotify login
export const getAuthUrl = (): string => {
    const scopeString = SCOPES.join(' ');
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scopeString)}&response_type=token`;
    return authUrl;
};

// Set the access token in the Spotify API instance
export const setAccessToken = (token: string): void => {
    spotifyApi.setAccessToken(token);
    localStorage.setItem('spotify_access_token', token);
};

// Get the current user's profile
export const getCurrentUser = async () => {
    return await spotifyApi.getMe();
};

// Get the user's recently played tracks
export const getRecentlyPlayed = async (limit = 50) => {
    const response = await spotifyApi.getMyRecentlyPlayedTracks({ limit });
    return response.items;
};

// Calculate how much the user has cost Spotify in the last 30 days
export const calculateCost = async (): Promise<number> => {
    try {
        // Get tracks from the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // We'll need to make multiple calls to get all tracks from the last 30 days
        // This is a simplified version - production code would need pagination handling
        const response = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });

        // Filter tracks played in the last 30 days and longer than 30 seconds
        // Note: Spotify API doesn't explicitly tell us if a track was played for 30+ seconds
        // For demonstration purposes, we'll assume all returned tracks were played for at least 30 seconds
        const tracksInLast30Days = response.items.filter(item => {
            const playedAt = new Date(item.played_at);
            return playedAt >= thirtyDaysAgo;
        });

        // Calculate the cost
        const cost = tracksInLast30Days.length * COST_PER_TRACK;
        return cost;
    } catch (error) {
        console.error('Error calculating cost:', error);
        return 0;
    }
};

export default spotifyApi; 