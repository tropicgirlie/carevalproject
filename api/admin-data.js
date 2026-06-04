import { readFile } from 'node:fs/promises';
import path from 'node:path';

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

async function readJson(relativePath) {
  const body = await readFile(path.join(process.cwd(), relativePath), 'utf8');
  return JSON.parse(body);
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!validateAdmin(request, response)) return;

  try {
    const [queue, roster] = await Promise.all([
      readJson('audits/review-queues/latest.json'),
      readJson('admin/model-roster.json'),
    ]);

    response.status(200).json({
      schema: 'careval-admin-data-v1',
      queue,
      roster,
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Could not load admin data.',
    });
  }
}
