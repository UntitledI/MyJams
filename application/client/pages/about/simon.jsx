import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/About.module.css'

export default function Simon(){
    return(
        <>
            <Head>
                <title>About Us - Simon</title>
            </Head>
            <div className={styles.header}>
                <h1>Simon Wu</h1>
            </div>
            <div>
                <h2>Github Master</h2>
                <p>I am a senior at SFSU majoring in Computer Science.</p>
                <div className={styles.photoContainer}>
                        <Image src="/about/simon/thisisfine.jpg" width={250} height={250} priority/>
                </div>
            </div>
        </>
    )
}