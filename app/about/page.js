import Link from "next/link";

export const metadata = {
  title: "소개 · 내 블로그",
  description: "블로그와 작성자에 대한 소개",
};

export default function AboutPage() {
  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>
      <header className="article-header">
        <h1>소개</h1>
      </header>
      <div className="prose">
        <p>
          이 블로그는 Next.js와 Vercel로 만든 개인 공간입니다. 개발하면서 배운
          것들, 투자 기록, 그리고 일상의 생각을 정리합니다.
        </p>
        <p>
          마크다운 파일(<code>posts/*.md</code>)을 추가하면 자동으로 글 목록에
          나타납니다.
        </p>
        <p>
          예전에 만든 <a href="/game.html">주가 예측 게임</a>도 함께 즐겨보세요.
        </p>
      </div>
    </article>
  );
}
