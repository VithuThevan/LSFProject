'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export default function ThemeWrapper({ children }: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      <div className={`theme-wrapper ${mounted ? 'theme-transition' : ''}`}>
        {children}
      </div>
    </ThemeProvider>
  );
} 