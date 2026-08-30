# Notion → website sync

## How it works

Each of your six pages has a matching Notion page. A GitHub Action runs every
20 minutes (and on demand), pulls the text from each Notion page, and writes
it into the matching HTML file between two comment markers:

```html
<!-- NOTION:START -->
  ...your Notion content renders here...
<!-- NOTION:END -->
```

Everything else on the page — the nav, your photo, the social links — is
untouched. You never touch code to update your site; you just write in Notion.

**What you can use in Notion:** paragraphs, bold/italic/links, bulleted and
numbered lists, quotes, dividers, headings (headings render a size smaller
than the page title, so they work as sub-sections). Images, embeds, and
tables aren't converted yet — text content only for now.

## One-time setup

### 1. Create the six Notion pages

Make one Notion page per site page — doesn't matter where in your workspace,
a single parent page called "Website" with six sub-pages works well. Name
them however you like; the names don't matter, only the page IDs do (next
step).

Write your real content in each one now, in plain paragraphs — this is what
will appear on the site.

### 2. Update your integration's permissions

You likely already have a Notion integration from the quicknote setup. Reuse
it:

1. [notion.so/profile/integrations](https://www.notion.so/profile/integrations) → open your integration
2. Under **Capabilities**, make sure **Read content** is checked (quicknote only needed Insert content — sync needs Read too)
3. Save

If you'd rather keep them separate, create a new internal integration the
same way and just give it Read content.

### 3. Share each of the six pages with the integration

For **each** of the six Notion pages: `•••` menu → **Connections** → connect
your integration. This has to be done per-page — connecting the parent
"Website" page doesn't automatically share its children.

### 4. Get each page's ID

Open a page, `Share` → `Copy link`. The link looks like:

```
https://www.notion.so/Now-2547a1b2c3d4e5f6a7b8c9d0e1f2a3b4
```

The ID is the 32-character chunk at the end (no dashes needed, though Notion
links sometimes include them — either format works). Do this for all six.

### 5. Fill in the config

Open `.github/scripts/notion-pages.json` in this folder and replace each
`REPLACE_ME_...` with the matching page ID:

```json
{
  "home": { "file": "index.html", "pageId": "2547a1b2c3d4e5f6a7b8c9d0e1f2a3b4" },
  "now": { "file": "now.html", "pageId": "..." },
  ...
}
```

### 6. Upload everything to your repo

Upload this whole folder's contents to `elianadu.github.io`, preserving
structure — `.github/workflows/`, `.github/scripts/`, `styles/`, `scripts/`,
and the six HTML files at the repo root. GitHub's web uploader keeps folders
intact if you drag the whole thing in.

### 7. Add your Notion token as a GitHub secret

Repo → **Settings** → **Secrets and variables** → **Actions** → **New
repository secret**:
- Name: `NOTION_TOKEN`
- Value: your integration's secret (starts `ntn_...` or `secret_...`)

### 8. Run it once by hand

Repo → **Actions** tab → **Sync Notion content** (left sidebar) → **Run
workflow** button → **Run workflow**. Takes a few seconds. Refresh the
Actions page — green check means it worked and your Notion text is now live.
After this, it runs automatically every 20 minutes, and you can always
trigger it manually the same way if you don't want to wait.

## Editing content afterward

Just edit the Notion page. Wait up to 20 minutes, or trigger the Action
manually for an instant update. No terminal, no GitHub, no Claude — just
Notion.

## Adding a 7th page later

1. Add a new Notion page, share it with the integration, copy its ID
2. Add an entry to `notion-pages.json`
3. Add a corresponding HTML file with the same nav/rail structure and a
   `NOTION:START`/`NOTION:END` marker pair — easiest is to ask me to
   generate it, or run `build.py` after adding the page to its `PAGES` list
