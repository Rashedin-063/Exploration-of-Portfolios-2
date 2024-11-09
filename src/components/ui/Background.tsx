import { useEffect, useState } from 'react';

function Background() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(
      savedTheme === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  return (
    <div
      className={`h-screen w-full ${
        isDarkMode
          ? 'dark:bg-black-100 bg-grid-white/[0.2]'
          : 'bg-white bg-grid-black/[0.3]'
      } flex items-center justify-center absolute top-0 left-0`}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div
        className='absolute pointer-events-none inset-0 flex items-center justify-center'
        style={{
          maskImage:
            'radial-gradient(ellipse_at_center, transparent 20%, black)',
        }}
      ></div>
    </div>
  );
}

export default Background;
