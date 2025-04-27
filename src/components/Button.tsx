import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const StyledButton = styled.button<{
    variant: ButtonVariant;
    size: ButtonSize;
    fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 500px; // Spotify's pill-shaped buttons
  transition: all 0.2s ease;
  white-space: nowrap;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ size }) => {
        switch (size) {
            case 'small':
                return css`
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
        `;
            case 'large':
                return css`
          font-size: 1.125rem;
          padding: 1rem 2rem;
        `;
            case 'medium':
            default:
                return css`
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
        `;
        }
    }}
  
  ${({ variant, theme }) => {
        switch (variant) {
            case 'primary':
                return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.black};
          
          &:hover {
            background-color: #1ed760; // Brighter green on hover
            transform: scale(1.05);
          }
          
          &:active {
            transform: scale(0.98);
          }
        `;
            case 'secondary':
                return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.black};
          
          &:hover {
            background-color: #f0f0f0;
            transform: scale(1.05);
          }
          
          &:active {
            transform: scale(0.98);
          }
        `;
            case 'outline':
                return css`
          background-color: transparent;
          color: ${theme.colors.white};
          border: 1px solid ${theme.colors.white};
          
          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
            transform: scale(1.05);
          }
          
          &:active {
            transform: scale(0.98);
          }
        `;
        }
    }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    children,
    ...props
}) => {
    return (
        <StyledButton
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default Button; 