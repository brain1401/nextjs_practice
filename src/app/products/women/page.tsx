import Image from "next/image";
import manImage from "../../../../public/images/womenKind.jpg";

export default function WomenProducts() {
  return (
    <>
      <h1>여성옷 페이지입니다.</h1>
      <Image src={manImage} alt="여성옷" width={400} height={400}/>
    </>
  );
}
