import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
                <rect width="32" height="32" rx="6" fill="#0a0a0a" />
                <rect x="5" y="18" width="5" height="9" rx="1" fill="#06B6D4" />
                <rect x="13" y="12" width="5" height="15" rx="1" fill="#06B6D4" />
                <rect x="21" y="6" width="5" height="21" rx="1" fill="#F97316" />
              </svg>
              <span>OpenBench</span>
            </div>
            <p className="footer-tagline">
              Independent AI benchmarks by the community, for the community.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <span>Leaderboard</span>
              <span>Compare Models</span>
              <span>Use Case Matcher</span>
            </div>
            <div className="footer-col">
              <h4>About</h4>
              <span>Methodology</span>
              <span>Contributors</span>
              <span>Open Source</span>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <span>GitHub</span>
              <span>Discord</span>
              <span>Submit Benchmark</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2025 OpenBench. All benchmarks are community-contributed and independently verified.</span>
          <span className="footer-demo">Demo by neenhouse.com</span>
        </div>
      </div>
    </footer>
  );
}
