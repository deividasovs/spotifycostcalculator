import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import useSpotifyAuth from '../hooks/useSpotifyAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { isAuthenticated, isLoading, login } = useSpotifyAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <LoginContainer>
            <ContentWrapper>
                <Logo src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify Logo" />

                <Title>Spotify Calculator</Title>
                <Subtitle>Discover how much you're worth to Spotify</Subtitle>

                <LoginButton onClick={login} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login with Spotify'}
                </LoginButton>

                <InfoText>
                    We'll calculate how much your streaming habits have cost Spotify in the last 30 days.
                </InfoText>
            </ContentWrapper>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0%, ${({ theme }) => theme.colors.black} 100%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.lightGrey};
`;

const LoginButton = styled(Button)`
  margin-bottom: 2rem;
  padding: 1rem 4rem;
  font-size: 1.125rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 0.875rem;
  max-width: 80%;
`;

export default Login; 