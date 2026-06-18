#!/usr/bin/env node
import { readJson, slugify, writeJson } from './audit-lib.mjs';

const [modelId, displayName = modelId, templatePath = 'audit-config.openrouter-free-smoke.json'] = process.argv.slice(2);

if (!modelId?.trim()) {
  console.error('Usage: node scripts/create-openrouter-config.mjs <openrouter-model-id> [display-name] [template-config]');
  process.exit(1);
}

const id = modelId.trim();
const config = await readJson(templatePath);
const outputPath = '.tmp/careval-openrouter-custom-config.json';

config.runLabel = `openrouter-${slugify(id)}`;
config.maxTokens = Math.max(Number(config.maxTokens ?? 0), 700);
config.reasoning = {
  effort: 'low',
  exclude: true,
};
config.models = [
  {
    id,
    provider: 'openrouter',
    displayName: displayName.trim() || id,
    version: 'OpenRouter custom admin run',
  },
];

await writeJson(outputPath, config);
console.log(outputPath);
