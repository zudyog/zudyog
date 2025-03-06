"use client";
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Provider } from 'react-redux'
import { store } from '@/store/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ErrorProvider } from '@/components/Error';
import LogRocket from "logrocket";

export default function RootLayout(props: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      LogRocket.init(process.env.NEXT_PUBLIC_LOG_ROCKET as string); // Replace with your LogRocket app ID
    }
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
              <Provider store={store}>
                <ErrorProvider>
                  {props.children}
                </ErrorProvider>
              </Provider>
            </ErrorBoundary>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
