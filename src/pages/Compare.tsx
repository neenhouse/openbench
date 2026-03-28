import { useState } from 'react';
import { models, scoreLabels } from '../data/models';
import type { AIModel, ScoreKey } from '../data/models';
import { RadarChart } from '../components/RadarChart';
import { ScoreCell } from '../components/ScoreCell';
import './Compare.css';

export function Compare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'claude-opus-4',
    'gpt-4o',
    'gemini-2-ultra',
  ]);

  function toggleModel(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  }

  const selected: AIModel[] = selectedIds
    .map((id) => models.find((m) => m.id === id))
    .filter(Boolean) as AIModel[];

  const scoreKeys: ScoreKey[] = ['overall', 'coding', 'reasoning', 'creativity', 'speed', 'cost'];
  const colors = ['#06B6D4', '#F97316', '#8B5CF6'];

  function getWinner(key: ScoreKey): string | null {
    if (selected.length < 2) return null;
    let best = selected[0];
    for (const m of selected) {
      if (m.scores[key] > best.scores[key]) best = m;
    }
    return best.id;
  }

  return (
    <div className="compare">
      <div className="container">
        <div className="page-header">
          <h1>Compare Models</h1>
          <p>Select up to 3 models for side-by-side comparison</p>
        </div>

        {/* Model Selector */}
        <div className="model-selector">
          {models.map((model) => {
            const isSelected = selectedIds.includes(model.id);
            const idx = selectedIds.indexOf(model.id);
            return (
              <button
                key={model.id}
                className={`model-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleModel(model.id)}
                style={isSelected ? { borderColor: colors[idx], color: colors[idx] } : {}}
              >
                {model.name}
                <span className="chip-provider">{model.provider}</span>
              </button>
            );
          })}
        </div>

        {selected.length >= 2 ? (
          <>
            {/* Radar Chart */}
            <div className="compare-radar">
              <RadarChart models={selected} size={340} />
            </div>

            {/* Bar Charts */}
            <div className="compare-bars">
              {scoreKeys.map((key) => {
                const winner = getWinner(key);
                return (
                  <div key={key} className="bar-group">
                    <div className="bar-label">{scoreLabels[key]}</div>
                    {selected.map((model, mi) => (
                      <div
                        key={model.id}
                        className={`bar-row ${model.id === winner ? 'winner' : ''}`}
                      >
                        <span className="bar-model-name" style={{ color: colors[mi] }}>
                          {model.name}
                        </span>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${model.scores[key]}%`,
                              background: colors[mi],
                            }}
                          />
                        </div>
                        <span className="bar-value mono">{model.scores[key]}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Summary Table */}
            <div className="compare-summary">
              <h3>At a Glance</h3>
              <div className="summary-table-wrapper">
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th />
                      {selected.map((model, mi) => (
                        <th key={model.id} style={{ color: colors[mi] }}>
                          {model.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scoreKeys.map((key) => (
                      <tr key={key}>
                        <td className="summary-label">{scoreLabels[key]}</td>
                        {selected.map((model) => (
                          <td key={model.id} className={model.id === getWinner(key) ? 'winner-cell' : ''}>
                            <ScoreCell value={model.scores[key]} showBar={false} size="md" />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="meta-row">
                      <td className="summary-label">Context Window</td>
                      {selected.map((model) => (
                        <td key={model.id} className="mono">{model.contextWindow}</td>
                      ))}
                    </tr>
                    <tr className="meta-row">
                      <td className="summary-label">Pricing</td>
                      {selected.map((model) => (
                        <td key={model.id} className="pricing-cell">{model.pricing}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="compare-empty">
            <p>Select at least 2 models above to begin comparison</p>
          </div>
        )}
      </div>
    </div>
  );
}
