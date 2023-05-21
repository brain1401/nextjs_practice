import Link from "next/link";
import styles from './page.module.css'
import { Product, getProducts } from "@/service/products";
import { getMeowArticle } from "@/service/getMoewArticle";

export default async function ProductsPage() {

  const products = await getProducts();
  const meowdata = await getMeowArticle();

  return (
    <div className={styles.mainbody}>
      <h1>제품 소개 페이지!</h1>

      <ul>
        {products.map((product: Product, i: number) => (
          <li key={product.id} className={styles.product}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      {meowdata}
    </div>
  );
}