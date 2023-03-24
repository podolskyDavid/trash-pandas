import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

const inter = Inter({subsets: ['latin']});

export default function Success() {

  return (
    <>
      <Head>
        <title>Bulk Trash Disposal. City of St. Gallen</title>
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
          <h2 className={styles.subheadText}>Success. Thank you for Submitting the request!</h2>
        </div>

      </main>
    </>
  );
}
