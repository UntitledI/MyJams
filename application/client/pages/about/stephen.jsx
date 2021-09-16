import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/About.stephen.module.css'

export default function Stephen(){
    return(
        <>
            <Head>
                <title>About Us - Stephen</title>
            </Head>
            <div className={styles.header}>
                <h1>Stephen Kelvin Justo</h1>
            </div>
            <div>
                <div className={styles.photoContainer}>
                    <div className={styles.cropped}>
                        <Image src="/about/stephen/stephen.jpg" width={240} height={320} priority/>
                    </div>
                </div>
                <h2>Front-end Lead</h2>
                <p>I am a senior at SFSU majoring in Computer Science.</p>
                <div className={styles.logos}>
                    <div className={styles.logo}>
                        <Link href="https://github.com/Switch24-7">
                            <a>
                                <Image src="/logos/github.png" width={64} height={64}/>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.logo}>
                        <Link href="https://www.linkedin.com/in/stephen-kelvin-justo/">
                            <a>
                                <Image src="/logos/linkedin.png" width={64} height={64}/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}