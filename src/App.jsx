import React, { useEffect, useState } from 'react';
import './App.css';

const themes = {
  light: {
    backgroundColor: '#f4f4f4',
    color: '#333'
  },
  dark: {
    backgroundColor: '#111',
    color: '#fff'
  },
  blue: {
    backgroundColor: '#e6f0ff',
    color: '#004080'
  }
};

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [targetDate, setTargetDate] = useState(localStorage.getItem("targetDate") || today);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showSettings, setShowSettings] = useState(false);
  const [dday, setDday] = useState('');

  useEffect(() => {
    updateDday();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);


  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].backgroundColor;
    document.body.style.color = themes[theme].color;
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(updateDday, 1000 * 60 * 60); // 매시간 업데이트
    return () => clearInterval(interval);
  }, [targetDate]);

  const updateDday = () => { //업데이트
    if (!targetDate) return;
    const target = new Date(targetDate);
    const now = new Date();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    setDday(diff === 0 ? "D-Day" : `D-${diff}`);
  };

  const handleSave = () => {
    localStorage.setItem('targetDate', targetDate);
    localStorage.setItem('theme', theme);
    updateDday();
    setShowSettings(false);
  };

  return (
    <div className="App" onMouseEnter={() => setShowSettings(true)} onMouseLeave={() => setShowSettings(false)}>
      <div className="dday-display">{dday || 'Set your D-Day'}</div>

      {showSettings && (
        <div className="settings-panel">
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <div className="ad-area">[Ad Placeholder]</div>
          <div className="donation">
            <a href="https://buymeacoffee.com/yourid" target="_blank" rel="noreferrer">💖 Donate</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
