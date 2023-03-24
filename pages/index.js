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
        <meta name="description" content="A system to easily dispose of the bulk trash"/>
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
        <div className={styles.textIndex}>
          <div className={styles.logoAndName}>
            <Image
                src="/racoon.png"
                alt="St. Gallen Bulk Trash Logo"
                width={200}
                height={200}
                priority
            />
            <h1 className={styles.headerText}>Bulk Waste <br/>Collection System</h1>
          </div>
          <h2 className={styles.subheadText}>Dispose of bulky waste easily with us 🗑️</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: "0px 0px 250px 0px" }}>
          <a
            href="./collector"
            className={styles.card}
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
