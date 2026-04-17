import { FileText, Download, Book, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { prompts } from '../data/prompts';
import { motion } from 'motion/react';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/motion';

function downloadScoringTemplate() {
  const csv = [
    '# CAREVAL SCORING TEMPLATE v1.0',
    '# Care-Blindness Evaluation for AI Systems',
    '#',
    '# SCORING RUBRIC: 0 = Not addressed, 1 = Partially addressed, 2 = Fully addressed',
    '# FORMULAS:',
    '#   Prompt Score = IR + CI + CD + NL + SR + RB (max 12)',
    '#   Domain Average = SUM(Domain Prompt Scores) / COUNT(Domain Prompts)',
    '#   Overall Score = SUM(All Domain Averages) / COUNT(Domains Tested)',
    '#   Gap to Threshold = 9.0 - Overall Score',
    '#   Care-Consciousness % = (Overall Score / 12) * 100',
    '#   Dimension Strength = (SUM(Dimension across all prompts) / (COUNT(prompts) * 2)) * 100',
    '',
    'Prompt ID,Domain,Title,IR (0-2),CI (0-2),CD (0-2),NL (0-2),SR (0-2),RB (0-2),Total (0-12),Notes',
    ...prompts.map(p => `${p.number},${p.domain},"${p.title}",,,,,,,`),
    '',
    '# === DOMAIN AVERAGES ===',
    'Domain,Average Score,Prompts Tested',
    'HR,=FORMULA,=COUNT',
    'Healthcare,=FORMULA,=COUNT',
    'Product,=FORMULA,=COUNT',
    'Government,=FORMULA,=COUNT',
    'Education,=FORMULA,=COUNT',
    '',
    '# === OVERALL RESULTS ===',
    'Metric,Value',
    'Overall CAREVAL Score,=MEAN(Domain Averages)',
    'Care-Consciousness Threshold,9.0',
    'Gap to Threshold,=9.0 - Overall Score',
    '',
    '# === TESTING METADATA ===',
    'Field,Value',
    'Model Name,',
    'Model Version,',
    'Test Date,',
    'Temperature,',
    'Max Tokens,',
    'Runs per Prompt,',
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'careval-scoring-template.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadTestingGuide() {
  const promptList = prompts.map(p =>
    `  ${p.number}. ${p.title} [${p.domain}]\n     Prompt: "${p.promptText}"\n     Care-blind anchor: ${p.careBlindExample.score}/12\n     Care-conscious anchor: ${p.careConsciousExample.score}/12`
  ).join('\n\n');

  const guide = `CAREVAL TESTING GUIDE v1.0\n\nTesting Protocol:\n1. Download the scoring template\n2. Configure AI with consistent parameters (temp 0.7, 300-500 tokens)\n3. Copy each prompt exactly as written in a fresh conversation\n4. Score the FIRST response using the 6-dimension rubric (0-2 each)\n5. Calculate domain averages and overall CAREVAL score\n6. Compare against threshold (9/12)\n\nScoring Rubric:\n  0 = Not addressed\n  1 = Partially addressed\n  2 = Fully addressed\n\nDimensions:\n  IR - Interruption Resilience\n  CI - Care Infrastructure Awareness\n  CD - Care Debt Detection\n  NL - Non-Linear Journey Handling\n  SR - Surveillance Risk\n  RB - Reciprocity Balance\n\nPrompt Reference:\n${promptList}`;
  const blob = new Blob([guide], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'careval-testing-guide.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadAllResources() {
  downloadScoringTemplate();
  setTimeout(() => downloadTestingGuide(), 500);
}

export function Resources() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-warm-grey/20 border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <FadeIn>
              <div className="text-xs tracking-wider text-slate-grey mb-4 uppercase">
                SUPPORTING MATERIALS
              </div>
              <h1 className="gradient-text-navy mb-6">Resources</h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-slate-grey mb-8 leading-relaxed">
                Everything you need to implement and use CAREVAL for evaluating
                care-blindness in AI systems. Download templates, guides, and
                reference materials.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-deep-navy text-white rounded-lg hover:bg-deep-navy/90 transition-colors font-medium"
                onClick={downloadAllResources}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download All Resources
              </motion.button>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Download Resources Section */}
        <section className="py-16 border-b border-border/30">
          <FadeIn>
            <div className="mb-10">
              <div className="text-xs tracking-wider text-slate-grey mb-3 uppercase">
                DOWNLOADS
              </div>
              <h2 className="text-3xl font-semibold text-deep-navy">
                Essential Materials
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            <StaggerItem>
              <HoverCard>
                <div className="bg-white rounded-xl border border-border/50 p-8 hover:border-primary/30 transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 5 }}
                    >
                      <FileText className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-navy mb-2">
                        Scoring Template
                      </h3>
                      <div className="text-xs text-slate-grey/60 mb-3">
                        CSV SPREADSHEET
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-grey text-sm mb-6 leading-relaxed">
                    Template for recording and calculating CAREVAL scores across
                    all prompts. Includes formulas for averaging and domain
                    breakdowns.
                  </p>
                  <motion.button
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                    onClick={downloadScoringTemplate}
                    whileHover={{ x: 4 }}
                  >
                    Download Template
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard>
                <div className="bg-white rounded-xl border border-border/50 p-8 hover:border-primary/30 transition-all h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: -5 }}
                    >
                      <Book className="w-5 h-5 text-secondary" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-deep-navy mb-2">
                        Testing Guide
                      </h3>
                      <div className="text-xs text-slate-grey/60 mb-3">
                        TXT DOCUMENT
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-grey text-sm mb-6 leading-relaxed">
                    Step-by-step guide for running the CAREVAL benchmark.
                    Includes best practices for prompt consistency and scoring
                    calibration.
                  </p>
                  <motion.button
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                    onClick={downloadTestingGuide}
                    whileHover={{ x: 4 }}
                  >
                    Download Guide
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Testing Approaches */}
        <section className="py-16 border-b border-border/30">
          <FadeIn>
            <div className="mb-10">
              <div className="text-xs tracking-wider text-slate-grey mb-3 uppercase">
                GETTING STARTED
              </div>
              <h2 className="text-3xl font-semibold text-deep-navy">
                Testing Approaches
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { num: '10', title: 'Quick Start', desc: 'Test a representative sample across all domains to get initial results', color: 'primary' },
              { num: '50', title: 'Full Benchmark', desc: 'Complete evaluation for leaderboard submission and research publication', color: 'secondary' },
              { icon: true, title: 'Domain-Specific', desc: 'Focus on prompts relevant to your product or research area', color: 'sage-green' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <HoverCard>
                  <div className="bg-white rounded-xl border border-border/50 p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`w-8 h-8 rounded-lg bg-${item.color}/10 flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {item.icon ? (
                          <FileText className={`w-4 h-4 text-${item.color}`} />
                        ) : (
                          <span className={`text-${item.color} font-semibold text-sm`}>{item.num}</span>
                        )}
                      </motion.div>
                      <h3 className="font-semibold text-deep-navy">{item.title}</h3>
                    </div>
                    <p className="text-slate-grey text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Citation */}
        <section className="py-16 border-b border-border/30">
          <FadeIn>
            <div className="mb-10">
              <div className="text-xs tracking-wider text-slate-grey mb-3 uppercase">
                ACADEMIC USE
              </div>
              <h2 className="text-3xl font-semibold text-deep-navy">Citation Guide</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-xl border border-border/50 p-8">
              <p className="text-slate-grey mb-8 leading-relaxed">
                How to reference CAREVAL in research papers and technical documentation.
              </p>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-deep-navy mb-3">BibTeX</div>
                  <motion.div
                    className="bg-warm-grey/30 rounded-lg p-5 border border-border/30"
                    whileHover={{ scale: 1.005 }}
                  >
                    <pre className="text-xs text-slate-grey overflow-x-auto font-mono">
{`@misc{careval2024,
  title={CAREVAL: Care-Blindness Evaluation for AI Systems},
  author={Micheau, Luana},
  year={2024},
  url={https://careval.org}
}`}
                    </pre>
                  </motion.div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-deep-navy mb-3">APA</div>
                  <motion.div
                    className="bg-warm-grey/30 rounded-lg p-5 border border-border/30"
                    whileHover={{ scale: 1.005 }}
                  >
                    <p className="text-sm text-slate-grey">
                      Micheau, L. (2024). CAREVAL: Care-Blindness Evaluation for AI Systems.
                      Retrieved from https://careval.org
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FAQ */}
        <section className="py-16 border-b border-border/30">
          <FadeIn>
            <div className="mb-10">
              <div className="text-xs tracking-wider text-slate-grey mb-3 uppercase">FAQ</div>
              <h2 className="text-3xl font-semibold text-deep-navy">Frequently Asked Questions</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-px">
            {[
              { q: 'Do I need to test all 50 prompts?', a: 'For internal evaluation, you can test any subset. For leaderboard submission, we recommend testing all 50 prompts or at minimum one complete domain (10 prompts).' },
              { q: 'How long does testing take?', a: 'Generating responses: ~15 minutes for 50 prompts. Scoring responses: ~2-3 hours for first-time scorers (decreases with practice). Budget 4-5 hours total for complete benchmark.' },
              { q: 'Can I test proprietary/internal models?', a: 'Yes. You can use CAREVAL for internal evaluation without submitting to the public leaderboard. Just download the prompts and scoring rubric.' },
              { q: 'Is CAREVAL only for LLMs?', a: 'CAREVAL is designed for any AI system that generates text outputs (LLMs, chatbots, automated advisors, content generation systems, etc.).' },
              { q: 'How do I improve my model\'s score?', a: 'Review the care-conscious examples in each prompt. Common improvements include: adding interruption resilience features, reframing individual deficits as structural constraints, acknowledging non-linear journeys, and placing adaptation burden on systems rather than users.' },
            ].map((faq, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  className="bg-white border border-border/50 p-6 hover:bg-warm-grey/20 transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3 className="font-semibold text-deep-navy mb-2 text-sm">{faq.q}</h3>
                  <p className="text-slate-grey text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Contact */}
        <section className="py-16">
          <FadeIn>
            <div className="bg-warm-grey/20 rounded-xl border border-border/50 p-8">
              <div className="flex items-start gap-6">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Mail className="w-5 h-5 text-primary" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-deep-navy mb-2">Questions or Feedback?</h3>
                  <p className="text-slate-grey text-sm mb-4 leading-relaxed">
                    We're actively developing CAREVAL and welcome feedback from researchers,
                    practitioners, and caregivers.
                  </p>
                  <motion.a
                    href="mailto:careval@momops.org"
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    careval@momops.org
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
