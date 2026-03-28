import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders header with OpenBench brand', () => {
    render(<App />);
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Bench')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<App />);
    // Use getAllBy since text may appear in both nav and footer
    expect(screen.getAllByText('Leaderboard').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Compare').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Use Cases')).toBeInTheDocument();
    expect(screen.getAllByText('Methodology').length).toBeGreaterThanOrEqual(1);
  });

  it('shows landing page by default', () => {
    render(<App />);
    expect(screen.getByText('The Truth About')).toBeInTheDocument();
  });

  it('navigates to leaderboard', () => {
    render(<App />);
    const navButtons = screen.getAllByText('Leaderboard');
    fireEvent.click(navButtons[0]);
    expect(screen.getByText('AI Model Leaderboard')).toBeInTheDocument();
  });

  it('navigates to compare page', () => {
    render(<App />);
    const navButtons = screen.getAllByText('Compare');
    fireEvent.click(navButtons[0]);
    expect(screen.getAllByText('Compare Models').length).toBeGreaterThanOrEqual(1);
  });

  it('navigates to methodology page', () => {
    render(<App />);
    const navButtons = screen.getAllByText('Methodology');
    fireEvent.click(navButtons[0]);
    expect(screen.getByText('Our Methodology')).toBeInTheDocument();
  });
});
