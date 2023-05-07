import styles from "./layout.module.css";

export default function ProductsRayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className={styles.nav_product}>
        <a href="">남성옷</a>
        <a href="">여성옷</a>
      </nav>

      <section>{children}</section>
    </div>
  );
}
