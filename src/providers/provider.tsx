'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  // Ensure the theme is only applied after the component has mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents rendering on the server, avoiding hydration mismatches
    return null;
  }

  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
}
