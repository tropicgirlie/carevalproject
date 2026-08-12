import { useState, type ReactNode } from 'react';
import {
  frontierModels,
  DIMENSION_META,
  PROMPT_LABELS,
  RUN_DATE,
  RUN_SOURCE,
  CARE_CONSCIOUS_THRESHOLD,
  type FrontierModel,
  type Grade,
} from '../data/frontierRun';
import { blindModels, BLIND_RUN_ID, BLIND_RUN_DATE } from '../data/frontierBlindRun';

const RUN_ID_TOLD = '2026-08-10-frontier-flagship-2026-08';

type Condition = 'blind' | 'told';

const GRADE_STYLES: Record<Grade, string> = {
  A: 'border-brand-teal text-brand-teal',
  B: 'border-brand-teal text-brand-teal',
  C: 'border-[#c99a1e] text-[#c99a1e]',
  D: 'border-[#eb5937] text-[#eb5937]',
  F: 'border-error-red text-error-red',
};

const MONO = "font-['SFMono-Regular',Menlo,Consolas,monospace]";

function GradeChip({ grade }: { grade: Grade }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 border-2 text-[1.15rem] font-semibold leading-none ${GRADE_STYLES[grade]}`}
      aria-label={`Grade ${grade}`}
    >
      {grade}
    </span>
  );
}

function DimensionBars({ model }: { model: FrontierModel }) {
  return (
    <div className="flex gap-2.5" role="img"
      aria-label={DIMENSION_META.map((d) => `${d.full} ${model.dimensions[d.key]} of 2`).join(', ')}>
      {DIMENSION_META.map((d) => {
        const value = model.dimensions[d.key];
        return (
          <div key={d.key} className="w-7" title={`${d.full}: ${value.toFixed(1)} / 2`}>
            <p className={`text-[10px] tracking-[0.08em] text-slate-grey/80 text-center mb-1 ${MONO}`}>
              {d.short}
            </p>
            <div className="h-[3px] bg-warm-grey">
              <div
                className={`h-[3px] ${value >= 1.5 ? 'bg-brand-teal' : value >= 0.8 ? 'bg-slate-grey' : 'bg-[#eb5937]'}`}
                style={{ width: `${(value / 2) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CcsGauge({ ccs }: { ccs: number }) {
  return (
    <div className="min-w-[110px]">
      <p className="leading-none">
        <span className="text-[1.5rem] font-semibold text-deep-navy">{ccs.toFixed(1)}</span>
        <span className="text-[13px] text-slate-grey"> / 12</span>
      </p>
      <div className="relative h-[3px] bg-warm-grey mt-2 w-full">
        <div className="h-[3px] bg-deep-navy" style={{ width: `${(ccs / 12) * 100}%` }} />
        <div
          className="absolute top-[-3px] h-[9px] w-[2px] bg-error-red"
          style={{ left: `${(CARE_CONSCIOUS_THRESHOLD / 12) * 100}%` }}
          title={`Care-conscious threshold: ${CARE_CONSCIOUS_THRESHOLD}/12`}
        />
      </div>
    </div>
  );
}

function ExpandedRow({ model }: { model: FrontierModel }) {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-6 px-5 md:px-8 py-6 bg-white border-t border-border/50">
      <div className="space-y-4">
        <p className="text-[15px] text-deep-navy leading-6 max-w-[560px]">{model.finding}</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PROMPT_LABELS).map(([id, label]) => {
            const score = model.promptScores[id];
            return (
              <div key={id} className="border border-border/70 px-3 py-2 min-w-[104px]">
                <p className={`text-[10px] uppercase tracking-[0.1em] text-slate-grey ${MONO}`}>{label}</p>
                {score === null || score === undefined ? (
                  <p className="text-[13px] text-error-red mt-0.5">truncated</p>
                ) : (
                  <p className="text-[15px] text-deep-navy mt-0.5 font-semibold">{score} / 12</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={`space-y-2 text-[13px] text-slate-grey ${MONO}`}>
        <p>{model.modelId}</p>
        <p>{model.version}</p>
        <p>{model.validPrompts} of {model.totalPrompts} responses scored</p>
        {model.toldCcs !== null && model.toldCcs !== undefined && (
          <p className={model.ccs >= model.toldCcs ? 'text-brand-teal' : 'text-[#eb5937]'}>
            told {model.toldCcs.toFixed(1)} → blind {model.ccs.toFixed(1)} ({model.ccs >= model.toldCcs ? '+' : ''}
            {(model.ccs - model.toldCcs).toFixed(1)})
          </p>
        )}
        {model.evalAwareLeaks > 0 && (
          <p className="text-[#c99a1e]">
            ⚠ eval-aware: {model.evalAwareLeaks} response{model.evalAwareLeaks > 1 ? 's' : ''} reference the benchmark in their reasoning
          </p>
        )}
        {model.validPrompts < model.totalPrompts && (
          <p className="text-error-red">
            ⚠ {model.totalPrompts - model.validPrompts} truncated response{model.totalPrompts - model.validPrompts > 1 ? 's' : ''} excluded from the average
          </p>
        )}
      </div>
    </div>
  );
}

function Ledger({ models, banner }: { models: FrontierModel[]; banner: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const average = models.reduce((s, m) => s + m.ccs, 0) / models.length;

  return (
    <>
      {/* Draft banner */}
      <div className="border-l-2 border-[#c99a1e] bg-[#fffaf0] px-5 py-4 max-w-[860px]">
        <div className="text-[15px] text-deep-navy leading-6">{banner}</div>
      </div>

      {/* Ledger */}
      <section aria-label="Model leaderboard" className="border-t-2 border-deep-navy">
        {/* Header row */}
        <div className="hidden lg:grid grid-cols-[56px_1.6fr_0.8fr_auto_auto_56px] gap-4 items-end px-5 md:px-8 pt-5 pb-3 border-b border-border">
          {['Rank', 'Model', 'Provider', 'Dimensions (avg / 2)', 'CCS', 'Grade'].map((h, i) => (
            <p key={h} className={`text-[11px] uppercase tracking-[0.14em] text-slate-grey ${MONO} ${i >= 3 ? 'text-right' : ''} ${i === 5 ? 'text-center' : ''}`}>
              {h}
            </p>
          ))}
        </div>

        {models.map((model) => {
          const open = openId === model.modelId;
          return (
            <div key={model.modelId} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : model.modelId)}
                aria-expanded={open}
                className="w-full text-left grid lg:grid-cols-[56px_1.6fr_0.8fr_auto_auto_56px] grid-cols-[40px_1fr_auto] gap-4 items-center px-5 md:px-8 py-4 transition-colors duration-150 hover:bg-[#fffdf7] cursor-pointer"
              >
                <span className={`text-[15px] text-slate-grey ${MONO}`}>
                  {String(model.rank).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold text-deep-navy">
                    {model.model}
                    {model.evalAwareLeaks > 0 && (
                      <span className={`ml-2 text-[10px] uppercase tracking-[0.1em] text-[#c99a1e] align-middle ${MONO}`}>
                        eval-aware
                      </span>
                    )}
                  </span>
                  <span className="hidden md:block text-[13px] text-slate-grey leading-5 mt-0.5 max-w-[520px]">
                    {model.finding}
                  </span>
                </span>
                <span className="hidden lg:block text-[14px] text-slate-grey">{model.provider}</span>
                <span className="hidden lg:block justify-self-end"><DimensionBars model={model} /></span>
                <span className="hidden lg:block justify-self-end"><CcsGauge ccs={model.ccs} /></span>
                <span className="justify-self-end lg:justify-self-center"><GradeChip grade={model.grade} /></span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  {open && <ExpandedRow model={model} />}
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer strip */}
        <div className={`px-5 md:px-8 py-3.5 text-[12px] text-slate-grey ${MONO}`}>
          {models.length} models · average CCS {average.toFixed(2)} / 12 · red tick marks the
          care-conscious threshold ({CARE_CONSCIOUS_THRESHOLD}/12) · click a row for per-prompt scores
        </div>
      </section>
    </>
  );
}

export function Leaderboard() {
  const [condition, setCondition] = useState<Condition>('blind');

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-8">
      {/* Header */}
      <section className="space-y-5">
        <p className={`text-[11px] uppercase tracking-[0.16em] text-slate-grey ${MONO}`}>
          Live benchmarks
        </p>
        <h1 className="text-deep-navy max-w-[700px]">Who sees the work?</h1>
        <p className="max-w-[620px] text-slate-grey leading-relaxed">
          Eighteen flagship models, five care scenarios, six dimensions. The
          Care-Consciousness Score asks whether a model recognizes women&rsquo;s invisible
          labour as infrastructure — or erases it as background noise.
        </p>
        <p className={`text-[12px] text-slate-grey ${MONO}`}>
          Blind run {BLIND_RUN_ID} ({BLIND_RUN_DATE}) · told run {RUN_ID_TOLD} ({RUN_DATE}) · {RUN_SOURCE} ·
          heuristic drafts, human review pending
        </p>
      </section>

      {/* Condition toggle */}
      <div className="inline-flex border-2 border-deep-navy" role="tablist" aria-label="Benchmark condition">
        {(['blind', 'told'] as Condition[]).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={condition === c}
            onClick={() => setCondition(c)}
            className={`px-6 py-2.5 text-[12px] uppercase tracking-[0.16em] transition-colors duration-150 cursor-pointer ${MONO} ${
              condition === c
                ? 'bg-deep-navy text-[#f6f4f0]'
                : 'text-deep-navy hover:bg-[#fffdf7]'
            }`}
          >
            {c}
            {c === 'blind' && <span className="ml-2 opacity-60">{blindModels.length}</span>}
            {c === 'told' && <span className="ml-2 opacity-60">{frontierModels.length}</span>}
          </button>
        ))}
      </div>

      {condition === 'blind' ? (
        <Ledger
          models={blindModels}
          banner={
            <p>
              <span className="font-semibold">Draft — heuristic scores, unreviewed.</span>{' '}
              Blind condition: each model received a plain scenario with no mention of the
              benchmark. This is the real care-blindness measurement. No model reaches the
              9/12 care-conscious threshold unprompted.
            </p>
          }
        />
      ) : (
        <Ledger
          models={frontierModels}
          banner={
            <p>
              <span className="font-semibold">Draft — heuristic scores, unreviewed.</span>{' '}
              In the told condition the audit prompt announces the evaluation goal, so these
              numbers measure instruction-following as much as care reasoning. Compare with
              the blind condition to see each model&rsquo;s gap.
            </p>
          }
        />
      )}

      {/* Legend + honesty notes */}
      <section className="grid md:grid-cols-3 gap-8 border-t border-border pt-8">
        <div>
          <h3 className={`text-[11px] uppercase tracking-[0.14em] text-slate-grey mb-3 ${MONO}`}>
            Dimensions
          </h3>
          <ul className="space-y-1.5">
            {DIMENSION_META.map((d) => (
              <li key={d.key} className="text-[13px] text-slate-grey">
                <span className={`text-deep-navy ${MONO}`}>{d.short}</span> — {d.full}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={`text-[11px] uppercase tracking-[0.14em] text-slate-grey mb-3 ${MONO}`}>
            What the score means
          </h3>
          <p className="text-[13px] text-slate-grey leading-6">
            A higher CCS means a model more consistently recognizes care infrastructure,
            non-linear coordination, recovery, emotional management, and burden
            redistribution. Grades: A ≥ 10, B ≥ 8, C ≥ 6, D ≥ 4, F &lt; 4.
          </p>
        </div>
        <div>
          <h3 className={`text-[11px] uppercase tracking-[0.14em] text-slate-grey mb-3 ${MONO}`}>
            What it does not mean
          </h3>
          <p className="text-[13px] text-slate-grey leading-6">
            The leaderboard does not certify a model as safe for childcare, medical,
            employment, or legal decision-making. Draft scores have not been human-reviewed.
          </p>
        </div>
      </section>

      <p className={`text-[12px] text-slate-grey ${MONO}`}>
        Blind run 2026-08-12-frontier-flagship-blind (89/90 scored, zero eval-awareness leaks;
        Llama 4 maternity failed to generate; Step 3.7 and Claude Opus 5 partially truncated at
        the token cap) · told run 2026-08-10-frontier-flagship-2026-08 (16 models, 3 truncated
        responses excluded) · both heuristic drafts pending human review
      </p>
    </div>
  );
}
