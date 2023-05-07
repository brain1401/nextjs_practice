import Link from "next/link";
import styles from './page.module.css'
export default function ProductsPage() {

  const products: string[] = ['pants','skirt','shirt','shoes'];

  return (
    <div className={styles.mainbody}>
      <h1>제품 소개 페이지!</h1>

      <ul>
        {products.map((item: string, i: number) => (
          <li key={i} className={styles.product}>
            <Link href={`/products/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}