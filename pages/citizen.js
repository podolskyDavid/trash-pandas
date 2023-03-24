import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, {useState} from 'react';
import LoremIpsum from 'react-lorem-ipsum';

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
                    <div className={`${styles.container} ${styles.formContainer} ${styles.wrapper}`}>
                        <div className={styles.bulkGarbageTitle}>Bulk Garbage Disposal Form</div>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.formInput}
                        />
                        <label htmlFor="fileInput" className={styles.customFileButton}>
                            Choose File
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                        <div className={styles.mapContainer} onClick={openBiggerMap}>
                            <Image
                                src="/map_preview.jpg"
                                alt="Map preview"
                                width={250}
                                height={100}
                            />
                        </div>
                        <button type="submit" className={styles.formButton}>
                            Pay
                        </button>

                    </div>
                    <div className={`${styles.container} ${styles.sectionContainer} ${styles.wrapper}`}>

                        <div
                            className={`${styles.section} ${expandedSection === 0 ? styles.expanded : ''}`}
                            onClick={() => handleSectionClick(0)}
                        >
                            <h3>Section 1</h3>
                            {expandedSection === 0 && (
                                <div className={styles.expandedContent}>
                                    <LoremIpsum p={1} />
                                </div>
                            )}
                        </div>

                        <div
                            className={`${styles.section} ${expandedSection === 0 ? styles.expanded : ''}`}
                            onClick={() => handleSectionClick(1)}
                        >
                            <h3>Section 2</h3>
                            {expandedSection === 1 && (
                                <div className={styles.expandedContent}>
                                    <LoremIpsum p={1} />
                                </div>
                            )}
                        </div>

                        <div
                            className={`${styles.section} ${expandedSection === 0 ? styles.expanded : ''}`}
                            onClick={() => handleSectionClick(2)}
                        >
                            <h3>Section 3</h3>
                            {expandedSection === 2 && (
                                <div className={styles.expandedContent}>
                                    <LoremIpsum p={1} />
                                </div>
                            )}
                        </div>

                        <div
                            className={`${styles.section} ${expandedSection === 0 ? styles.expanded : ''}`}
                            onClick={() => handleSectionClick(3)}
                        >
                            <h3>Section 4</h3>
                            {expandedSection === 3 && (
                                <div className={styles.expandedContent}>
                                    <LoremIpsum p={1} />
                                </div>
                            )}
                        </div>


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
