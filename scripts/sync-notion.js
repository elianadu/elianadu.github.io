// sync-notion.js
//
// For each entry in notion-pages.json, fetches that Notion page's content
// and writes it into the matching HTML file, between the
//   <!-- NOTION:START --> ... <!-- NOTION:END -->
// markers. Everything else in the file (nav, photo, sidebar) is untouched.
//
// Requires Node 20+ (built-in fetch). Run via the GitHub Action, or locally:
//   NOTION_TOKEN=secret_xxx node .github/scripts/sync-notion.js

const fs = require("fs");
const path = require("path");

const TOKEN = process.env.NOTION_TOKEN;
if (!TOKEN) {
  console.error("NOTION_TOKEN is not set.");
  process.exit(1);
}

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const CONFIG_PATH = path.join(__dirname, "notion-pages.json");
const NOTION_VERSION = "2022-06-28";

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

async function notionFetch(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Notion-Version": NOTION_VERSION,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error("Notion API " + res.status + " for " + url + "\n" + body);
  }
  return res.json();
}

async function getAllBlocks(blockId) {
  let blocks = [];
  let cursor = undefined;
  do {
    const url =
      "https://api.notion.com/v1/blocks/" + blockId + "/children?page_size=100" +
      (cursor ? "&start_cursor=" + cursor : "");
    const data = await notionFetch(url);
    blocks = blocks.concat(data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

// --- rich text -> inline HTML -------------------------------------------

function escapeHTML(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function richTextToHTML(richText) {
  return (richText || [])
    .map(function (rt) {
      var text = escapeHTML(rt.plain_text || "");
      var a = rt.annotations || {};
      if (a.code) text = "<code>" + text + "</code>";
      if (a.bold) text = "<strong>" + text + "</strong>";
      if (a.italic) text = "<em>" + text + "</em>";
      if (a.strikethrough) text = "<s>" + text + "</s>";
      if (rt.href) text = '<a class="il" href="' + rt.href + '" target="_blank" rel="noopener">' + text + "</a>";
      return text;
    })
    .join("");
}

// --- blocks -> HTML -------------------------------------------------------
// Deliberately simple: paragraphs, headings (all rendered as h2 — the page's
// own h1 title stays fixed outside the synced region), bulleted/numbered
// lists, quotes, dividers, to-dos. Anything else is skipped rather than
// breaking the page.

function blocksToHTML(blocks) {
  var out = [];
  var i = 0;

  while (i < blocks.length) {
    var b = blocks[i];
    var t = b.type;

    if (t === "paragraph") {
      var text = richTextToHTML(b.paragraph.rich_text);
      out.push(text ? "<p>" + text + "</p>" : "");
      i++;
    } else if (t === "heading_1" || t === "heading_2" || t === "heading_3") {
      out.push("<h2>" + richTextToHTML(b[t].rich_text) + "</h2>");
      i++;
    } else if (t === "bulleted_list_item") {
      var items = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push("<li>" + richTextToHTML(blocks[i].bulleted_list_item.rich_text) + "</li>");
        i++;
      }
      out.push("<ul>" + items.join("") + "</ul>");
    } else if (t === "numbered_list_item") {
      var nitems = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        nitems.push("<li>" + richTextToHTML(blocks[i].numbered_list_item.rich_text) + "</li>");
        i++;
      }
      out.push("<ol>" + nitems.join("") + "</ol>");
    } else if (t === "to_do") {
      var mark = b.to_do.checked ? "☑" : "☐";
      out.push("<p>" + mark + " " + richTextToHTML(b.to_do.rich_text) + "</p>");
      i++;
    } else if (t === "quote") {
      out.push("<blockquote>" + richTextToHTML(b.quote.rich_text) + "</blockquote>");
      i++;
    } else if (t === "divider") {
      out.push("<hr />");
      i++;
    } else {
      // images, embeds, tables, etc. — skipped for now rather than guessed at
      i++;
    }
  }

  return out.filter(Boolean).join("\n      ");
}

// --- inject into the HTML file --------------------------------------------

function injectIntoFile(filePath, html) {
  var full = path.join(REPO_ROOT, filePath);
  var src = fs.readFileSync(full, "utf8");
  var start = "<!-- NOTION:START -->";
  var end = "<!-- NOTION:END -->";
  var si = src.indexOf(start);
  var ei = src.indexOf(end);
  if (si === -1 || ei === -1 || ei < si) {
    throw new Error("Markers not found (or out of order) in " + filePath);
  }
  var next = src.slice(0, si + start.length) + "\n      " + html + "\n      " + src.slice(ei);
  if (next !== src) {
    fs.writeFileSync(full, next, "utf8");
    return true;
  }
  return false;
}

// --- main -------------------------------------------------------------

async function main() {
  var config = readJSON(CONFIG_PATH);
  var changed = [];

  for (var key in config) {
    var entry = config[key];
    if (!entry.pageId || entry.pageId.indexOf("REPLACE_ME") === 0) {
      console.log("Skipping " + key + " — no page ID configured yet.");
      continue;
    }
    console.log("Fetching " + key + " (" + entry.pageId + ")...");
    var blocks = await getAllBlocks(entry.pageId);
    var html = blocksToHTML(blocks);
    var did = injectIntoFile(entry.file, html);
    if (did) changed.push(entry.file);
  }

  var summaryPath = process.env.GITHUB_OUTPUT;
  if (summaryPath) {
    fs.appendFileSync(summaryPath, "changed=" + (changed.length > 0) + "\n");
  }
  console.log(changed.length ? "Updated: " + changed.join(", ") : "No changes.");
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
