import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_DIR = join(__dirname, "..", "cards");

function loadCard(filePath) {
  const raw = readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(raw);
  const category = filePath
    .replace(CARDS_DIR, "")
    .split("/")
    .filter(Boolean)[0];
  return { ...frontmatter, category, body: content.trim(), file: filePath };
}

function allCards() {
  const cards = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (entry.endsWith(".md")) {
        try {
          cards.push(loadCard(full));
        } catch {
          // skip malformed cards
        }
      }
    }
  };
  walk(CARDS_DIR);
  return cards;
}

// Cache cards at startup — the KB is static during a session
const CARDS = allCards();

function scoreCard(card, terms) {
  let score = 0;
  const haystack = [
    card.id ?? "",
    card.title ?? "",
    card.category ?? "",
    (card.tags ?? []).join(" "),
    card.body,
  ]
    .join(" ")
    .toLowerCase();

  for (const term of terms) {
    const t = term.toLowerCase();
    if (card.id?.toLowerCase() === t) score += 20;
    else if (card.title?.toLowerCase().includes(t)) score += 10;
    else if ((card.tags ?? []).some((tag) => tag.toLowerCase().includes(t)))
      score += 6;
    else if (card.category?.toLowerCase().includes(t)) score += 4;
    else if (haystack.includes(t)) score += 1;
  }
  return score;
}

const server = new McpServer({
  name: "zinit-kb",
  version: "1.0.0",
});

server.tool(
  "search_cards",
  "Search zinit knowledge base cards by keyword, tag, or concept. Returns matching card summaries.",
  {
    query: z.string().describe("Search terms (space-separated)"),
    category: z
      .enum([
        "ices",
        "commands",
        "concepts",
        "annexes",
        "packages",
        "recipes",
        "troubleshooting",
        "installation",
        "migration",
        "all",
      ])
      .optional()
      .default("all")
      .describe("Limit results to a category"),
    limit: z
      .number()
      .int()
      .min(1)
      .max(20)
      .optional()
      .default(5)
      .describe("Max results to return"),
  },
  ({ query, category, limit }) => {
    const terms = query.trim().split(/\s+/).filter(Boolean);
    let pool = category === "all" ? CARDS : CARDS.filter((c) => c.category === category);

    const scored = pool
      .map((card) => ({ card, score: scoreCard(card, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    if (scored.length === 0) {
      return {
        content: [{ type: "text", text: "No matching cards found." }],
      };
    }

    const results = scored.map(({ card }) =>
      [
        `**${card.id}** (${card.category})`,
        `Title: ${card.title}`,
        `Tags: ${(card.tags ?? []).join(", ")}`,
        card.body.split("\n").slice(0, 6).join("\n"),
      ].join("\n")
    );

    return {
      content: [{ type: "text", text: results.join("\n\n---\n\n") }],
    };
  }
);

server.tool(
  "get_card",
  "Retrieve the full content of a zinit knowledge base card by its id.",
  {
    id: z.string().describe("Card id (e.g. 'wait', 'lucid', 'cmd-load')"),
  },
  ({ id }) => {
    const card = CARDS.find((c) => c.id === id);
    if (!card) {
      return {
        content: [{ type: "text", text: `Card not found: ${id}` }],
        isError: true,
      };
    }
    const header = [
      `# ${card.title}`,
      `id: ${card.id} | category: ${card.category}`,
      `tags: ${(card.tags ?? []).join(", ")}`,
      `source: ${card.source ?? ""}`,
      card.related?.length ? `related: ${card.related.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return {
      content: [{ type: "text", text: `${header}\n\n${card.body}` }],
    };
  }
);

server.tool(
  "list_cards",
  "List all cards in a category, or list available categories.",
  {
    category: z
      .enum([
        "ices",
        "commands",
        "concepts",
        "annexes",
        "packages",
        "recipes",
        "troubleshooting",
        "installation",
        "migration",
        "all",
      ])
      .optional()
      .default("all")
      .describe("Category to list; 'all' shows category counts"),
  },
  ({ category }) => {
    if (category === "all") {
      const counts = {};
      for (const card of CARDS) {
        counts[card.category] = (counts[card.category] ?? 0) + 1;
      }
      const lines = Object.entries(counts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([cat, n]) => `${cat}: ${n} cards`);
      lines.push(`\nTotal: ${CARDS.length} cards`);
      return { content: [{ type: "text", text: lines.join("\n") }] };
    }

    const filtered = CARDS.filter((c) => c.category === category);
    if (filtered.length === 0) {
      return {
        content: [{ type: "text", text: `No cards in category: ${category}` }],
      };
    }
    const lines = filtered
      .sort((a, b) => (a.id ?? "").localeCompare(b.id ?? ""))
      .map((c) => `${c.id} — ${c.title}`);
    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
