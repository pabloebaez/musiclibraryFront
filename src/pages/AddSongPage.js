import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addSong, getArtistByName, addArtist, getSongs } from '../services/api';
import styles from './css/addSong.module.css';

const AddSongPage = () => {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [message, setMessage] = useState('');
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getSongs();
        const songs = response.data;

        if (songs.length > 0) {
          const highestId = Math.max(...songs.map(song => song.id));
          setNextId(highestId + 1);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let artistResponse = await getArtistByName(artistName);
      let artistId = artistResponse.data.id;

      if (!artistId) {
        const newArtist = { name: artistName };
        artistResponse = await addArtist(newArtist);
        artistId = artistResponse.data.id;
      }

      const newSong = {
        id: nextId,
        title,
        artistId,
        releaseYear,
        duration,
        coverUrl
      };

      await addSong(newSong);
      setMessage('Song added successfully!');
      setTitle('');
      setArtistName('');
      setReleaseYear('');
      setDuration('');
      setCoverUrl('');
      setNextId(nextId + 1);
    } catch (error) {
      console.error('Error adding song:', error);
      setMessage('Error adding song.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Add New Song</h2>
      <div className={styles.formulario}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.labels}>
            Titulo:
          <input
            type="text"
            placeholder='Titulo de la Canción'
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Artista:
          <input
            type="text"
            placeholder='Artista de la Canción'
            className={styles.input}
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Año de Lanzamiento:
          <input
            type="number"
            placeholder='Año de Lanzamiento de la Canción'
            className={styles.input}
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Duración (segundos):
          <input
            type="number"
            placeholder='Duración de la Canción en segundos'
            className={styles.input}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          URL de la Portada:
          <input
            type="text"
            placeholder='URL de la Portada de la Canción'
            className={styles.input}
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </label>
        <br />
        <div className={styles.botonContainer}>
          <button type="submit" className={styles.boton}>Add Song</button>
          <Link to="/">
            <button type="button" className={styles.boton}>Inicio</button>
          </Link>
        </div>
        </form>
        {message && <p>{message}</p>}
      </div>
      <br />
      
    </div>
  );
};

export default AddSongPage;
