import { describe, it, expect } from 'vitest';
import { models, scoreLabels, useCases } from './models';

describe('models data', () => {
  it('has at least 10 models', () => {
    expect(models.length).toBeGreaterThanOrEqual(10);
  });

  it('each model has valid scores between 0 and 100', () => {
    for (const model of models) {
      for (const [key, value] of Object.entries(model.scores)) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
        expect(typeof value).toBe('number');
      }
    }
  });

  it('each model has unique id', () => {
    const ids = models.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each model has required fields', () => {
    for (const model of models) {
      expect(model.name).toBeTruthy();
      expect(model.provider).toBeTruthy();
      expect(model.contextWindow).toBeTruthy();
      expect(model.pricing).toBeTruthy();
    }
  });

  it('scoreLabels covers all score keys', () => {
    const keys = Object.keys(models[0].scores);
    for (const key of keys) {
      expect(scoreLabels).toHaveProperty(key);
    }
  });
});

describe('useCases data', () => {
  it('has at least 5 use cases', () => {
    expect(useCases.length).toBeGreaterThanOrEqual(5);
  });

  it('each use case has valid weights', () => {
    for (const uc of useCases) {
      const totalWeight = Object.values(uc.weights).reduce((a, b) => a + b, 0);
      expect(totalWeight).toBeGreaterThan(0);
    }
  });
});
