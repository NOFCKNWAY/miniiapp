import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            username?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

const bets = [25, 50, 100];
const prizes = [
  { emoji: "🏆", chance: 0.383, reward: 100 },
  { emoji: "🌹", chance: 25, reward: 25 },
  { emoji: "🎂", chance: 0.765, reward: 50 },
];

function App() {
  const [bet, setBet] = useState(25);
  const [demo, setDemo] = useState(true);
  const [user, setUser] = useState<{ id: number; first_name: string; username?: string } | null>(null);

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Получаем данные пользователя
    if (tg.initDataUnsafe.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  const handlePlay = () => {
    // Здесь будет логика игры
    console.log('Playing with bet:', bet);
  };

  return (
    <div style={{ background: "#111", color: "#fff", minHeight: "100vh", padding: 16 }}>
      {user && (
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          Привет, {user.first_name}! 👋
        </div>
      )}
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Random Gift</h2>
      <div style={{ display: "flex", gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        {bets.map(b => (
          <button
            key={b}
            onClick={() => setBet(b)}
            style={{
              background: bet === b ? "#222" : "#333",
              color: "#ffd700",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: "bold"
            }}
          >
            {b} ⭐
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ background: '#222', borderRadius: 16, padding: 24, fontSize: 48 }}>🎁</div>
        <div style={{ background: '#222', borderRadius: 16, padding: 24, fontSize: 48 }}>🎁</div>
        <div style={{ background: '#222', borderRadius: 16, padding: 24, fontSize: 48 }}>🌹</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <span>Demo mode</span>
        <input
          type="checkbox"
          checked={demo}
          onChange={e => setDemo(e.target.checked)}
          style={{ marginLeft: 8 }}
        />
      </div>
      <button 
        onClick={handlePlay}
        style={{ 
          width: "100%", 
          margin: "16px 0", 
          padding: 16, 
          background: "#3390ec", 
          color: "#fff", 
          border: "none", 
          borderRadius: 12, 
          fontSize: 18 
        }}
      >
        I'll be lucky! 🎰
      </button>
      <h4 style={{ marginTop: 32 }}>You may win...</h4>
      <div style={{ display: "flex", gap: 8, justifyContent: 'center' }}>
        {prizes.map((p, i) => (
          <div key={i} style={{ background: "#222", borderRadius: 8, padding: 12, minWidth: 80, textAlign: "center" }}>
            <div style={{ fontSize: 24 }}>{p.emoji}</div>
            <div style={{ fontSize: 12 }}>{p.chance}% 🎲</div>
            <div style={{ color: "#ffd700" }}>⭐ {p.reward}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, background: '#111', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-around', padding: 8 }}>
        <div style={{ color: '#fff', opacity: 0.7, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🌍</div>
          <div style={{ fontSize: 12 }}>Leaderboard</div>
        </div>
        <div style={{ color: '#fff', opacity: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🎲</div>
          <div style={{ fontSize: 12 }}>Play</div>
        </div>
        <div style={{ color: '#fff', opacity: 0.7, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>👤</div>
          <div style={{ fontSize: 12 }}>Profile</div>
        </div>
      </div>
    </div>
  );
}

export default App;
