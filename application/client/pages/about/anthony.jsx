import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/About.anthony.module.css'

export default function Anthony(){
    return(
        <>
            <Head>
                <title>About Us - Anthony</title>
            </Head>
            <div className={styles.header}>
                <h1>Anthony Joshua Hizon</h1>
            </div>
            <div className={styles.h2}>
                <h2>Engineer</h2>
            </div>
            <Image src="/about/anthony/anthonypic.JPG" width={620} height={320}/>
            <Link href="mailto:Anthonyjhizon714@gmail.com">Contact Me</Link>
        </>
    )
}