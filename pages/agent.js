import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { supabase } from './../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import React from 'react';
import Link from 'next/link';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh',
};

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps() {
  try {
    const { data } = await supabase
      .from('trashlocations')
      .select()
      .in('status', ['rejected']);

    return {
      props: {
        trashlocations: data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        trashlocations: [],
      },
    };
  }
}


function parseCoordinate(coordStr) {
  if (typeof coordStr !== 'string') {
    return null;
  }

  const match = coordStr.match(/^\(([-\d.]+),\s*([-\d.]+)\)$/);
  if (!match) {
    return null;
  }

  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[2]);
  return [lat, lng];
}

function isValidCoordinate(coord) {
  const parsedCoord = parseCoordinate(coord);
  if (!parsedCoord) {
    return false;
  }

  const [lat, lng] = parsedCoord;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function Map({ trashlocations }) {
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 47,
    lng: 9,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDefaultCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoPaneVisible, setInfoPaneVisible] = useState(false);

  const validLocations = trashlocations.filter((location) =>
    isValidCoordinate(location.location_coordinate)
  );

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map) {
      const newMarkers = validLocations.map((location) => {
        const [lat, lng] = parseCoordinate(location.location_coordinate);
        return (
          <Marker
            key={location.id}
            position={{ lat, lng }}
            onClick={() => {
              setSelectedMarker(location);
              setInfoPaneVisible(true);
            }}
          />
        );
      });
      setMarkers(newMarkers);
    }
  }, [map]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAepDDwhW6MUlQG8Kw5WeZgh9tNsJTBW6I">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onLoad={(loadedMap) => setMap(loadedMap)}
      >
        {markers}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: parseCoordinate(selectedMarker.location_coordinate)[0],
              lng: parseCoordinate(selectedMarker.location_coordinate)[1],
            }}
            onCloseClick={() => {
              setInfoPaneVisible(false);
              setSelectedMarker(null);
            }}
          >
            <div>
              <h4>ID: {selectedMarker.id}</h4>
              <p>Quantity: {selectedMarker.quantity}</p>
              <p>Status: {selectedMarker.status}</p>
              <img
                src={selectedMarker.image_url}
                alt={`Trash location ${selectedMarker.id}`}
                width={200}
              />
              <Link
                href={{
                  pathname: '/trashlocation',
                  query: {
                    id: selectedMarker.id,
                    quantity: selectedMarker.quantity,
                    status: selectedMarker.status,
                    image_url: selectedMarker.image_url,
                  },
                }}
              >
                <button>View Details</button>
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>)
  }
  
  export default function Collector({ trashlocations }) {
    return (
      <>
        <Head>
          <title>Trash Bulk. City of St. Gallen</title>
          <meta name="description" content="Your way to easily leave the bulk trash" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
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
          <div className={styles.mapPaddingTop}>
            <p> </p>
          </div>
          <Map trashlocations={trashlocations} />
        </main>
      </>
    );
  }
  
