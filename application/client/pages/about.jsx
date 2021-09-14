import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <>
        <Head>
            <title>About Us</title>
        </Head>
        <div className={styles.header}>
            <div>
                <h1>Software Engineering class SFSU</h1>
                <h2>Fall 2021, Section 1</h2>
                <h2>Team 3</h2>
            </div>
        </div>
        <div className={styles.cards}>
            <Link href='/about/anthony'>
                <a className={styles.card}>
                    <h3>Anthony Joshua Hizon</h3>
                </a>
            </Link>
            <Link href='/'>
                <a className={styles.card}>
                    <h3>Cameron Paczek</h3>
                </a>
            </Link>
            <Link href='/about/dimitri'>
                <a className={styles.card}>
                    <h3>Dimitri Rodriguez</h3>
                </a>
            </Link>
            <Link href='/'>
                <a className={styles.card}>
                    <h3>Nathaniel Ray Duya</h3>
                </a>
            </Link>
            <Link href='/'>
                <a className={styles.card}>
                    <h3>Simon Wu</h3>
                </a>
            </Link>
            <Link href='/about/stephen'>
                <a className={styles.card}>
                    <h3>Stephen Kelvin Justo</h3>
                </a>
            </Link> 
        </div>
    </>
  )
}