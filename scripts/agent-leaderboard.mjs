#!/usr/bin/env node
import {
  callModel,
  draftScore,
  loadConfig,
  loadPrompts,
  slugify,
  summarizeRatings,
  today,
  writeJson,
} from './audit-lib.mjs';

const configPath = process.argv[2] ?? 'audit-config.json';
const config = await loadConfig(configPath);
const prompts = await loadPrompts(config);
const runId = `${today()}-${slugify(config.runLabel ?? 'leaderboard-agent')}`;
const startedAt = new Date().toISOString();
const responses = [];
const queueItems = [];
const byModel = new Map();

for (const model of config.models) {
  for (const prompt of prompts) {
    process.stdout.write(`Running ${model.displayName ?? model.id} / ${prompt.id}... `);
    const started = Date.now();
    const responseText = await callModel(model, prompt, config);
    const durationMs = Date.now() - started;
    const responseId = `${slugify(model.id)}-${prompt.id}`;
    const response = {
      schema: 'careval-model-response-v1',
      response_id: responseId,
      run_id: runId,
      created_at: new Date().toISOString(),
      model: {
        id: model.id,
        provider: model.provider,
        display_name: model.displayName ?? model.id,
        version: model.version ?? '',
      },
      prompt: {
        id: prompt.id,
        title: prompt.title,
        text: prompt.text,
        dimensions: prompt.dimensions ?? [],
      },
      response_text: responseText,
      generation: {
        temperature: config.temperature ?? null,
        max_tokens: config.maxTokens ?? null,
        duration_ms: durationMs,
      },
    };

    const ratings = draftScore(responseText);
    const summary = summarizeRatings(ratings);
    const promptResult = {
      schema: 'careval-prompt-audit-review-item-v1',
      response_id: responseId,
      run_id: runId,
      created_at: new Date().toISOString(),
      review_status: 'pending_human_review',
      human_review_required: true,
      model: response.model,
      prompt: response.prompt,
      ratings,
      ...summary,
      model_response: responseText,
      reviewer_notes: 'Draft heuristic score. Review and adjust before publishing.',
    };

    responses.push(response);
    queueItems.push(promptResult);

    if (!byModel.has(model.id)) {
      byModel.set(model.id, {
        model: response.model,
        prompt_results: [],
      });
    }
    byModel.get(model.id).prompt_results.push(promptResult);
    process.stdout.write('queued for review\n');
  }
}

await writeJson(`audits/runs/${runId}/responses.json`, {
  schema: 'careval-audit-run-responses-v1',
  run_id: runId,
  started_at: startedAt,
  completed_at: new Date().toISOString(),
  config,
  response_count: responses.length,
  responses,
});

await writeJson(`audits/runs/${runId}/metadata.json`, {
  schema: 'careval-audit-run-metadata-v1',
  run_id: runId,
  started_at: startedAt,
  completed_at: new Date().toISOString(),
  model_count: config.models.length,
  prompt_count: prompts.length,
  response_count: responses.length,
  scoring_mode: config.scoring?.mode ?? 'heuristic-draft',
  human_review_required: true,
});

for (const [modelId, modelRun] of byModel.entries()) {
  const totals = modelRun.prompt_results.map((result) => result.total_score);
  const average = totals.reduce((sum, score) => sum + score, 0) / totals.length;
  await writeJson(`audits/results/${runId}/${slugify(modelId)}.json`, {
    schema: 'careval-model-audit-result-v1',
    run_id: runId,
    created_at: new Date().toISOString(),
    review_status: 'pending_human_review',
    human_review_required: true,
    model: modelRun.model,
    prompt_count: modelRun.prompt_results.length,
    total_ratings: modelRun.prompt_results.length * 6,
    average_ccs: Number(average.toFixed(2)),
    average_cbi: Number((12 - average).toFixed(2)),
    threshold: config.scoring?.threshold ?? 9,
    threshold_met: average >= (config.scoring?.threshold ?? 9),
    prompt_results: modelRun.prompt_results,
  });
}

const reviewQueue = {
  schema: 'careval-human-review-queue-v1',
  run_id: runId,
  created_at: new Date().toISOString(),
  source_config: configPath,
  review_status: 'pending_human_review',
  instructions: [
    'Review each model response against the rubric.',
    'Adjust dimension scores where the draft heuristic is wrong.',
    'Set review_status to reviewed before publishing.',
  ],
  items: queueItems,
};

await writeJson(`audits/review-queues/${runId}.json`, reviewQueue);
await writeJson('audits/review-queues/latest.json', reviewQueue);
await writeJson('audits/review-queues/latest-manifest.json', {
  schema: 'careval-admin-review-manifest-v1',
  run_id: runId,
  created_at: reviewQueue.created_at,
  queue_path: 'audits/review-queues/latest.json',
  item_count: queueItems.length,
  review_status: 'pending_human_review',
});

console.log(`\nWrote run responses to audits/runs/${runId}/responses.json`);
console.log(`Wrote draft model results to audits/results/${runId}/`);
console.log(`Wrote human review queue to audits/review-queues/${runId}.json`);
console.log('Updated audits/review-queues/latest.json for the admin page');
console.log(`Next: review in the admin panel, then publish reviewed JSON.`);
