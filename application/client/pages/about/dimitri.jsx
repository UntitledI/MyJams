import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/About.dimitri.module.css'

export default function Dimitri(){
    return(
        <>
            <Head>
                <title>About Us - Dimitri</title>
            </Head>
            <div className={styles.header}>
                <h1>Dimitri Rodriguez</h1>
            </div>

            <div>
                <h2>Back-end Lead</h2>
            </div>

            <div className={styles.photoContainer}>
                        <Image src="/about/dimitri/dimitri.jpg" width={640} height={420}/>
            </div>
            <p>SFSU senior studying computer science</p>
            <div>
                <Link href="mailto:dimitri98@me.com" className={styles.l1}> Email: dimitri98@icloud.com </Link>
            </div>
            <div>
                <Link href="https://github.com/UntitledI" className={styles.l1}> Github </Link>
            </div>
            
            
        </>
    )
}