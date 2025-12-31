(function() {
  const STORAGE_KEY = 'seek-theme';
  
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.offsetHeight;
    if (theme === 'auto') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
    const iframe = document.getElementById('search-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'seek-theme', theme: theme }, '*');
    }
  }
  
  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!current || current === 'auto') {
      setTheme('light');
    } else if (current === 'light') {
      setTheme('dark');
    } else {
      // Skip auto if it would look the same as current theme
      if (prefersDark) {
        setTheme('light');
      } else {
        setTheme('auto');
      }
    }
  }
  
  const stored = getStoredTheme();
  document.documentElement.setAttribute('data-theme', stored || 'auto');
  
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', cycleTheme);
    }
  });
})();
