// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout'
import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

const theme = createTheme({
    spacing: 8,
    palette: {
        mode: "dark",
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                container: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
            },
        },
    }
    /*components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            }
        }
    }*/
    /*palette: {
        mode: "dark", // or "light"
        primary: {
            main: "#F5C857",
            light: "#FFEE91",
            dark: "#E2852E",
            contrastText: '#fff',
        },
        secondary: {
            main: "#ABE0F0",
        },
    },
    typography: {
        fontFamily: "Comfortaa, Inter, Arial, sans-serif",
    },*/
});

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <Layout />
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
