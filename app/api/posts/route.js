import { NextResponse } from "next/server";

export const runtime = "nodejs";

function makeSlug(input) {
  const base = input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `post-${Date.now()}`;
}

function buildMarkdown({ title, date, excerpt, tags, content }) {
  const tagLine = `[${tags.map((t) => JSON.stringify(t)).join(", ")}]`;
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `date: ${JSON.stringify(date)}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `tags: ${tagLine}`,
    "---",
    "",
    content.trim(),
    "",
  ].join("\n");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { title, tags, excerpt, content, slug: rawSlug, token } = body;

  const adminToken = process.env.BLOG_ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { error: "서버에 BLOG_ADMIN_TOKEN 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }
  if (!token || token !== adminToken) {
    return NextResponse.json({ error: "관리자 토큰이 올바르지 않습니다." }, { status: 401 });
  }

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "제목과 본문은 필수입니다." }, { status: 400 });
  }

  const ghToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "Yukariko/vercel-test";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!ghToken) {
    return NextResponse.json(
      { error: "서버에 GITHUB_TOKEN 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const slug = makeSlug(rawSlug || title);
  const date = new Date().toISOString().slice(0, 10);
  const tagList = (tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const markdown = buildMarkdown({ title, date, excerpt: excerpt || "", tags: tagList, content });
  const filename = `${slug}.md`;
  const contentsUrl = `https://api.github.com/repos/${repo}/contents/posts/${encodeURIComponent(
    filename
  )}`;

  const headers = {
    Authorization: `Bearer ${ghToken}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "vercel-blog",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  let sha;
  try {
    const head = await fetch(`${contentsUrl}?ref=${branch}`, { headers });
    if (head.status === 200) {
      const existing = await head.json();
      sha = existing.sha;
    }
  } catch {
    // ignore — treated as new file
  }

  let put;
  try {
    put = await fetch(contentsUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `post: ${title}`,
        content: Buffer.from(markdown, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
  } catch (err) {
    return NextResponse.json({ error: `GitHub 요청 실패: ${err.message}` }, { status: 502 });
  }

  if (!put.ok) {
    const detail = await put.text();
    return NextResponse.json(
      { error: `GitHub 커밋 실패 (${put.status}): ${detail}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, slug, updated: Boolean(sha) });
}
