import { useState, useEffect } from 'react'
import './index.css'

interface ArtItem {
  id: number;
  title: string;
  year: number;
  artist: string;
  location: string;
  image: string;
}

const items: ArtItem[] = [
  { id: 1, title: "CASCATE DI TIVOLI", year: 1761, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "/img/image 1.png" },
  { id: 2, title: "PORTRAIT OF VINCENT VAN GOGH", year: 1886, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "/img/image 2.png" },
  { id: 3, title: "UNEQUAL MARRIAGE", year: 1862, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "/img/image 3.png" },
  { id: 4, title: "THE HAPPY VIOLINIST", year: 1624, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "/img/image 4.png" },
  { id: 5, title: "THE ARCADIAN", year: 1834, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "/img/image 5.png" },
  { id: 6, title: "GOLFO DI NAPOLI", year: 1845, artist: "JEAN-HONORE FRAGONARD", location: "LOUVRE MUSEUM", image: "/img/image 6.png" },
];

function App() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorMode') as 'light' | 'dark' | null;
    if (saved) {
      setScheme(saved);
      document.body.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newScheme = scheme === 'light' ? 'dark' : 'light';
    setScheme(newScheme);
    document.body.classList.toggle('dark', newScheme === 'dark');
    localStorage.setItem('colorMode', newScheme);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-container">
          <h1 className="logo h1">GALLERY</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {scheme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="search-filter-section">
        <div className="search-filter-container">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="22" y1="22" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Painting title or artist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="burger-btn" onClick={() => setPanelOpen(true)}>
            <img 
              src={scheme === 'light' ? "/img/filter_icon-red.png" : "/img/filter_icon.png"} 
              alt="filter" 
            />
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      {panelOpen && (
        <div className="filter-overlay" onClick={() => setPanelOpen(false)}>
          <div className="filter-sidebar" onClick={e => e.stopPropagation()}>
            <div className="filter-sidebar-header">
              <button className="close-filter" onClick={() => setPanelOpen(false)}>✕</button>
            </div>
            <div className="filter-sidebar-footer">
              <button className="btn-show">SHOW THE RESULTS</button>
              <button className="btn-clear" onClick={() => { setSearchQuery(''); setPanelOpen(false); }}>
                CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY */}
      <div className="gallery-grid">
        {filteredItems.length === 0 ? (
          <div className="empty-gallery">
            No matches for "{searchQuery}"<br />Please try again.
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="art-card">
              <div className="card-image">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="card-content">
                <div className="content-flex-wrapper">
                  <div className="text-container">
                    <div className="text-wrapper">
                      <div className="state-default">
                        <div className="painting-title">{item.title}</div>
                        <div className="painting-year">{item.year}</div>
                      </div>
                      <div className="state-hover">
                        <div className="painting-title uppercase">{item.artist}</div>
                        <div className="painting-year uppercase">{item.location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="pag">
        <img 
          src={scheme === 'light' ? "/img/pag-light.png" : "/img/pag.png"} 
          alt="pagination" 
        />
      </div>
    </>
  );
}

export default App;