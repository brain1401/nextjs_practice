import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Nanum_Gothic } from "next/font/google";

const sans = Open_Sans({ subsets: ["latin"] });
const gothic = Nanum_Gothic({
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  //SEO 설정
  title: "멋진 제품 사이트", //타이틀은 여기에
  description: "멋진 제품 사이트의 메인 화면입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr" className={gothic.className}>
      <body>
        <header className={styles.header}> {/*임포트한 css 모듈 styles파일 안에 있는 .header 선택자를 사용*/}
          <Link href="/">Demo Note</Link>
          <nav className={styles.nav}>  {/*임포트한 css 모듈 styles파일 안에 있는 .nav 선택자를 사용*/}
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
