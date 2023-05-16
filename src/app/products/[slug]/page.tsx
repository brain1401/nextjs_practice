import NotFoundPage from "@/app/not-found";
import { getProduct, getProducts } from "@/service/products";
import { Metadata } from "next";

export const revalidate = 3; //3초마다 ISR을 진행

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ //Metadata 생성하는 함수
  params: { slug },
}: Props): Promise<Metadata> {
  const product = await getProduct(slug);

  return {
    title: `제품의 이름 : ${product?.name}`,
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  let result: string | undefined = undefined;

  if (slug === "women" || slug === "man") {
    result = slug;
  } 
  else {
    const product = await getProduct(slug);

    if (product !== undefined) {
      result = product.name;
    }
  }

  if (result === undefined) {
    return NotFoundPage();
  }
  else {
    return <h1>{result} 상품 페이지</h1>;
  }
  
}
export async function generateStaticParams() {
  //모든 제품의 아이디값과 man, women으로 route해서 접속하는 페이지들을 미리 만들어 둘 수 있게 하는 사전 정의된 Nextjs함수 (SSG)

  const products = await getProducts(); //서버 내의 products.json에서 모든 제품 데이터를 받아옴

  const resultArray = products.map((product) => ({
    slug: product.id,
  })); 

  resultArray.push({ slug: "man" }, { slug: "women" }); // 마지막에 man과 womem을 배열에 push해줌

  return resultArray;
}
