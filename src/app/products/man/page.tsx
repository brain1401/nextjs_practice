import Image from "next/image"
import manImage from '@/images/mankind.png';

export default function ManProducts() {

  return (
    <>
      <h1>남성옷 페이지입니다.</h1>
      <Image src={manImage} alt="남성옷" width={400} height={400}/>
    </>
  )
}