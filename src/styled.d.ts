import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            black: string;
            white: string;
            darkGrey: string;
            grey: string;
            lightGrey: string;
            error: string;
        };
        fonts: {
            primary: string;
        };
        sizes: {
            maxWidth: string;
        };
        breakpoints: {
            small: string;
            medium: string;
            large: string;
            xlarge: string;
        };
        shadows: {
            light: string;
            medium: string;
            strong: string;
        };
    }
} 