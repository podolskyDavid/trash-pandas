import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, {useState} from 'react';


const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [image, setImage] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

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

    const handleSectionClick = (sectionIndex) => {
        if (expandedSection === sectionIndex) {
            setExpandedSection(null);
        } else {
            setExpandedSection(sectionIndex);
        }
    };

    const openBiggerMap = () => {
        setIsMapModalOpen(true);
    };

    const closeBiggerMap = () => {
        setIsMapModalOpen(false);
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
                                width={100}
                                height={24}
                                priority
                            />
                        </a>
                    </div>
                </div>
                <div className={styles.columns}>
                    <div className={`${styles.container} ${styles.formContainer}`}>
                        <input type="email" placeholder="Email"/>
                        <input type="file" accept="image/*" onChange={handleImageChange}/>
                        <div className={styles.mapContainer} onClick={openBiggerMap}>
                            <Image
                                src="/map_preview.jpg"
                                alt="Map preview"
                                width={250}
                                height={100}
                            />
                        </div>
                        <button>Pay</button>

                    </div>
                    <div className={`${styles.container} ${styles.sectionContainer}`}>
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.section} ${
                                        expandedSection === index ? styles.expanded : ''
                                    }`}
                                    onClick={() => handleSectionClick(index)}
                                >
                                    Section {index + 1}
                                </div>
                            ))}
                    </div>
                </div>

                {isMapModalOpen && (
                    <div className={styles.mapModal}>
                        <div className={styles.mapBackdrop} onClick={closeBiggerMap}></div>
                        <div className={styles.mapContent}>
                            {/* Render your bigger map component here */}
                            <button className={styles.closeMapButton} onClick={closeBiggerMap}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </>
    )
}
