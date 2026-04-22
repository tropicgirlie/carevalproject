import { Check, X } from 'lucide-react';

export function License() {
  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Legal
        </div>
        <h1 className="text-deep-navy max-w-[720px]">CAREVAL Research Licence</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          CAREVAL is released under a custom research-use licence that permits
          open, attributed use while preventing misattribution, rebranding, and
          unlicensed commercial exploitation.
        </p>
      </section>

      {/* Copyright */}
      <section className="border border-border/60 bg-white p-6">
        <p className="text-[16px] text-deep-navy font-semibold mb-2">
          CAREVAL © Luana Micheau, 2024–2025
        </p>
        <p className="text-[16px] text-slate-grey leading-6">
          This work is released under a <strong className="text-deep-navy">CAREVAL Research Use Licence</strong>.
        </p>
      </section>

      {/* Licence split */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="border border-border/60 bg-white p-6">
          <h2 className="text-[16px] font-semibold text-deep-navy mb-3">Benchmark licence</h2>
          <p className="text-[16px] text-slate-grey leading-6">
            The benchmark prompts, scoring rubric, and evaluation methodology are
            freely available for research, evaluation, auditing, and non-commercial
            analysis. You must attribute CAREVAL in any published work that uses
            these materials.
          </p>
        </div>
        <div className="border border-border/60 bg-white p-6">
          <h2 className="text-[16px] font-semibold text-deep-navy mb-3">Rubric and dataset licence</h2>
          <p className="text-[16px] text-slate-grey leading-6">
            The annotation rubric, rating template, and structured dataset
            (including rubric.json) may be used for research purposes. You may not
            incorporate them into proprietary scoring products or commercial
            evaluation services without explicit permission.
          </p>
        </div>
      </section>

      {/* You may */}
      <section className="border border-border/60 bg-white p-6">
        <h2 className="text-[16px] font-semibold text-deep-navy mb-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-sage-green/10 flex items-center justify-center">
            <Check className="w-4 h-4 text-sage-green" />
          </div>
          You may:
        </h2>
        <ul className="space-y-3">
          {[
            'Use CAREVAL for research, evaluation, auditing, and non-commercial analysis',
            'Cite CAREVAL in academic papers, reports, and internal documents',
            'Adapt prompts for domain-specific research, provided the original framework is credited',
            'Share CAREVAL materials with attribution and a link to the original source',
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <Check className="w-4 h-4 text-sage-green flex-shrink-0 mt-0.5" />
              <span className="text-[16px] text-slate-grey leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* You may not */}
      <section className="border border-border/60 bg-white p-6">
        <h2 className="text-[16px] font-semibold text-deep-navy mb-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-error-red/10 flex items-center justify-center">
            <X className="w-4 h-4 text-error-red" />
          </div>
          You may not:
        </h2>
        <ul className="space-y-3">
          {[
            'Present CAREVAL as your own framework',
            'Rename or rebrand CAREVAL or its scoring dimensions',
            'Train proprietary systems on CAREVAL without explicit permission',
            'Offer CAREVAL as part of a paid product, consultancy, or certification without licence',
            'Remove or obscure attribution notices from any CAREVAL materials',
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <X className="w-4 h-4 text-error-red flex-shrink-0 mt-0.5" />
              <span className="text-[16px] text-slate-grey leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Required attribution */}
      <section className="border border-border/60 bg-white p-6">
        <h2 className="text-[16px] font-semibold text-deep-navy mb-4">Required Attribution</h2>
        <div className="bg-[#f4f6fb] p-5 border-l-4 border-primary">
          <p className="font-mono text-[16px] text-deep-navy">
            "CAREVAL: Care-Blindness Evaluation Benchmark, Luana Micheau (MomOps), 2024"
          </p>
        </div>
      </section>

      {/* Derivative works */}
      <section className="border border-border/60 bg-white p-6">
        <h2 className="text-[16px] font-semibold text-deep-navy mb-4">Derivative Works Must:</h2>
        <ul className="space-y-3">
          {[
            'Clearly state they are derived from CAREVAL',
            'Link back to the original CAREVAL source',
            'Preserve original terminology and scoring logic',
            'Apply the same or more restrictive licence terms',
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-[16px]">
                {idx + 1}
              </span>
              <span className="text-[16px] text-slate-grey leading-6 pt-0.5">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Commercial licensing */}
      <section className="bg-deep-navy text-white p-6">
        <h2 className="text-[16px] font-semibold mb-3">Commercial Licensing</h2>
        <p className="text-[16px] text-[#d6dcef] leading-6 mb-4">
          If you wish to use CAREVAL in a commercial product, consultancy, or
          certification programme, please contact us to discuss a commercial
          licence.
        </p>
        <a
          href="mailto:careval@momops.org"
          className="text-[16px] uppercase tracking-[0.12em] text-white/90 hover:text-white"
        >
          careval@momops.org →
        </a>
      </section>

      {/* Plain-language summary */}
      <section className="border border-border/60 bg-[#f4f6fb] p-6">
        <h3 className="text-[16px] font-semibold text-deep-navy mb-3">Plain-language summary</h3>
        <p className="text-[16px] text-slate-grey leading-6">
          CAREVAL is free to use for research and evaluation. You must credit the
          work properly, and you can't sell it or claim it as yours. If you want
          to use it commercially, get in touch for a licence. This keeps CAREVAL
          open whilst ensuring proper attribution and preventing misuse.
        </p>
      </section>
    </div>
  );
}