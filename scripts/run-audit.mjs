#!/usr/bin/env node
import { callModel, loadConfig, loadPrompts, slugify, today, writeJson } from './audit-lib.mjs';

const configPath = process.argv[2] ?? 'audit-config.json';
const config = await loadConfig(configPath);
const prompts = await loadPrompts(config);
const runId = `${today()}-${slugify(config.runLabel ?? 'audit-run')}`;
const startedAt = new Date().toISOString();

const responses = [];

for (const model of config.models) {
  for (const prompt of prompts) {
    process.stdout.write(`Running ${model.displayName ?? model.id} / ${prompt.id}... `);
    const started = Date.now();
    const responseText = await callModel(model, prompt, config);
    const durationMs = Date.now() - started;
    responses.push({
      schema: 'careval-model-response-v1',
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
    });
    process.stdout.write('done\n');
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
  scoring_mode: config.scoring?.mode ?? 'not-scored',
  human_review_required: config.scoring?.humanReviewRequired ?? true,
});

console.log(`\nWrote audit responses to audits/runs/${runId}/responses.json`);
console.log(`Next: npm run audit:score -- audits/runs/${runId}/responses.json`);
