import { models } from '../data/models';
import { ScoreCell } from '../components/ScoreCell';
import { Badge } from '../components/Badge';
import './Landing.css';

interface LandingProps {
  onNavigate: (page: 'leaderboard' | 'compare' | 'matcher' | 'methodology') => void;
}

export function Landing({ onNavigate }: LandingProps) {
  const top5 = [...models].sort((a, b) => b.scores.overall - a.scores.overall).slice(0, 5);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="hero-badge-row">
            <span className="hero-tag">Community-Powered</span>
            <span className="hero-tag hero-tag--warm">Open Source</span>
          </div>
          <h1 className="hero-title">
            The Truth About<br />
            <span className="hero-accent">AI Models</span>
          </h1>
          <p className="hero-subtitle">
            Independent benchmarks. Community-run. No vendor influence.<br />
            Find out which AI model actually performs best for <em>your</em> use case.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => onNavigate('leaderboard')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="9" width="3" height="6" rx="0.5" fill="currentColor" />
                <rect x="6" y="5" width="3" height="10" rx="0.5" fill="currentColor" />
                <rect x="11" y="1" width="3" height="14" rx="0.5" fill="currentColor" />
              </svg>
              View Leaderboard
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('compare')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 2v12M12 2v12M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Compare Models
            </button>
          </div>
        </div>
      </section>

      {/* Live Leaderboard Preview */}
      <section className="preview-section">
        <div className="container">
          <div className="section-header">
            <h2>
              <span className="section-icon mono">#</span>
              Top Models Right Now
            </h2>
            <button className="link-btn" onClick={() => onNavigate('leaderboard')}>
              View full leaderboard &rarr;
            </button>
          </div>
          <div className="preview-table-wrapper">
            <table className="preview-table">
              <thead>
                <tr>
                  <th className="col-rank">#</th>
                  <th className="col-name">Model</th>
                  <th className="col-score">Overall</th>
                  <th className="col-score hide-mobile">Coding</th>
                  <th className="col-score hide-mobile">Reasoning</th>
                  <th className="col-score hide-mobile">Speed</th>
                  <th className="col-badge hide-mobile" />
                </tr>
              </thead>
              <tbody>
                {top5.map((model, i) => (
                  <tr key={model.id}>
                    <td className="col-rank mono">{i + 1}</td>
                    <td className="col-name">
                      <span className="model-name">{model.name}</span>
                      <span className="model-provider" style={{ color: model.providerColor }}>
                        {model.provider}
                      </span>
                    </td>
                    <td className="col-score">
                      <ScoreCell value={model.scores.overall} size="sm" />
                    </td>
                    <td className="col-score hide-mobile">
                      <ScoreCell value={model.scores.coding} size="sm" />
                    </td>
                    <td className="col-score hide-mobile">
                      <ScoreCell value={model.scores.reasoning} size="sm" />
                    </td>
                    <td className="col-score hide-mobile">
                      <ScoreCell value={model.scores.speed} size="sm" />
                    </td>
                    <td className="col-badge hide-mobile">
                      {model.badge && <Badge type={model.badge} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How We Test */}
      <section className="methodology-preview">
        <div className="container">
          <div className="section-header">
            <h2>
              <span className="section-icon mono">&gt;</span>
              How We Test
            </h2>
            <button className="link-btn" onClick={() => onNavigate('methodology')}>
              Full methodology &rarr;
            </button>
          </div>
          <div className="method-grid">
            <div className="method-card">
              <div className="method-number mono">01</div>
              <h3>Standardized Prompts</h3>
              <p>2,400+ test prompts across 6 categories, reviewed and updated quarterly by our contributor community.</p>
            </div>
            <div className="method-card">
              <div className="method-number mono">02</div>
              <h3>Blind Evaluation</h3>
              <p>Outputs scored by independent evaluators who don't know which model produced which response.</p>
            </div>
            <div className="method-card">
              <div className="method-number mono">03</div>
              <h3>Reproducible Results</h3>
              <p>Every benchmark run is logged with full parameters, prompts, and outputs for independent verification.</p>
            </div>
            <div className="method-card">
              <div className="method-number mono">04</div>
              <h3>No Vendor Money</h3>
              <p>Funded entirely by community donations and compute grants. Zero influence from model providers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value mono">847</div>
              <div className="stat-label">Contributors</div>
            </div>
            <div className="stat-card">
              <div className="stat-value mono">2.4M</div>
              <div className="stat-label">Benchmarks Run</div>
            </div>
            <div className="stat-card">
              <div className="stat-value mono">12</div>
              <div className="stat-label">Models Tested</div>
            </div>
            <div className="stat-card">
              <div className="stat-value mono">6</div>
              <div className="stat-label">Test Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Not sure which model to pick?</h2>
            <p>Tell us your use case and we'll recommend the best model for your specific needs.</p>
            <button className="btn btn-primary" onClick={() => onNavigate('matcher')}>
              Find Your Model &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
