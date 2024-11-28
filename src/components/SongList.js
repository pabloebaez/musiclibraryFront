import React, { useEffect, useState } from 'react';
import { getSongs, getArtistById } from '../services/api';
import styles from '../components/css/list.module.css';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songResponse = await getSongs();
        const songData = songResponse.data;
        setSongs(songData);

        // Fetch artist information for each song
        const artistPromises = songData.map(song => 
          getArtistById(song.artistId).then(response => ({
            id: song.artistId,
            name: response.data.name
          }))
        );
        const artistResponses = await Promise.all(artistPromises);
        const artistMap = artistResponses.reduce((acc, artist) => {
          acc[artist.id] = artist.name;
          return acc;
        }, {});
        setArtists(artistMap);
      } catch (error) {
        console.error('Error fetching songs or artists:', error);
        setError(error);
      }
    };

    fetchSongs();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className={styles.tituloPrincipal}>Canciones</h1>
      <div className={styles.container}>
      <ul className={styles.container__list}>
        {songs.map((song) => (
          <li key={song.id} className={styles.container__item}>

            <img
                src={song.coverUrl}
                alt={song.title}
                className={styles.container__item__img}
            />  
            
            <div className={styles.container__item__info}>
              <h2>{song.title}</h2>
              <p><strong>Artist:</strong> {artists[song.artistId]}</p>
              <p><strong>Release Year:</strong> {song.releaseYear}</p>
              <p><strong>Duration:</strong> {Math.floor(song.duration / 60)}:{song.duration % 60}</p>
            </div>
            <div className={styles.linea}></div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default SongList;
