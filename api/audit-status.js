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
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!validateAdmin(request, response)) return;

  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? 'tropicgirlie/carevalproject';
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  if (!githubToken) {
    response.status(500).json({ error: 'GITHUB_TOKEN is not configured.' });
    return;
  }

  try {
    const githubResponse = await fetch(
      `https://api.github.com/repos/${repo}/actions/workflows/careval-audit.yml/runs?branch=${encodeURIComponent(branch)}&event=workflow_dispatch&per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    if (!githubResponse.ok) {
      throw new Error(`GitHub workflow status failed: ${githubResponse.status} ${await githubResponse.text()}`);
    }

    const data = await githubResponse.json();
    const run = data.workflow_runs?.[0];

    if (!run) {
      response.status(200).json({ status: 'not_started', run: null });
      return;
    }

    response.status(200).json({
      status: run.status,
      conclusion: run.conclusion,
      run: {
        id: run.id,
        name: run.name,
        event: run.event,
        created_at: run.created_at,
        updated_at: run.updated_at,
        html_url: run.html_url,
        head_sha: run.head_sha,
      },
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Could not read audit status.',
    });
  }
}
