import { Link } from 'react-router-dom';

export function LandingAlt() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl font-bold text-deep-navy mb-6 leading-tight">
                Uncovering Systemic Bias in Artificial Intelligence
              </h1>
              <p className="text-lg text-slate-grey mb-8 leading-relaxed">
                CAREVAL is a rigorous benchmark for detecting care-blindness in large language models. We provide the tools to measure and rigorously evaluate biases in AI systems that harm caregivers and care-requiring contexts.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/prompts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-deep-navy text-white rounded-lg hover:bg-deep-navy/90 transition-colors font-medium"
                >
                  Explore the Benchmark
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-deep-navy text-deep-navy rounded-lg hover:bg-deep-navy hover:text-white transition-colors font-medium">
                  Read the Whitepaper
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-warm-grey/20 rounded-2xl border border-border/50 p-8">
              <div className="text-xs tracking-wider text-slate-grey mb-4 uppercase">
                Real-Life Use At
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <div className="text-sm text-slate-grey">Fortune 500 Chatbot</div>
                  <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">LOW</div>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <div className="text-sm text-slate-grey">Open Source AI</div>
                  <div className="text-xs text-secondary font-medium bg-secondary/10 px-3 py-1 rounded-full">MEDIUM</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-grey">Premium AI Assistant</div>
                  <div className="text-xs text-red-600 font-medium bg-red-100 px-3 py-1 rounded-full">HIGH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Overview Section */}
      <section className="py-20 bg-warm-grey/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-xs tracking-wider text-slate-grey mb-3 uppercase">
              At-a-glance metrics
            </div>
            <h2 className="text-4xl font-bold text-deep-navy mb-4">
              Benchmark Overview
            </h2>
            <p className="text-lg text-slate-grey max-w-2xl">
              CAREVAL's early foundation reveals key structural biases across leading AI systems. Each score represents deep problems rooted in care blindness across all evaluation categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Care Framework Failure Rate */}
            <div className="bg-white rounded-xl border border-border/50 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs tracking-wider text-slate-grey mb-2 uppercase">
                    Care Framework Failure Rate
                  </div>
                  <div className="text-sm text-slate-grey mb-4">
                    Average Across Evaluated Models
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-grey/60">Median</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-6xl font-bold text-deep-navy mb-2">82%</div>
                <div className="text-sm text-slate-grey mb-4">
                  <span className="font-semibold text-deep-navy">Systemic Blindness</span>
                </div>
                <p className="text-sm text-slate-grey leading-relaxed">
                  AI systems fail to recognize care contexts in over 4 out of 5 prompts, treating caregiving as individual problems rather than structural realities.
                </p>
              </div>

              <div className="pt-4 border-t border-border/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-grey">Lowest: 67% (Best Model)</span>
                  <span className="text-slate-grey/60">Highest: 94%</span>
                </div>
              </div>
            </div>

            {/* Care Penalty Multiplier */}
            <div className="bg-white rounded-xl border border-border/50 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs tracking-wider text-slate-grey mb-2 uppercase">
                    Care Penalty Multiplier
                  </div>
                  <div className="text-sm text-slate-grey mb-4">
                    Productivity Bias Impact
                  </div>
                </div>
                <div className="flex gap-2">
                  <TrendingUp className="w-4 h-4 text-red-600" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-6xl font-bold text-deep-navy mb-2">3.5x</div>
                <div className="text-sm text-slate-grey mb-4">
                  <span className="font-semibold text-deep-navy">Amplified Burden</span>
                </div>
                <p className="text-sm text-slate-grey leading-relaxed">
                  AI responses place 3.5 times more adaptation burden on caregivers compared to non-care contexts, increasing rather than reducing systemic inequality.
                </p>
              </div>

              <div className="pt-4 border-t border-border/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-grey">Range: 2.1x - 5.8x</span>
                  <span className="text-red-600 font-medium">Worsening Trend</span>
                </div>
              </div>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="bg-white rounded-xl border border-border/50 p-8">
            <div className="mb-6">
              <h3 className="font-semibold text-deep-navy mb-2">Domain Failure Rates</h3>
              <p className="text-sm text-slate-grey">
                Care-blindness severity varies by domain, but remains critically high across all sectors where caregiving contexts appear.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { domain: 'Human Resources', rate: 89, color: 'primary' },
                { domain: 'Healthcare', rate: 85, color: 'secondary' },
                { domain: 'Education', rate: 78, color: 'sage-green' },
                { domain: 'Product Design', rate: 81, color: 'primary' },
                { domain: 'Government Services', rate: 76, color: 'secondary' }
              ].map((item) => (
                <div key={item.domain} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-slate-grey flex-shrink-0">{item.domain}</div>
                  <div className="flex-1">
                    <div className="bg-warm-grey/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`bg-${item.color} h-full rounded-full`}
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm font-semibold text-deep-navy text-right">{item.rate}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is Care-Blindness Section */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs tracking-wider text-slate-grey mb-4 uppercase">
            Definition
          </div>
          <h2 className="text-4xl font-bold text-deep-navy mb-8">
            What is Care-Blindness?
          </h2>
          <p className="text-lg text-slate-grey leading-relaxed mb-6">
            Care-blindness is when AI systems fail to recognize or appropriately respond to caregiving contexts. It's not just an error. It is a structural bias that refrains problematic systems that marginalize care as an individual burden while reinforcing systems that center productivity, constant availability, and autonomy. Treating systems that require care-work as deficient rather than acknowledging the structural value of care.
          </p>
          <p className="text-slate-grey leading-relaxed">
            CAREVAL systematically measures this pattern of erasure across multiple domains and interaction types, providing evidence of structural blind spots in AI systems.
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-warm-grey/10 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-wider text-slate-grey mb-4 uppercase">
              Approach
            </div>
            <h2 className="text-4xl font-bold text-deep-navy mb-4">
              Our Methodology
            </h2>
            <p className="text-lg text-slate-grey max-w-2xl mx-auto">
              A comprehensive framework built on care ethics scholarship to track biases in AI systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Evaluation Curation */}
            <div className="bg-white rounded-xl border border-border/50 p-8">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-deep-navy mb-3">Eval Curation</h3>
              <p className="text-sm text-slate-grey leading-relaxed">
                We rigorously develop prompts capturing real-world care contexts (parenting, chronic illness, eldercare, disability support), explicitly testing how AI systems respond to caregiving situations vs. structurally similar non-care scenarios.
              </p>
            </div>

            {/* Evaluation Metrics */}
            <div className="bg-white rounded-xl border border-border/50 p-8">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-deep-navy mb-3">Evaluation Metrics</h3>
              <p className="text-sm text-slate-grey leading-relaxed">
                Each prompt is scored using standardized rubrics on multiple dimensions: care recognition, structural vs. individual framing, interruption resilience, adaptive burden placement, and representation of care ethics principles.
              </p>
            </div>

            {/* Bias Detection */}
            <div className="bg-white rounded-xl border border-border/50 p-8">
              <div className="w-12 h-12 rounded-lg bg-sage-green/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-sage-green" />
              </div>
              <h3 className="font-semibold text-deep-navy mb-3">Bias Detection</h3>
              <p className="text-sm text-slate-grey leading-relaxed">
                Using comparative scoring, we quantify biases by measuring divergent AI treatment of care vs. non-care contexts. Patterns reveal structural assumptions coded into models about productivity, autonomy, and whose time matters.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/methodology"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View Full Methodology
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Publications Section */}
      <section className="py-20 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-xs tracking-wider text-slate-grey mb-4 uppercase">
              Research
            </div>
            <h2 className="text-4xl font-bold text-deep-navy">
              Latest Publications
            </h2>
          </div>

          <div className="space-y-6">
            {/* Publication 1 */}
            <div className="bg-white rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-semibold text-deep-navy mb-2">
                    The CAREVAL Framework: A New Standard for Evaluating Care-Blindness in AI
                  </h3>
                  <p className="text-sm text-slate-grey mb-3">
                    L. Doe, K. Smith, R. Chen et al.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-grey/60 bg-warm-grey/30 px-3 py-1 rounded-full">
                    PREPRINT
                  </span>
                  <button className="p-2 hover:bg-warm-grey/30 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-slate-grey" />
                  </button>
                </div>
              </div>
            </div>

            {/* Publication 2 */}
            <div className="bg-white rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-semibold text-deep-navy mb-2">
                    Audit Report: LLMs and Care Work Valuation
                  </h3>
                  <p className="text-sm text-slate-grey mb-3">
                    R. Williams, M. Johnson
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-grey/60 bg-warm-grey/30 px-3 py-1 rounded-full">
                    PREPRINT
                  </span>
                  <button className="p-2 hover:bg-warm-grey/30 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-slate-grey" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/resources"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View All Publications
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Link to Original Landing */}
          <div className="text-center pt-12 border-t border-border/30 mt-16">
            <p className="text-sm text-slate-grey mb-3">Looking for a different layout?</p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-warm-grey/50 rounded-lg border border-border/50 text-deep-navy hover:bg-primary hover:text-white hover:border-primary transition-all font-medium"
            >
              View Original Landing Page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}