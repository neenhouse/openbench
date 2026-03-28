import { useState, useMemo } from 'react';
import { models, scoreLabels } from '../data/models';
import type { ScoreKey } from '../data/models';
import { ScoreCell } from '../components/ScoreCell';
import { Badge } from '../components/Badge';
import './Leaderboard.css';

type SortDir = 'asc' | 'desc';

export function Leaderboard() {
  const [sortKey, setSortKey] = useState<ScoreKey>('overall');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [providerFilter, setProviderFilter] = useState<string>('all');

  const providers = useMemo(() => {
    const set = new Set(models.map((m) => m.provider));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const sorted = useMemo(() => {
    let filtered = providerFilter === 'all'
      ? models
      : models.filter((m) => m.provider === providerFilter);

    return [...filtered].sort((a, b) => {
      const diff = a.scores[sortKey] - b.scores[sortKey];
      return sortDir === 'desc' ? -diff : diff;
    });
  }, [sortKey, sortDir, providerFilter]);

  function handleSort(key: ScoreKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  function SortIcon({ col }: { col: ScoreKey }) {
    if (col !== sortKey) return <span className="sort-icon sort-icon--inactive">&uarr;</span>;
    return <span className="sort-icon">{sortDir === 'desc' ? '\u2193' : '\u2191'}</span>;
  }

  const scoreKeys: ScoreKey[] = ['overall', 'coding', 'reasoning', 'creativity', 'speed', 'cost'];

  return (
    <div className="leaderboard">
      <div className="container">
        <div className="page-header">
          <h1>AI Model Leaderboard</h1>
          <p>{models.length} models tested across {Object.keys(scoreLabels).length} categories</p>
        </div>

        <div className="leaderboard-controls">
          <div className="filter-group">
            <label className="filter-label">Provider</label>
            <select
              className="filter-select"
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
            >
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p === 'all' ? 'All Providers' : p}
                </option>
              ))}
            </select>
          </div>
          <div className="results-count mono">
            {sorted.length} model{sorted.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="col-rank">#</th>
                <th className="col-model">Model</th>
                {scoreKeys.map((key) => (
                  <th
                    key={key}
                    className={`col-score sortable ${sortKey === key ? 'sorted' : ''}`}
                    onClick={() => handleSort(key)}
                  >
                    {scoreLabels[key]}
                    <SortIcon col={key} />
                  </th>
                ))}
                <th className="col-ctx hide-tablet">Context</th>
                <th className="col-pricing hide-tablet">Pricing</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((model, i) => (
                <tr key={model.id} className={i < 3 ? 'top-three' : ''}>
                  <td className="col-rank mono">
                    {i + 1}
                  </td>
                  <td className="col-model">
                    <div className="model-info">
                      <span className="model-name">{model.name}</span>
                      <span className="model-meta">
                        <span className="model-provider" style={{ color: model.providerColor }}>
                          {model.provider}
                        </span>
                        {model.badge && <Badge type={model.badge} />}
                      </span>
                    </div>
                  </td>
                  {scoreKeys.map((key) => (
                    <td key={key} className={`col-score ${sortKey === key ? 'highlight-col' : ''}`}>
                      <ScoreCell value={model.scores[key]} size="sm" />
                    </td>
                  ))}
                  <td className="col-ctx hide-tablet">
                    <span className="mono ctx-value">{model.contextWindow}</span>
                  </td>
                  <td className="col-pricing hide-tablet">
                    <span className="pricing-value">{model.pricing}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="leaderboard-note">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6.5" stroke="var(--text-tertiary)" />
            <path d="M7 4v1M7 6.5v3.5" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>
            Scores are based on community-run benchmarks. Last updated March 2025. Click column headers to sort.
          </span>
        </div>
      </div>
    </div>
  );
}
