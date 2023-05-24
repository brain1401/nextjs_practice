import Link from "next/link";
import Image from "next/image";
import styles from './page.module.css'
import { Product, getProducts } from "@/service/products";
import MeowArticle from "@/components/MeowArticle";
import clotheImage from '../../../public/images/clothes.jpg'

export default async function ProductsPage() {
  const ognlProducts:Product[] = await getProducts();

  const idsToRemove = ["man", "women"];
  const processedProducts = ognlProducts.filter(
    (product: Product) => !idsToRemove.includes(product.id)
  );

  return (
    <div className={styles.mainbody}>
      <h1>제품 소개 페이지!</h1>

      <Image src={clotheImage} alt="Clothes" />
      <ul>
        {processedProducts.map((product: Product, i: number) => (
          <li key={product.id} className={styles.product}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <MeowArticle />
    </div>
  );
}