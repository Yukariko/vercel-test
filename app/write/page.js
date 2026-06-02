"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveLocalPost, makeSlug } from "@/lib/localPosts";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const finalSlug = makeSlug(slug || title);
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    saveLocalPost({
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt.trim(),
      tags: tagList,
      content: content.trim(),
      date: new Date().toISOString().slice(0, 10),
    });
    router.push(`/my/${finalSlug}`);
  }

  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>
      <header className="article-header">
        <h1>글쓰기</h1>
        <div className="post-meta">
          작성한 글은 이 브라우저에만 저장됩니다. (서버에 영구 저장되지 않음)
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

        <button className="submit-btn" type="submit">
          저장하기
        </button>
      </form>
    </article>
  );
}
