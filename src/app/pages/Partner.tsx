import { Mail, ArrowRight, Briefcase, Scale, Shield, Landmark, FlaskConical, FileText } from 'lucide-react';

export function Partner() {
  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Work with us
        </div>
        <h1 className="text-deep-navy max-w-[720px]">Partner with CAREVAL</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          CAREVAL collaborates with AI labs, foundations, policy bodies, and care-sector
          organisations on third-party evaluation of AI systems in care contexts. Every
          engagement is structured to preserve the independence of the public leaderboard.
        </p>
        <div className="flex gap-3 pt-1">
          <a
            href="mailto:careval@momops.org?subject=Partnership%20inquiry"
            className="px-5 py-3 bg-deep-navy text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-deep-navy/90 transition-colors inline-flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            Start a conversation
          </a>
        </div>
      </section>

      {/* Section 1 — Independence & Disclosure */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 1</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Independence and disclosure</h2>
        <div className="bg-white border border-border/50 p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-deep-navy mt-0.5 shrink-0" />
            <p className="text-[16px] text-slate-grey leading-6">
              CAREVAL&apos;s leaderboard ranks model behavior, not sponsors. Funders, lab
              partners, and donors never see results pre-publication, never review or amend
              scoring, and have no editorial influence over which prompts, dimensions, or
              models we evaluate.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Scale className="w-5 h-5 text-deep-navy mt-0.5 shrink-0" />
            <p className="text-[16px] text-slate-grey leading-6">
              Every paid engagement is published in a public ledger on this site —
              engagement type, funder, period, and any prompts contributed. Models from
              labs that fund custom evaluation work are scored on the same public rubric
              as everyone else, by the same raters, with no preferential treatment.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <FileText className="w-5 h-5 text-deep-navy mt-0.5 shrink-0" />
            <p className="text-[16px] text-slate-grey leading-6">
              Where a partner contributes prompts, those prompts enter the public library
              under the same license as all other CAREVAL materials. Embargoes on
              custom-engagement results are bounded (typically 30–90 days) and disclosed
              up front.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Engagements */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 2</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">How we work together</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="border border-border/60 bg-white p-5">
            <FlaskConical className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Custom domain evaluations</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Bespoke prompt sets and rubrics for AI labs and product teams who need
              third-party assessment of model behavior in care, health, or regulated
              domains. Results published openly after any agreed embargo.
            </p>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <Landmark className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Research grants and policy work</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Foundation- and government-funded research on care-economy AI, methodology
              development, and public-interest evaluation infrastructure. Open
              deliverables, public methodology, citable outputs.
            </p>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <Briefcase className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Advisory and review</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Methodology consultation, rubric design, and red-team support for
              organisations building or deploying AI in care contexts. Structured as
              defined-scope retainers.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Process */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 3</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Engagement process</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { step: '01', title: 'Inquiry', desc: 'Email a short brief — domain, goal, timeline, and any constraints. We respond within five business days.' },
            { step: '02', title: 'Scoping', desc: 'A 30-minute call to align on what is in and out of scope. We share a one-page proposal with deliverables, timeline, and cost.' },
            { step: '03', title: 'Evaluation', desc: 'Blind evaluation against the agreed rubric, with progress checkpoints. No partner access to scoring during the run.' },
            { step: '04', title: 'Publication', desc: 'Findings delivered to partner first, then published on this site under the disclosure policy after the embargo (if any).' },
          ].map((item) => (
            <div key={item.step} className="border border-border/60 bg-white p-5">
              <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mb-2">{item.step}</p>
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">{item.title}</h3>
              <p className="text-[16px] leading-5 text-slate-grey">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Who we work with */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 4</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Who we work with</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="border border-border/60 bg-white p-5">
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">AI labs and frontier developers</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Safety, policy, and product teams commissioning third-party evaluation of
              model behavior in care contexts to back up safety claims or inform
              deployment decisions.
            </p>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Foundations and public funders</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Funders working on responsible AI, care economy, gender and technology, or
              health equity. Open to fiscal sponsorship arrangements where required.
            </p>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Policy bodies and regulators</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Standards bodies, regulators, and policy researchers who need eval
              methodology and reference benchmarks for care-related AI deployments.
            </p>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Care-sector organisations</h3>
            <p className="text-[16px] leading-5 text-slate-grey">
              Childcare networks, eldercare providers, healthcare systems, and unions
              evaluating AI tools that affect care workers and the people they support.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — Public ledger */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 5</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Public engagement ledger</h2>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          Every paid engagement and grant is recorded here. The ledger lists the type
          of work, the funder, the engagement period, and any prompts or materials
          contributed to the public library.
        </p>
        <div className="bg-white border border-border/50 overflow-x-auto">
          <table className="w-full text-[16px]">
            <thead>
              <tr className="border-b border-border/50 text-slate-grey">
                <th className="text-left p-4 tracking-[0.12em] uppercase font-semibold">Period</th>
                <th className="text-left p-4 tracking-[0.12em] uppercase font-semibold">Funder</th>
                <th className="text-left p-4 tracking-[0.12em] uppercase font-semibold">Engagement</th>
                <th className="text-left p-4 tracking-[0.12em] uppercase font-semibold">Contributions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-grey">
                  No engagements to disclose at this time. CAREVAL has received no paid
                  engagements or grants to date. This row will be replaced with the first
                  entry once funded work begins.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6 — Contact */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 6</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Get in touch</h2>
        <div className="border border-border/60 bg-white p-6">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-deep-navy mt-0.5" />
            <div>
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Partnership inquiries</h3>
              <p className="text-[16px] text-slate-grey leading-6 mb-3">
                Send a short brief describing the domain, goal, timeline, and any
                constraints. We respond within five business days.
              </p>
              <a
                href="mailto:careval@momops.org?subject=Partnership%20inquiry"
                className="inline-flex items-center gap-2 text-[16px] uppercase tracking-[0.12em] text-deep-navy hover:text-primary"
              >
                careval@momops.org
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
