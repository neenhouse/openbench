import './Methodology.css';

export function Methodology() {
  return (
    <div className="methodology">
      <div className="container">
        <div className="page-header">
          <h1>Our Methodology</h1>
          <p>
            Transparency is our core principle. Here's exactly how we test, score, and rank AI models.
          </p>
        </div>

        <div className="method-sections">
          {/* Principles */}
          <section className="method-block">
            <div className="method-block-header">
              <span className="method-num mono">01</span>
              <h2>Core Principles</h2>
            </div>
            <div className="principle-grid">
              <div className="principle-card">
                <h3>Independence</h3>
                <p>
                  We accept no funding from AI model providers. Our infrastructure is funded by community
                  donations and academic compute grants. No model gets special treatment.
                </p>
              </div>
              <div className="principle-card">
                <h3>Reproducibility</h3>
                <p>
                  Every test run includes the full prompt, parameters (temperature, top_p, max_tokens),
                  timestamp, and API version. Anyone can reproduce our results.
                </p>
              </div>
              <div className="principle-card">
                <h3>Transparency</h3>
                <p>
                  Our test suite, scoring rubrics, and raw results are all open source. We publish
                  methodology updates before they take effect, with community review periods.
                </p>
              </div>
              <div className="principle-card">
                <h3>Fairness</h3>
                <p>
                  All models are tested under identical conditions — same prompts, same evaluation criteria,
                  same timeframes. No model-specific optimization.
                </p>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="method-block">
            <div className="method-block-header">
              <span className="method-num mono">02</span>
              <h2>Test Categories</h2>
            </div>
            <div className="category-list">
              {[
                {
                  name: 'Coding',
                  prompts: 480,
                  desc: 'Code generation, debugging, refactoring, code review, and multi-file architecture tasks across Python, TypeScript, Rust, Go, and SQL.',
                },
                {
                  name: 'Reasoning',
                  prompts: 520,
                  desc: 'Logic puzzles, mathematical proofs, causal reasoning, spatial reasoning, and multi-step deduction chains of increasing complexity.',
                },
                {
                  name: 'Creativity',
                  prompts: 380,
                  desc: 'Creative writing, brainstorming, analogy generation, humor, and open-ended problem solving requiring novel approaches.',
                },
                {
                  name: 'Speed',
                  prompts: 240,
                  desc: 'Time-to-first-token and tokens-per-second across varying prompt lengths. Measured at p50 and p95 latencies.',
                },
                {
                  name: 'Cost Efficiency',
                  prompts: 240,
                  desc: 'Quality-per-dollar metric combining output quality scores with actual API pricing at time of testing.',
                },
                {
                  name: 'Overall',
                  prompts: 540,
                  desc: 'Composite score using weighted average: Reasoning (25%), Coding (25%), Creativity (20%), Speed (15%), Cost (15%).',
                },
              ].map((cat) => (
                <div key={cat.name} className="category-item">
                  <div className="category-header">
                    <h3>{cat.name}</h3>
                    <span className="category-count mono">{cat.prompts} prompts</span>
                  </div>
                  <p>{cat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="method-block">
            <div className="method-block-header">
              <span className="method-num mono">03</span>
              <h2>Testing Process</h2>
            </div>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-marker mono">A</div>
                <div className="step-content">
                  <h3>Prompt Selection</h3>
                  <p>
                    Our prompt committee reviews and selects test prompts quarterly. Each prompt is
                    categorized by difficulty (easy, medium, hard, expert) and validated by at least
                    3 independent reviewers.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-marker mono">B</div>
                <div className="step-content">
                  <h3>Parallel Execution</h3>
                  <p>
                    All models receive the same prompts simultaneously with standardized parameters:
                    temperature 0.7, top_p 0.95, max_tokens sufficient for full response. 3 runs per
                    prompt for consistency.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-marker mono">C</div>
                <div className="step-content">
                  <h3>Blind Evaluation</h3>
                  <p>
                    Outputs are anonymized and evaluated by a panel of domain experts. Evaluators
                    score on accuracy, completeness, clarity, and usefulness without knowing which
                    model produced the output.
                  </p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-marker mono">D</div>
                <div className="step-content">
                  <h3>Score Aggregation</h3>
                  <p>
                    Scores are aggregated using trimmed means (removing top and bottom 10% of evaluations)
                    to reduce outlier bias. Final scores are normalized to 0-100 scale with statistical
                    confidence intervals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="method-block">
            <div className="method-block-header">
              <span className="method-num mono">04</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <h3>How often are benchmarks updated?</h3>
                <p>
                  We run full benchmark suites monthly and publish results within 48 hours. When a major
                  new model is released, we fast-track testing and publish preliminary results within
                  one week.
                </p>
              </div>
              <div className="faq-item">
                <h3>Can I contribute test prompts?</h3>
                <p>
                  Yes! Submit prompts through our GitHub repository. Each submission goes through peer
                  review by our prompt committee before being included in the test suite.
                </p>
              </div>
              <div className="faq-item">
                <h3>Why don't you test [specific model]?</h3>
                <p>
                  We test models that have publicly accessible APIs with consistent pricing. If a model
                  you want tested isn't included, open a GitHub issue and we'll evaluate adding it.
                </p>
              </div>
              <div className="faq-item">
                <h3>Are your results trustworthy?</h3>
                <p>
                  Every single benchmark run is logged and publicly available. You can reproduce any
                  result yourself. We also publish our evaluator agreements rates (currently 87% inter-rater
                  reliability).
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
