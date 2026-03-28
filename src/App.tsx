import { useState } from 'react';
import './App.css';
import { Landing } from './pages/Landing';
import { Leaderboard } from './pages/Leaderboard';
import { Compare } from './pages/Compare';
import { UseCaseMatcher } from './pages/UseCaseMatcher';
import { Methodology } from './pages/Methodology';
import { Footer } from './components/Footer';

type Page = 'home' | 'leaderboard' | 'compare' | 'matcher' | 'methodology';

function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo" onClick={() => navigate('home')}>
          <svg viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#0a0a0a" />
            <rect x="5" y="18" width="5" height="9" rx="1" fill="#06B6D4" />
            <rect x="13" y="12" width="5" height="15" rx="1" fill="#06B6D4" />
            <rect x="21" y="6" width="5" height="21" rx="1" fill="#F97316" />
          </svg>
          Open<span>Bench</span>
        </div>
        <nav className="header-nav">
          <button className={`nav-btn ${page === 'leaderboard' ? 'active' : ''}`} onClick={() => navigate('leaderboard')}>
            Leaderboard
          </button>
          <button className={`nav-btn ${page === 'compare' ? 'active' : ''}`} onClick={() => navigate('compare')}>
            Compare
          </button>
          <button className={`nav-btn ${page === 'matcher' ? 'active' : ''}`} onClick={() => navigate('matcher')}>
            Use Cases
          </button>
          <button className={`nav-btn ${page === 'methodology' ? 'active' : ''}`} onClick={() => navigate('methodology')}>
            Methodology
          </button>
        </nav>
      </header>

      <main className="main-content">
        {page === 'home' && <Landing onNavigate={navigate} />}
        {page === 'leaderboard' && <Leaderboard />}
        {page === 'compare' && <Compare />}
        {page === 'matcher' && <UseCaseMatcher />}
        {page === 'methodology' && <Methodology />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
