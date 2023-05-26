import { getProduct, getProducts } from "@/service/products";
import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import GoProductsButton from "@/components/GoProductsButton";

export const revalidate = 3; //3초마다 ISR을 진행

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  //Metadata 생성하는 함수
  params: { slug },
}: Props): Promise<Metadata> {
  const product = await getProduct(slug);

  return {
    title: `제품의 이름 : ${product?.name}`,
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const product = await getProduct(slug);

  if (!product) {
    if (!["man", "women"].includes(slug)) {
      redirect("/products"); //man과 woman을 제외한 slug가 들어올 시 /products로 리다이렉트 시켜줌
    }
  }

  if (product !== undefined) {
    return (
      <>
        <div className={styles.productSection}>
          <h1>{product.name} 상품 페이지</h1>
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            width={400}
            height={400}
            className={styles.image}
          />
          <GoProductsButton className={styles.button} />
        </div>
      </>
    );
  }
}

export async function generateStaticParams() {
  //모든 제품의 아이디값으로 route해서 접속하는 페이지들을 미리 만들어 둘 수 있게 하는 사전 정의된 Nextjs함수 (SSG)

  const products = await getProducts(); //서버 내의 products.json에서 모든 제품 데이터를 받아옴

  const resultArray = products.map((product) => ({
    slug: product.id,
  }));

  console.log(resultArray);
  return resultArray;
}
