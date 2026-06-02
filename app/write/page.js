"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("blog-admin-token");
    if (saved) setToken(saved);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    localStorage.setItem("blog-admin-token", token);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, tags, excerpt, content, token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "오류가 발생했습니다.");
      setStatus({
        type: "success",
        msg: `발행 완료! 약 1~2분 후 재배포되면 /posts/${data.slug} 에서 확인할 수 있습니다.`,
      });
      setTitle("");
      setSlug("");
      setTags("");
      setExcerpt("");
      setContent("");
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>
      <header className="article-header">
        <h1>글쓰기</h1>
        <div className="post-meta">
          작성한 글은 저장소에 마크다운 파일로 커밋되어 자동 재배포됩니다.
        </div>
      </header>

      <form className="post-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>제목 *</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목"
            required
          />
        </label>

        <label className="field">
          <span>슬러그 (URL, 비우면 자동 생성)</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-post"
          />
        </label>

        <label className="field">
          <span>태그 (쉼표로 구분)</span>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="개발, 일상"
          />
        </label>

        <label className="field">
          <span>요약</span>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="목록에 표시될 한 줄 요약"
          />
        </label>

        <label className="field">
          <span>본문 (마크다운) *</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"## 소제목\n\n내용을 마크다운으로 작성하세요."}
            rows={16}
            required
          />
        </label>

        <label className="field">
          <span>관리자 토큰 *</span>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="BLOG_ADMIN_TOKEN"
            required
          />
        </label>

        <button className="submit-btn" type="submit" disabled={submitting}>
          {submitting ? "발행 중…" : "발행하기"}
        </button>

        {status && (
          <p className={`form-status ${status.type}`}>{status.msg}</p>
        )}
      </form>
    </article>
  );
}
