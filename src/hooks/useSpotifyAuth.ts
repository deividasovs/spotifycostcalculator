import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, getAuthUrl } from '../services/spotifyService';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const useSpotifyAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        isAuthenticated: false,
        isLoading: true,
    });

    const navigate = useNavigate();

    const login = () => {
        window.location.href = getAuthUrl();
    };

    const logout = () => {
        localStorage.removeItem('spotify_access_token');
        setAuthState({
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
        navigate('/');
    };

    useEffect(() => {
        // Check if we are on the callback page
        const hash = window.location.hash;
        if (hash) {
            const tokenSection = hash.match(/#access_token=([^&]*)/);
            if (tokenSection) {
                const token = tokenSection[1];
                setAccessToken(token);
                setAuthState({
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
                navigate('/dashboard');
                return;
            }
        }

        // Check if token exists in localStorage
        const storedToken = localStorage.getItem('spotify_access_token');
        if (storedToken) {
            setAccessToken(storedToken);
            setAuthState({
                token: storedToken,
                isAuthenticated: true,
                isLoading: false,
            });
        } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
        }
    }, [navigate]);

    return {
        ...authState,
        login,
        logout,
    };
};

export default useSpotifyAuth; 