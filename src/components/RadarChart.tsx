import type { AIModel, ScoreKey } from '../data/models';
import { scoreLabels } from '../data/models';
import './RadarChart.css';

interface RadarChartProps {
  models: AIModel[];
  size?: number;
}

const categories: ScoreKey[] = ['coding', 'reasoning', 'creativity', 'speed', 'cost'];

export function RadarChart({ models, size = 300 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (2 * Math.PI) / categories.length;

  function getPoint(index: number, value: number): [number, number] {
    const angle = (index * angleStep) - Math.PI / 2;
    const r = (value / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  function getPolygonPoints(scores: AIModel['scores']): string {
    return categories
      .map((cat, i) => getPoint(i, scores[cat]).join(','))
      .join(' ');
  }

  const gridLevels = [20, 40, 60, 80, 100];
  const colors = ['#06B6D4', '#F97316', '#8B5CF6'];

  return (
    <div className="radar-chart">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {/* Grid */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={categories
              .map((_, i) => getPoint(i, level).join(','))
              .join(' ')}
            fill="none"
            stroke="var(--border-primary)"
            strokeWidth="1"
            opacity={level === 100 ? 0.6 : 0.3}
          />
        ))}

        {/* Axes */}
        {categories.map((_, i) => {
          const [x, y] = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--border-primary)"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Data polygons */}
        {models.map((model, mi) => (
          <polygon
            key={model.id}
            points={getPolygonPoints(model.scores)}
            fill={colors[mi % colors.length]}
            fillOpacity="0.1"
            stroke={colors[mi % colors.length]}
            strokeWidth="2"
          />
        ))}

        {/* Data points */}
        {models.map((model, mi) =>
          categories.map((cat, ci) => {
            const [x, y] = getPoint(ci, model.scores[cat]);
            return (
              <circle
                key={`${model.id}-${cat}`}
                cx={x}
                cy={y}
                r="4"
                fill={colors[mi % colors.length]}
              />
            );
          })
        )}

        {/* Labels */}
        {categories.map((cat, i) => {
          const [x, y] = getPoint(i, 115);
          return (
            <text
              key={cat}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--text-secondary)"
              fontSize="12"
              fontFamily="var(--font-sans)"
            >
              {scoreLabels[cat]}
            </text>
          );
        })}
      </svg>

      <div className="radar-legend">
        {models.map((model, mi) => (
          <div key={model.id} className="radar-legend-item">
            <span
              className="radar-legend-dot"
              style={{ background: colors[mi % colors.length] }}
            />
            <span className="radar-legend-label">{model.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
