import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSpotifyAuth from '../hooks/useSpotifyAuth';

const Callback: React.FC = () => {
    const { isAuthenticated } = useSpotifyAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // The auth token is automatically processed in the useSpotifyAuth hook
        // If authentication was successful, redirect to dashboard
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <CallbackContainer>
            <Spinner />
            <LoadingText>Logging you in...</LoadingText>
        </CallbackContainer>
    );
};

const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 2rem;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.25rem;
`;

export default Callback; 