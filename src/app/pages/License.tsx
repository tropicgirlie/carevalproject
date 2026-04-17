import { Check, X } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/motion';

export function License() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <FadeIn>
          <h1 className="gradient-text-navy mb-4">
            CAREVAL Research Licence
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-xl text-slate-grey">
            Custom research licence for open, attributed use
          </p>
        </FadeIn>
      </div>

      <div className="space-y-8">
        {/* Copyright Notice */}
        <section className="bg-white rounded-2xl shadow-soft border border-border/50 p-8">
          <div className="space-y-4">
            <p className="text-lg text-deep-navy font-semibold">
              CAREVAL © Luana Micheau, 2024–2025
            </p>
            <p className="text-slate-grey leading-relaxed">
              This work is released under a <strong className="text-deep-navy">CAREVAL Research Use Licence</strong>.
            </p>
          </div>
        </section>

        {/* You May */}
        <section className="bg-white rounded-2xl shadow-soft border border-border/50 p-8">
          <h2 className="text-2xl font-semibold text-deep-navy mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage-green/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-sage-green" />
            </div>
            You may:
          </h2>
          <ul className="space-y-4">
            {[
              'Use CAREVAL for research, evaluation, auditing, and non-commercial analysis',
              'Cite CAREVAL in academic papers, reports, and internal documents'
            ].map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <Check className="w-5 h-5 text-sage-green flex-shrink-0 mt-0.5" />
                <span className="text-slate-grey leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* You May Not */}
        <section className="bg-white rounded-2xl shadow-soft border border-border/50 p-8">
          <h2 className="text-2xl font-semibold text-deep-navy mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-error-red/10 flex items-center justify-center">
              <X className="w-6 h-6 text-error-red" />
            </div>
            You may not:
          </h2>
          <ul className="space-y-4">
            {[
              'Present CAREVAL as your own framework',
              'Rename or rebrand CAREVAL or its scoring dimensions',
              'Train proprietary systems on CAREVAL without explicit permission',
              'Offer CAREVAL as part of a paid product, consultancy, or certification without licence'
            ].map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <X className="w-5 h-5 text-error-red flex-shrink-0 mt-0.5" />
                <span className="text-slate-grey leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Required Attribution */}
        <section className="bg-white rounded-2xl shadow-soft border border-border/50 p-8">
          <h2 className="text-2xl font-semibold text-deep-navy mb-6">
            Required Attribution
          </h2>
          <div className="bg-warm-grey/50 rounded-xl p-6 border-l-4 border-primary">
            <p className="font-mono text-deep-navy">
              "CAREVAL: Care-Blindness Evaluation Benchmark, Luana Micheau (MomOps), 2024"
            </p>
          </div>
        </section>

        {/* Derivative Works */}
        <section className="bg-white rounded-2xl shadow-soft border border-border/50 p-8">
          <h2 className="text-2xl font-semibold text-deep-navy mb-6">
            Derivative Works Must:
          </h2>
          <ul className="space-y-4">
            {[
              'Clearly state they are derived from CAREVAL',
              'Link back to careval.org',
              'Preserve original terminology and scoring logic'
            ].map((item, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-sm">
                  {idx + 1}
                </span>
                <span className="text-slate-grey leading-relaxed pt-1">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact for Licensing */}
        <section className="bg-gradient-accent rounded-2xl shadow-soft border border-primary/20 p-8">
          <h2 className="text-2xl font-semibold text-deep-navy mb-4">
            Commercial Licensing
          </h2>
          <p className="text-slate-grey mb-4 leading-relaxed">
            If you wish to use CAREVAL in a commercial product, consultancy, or certification programme, please contact us to discuss a commercial licence.
          </p>
          <a
            href="mailto:careval@momops.org"
            className="text-primary font-medium hover:underline"
          >
            careval@momops.org
          </a>
        </section>

        {/* Plain Language Summary */}
        <section className="bg-warm-grey/30 rounded-2xl border border-border/50 p-8">
          <h3 className="text-lg font-semibold text-deep-navy mb-4">
            Plain Language Summary
          </h3>
          <p className="text-slate-grey leading-relaxed">
            CAREVAL is free to use for research and evaluation. You must credit the work properly, 
            and you can't sell it or claim it as yours. If you want to use it commercially, 
            get in touch for a licence. This keeps CAREVAL open whilst ensuring proper attribution 
            and preventing misuse.
          </p>
        </section>
      </div>
    </div>
  );
}