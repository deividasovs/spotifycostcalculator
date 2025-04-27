import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { calculateCost, getCurrentUser } from '../services/spotifyService';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import useSpotifyAuth from '../hooks/useSpotifyAuth';

interface UserProfile {
    display_name: string;
    images: Array<{ url: string }>;
    external_urls: {
        spotify: string;
    };
}

const Dashboard: React.FC = () => {
    const [cost, setCost] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserProfile | null>(null);
    const { isAuthenticated, logout } = useSpotifyAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        const loadData = async () => {
            try {
                setIsLoading(true);

                // Get user profile
                const userProfile = await getCurrentUser();
                setUser(userProfile as UserProfile);

                // Calculate the cost
                const calculatedCost = await calculateCost();
                setCost(calculatedCost);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [isAuthenticated, navigate]);

    const userImage = user?.images?.[0]?.url || 'https://i.scdn.co/image/ab6761610000e5ebf428438e777ddd480a27c07f';

    return (
        <DashboardContainer>
            <Header>
                <Logo src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify Logo" />
                {user && (
                    <UserInfo>
                        <UserAvatar src={userImage} alt={user.display_name} />
                        <UserName>{user.display_name}</UserName>
                        <LogoutButton onClick={logout} variant="outline" size="small">
                            Logout
                        </LogoutButton>
                    </UserInfo>
                )}
            </Header>

            <ContentArea>
                {isLoading ? (
                    <LoadingContainer>
                        <Spinner />
                        <p>Analyzing your listening data...</p>
                    </LoadingContainer>
                ) : (
                    <CostCard>
                        <CostCardContent>
                            <Title>Your Spotify Value</Title>
                            <Subtitle>Here's how much you've cost Spotify in the last 30 days:</Subtitle>

                            <CostValue>
                                <span>$</span>
                                {cost !== null ? cost.toFixed(2) : '0.00'}
                            </CostValue>

                            <CostInfo>
                                This is calculated based on tracks you've listened to for at least 30 seconds.
                                <br />
                                Each track costs Spotify approximately $0.005 to stream.
                            </CostInfo>

                            {user && (
                                <SpotifyButton
                                    as="a"
                                    href={user.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open Spotify
                                </SpotifyButton>
                            )}
                        </CostCardContent>
                    </CostCard>
                )}
            </ContentArea>
        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.darkGrey};
`;

const Logo = styled.img`
  height: 40px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const LogoutButton = styled(Button)`
  margin-left: 1rem;
`;

const ContentArea = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const CostCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.darkGrey} 0%, #2c2c2c 100%);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.strong};
`;

const CostCardContent = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.lightGrey};
  margin-bottom: 2.5rem;
`;

const CostValue = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 2rem 0;
  line-height: 1;
  
  span {
    font-size: 3rem;
    vertical-align: super;
    margin-right: 0.25rem;
  }
`;

const CostInfo = styled.p`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 0.975rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const SpotifyButton = styled(Button)`
  margin-top: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  
  p {
    color: ${({ theme }) => theme.colors.lightGrey};
    font-size: 1.125rem;
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Dashboard; 