function validateAdmin(request, response) {
  const adminToken = process.env.ADMIN_PUBLISH_TOKEN;
  const providedToken = request.headers.authorization?.replace(/^Bearer\s+/i, '') ?? '';

  if (!adminToken) {
    response.status(500).json({ error: 'ADMIN_PUBLISH_TOKEN is not configured.' });
    return false;
  }

  if (providedToken !== adminToken) {
    response.status(401).json({ error: 'Admin passcode is invalid.' });
    return false;
  }

  return true;
}

function normalizeModel(model) {
  return {
    id: model.id,
    name: model.name ?? model.id,
    created: model.created ?? null,
    context_length: model.context_length ?? null,
    pricing: model.pricing ?? null,
    supported_parameters: model.supported_parameters ?? [],
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!validateAdmin(request, response)) return;

  try {
    const query = String(request.query?.q ?? '').trim().toLowerCase();
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Accept: 'application/json' },
    });

    if (!openRouterResponse.ok) {
      throw new Error(`OpenRouter model catalog failed: ${openRouterResponse.status} ${await openRouterResponse.text()}`);
    }

    const payload = await openRouterResponse.json();
    const models = (payload.data ?? [])
      .map(normalizeModel)
      .filter((model) => {
        if (!query) return true;
        return `${model.id} ${model.name}`.toLowerCase().includes(query);
      })
      .sort((a, b) => Number(b.created ?? 0) - Number(a.created ?? 0))
      .slice(0, 80);

    response.status(200).json({
      schema: 'careval-openrouter-model-catalog-v1',
      source: 'https://openrouter.ai/api/v1/models',
      query,
      count: models.length,
      models,
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Could not load OpenRouter model catalog.',
    });
  }
}
