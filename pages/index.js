import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <Head>
                <title>Trash Bulk. City of St. Gallen</title>
                <meta name="description" content="Your way to easily leave the bulk trash"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.description}>
                    <div>
                        <p>
                            <a
                                href="https://www.stadt.sg.ch/home/welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/logo-stg.svg"
                                    alt="St. Gallen Logo"
                                    className={styles.vercelLogo}
                                    width={100}
                                    height={24}
                                    priority
                                />
                            </a>
                        </p>
                    </div>
                    <div>
                        <a
                            href="https://www.tum-ai.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            by{' '}
                            <Image
                                src="/tumai.svg"
                                alt="TUM.ai Logo"
                                className={styles.vercelLogo}
                                width={100}
                                height={24}
                                priority
                            />
                        </a>
                    </div>
                </div>

                <div className={styles.center}>
                    <h2>Upload an image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.uploadInput}
                    />
                    {image && (
                        <div className={styles.uploadedImage}>
                            <Image src={image} alt="Uploaded Image" layout="fill" objectFit="cover" />
                        </div>
                    )}
                </div>

                <div className={styles.grid}>
                    <a
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Docs <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Find in-depth information about Next.js features and&nbsp;API.
                        </p>
                    </a>

                    <a
                        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Learn <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Learn about Next.js in an interactive course with&nbsp;quizzes!
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Templates <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Discover and deploy boilerplate example Next.js&nbsp;projects.
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className={inter.className}>
                            Deploy <span>-&gt;</span>
                        </h2>
                        <p className={inter.className}>
                            Instantly deploy your Next.js site to a shareable URL
                            with&nbsp;Vercel.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}
