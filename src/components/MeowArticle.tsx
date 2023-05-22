'use client'

import { useEffect, useState } from 'react';
import styles from './MeowArticle.module.css';

export default function MeowArticle() {

  const [value, setValue] = useState<string>("데이터 로딩중...");

  useEffect(() => {

      fetch("https://meowfacts.herokuapp.com", {cache: "no-store",})
      .then(res => res.json())
      .then(data => setValue(data.data[0]))
    },[])

  return <article className={styles.article}>{value}</article>
  
}