#!/usr/bin/env node
import { draftScore, readJson, slugify, summarizeRatings, writeJson } from './audit-lib.mjs';

const responsesPath = process.argv[2];
if (!responsesPath) {
  console.error('Usage: npm run audit:score -- audits/runs/<run-id>/responses.json');
  process.exit(1);
}

const run = await readJson(responsesPath);
const byModel = new Map();

for (const response of run.responses ?? []) {
  const key = response.model.id;
  if (!byModel.has(key)) {
    byModel.set(key, {
      model: response.model,
      prompt_results: [],
    });
  }

  const ratings = draftScore(response.response_text);
  const summary = summarizeRatings(ratings);
  byModel.get(key).prompt_results.push({
    schema: 'careval-prompt-audit-draft-v1',
    run_id: run.run_id,
    created_at: new Date().toISOString(),
    review_status: 'draft_ai_assisted',
    human_review_required: true,
    model: response.model,
    prompt: response.prompt,
    ratings,
    ...summary,
    model_response: response.response_text,
    reviewer_notes: 'Heuristic draft score. Requires human review before publication.',
  });
}

for (const [modelId, modelRun] of byModel.entries()) {
  const totals = modelRun.prompt_results.map((result) => result.total_score);
  const average = totals.reduce((sum, score) => sum + score, 0) / totals.length;
  const result = {
    schema: 'careval-model-audit-result-v1',
    run_id: run.run_id,
    created_at: new Date().toISOString(),
    review_status: 'draft_ai_assisted',
    human_review_required: true,
    model: modelRun.model,
    prompt_count: modelRun.prompt_results.length,
    total_ratings: modelRun.prompt_results.length * 6,
    average_ccs: Number(average.toFixed(2)),
    average_cbi: Number((12 - average).toFixed(2)),
    threshold: 9,
    threshold_met: average >= 9,
    prompt_results: modelRun.prompt_results,
  };

  await writeJson(`audits/results/${run.run_id}/${slugify(modelId)}.json`, result);
}

console.log(`Wrote ${byModel.size} draft model result files to audits/results/${run.run_id}/`);
console.log(`Next: review/edit JSON, then npm run audit:publish -- audits/results/${run.run_id}/`);
