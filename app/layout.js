import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "내 블로그",
  description: "Next.js로 만든 개인 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              내 블로그
            </Link>
            <nav className="nav">
              <Link href="/">홈</Link>
              <Link href="/write">글쓰기</Link>
              <Link href="/about">소개</Link>
              <a href="/game.html">주가 게임</a>
            </nav>
          </div>
        </header>
        <main className="container main">{children}</main>
        <footer className="site-footer">
          <div className="container">
            © {new Date().getFullYear()} 내 블로그 · Built with Next.js on Vercel
          </div>
        </footer>
      </body>
    </html>
  );
}
