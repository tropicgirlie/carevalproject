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

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!validateAdmin(request, response)) return;

  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? 'tropicgirlie/carevalproject';
  const branch = process.env.GITHUB_BRANCH ?? 'main';
  const mode = request.body?.mode === 'frontier' ? 'frontier' : 'free';

  if (!githubToken) {
    response.status(500).json({ error: 'GITHUB_TOKEN is not configured.' });
    return;
  }

  try {
    const githubResponse = await fetch(
      `https://api.github.com/repos/${repo}/actions/workflows/careval-audit.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          ref: branch,
          inputs: { mode },
        }),
      }
    );

    if (!githubResponse.ok) {
      throw new Error(`GitHub workflow dispatch failed: ${githubResponse.status} ${await githubResponse.text()}`);
    }

    response.status(202).json({
      ok: true,
      mode,
      status: 'queued',
      message: `CAREVAL ${mode} audit requested.`,
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Could not start audit.',
    });
  }
}
