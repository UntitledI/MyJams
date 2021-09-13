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
                <div className={styles.photoContainer}>
                    <div className={styles.cropped}>
                        <Image src="/about/stephen/stephen.jpg" width={240} height={320} priority/>
                    </div>
                </div>
                <h2>Github Master</h2>
                <p>I am a senior at SFSU majoring in Computer Science.</p>
                <div className={styles.logos}>
                    <div className={styles.logo}>
                        <Link href="https://github.com/swu465">
                            <a>
                                <Image src="/logos/github.png" width={64} height={64}/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}