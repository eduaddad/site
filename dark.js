  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addListener((e) => {
    const darkModeOn = e.matches;
    console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
  });
