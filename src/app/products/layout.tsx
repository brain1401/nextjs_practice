import styles from "./layout.module.css";
import Link from "next/link";

export default function ProductsRayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className={styles.nav_product}>
        <Link href="/products/man">남성옷</Link>
        <Link href="/products/women">여성옷</Link>
      </nav>

      <section className={styles.mainbody}>{children}</section>
    </div>
  );
}
