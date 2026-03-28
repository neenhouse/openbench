import { useState, useMemo } from 'react';
import { models, useCases, scoreLabels } from '../data/models';
import type { ScoreKey } from '../data/models';
import { ScoreCell } from '../components/ScoreCell';
import { Badge } from '../components/Badge';
import './UseCaseMatcher.css';

export function UseCaseMatcher() {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

  const ranked = useMemo(() => {
    if (!selectedUseCase) return [];
    const uc = useCases.find((u) => u.id === selectedUseCase);
    if (!uc) return [];

    return [...models]
      .map((model) => {
        const weightedScore = (Object.keys(uc.weights) as ScoreKey[]).reduce(
          (sum, key) => sum + model.scores[key] * uc.weights[key],
          0
        );
        const totalWeight = Object.values(uc.weights).reduce((a, b) => a + b, 0);
        return { model, score: Math.round(weightedScore / totalWeight) };
      })
      .sort((a, b) => b.score - a.score);
  }, [selectedUseCase]);

  const selectedUseCaseData = useCases.find((u) => u.id === selectedUseCase);

  return (
    <div className="matcher">
      <div className="container">
        <div className="page-header">
          <h1>Use Case Matcher</h1>
          <p>Select what you need AI for and we'll rank the best models for your specific use case</p>
        </div>

        <div className="use-case-grid">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              className={`use-case-card ${selectedUseCase === uc.id ? 'selected' : ''}`}
              onClick={() => setSelectedUseCase(uc.id === selectedUseCase ? null : uc.id)}
            >
              <span className="uc-icon mono">{uc.icon}</span>
              <span className="uc-label">{uc.label}</span>
              <span className="uc-weights">
                {(Object.entries(uc.weights) as [ScoreKey, number][])
                  .filter(([, w]) => w >= 2)
                  .map(([k]) => scoreLabels[k])
                  .join(' + ')}
              </span>
            </button>
          ))}
        </div>

        {selectedUseCase && ranked.length > 0 && (
          <div className="matcher-results">
            <div className="results-header">
              <h2>
                Best Models for <span className="results-uc">{selectedUseCaseData?.label}</span>
              </h2>
              <p className="results-note">
                Weighted by: {selectedUseCaseData &&
                  (Object.entries(selectedUseCaseData.weights) as [ScoreKey, number][])
                    .sort(([, a], [, b]) => b - a)
                    .map(([k, w]) => `${scoreLabels[k]} (${w}x)`)
                    .join(', ')}
              </p>
            </div>

            <div className="results-list">
              {ranked.map(({ model, score }, i) => (
                <div
                  key={model.id}
                  className={`result-card ${i === 0 ? 'top-result' : ''}`}
                >
                  <div className="result-rank mono">
                    {i === 0 ? (
                      <span className="rank-crown">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M3 14l2-8 5 4 5-4 2 8H3z" fill="var(--accent-warm)" />
                          <path d="M3 14h14v2H3v-2z" fill="var(--accent-warm)" opacity="0.7" />
                        </svg>
                      </span>
                    ) : (
                      <span>#{i + 1}</span>
                    )}
                  </div>

                  <div className="result-info">
                    <div className="result-name-row">
                      <span className="result-model-name">{model.name}</span>
                      <span className="result-provider" style={{ color: model.providerColor }}>
                        {model.provider}
                      </span>
                      {model.badge && <Badge type={model.badge} />}
                    </div>
                    <div className="result-scores">
                      {(['coding', 'reasoning', 'creativity', 'speed', 'cost'] as ScoreKey[]).map((key) => (
                        <div key={key} className="result-score-item">
                          <span className="result-score-label">{scoreLabels[key]}</span>
                          <ScoreCell value={model.scores[key]} size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="result-weighted-score">
                    <div className="weighted-value mono">{score}</div>
                    <div className="weighted-label">Weighted</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedUseCase && (
          <div className="matcher-empty">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="var(--border-secondary)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M20 20l8 8M28 20l-8 8" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p>Pick a use case above to see personalized model rankings</p>
          </div>
        )}
      </div>
    </div>
  );
}
