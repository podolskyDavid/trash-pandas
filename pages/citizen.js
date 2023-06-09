import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google';
import styles from '@/styles/Home.module.css'
import React, {useEffect, useState} from 'react';

import Link from "next/link";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const [imageUrlInput, setImageUrlInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [numStampsInput, setNumStampsInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [expandedSection, setExpandedSection] = useState(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isToTake, setIsToTake] = useState(false);

    const handleImageChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImageInput(reader.result);
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

    const openChat = () => {
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    const openToTake = () => {
        setIsToTake(true);
    };

    const closeToTake = () => {
        setIsToTake(false);
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
                                href="./"
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
                <div className={`${styles.columns}`}>
                    <div className={` ${styles.wrapper}`}>
                        <div className={styles.bulkGarbageTitle}>Bulk Garbage Disposal Form</div>

                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.formInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            className={styles.formInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Number of Stamps"
                            className={styles.formInput}
                            onChange={(e) => setNumStampsInput(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className={styles.formInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                        />

                        <div className={styles.mapContainer} onClick={openBiggerMap}>
                            <Image
                                src="/map_preview.jpg"
                                alt="Map preview"
                                width={250}
                                height={100}
                            />
                        </div>
                        <Link href="/success">
                            <button
                                type="submit"
                                className={styles.formButton}
                            >
                                Pay
                            </button>
                        </Link>

                    </div>
                    <div className={`${styles.wrapper}`}>

                        <div
                            className={`${styles.section} ${expandedSection === 0 ? styles.expanded : ''}`}
                            onClick={() => handleSectionClick(0)}
                        >
                            <h3>Instructions</h3>
                            {expandedSection === 0 && (
                                <div className={styles.expandedContent}>
                                    <ol>
                                        <li>Enter your email address</li>
                                        <li>Take a picture of the bulk garbage</li>
                                        <li>Specify the location on the map</li>
                                        <li>Pay</li>
                                    </ol>
                                </div>
                            )}
                        </div>

                        <div
                            className={`${styles.section} ${expandedSection === 1 ? styles.expanded : ''}`}
                            onClick={openChat}
                        >
                            <h3>Chat</h3>
                        </div>

                        <div
                            className={`${styles.section} ${expandedSection === 2 ? styles.expanded : ''}`}
                            onClick={() => handleSectionClick(2)}
                        >
                            <h3>Next pick-up date: <span className={styles.pickupDate}>28.04.23</span></h3>


                            {expandedSection === 2 && (
                                <div className={styles.expandedContent}>
                                    Based on your location, we are estimating when the trash is going to be picked
                                    up.
                                    <br/><br/>
                                    <b>If you believe that your object can serve a second life, please leave it
                                        three
                                        days before the pick up. That way someone can pick it up and you will be
                                        reimbursed the stamp(s) prices</b>
                                </div>
                            )}
                        </div>

                        <div
                            className={`${styles.section} ${expandedSection === 3 ? styles.expanded : ''}`}
                            onClick={openToTake}
                        >
                            <h3>Gratis zum Mitnehmen</h3>
                        </div>


                    </div>
                </div>
                {isMapModalOpen && (
                    <div className={styles.mapModal}>
                        <div className={styles.mapBackdrop} onClick={closeBiggerMap}></div>
                        <div className={styles.openWindowContent}>

                            <div className={styles.openWindowTitleDescription}>

                                <h2>Disposal Location</h2>
                                <div>Please specify where you left the object</div>

                            </div>

                            <button className={styles.closeButton} onClick={closeBiggerMap}>
                                ✖️
                            </button>
                        </div>
                    </div>
                )}

                {isChatOpen && (
                    <div className={styles.mapModal}>
                        <div className={styles.mapBackdrop} onClick={closeChat}></div>
                        <div className={styles.openWindowContent}>

                            <div className={styles.openWindowTitleDescription}>

                                <h2>Ask your questions</h2>
                                <div>Let us help you with your questions.</div>

                            </div>

                            <button className={styles.closeButton} onClick={closeChat}>
                                ✖️
                            </button>
                        </div>
                    </div>
                )}

                {isToTake && (
                    <div className={styles.mapModal}>
                        <div className={styles.mapBackdrop} onClick={closeToTake}></div>
                        <div className={styles.openWindowContent}>
                            <div className={styles.openWindowTitleDescription}>

                                <h2>Second-hand objects</h2>
                                <div>You are welcome to take these!</div>

                            </div>

                            <div className={styles.objectsContainer}>
                                <div className={styles.singleObject}>
                                    <Image
                                        src="/racoon.png"
                                        alt="sample image"
                                        width={100}
                                        height={100}
                                        priority
                                    />
                                    <span>A nice racoon!</span>
                                </div>

                                <div className={styles.singleObject}>
                                    <Image
                                        src="/racoon.png"
                                        alt="sample image"
                                        width={100}
                                        height={100}
                                        priority
                                    />
                                    <span>A nice racoon!</span>
                                </div>

                                <div className={styles.singleObject}>
                                    <Image
                                        src="/racoon.png"
                                        alt="sample image"
                                        width={100}
                                        height={100}
                                        priority
                                    />
                                    <span>A nice racoon!</span>
                                </div>
                            </div>

                            <button className={styles.closeButton} onClick={closeToTake}>
                                ✖️
                            </button>
                        </div>
                    </div>
                )}


            </main>
        </>
    );
}

