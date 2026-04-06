import './ScoreCell.css';

interface ScoreCellProps {
  value: number;
  showBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function getScoreColor(value: number): string {
  if (value >= 90) return 'var(--score-excellent)';
  if (value >= 80) return 'var(--score-good)';
  if (value >= 70) return 'var(--score-average)';
  return 'var(--score-poor)';
}

export function ScoreCell({ value, showBar = true, size = 'md' }: ScoreCellProps) {
  const color = getScoreColor(value);

  return (
    <div className={`score-cell score-cell--${size}`}>
      <span className="score-value mono" style={{ color }}>
        {value}
      </span>
      {showBar && (
        <div className="score-bar">
          <div
            className="score-bar-fill"
            data-excellent={value >= 90 ? 'true' : undefined}
            style={{ width: `${value}%`, background: color, color }}
          />
        </div>
      )}
    </div>
  );
}
