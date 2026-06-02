"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocalPosts } from "@/lib/localPosts";

export default function PostList({ initialPosts }) {
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    setLocalPosts(getLocalPosts());
  }, []);

  const all = [
    ...initialPosts.map((p) => ({ ...p, local: false })),
    ...localPosts.map((p) => ({ ...p, local: true })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <ul className="post-list">
      {all.map((post) => (
        <li key={`${post.local ? "local" : "file"}-${post.slug}`}>
          <Link
            href={post.local ? `/my/${post.slug}` : `/posts/${post.slug}`}
            className="post-card"
          >
            <div className="post-meta">
              {post.date}
              {post.local && " · 이 브라우저에만 저장됨"}
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            {post.tags?.length > 0 && (
              <div className="tags">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
