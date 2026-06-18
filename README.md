
# CAREVAL

CAREVAL measures AI blindness to women's invisible labour: care, coordination, emotional management, recovery work, household logistics, and downstream burden.

This is the CAREVAL web app and benchmark interface. The original visual project is available at https://www.figma.com/design/gnp7s1IBoUKCy4Kc4Tkaqe/CAREVAL-Product-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Leaderboard Agent

Run a draft benchmark sweep:

```bash
npm run leaderboard:agent
```

Run the OpenRouter model sweep:

```bash
OPENROUTER_API_KEY=... npm run leaderboard:agent -- audit-config.openrouter.example.json
```

Then open `#/admin`. The latest generated queue loads automatically. Review the scores, click `Approve Agent Scores` if you agree, then click `Publish Leaderboard`.

The production admin can also start the runner directly:

1. Log in at `#/admin`.
2. Enter an OpenRouter model ID such as `z-ai/glm-5.2`, or leave it blank and select `Free Smoke` or `Frontier Models`.
3. Click `Run Audit`.
4. GitHub Actions runs OpenRouter, commits the review queue, and triggers Vercel.
5. Refresh the admin data, review, then publish.

Refresh the local OpenRouter model catalog:

```bash
npm run models:refresh
```

CAREVAL keeps external benchmark sources in `api/_data/benchmark-sources.json`. Use those sources for context, pricing, speed, and broad capability signals; keep CAREVAL scores separate because they measure invisible labour and care reasoning.

For local/offline fallback, export reviewed JSON and publish with:

```bash
npm run leaderboard:publish-reviewed -- audits/review-queues/<run-id>.reviewed.json
```

One-click publishing on Vercel requires server-side environment variables:

```text
GITHUB_TOKEN=...
ADMIN_PUBLISH_TOKEN=...
```

`GITHUB_TOKEN` commits the reviewed leaderboard to the repo. `ADMIN_PUBLISH_TOKEN` is the passcode entered on `#/admin` before publishing.
  
