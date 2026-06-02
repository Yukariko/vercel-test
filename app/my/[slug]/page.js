"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import { getLocalPost, deleteLocalPost } from "@/lib/localPosts";

export default function MyPostPage({ params }) {
  const router = useRouter();
  const [post, setPost] = useState(undefined); // undefined: loading, null: not found
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    const found = getLocalPost(params.slug);
    setPost(found);
    if (found) {
      remark()
        .use(html)
        .process(found.content)
        .then((res) => setContentHtml(res.toString()));
    }
  }, [params.slug]);

  function handleDelete() {
    if (!confirm("이 글을 삭제할까요?")) return;
    deleteLocalPost(params.slug);
    router.push("/");
  }

  if (post === undefined) {
    return <p className="post-meta">불러오는 중…</p>;
  }

  if (post === null) {
    return (
      <article>
        <Link href="/" className="back-link">
          ← 목록으로
        </Link>
        <header className="article-header">
          <h1>글을 찾을 수 없습니다</h1>
          <div className="post-meta">
            이 글은 다른 브라우저/기기에서 작성되었거나 삭제되었을 수 있습니다.
          </div>
        </header>
      </article>
    );
  }

  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>
      <header className="article-header">
        <h1>{post.title}</h1>
        <div className="post-meta">{post.date} · 이 브라우저에만 저장됨</div>
        {post.tags?.length > 0 && (
          <div className="tags">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <div className="post-actions">
        <button className="danger-btn" type="button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </article>
  );
}
