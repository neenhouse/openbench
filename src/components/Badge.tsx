import './Badge.css';

interface BadgeProps {
  type: 'top-pick' | 'best-value' | 'fastest';
}

const badgeConfig = {
  'top-pick': { label: 'Top Pick', color: 'var(--accent-warm)' },
  'best-value': { label: 'Best Value', color: 'var(--accent-green)' },
  fastest: { label: 'Fastest', color: 'var(--accent-violet)' },
};

export function Badge({ type }: BadgeProps) {
  const config = badgeConfig[type];
  return (
    <span className="badge" style={{ '--badge-color': config.color } as React.CSSProperties}>
      {config.label}
    </span>
  );
}
