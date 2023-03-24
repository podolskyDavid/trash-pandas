import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { supabase } from './../lib/supabaseClient';

export default function TrashLocation() {
  const router = useRouter();
  const { id, quantity, status, image_url } = router.query;
  const [selectedStatus, setSelectedStatus] = useState(null);

  const updateStatus = async () => {
    try {
      const { error } = await supabase
        .from('trashlocations')
        .update({ status: selectedStatus })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      alert(`Status updated to: ${selectedStatus}`);
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  return (
    <>
      <Head>
        <title>Trash Bulk Location {id} - City of St. Gallen</title>
        <meta
          name="description"
          content={`Details for trash location ${id}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.trashDetailsColumns}>
          <div className={styles.trashDetailsLeft}>
            <img
              src={image_url}
              alt={`Trash location ${id}`}
              width={400}
              height={400}
            />
            <h2>ID: {id}</h2>
            <p>Quantity: {quantity}</p>
            <p>Status: {status}</p>
          </div>
          <div className={styles.trashDetailsRight}>
            <div>
              <button
                className={
                  selectedStatus === 'collected'
                    ? styles.statusButtonSelected
                    : styles.statusButton
                }
                onClick={() => setSelectedStatus('collected')}
              >
                Collected
              </button>
              <button
                className={
                  selectedStatus === 'rejected'
                    ? styles.statusButtonSelected
                    : styles.statusButton
                }
                onClick={() => setSelectedStatus('rejected')}
              >
                Rejected
              </button>
              <button
                className={
                  selectedStatus === 'not present'
                    ? styles.statusButtonSelected
                    : styles.statusButton
                }
                onClick={() => setSelectedStatus('not present')}
              >
                Not Present
              </button>
            </div>
            <button
              className={
                selectedStatus
                  ? styles.submitButtonActive
                  : styles.submitButtonInactive
              }
              onClick={updateStatus}
              disabled={!selectedStatus}
            >
              Submit
            </button>
          </div>
        </div>
        <p>
          <Link href="/" legacyBehavior>
            <a style={{ textDecoration: 'underline', color: 'blue' }}>
              Back to map
            </a>
          </Link>
        </p>
      </main>
    </>
  );
}
