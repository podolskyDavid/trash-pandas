import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

const inter = Inter({subsets: ['latin']});

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
          <p>
              <a
                href="./"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/../public/RacoonLogo.png"
                  alt="Smart Gallen Logo"
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
        <h1 className={styles.headerText}>Trash Bulk</h1>
        <h2 className={styles.subheadText}>Your way to easily leave the bulk trash</h2>
        {/* <div
          className={styles.header}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <Image
            src="/../public/logo_racoon.png"
            alt="Header Logo"
            width={200}
            height={50}
            priority
          />
        </div> */}
        <div className={styles.grid} style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="./collector"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              City Worker <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              I am a trash collector.
            </p>
          </a>
          <a
            href="./agent"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Agent <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              I am an agent.
            </p>
          </a>

          <a
            href="./citizen"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Citizen <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Quickly set out your trash for collection, or find second-hand items. 
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
