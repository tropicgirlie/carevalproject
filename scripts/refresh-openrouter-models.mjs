#!/usr/bin/env node
import { writeJson } from './audit-lib.mjs';

const response = await fetch('https://openrouter.ai/api/v1/models');

if (!response.ok) {
  throw new Error(`OpenRouter model catalog failed: ${response.status} ${await response.text()}`);
}

const payload = await response.json();
const models = (payload.data ?? [])
  .filter((model) => model.architecture?.modality?.includes('text->text') || model.context_length)
  .map((model) => ({
    id: model.id,
    name: model.name,
    created: model.created,
    context_length: model.context_length,
    pricing: model.pricing,
    supported_parameters: model.supported_parameters ?? [],
  }))
  .sort((a, b) => Number(b.created ?? 0) - Number(a.created ?? 0));

await writeJson('api/_data/openrouter-models.json', {
  schema: 'careval-openrouter-model-catalog-v1',
  created_at: new Date().toISOString(),
  source: 'https://openrouter.ai/api/v1/models',
  count: models.length,
  models,
});

console.log(`Wrote ${models.length} OpenRouter models to api/_data/openrouter-models.json`);
