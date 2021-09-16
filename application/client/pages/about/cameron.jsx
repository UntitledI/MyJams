import Head from 'next/head'
import styles from '../../styles/About-Cameron.module.css'

export default function Cameron(){
    return(
        <>
            <Head>
                <title>About Us - Cameron</title>
            </Head>
            <div className={styles.header}>
                <h1>Cameron Paczek</h1>
            </div>
            <div>
                <h2>Team Lead</h2>
            </div>
            <div>
                <p>
                    My name is Cameron and I have been a software developer for 6 years. I am currently a 2nd year student at SF State and my expertise is in front-end and backend- web development.
                </p>
            </div>
            <a href="mailto:cameronpaczek@gmail.com">Email Me</a>

        </>
    )
}
