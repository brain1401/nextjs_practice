'use client'

import { useRouter } from "next/navigation"

export default function GoProductsButton(props:any) {

  const router = useRouter();

  return (
    <button className={props.className} onClick={() => {
      router.push('/products');
    }}>제품 페이지로 돌아가기</button>
  )
}
