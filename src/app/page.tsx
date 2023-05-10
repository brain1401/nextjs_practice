import Image from 'next/image'
import styles from './page.module.css'
import os from 'os' // 노드APIs

export default function Home() {

  console.log(os.hostname()); //서버 컴포넌트라서 노드API 사용 가능
  return (
    <div>
      <h1>홈페이지다</h1>
    </div>
  )
}
