import React, { useEffect, useState } from 'react';
import { getArtists } from '../services/api';
import styles from '../components/css/list.module.css';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getArtists();
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError(error);
      }
    };

    fetchArtists();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className={styles.tituloPrincipal}>Artistas</h1>
      <div className={styles.container}>
        <ul>
          {artists.map((artist) => (
          <li key={artist.id} className={styles.container__item}>
            <img
                src={artist.photoUrl}
                alt={artist.name}
                className={styles.container__item__img}
            />
            
            <div className={styles.container__item__info}>
              <h2>{artist.name}</h2>
              <p className={styles.container__item__info__bio}>{artist.bio}</p>
            </div>
            <div className={styles.linea}></div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistList;
