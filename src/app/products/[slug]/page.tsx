import NotFoundPage from "@/app/not-found";
import { getProduct, getProducts } from "@/service/products";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: {slug} }: Props):Promise<Metadata> {
  
  const product = await getProduct(slug);

  return {
    title: `제품의 이름 : ${product?.name}`,
  }
}

export default async function ProductPage({params : {slug}}: Props) {
  
  const product = await getProduct(slug);

  if (product === undefined) {
    NotFoundPage();
  }
  else{

    return <h1>{product.name} 제품 설명 페이지</h1>;
  }

  
}


export async function generateStaticParams() {
  //모든 제품의 페이지들을 미리 만들어 둘 수 있게 함 (SSG)
  
  const products = await getProducts();

  return products.map(product => ({
    slug: product.id,
  }));
}