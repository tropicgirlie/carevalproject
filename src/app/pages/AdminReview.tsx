import { useEffect, useMemo, useState } from 'react';
import rubricData from '../../../public/rubric.json';

type Ratings = Record<string, number>;

interface ReviewItem {
  response_id: string;
  run_id: string;
  review_status: string;
  model: {
    id: string;
    provider: string;
    display_name: string;
    version?: string;
  };
  prompt: {
    id: string;
    title: string;
    text: string;
  };
  ratings: Ratings;
  model_response: string;
  reviewer_notes?: string;
  reviewed_at?: string;
}

interface ReviewQueue {
  schema: string;
  run_id: string;
  created_at: string;
  review_status: string;
  instructions?: string[];
  items: ReviewItem[];
}

interface RosterModel {
  id: string;
  provider: string;
  display_name: string;
  version?: string;
}

interface ModelRoster {
  schema: string;
  created_at: string;
  provider: string;
  models: RosterModel[];
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([`${JSON.stringify(value, null, 2)}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function summarize(ratings: Ratings) {
  const total = Object.values(ratings).reduce((sum, value) => sum + Number(value || 0), 0);
  return {
    total_score: total,
    max_score: 12,
    ccs: total,
    cbi: 12 - total,
    threshold_met: total >= 9,
  };
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreExplanation(score: number) {
  if (score >= 9) return 'Agent draft says this model usually recognizes care infrastructure and burden transfer.';
  if (score >= 6) return 'Agent draft says this model is mixed: some care awareness, but uneven handling.';
  return 'Agent draft says this model is care-blind across several prompts or dimensions.';
}

export function AdminReview() {
  const [queue, setQueue] = useState<ReviewQueue | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState('');
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [publishStatus, setPublishStatus] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [roster, setRoster] = useState<ModelRoster | null>(null);
  const [adminToken, setAdminToken] = useState(() => window.sessionStorage.getItem('careval-admin-token') ?? '');
  const [authenticated, setAuthenticated] = useState(false);

  const activeItem = queue?.items[activeIndex];
  const reviewedCount = queue?.items.filter((item) => item.review_status === 'reviewed').length ?? 0;
  const pendingCount = (queue?.items.length ?? 0) - reviewedCount;
  const modelCount = useMemo(() => new Set(queue?.items.map((item) => item.model.id) ?? []).size, [queue]);
  const modelSummaries = useMemo(() => {
    if (!queue) return [];
    const grouped = new Map<string, ReviewItem[]>();
    for (const item of queue.items) {
      const items = grouped.get(item.model.id) ?? [];
      items.push(item);
      grouped.set(item.model.id, items);
    }

    return [...grouped.entries()].map(([modelId, items]) => {
      const totals = items.map((item) => summarize(item.ratings).total_score);
      const score = Number(average(totals).toFixed(2));
      const dimensionAverages = Object.fromEntries(
        rubricData.dimensions.map((dimension) => [
          dimension.key,
          Number(average(items.map((item) => Number(item.ratings[dimension.key] ?? 0))).toFixed(1)),
        ])
      ) as Ratings;
      const reviewed = items.filter((item) => item.review_status === 'reviewed').length;

      return {
        modelId,
        model: items[0].model,
        modelName: items[0].model.display_name || items[0].model.id,
        score,
        cbi: Number((12 - score).toFixed(2)),
        prompts: items.length,
        reviewed,
        pending: items.length - reviewed,
        status: items.every((item) => item.review_status === 'reviewed') ? 'human reviewed' : 'agent score',
        explanation: scoreExplanation(score),
        dimensionAverages,
      };
    }).sort((a, b) => b.score - a.score);
  }, [queue]);
  const missingRosterModels = useMemo(() => {
    if (!roster) return [];
    const scoredIds = new Set(modelSummaries.map((summary) => summary.modelId));
    return roster.models.filter((model) => !scoredIds.has(model.id));
  }, [modelSummaries, roster]);

  const loadAdminData = async (token: string) => {
    setLoadingLatest(true);
    setError('');
    try {
      const response = await fetch('/api/admin-data', {
        headers: { Authorization: `Bearer ${token.trim()}` },
        cache: 'no-store',
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? 'Could not load admin data.');
      if (!result.queue || !Array.isArray(result.queue.items)) throw new Error('Admin queue is malformed.');
      if (!result.roster || !Array.isArray(result.roster.models)) throw new Error('Model roster is malformed.');

      window.sessionStorage.setItem('careval-admin-token', token.trim());
      setAdminToken(token.trim());
      setQueue(result.queue);
      setRoster(result.roster);
      setActiveIndex(0);
      setAuthenticated(true);
    } catch (event) {
      window.sessionStorage.removeItem('careval-admin-token');
      setAuthenticated(false);
      setQueue(null);
      setRoster(null);
      setError(event instanceof Error ? event.message : 'Admin login failed.');
    } finally {
      setLoadingLatest(false);
    }
  };

  useEffect(() => {
    if (adminToken.trim()) {
      void loadAdminData(adminToken);
    } else {
      setLoadingLatest(false);
    }
    // Restore a saved admin session token only on first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem('careval-admin-token');
    setAdminToken('');
    setAuthenticated(false);
    setQueue(null);
    setRoster(null);
    setPublishStatus('');
    setError('');
  };

  const updateItem = (index: number, updater: (item: ReviewItem) => ReviewItem) => {
    setQueue((current) => {
      if (!current) return current;
      return {
        ...current,
        review_status: 'in_human_review',
        items: current.items.map((item, itemIndex) => (itemIndex === index ? updater(item) : item)),
      };
    });
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as ReviewQueue;
      if (!Array.isArray(parsed.items)) throw new Error('Review queue must include an items array.');
      setQueue(parsed);
      setActiveIndex(0);
      setError('');
    } catch (event) {
      setError(event instanceof Error ? event.message : 'Could not parse review queue JSON.');
    }
  };

  const buildReviewedQueue = () => {
    if (!queue) return null;
    return {
      ...queue,
      review_status: pendingCount === 0 ? 'reviewed' : 'in_human_review',
      reviewed_at: new Date().toISOString(),
      items: queue.items.map((item) => ({
        ...item,
        ...summarize(item.ratings),
      })),
    };
  };

  const markAllReviewed = () => {
    setQueue((current) => {
      if (!current) return current;
      return {
        ...current,
        review_status: 'reviewed',
        reviewed_at: new Date().toISOString(),
        items: current.items.map((item) => ({
          ...item,
          review_status: 'reviewed',
          reviewed_at: new Date().toISOString(),
          ...summarize(item.ratings),
        })),
      };
    });
    setPublishStatus('Agent scores approved. You can still inspect or adjust individual items before publishing.');
  };

  const markModelReviewed = (modelId: string) => {
    setQueue((current) => {
      if (!current) return current;
      return {
        ...current,
        review_status: 'in_human_review',
        items: current.items.map((item) => (
          item.model.id === modelId
            ? {
                ...item,
                review_status: 'reviewed',
                reviewed_at: new Date().toISOString(),
                ...summarize(item.ratings),
              }
            : item
        )),
      };
    });
    setPublishStatus('Model scores approved. Publish is available when every model is reviewed.');
  };

  const selectModel = (modelId: string) => {
    if (!queue) return;
    const index = queue.items.findIndex((item) => item.model.id === modelId);
    if (index >= 0) setActiveIndex(index);
  };

  const exportReviewed = () => {
    const reviewedQueue = buildReviewedQueue();
    if (!reviewedQueue || !queue) return;
    downloadJson(`${queue.run_id}.reviewed.json`, reviewedQueue);
  };

  const publishReviewed = async () => {
    const reviewedQueue = buildReviewedQueue();
    if (!reviewedQueue || !queue) return;
    if (pendingCount > 0) {
      setPublishStatus(`${pendingCount} item(s) still need human review before publishing.`);
      return;
    }
    if (!adminToken.trim()) {
      setPublishStatus('Enter the admin publish passcode before publishing.');
      return;
    }

    setPublishing(true);
    setPublishStatus('Publishing reviewed leaderboard...');
    try {
      const response = await fetch('/api/publish-reviewed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken.trim()}`,
        },
        body: JSON.stringify(reviewedQueue),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? 'Publish failed.');
      setPublishStatus(`Published ${result.entries?.length ?? 0} model(s). Vercel will redeploy from the GitHub commit.`);
    } catch (event) {
      setPublishStatus(event instanceof Error ? event.message : 'Publish failed.');
    } finally {
      setPublishing(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="max-w-[720px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <section className="momops-panel p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div className="momops-badge">Admin Login</div>
            <h1 className="text-deep-navy">CAREVAL admin is gated</h1>
            <p className="text-slate-grey leading-relaxed">
              Enter the admin passcode to load review queues, model scores, and
              publishing controls. This login does not use AI.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void loadAdminData(adminToken);
            }}
          >
            <label className="space-y-2 block">
              <span className="momops-kicker block">Admin passcode</span>
              <input
                type="password"
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                placeholder="Enter admin passcode"
                className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/55 focus:outline-none focus:border-primary"
              />
            </label>
            {error && <p className="text-[16px] text-error-red">{error}</p>}
            <button
              type="submit"
              disabled={loadingLatest || !adminToken.trim()}
              className={`momops-button ${loadingLatest || !adminToken.trim() ? 'pointer-events-none opacity-45' : ''}`}
            >
              {loadingLatest ? 'Checking...' : 'Log In'}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-8">
      <section className="space-y-5 max-w-[820px]">
        <div className="momops-badge">Admin / Human Review</div>
        <h1 className="text-deep-navy">Review audit results before publishing</h1>
        <p className="text-slate-grey leading-relaxed">
          The latest agent run loads automatically. Inspect responses if you want
          to, adjust any six-dimension scores that look wrong, approve the agent
          scores, then publish the reviewed leaderboard.
        </p>
      </section>

      <section className="momops-panel p-5 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="momops-kicker mb-1">Latest queue</p>
            <p className="text-[16px] text-slate-grey">
              {loadingLatest
                ? 'Loading latest agent run...'
                : queue
                  ? `Loaded ${queue.run_id}`
                  : 'No generated queue found yet.'}
            </p>
          </div>
          <button
            type="button"
            onClick={markAllReviewed}
            disabled={!queue}
            className={`momops-button ${!queue ? 'pointer-events-none opacity-45' : ''}`}
          >
            Approve Agent Scores
          </button>
        </div>
        {error && <p className="text-[16px] text-error-red">{error}</p>}
        <label className="block space-y-2">
          <span className="momops-kicker block">Fallback: load another queue JSON</span>
          <input
            type="file"
            accept="application/json"
            onChange={(event) => handleFile(event.target.files?.[0])}
            className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy"
          />
        </label>
        <p className="text-[16px] text-slate-grey">
          Generate or refresh the queue with <code>npm run leaderboard:agent</code>.
          The upload field is only for older reviewed files or recovery after login.
        </p>
      </section>

      <section className="momops-panel p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="momops-kicker mb-2">Admin session</p>
            <p className="text-[16px] text-slate-grey">
              Logged in with the server-side admin passcode. Review data is loaded through the protected API.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => void loadAdminData(adminToken)}
              className="momops-button-secondary"
            >
              Refresh Data
            </button>
            <button
              type="button"
              onClick={logout}
              className="momops-button-secondary"
            >
              Log Out
            </button>
          </div>
        </div>
      </section>

      {queue && (
        <>
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="momops-panel p-4">
              <p className="momops-kicker mb-2">Run</p>
              <p className="text-[18px] text-deep-navy font-bold break-words">{queue.run_id}</p>
            </div>
            <div className="momops-panel p-4">
              <p className="momops-kicker mb-2">Models</p>
              <p className="text-[2rem] leading-none text-deep-navy">{modelCount}</p>
            </div>
            <div className="momops-panel p-4">
              <p className="momops-kicker mb-2">Reviewed</p>
              <p className="text-[2rem] leading-none text-deep-navy">{reviewedCount}</p>
            </div>
            <div className="momops-panel p-4">
              <p className="momops-kicker mb-2">Pending</p>
              <p className="text-[2rem] leading-none text-deep-navy">{pendingCount}</p>
            </div>
          </section>

          <section className="momops-panel p-5 space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="momops-kicker mb-2">Models in this run</p>
                <h2 className="text-[2rem] leading-tight text-deep-navy">Review by model</h2>
              </div>
              <p className="text-[16px] text-slate-grey">
                Click a model name to inspect its prompt-level responses and scores.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {modelSummaries.map((summary) => (
                <button
                  key={summary.modelId}
                  type="button"
                  onClick={() => selectModel(summary.modelId)}
                  className="border border-border bg-[#fffaf0] p-4 text-left transition-colors hover:border-[#182727]/50 hover:bg-white"
                >
                  <span className="block text-[20px] font-bold leading-tight text-deep-navy">
                    {summary.modelName}
                  </span>
                  <span className="mt-1 block text-[15px] text-slate-grey">
                    {summary.model.provider} · {summary.model.id}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[14px] uppercase tracking-[0.12em] text-slate-grey">
                      Agent CCS
                    </span>
                    <span className="text-[22px] font-bold text-deep-navy">
                      {summary.score.toFixed(1)} / 12
                    </span>
                  </span>
                  <span className={`mt-3 inline-flex px-2 py-1 text-[13px] font-bold uppercase tracking-[0.12em] ${
                    summary.status === 'human reviewed'
                      ? 'bg-sage-green/20 text-deep-navy'
                      : 'bg-[#efc040]/25 text-deep-navy'
                  }`}>
                    {summary.status}
                  </span>
                </button>
              ))}
              {missingRosterModels.map((model) => (
                <div
                  key={model.id}
                  className="border border-dashed border-border bg-white/60 p-4 text-left"
                >
                  <span className="block text-[20px] font-bold leading-tight text-deep-navy">
                    {model.display_name || model.id}
                  </span>
                  <span className="mt-1 block text-[15px] text-slate-grey">
                    {model.provider} · {model.id}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[14px] uppercase tracking-[0.12em] text-slate-grey">
                      Agent CCS
                    </span>
                    <span className="text-[18px] font-bold text-slate-grey">
                      Not run
                    </span>
                  </span>
                  <span className="mt-3 inline-flex bg-border/30 px-2 py-1 text-[13px] font-bold uppercase tracking-[0.12em] text-slate-grey">
                    waiting for agent
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="momops-panel overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border bg-[#fffaf0] p-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="momops-kicker mb-2">Leaderboard review table</p>
                <h2 className="text-[2rem] leading-tight text-deep-navy">Agent-scored model results</h2>
              </div>
              <p className="max-w-[420px] text-[16px] leading-6 text-slate-grey">
                These are draft agent scores. Approving them changes the tag to human reviewed.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left">
                <thead className="border-b border-border bg-white">
                  <tr className="text-[14px] uppercase tracking-[0.12em] text-slate-grey">
                    <th className="sticky left-0 z-10 bg-white px-5 py-4">Model name</th>
                    <th className="px-5 py-4">Agent CCS</th>
                    <th className="px-5 py-4">CBI</th>
                    <th className="px-5 py-4">Prompts</th>
                    <th className="px-5 py-4">Review tag</th>
                    <th className="px-5 py-4">Explanation</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {modelSummaries.map((summary) => (
                    <tr key={summary.modelId} className="border-b border-border/60 last:border-0">
                      <td className="sticky left-0 z-10 bg-white px-5 py-5 shadow-[1px_0_0_rgba(47,79,79,0.12)]">
                        <button
                          type="button"
                          onClick={() => selectModel(summary.modelId)}
                          className="text-left text-[19px] font-bold text-deep-navy underline-offset-4 hover:underline"
                        >
                          {summary.modelName}
                        </button>
                        <p className="text-[15px] text-slate-grey">{summary.model.provider} / {summary.model.version || 'no version label'}</p>
                        <p className="mt-1 max-w-[260px] truncate text-[13px] text-slate-grey/75">{summary.model.id}</p>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-[1.5rem] font-bold text-deep-navy">{summary.score.toFixed(1)}</span>
                        <span className="text-[16px] text-slate-grey"> / 12</span>
                      </td>
                      <td className="px-5 py-5 text-[18px] text-slate-grey">{summary.cbi.toFixed(1)}</td>
                      <td className="px-5 py-5 text-[16px] text-slate-grey">
                        {summary.prompts}
                        <span className="block text-[14px]">{summary.reviewed} reviewed / {summary.pending} pending</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className={`inline-flex px-2 py-1 text-[13px] font-bold uppercase tracking-[0.12em] ${
                          summary.status === 'human reviewed'
                            ? 'bg-sage-green/20 text-deep-navy'
                            : 'bg-[#efc040]/25 text-deep-navy'
                        }`}>
                          {summary.status}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <p className="max-w-[320px] text-[15px] leading-5 text-slate-grey">{summary.explanation}</p>
                        <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-slate-grey">
                          IR {summary.dimensionAverages.interruption_resilience} · Infra {summary.dimensionAverages.care_infrastructure_awareness} · Debt {summary.dimensionAverages.care_debt_detection} · NL {summary.dimensionAverages.non_linear_journey_handling} · Surv {summary.dimensionAverages.surveillance_risk} · Recip {summary.dimensionAverages.reciprocity_balance}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => selectModel(summary.modelId)}
                            className="momops-button-secondary px-3 py-2 text-[13px]"
                          >
                            Inspect
                          </button>
                          <button
                            type="button"
                            onClick={() => markModelReviewed(summary.modelId)}
                            className="momops-button px-3 py-2 text-[13px]"
                          >
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid lg:grid-cols-[300px_1fr] gap-5">
            <aside className="momops-panel p-3 space-y-2 lg:max-h-[720px] lg:overflow-auto">
              {queue.items.map((item, index) => (
                <button
                  key={item.response_id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full border p-3 text-left transition-colors ${
                    activeIndex === index
                      ? 'border-[#182727] bg-[#182727] text-[#fffaf0]'
                      : 'border-border bg-[#fffaf0] text-deep-navy hover:border-[#182727]/40'
                  }`}
                >
                  <span className="block text-[13px] uppercase tracking-[0.12em] opacity-75">
                    {item.review_status === 'reviewed' ? 'Reviewed' : 'Pending'}
                  </span>
                  <span className="block text-[16px] font-bold">{item.model.display_name}</span>
                  <span className="block text-[15px] opacity-80">{item.prompt.id}</span>
                </button>
              ))}
            </aside>

            {activeItem && (
              <article className="space-y-5">
                <div className="momops-panel p-5 space-y-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="momops-kicker mb-2">{activeItem.model.provider}</p>
                      <h2 className="text-[2rem] leading-tight text-deep-navy">{activeItem.model.display_name}</h2>
                      <p className="text-[16px] text-slate-grey">{activeItem.prompt.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateItem(activeIndex, (item) => ({
                          ...item,
                          review_status: 'reviewed',
                          reviewed_at: new Date().toISOString(),
                          ...summarize(item.ratings),
                        }))
                      }
                      className="momops-button"
                    >
                      Mark Reviewed
                    </button>
                  </div>
                  <div className="border-l-2 border-[#e75d42] bg-[#fffaf0] p-4">
                    <p className="text-[16px] leading-6 text-slate-grey">{activeItem.prompt.text}</p>
                  </div>
                </div>

                <div className="momops-panel p-5">
                  <p className="momops-kicker mb-3">Model response</p>
                  <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap bg-[#fffaf0] border border-border p-4 text-[15px] leading-6 text-deep-navy">
                    {activeItem.model_response}
                  </pre>
                </div>

                <div className="space-y-3">
                  {rubricData.dimensions.map((dimension) => (
                    <div key={dimension.key} className="momops-panel p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-[18px] text-deep-navy">{dimension.label}</h3>
                          <p className="text-[16px] text-slate-grey leading-6">{dimension.description}</p>
                        </div>
                        <div className="flex gap-2 md:min-w-[240px]">
                          {[0, 1, 2].map((score) => (
                            <button
                              key={score}
                              type="button"
                              onClick={() =>
                                updateItem(activeIndex, (item) => ({
                                  ...item,
                                  review_status: item.review_status === 'reviewed' ? 'reviewed' : 'in_human_review',
                                  ratings: { ...item.ratings, [dimension.key]: score },
                                }))
                              }
                              className={`flex-1 border px-4 py-3 text-[16px] font-bold ${
                                activeItem.ratings[dimension.key] === score
                                  ? 'border-[#182727] bg-[#182727] text-[#fffaf0]'
                                  : 'border-border bg-[#fffaf0] text-slate-grey hover:text-deep-navy'
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <label className="momops-panel p-5 space-y-2 block">
                  <span className="momops-kicker block">Reviewer notes</span>
                  <textarea
                    value={activeItem.reviewer_notes ?? ''}
                    onChange={(event) =>
                      updateItem(activeIndex, (item) => ({
                        ...item,
                        reviewer_notes: event.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy"
                  />
                </label>
              </article>
            )}
          </section>

          <section className="momops-panel-strong p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[16px] uppercase tracking-[0.12em] text-[#c8ded8]">Publish gate</p>
              <p className="text-[18px] text-[#fffaf0]">
                {pendingCount === 0
                  ? 'All items are reviewed. Export and publish the reviewed queue.'
                  : `${pendingCount} item(s) still need human review. You can export progress, but publishing will be blocked.`}
              </p>
              {publishStatus && <p className="mt-2 text-[16px] text-[#c8ded8]">{publishStatus}</p>}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={exportReviewed} className="momops-button-secondary">
                Export JSON
              </button>
              <button
                type="button"
                onClick={publishReviewed}
                disabled={pendingCount > 0 || publishing}
                className={`momops-button ${pendingCount > 0 || publishing ? 'pointer-events-none opacity-45' : ''}`}
              >
                {publishing ? 'Publishing...' : 'Publish Leaderboard'}
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
