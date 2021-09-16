import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/About.nathaniel.module.css';

export default function Nathaniel(){
    return(
        <>
            <Head>
                <title>About Us - Nathaniel</title>
            </Head>
            <div className={styles.header}>
                <h1>Nathaniel Ray Duya</h1>
                <h2>Scrum Master</h2>
            </div>
            <div className={styles.container}>
                <div>
                    <Image src="/about/nathaniel/nathaniel.jpg" height={500} width={680}/>
                </div>
                <div>
                    <Link href="https://www.linkedin.com/in/nathaniel-ray-duya/">
                        LinkedIn
                    </Link>
                </div>
                <div>
                    <Link href="https://github.com/NRDuya">
                        Github
                    </Link>
                </div>
            </div>

        </>
    )
}