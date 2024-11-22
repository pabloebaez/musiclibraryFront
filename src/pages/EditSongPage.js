import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importa Link
import { getSongById, updateSong, getArtistByName } from '../services/api';
import styles from './css/HomePage.module.css';

const EditSongPage = () => {
  const { id } = useParams(); // Obtén el parámetro de la ruta usando useParams
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [message, setMessage] = useState('');
  const [songId, setSongId] = useState(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const { data } = await getSongById(id);
        setSongId(data.id);
        setTitle(data.title);
        setArtistName(data.artist.name);
        setReleaseYear(data.releaseYear);
        setDuration(data.duration);
        setCoverUrl(data.coverUrl);
      } catch (error) {
        console.error('Error fetching song details:', error);
        setMessage('Error fetching song details.');
      }
    };

    fetchSongDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let artistResponse = await getArtistByName(artistName);
      let artistId = artistResponse.data.id;

      if (!artistId) {
        setMessage('Artist not found.');
        return;
      }

      const updatedSong = {
        title,
        artistId,
        releaseYear,
        duration,
        coverUrl
      };

      await updateSong(songId, updatedSong);
      setMessage('Song updated successfully!');
    } catch (error) {
      console.error('Error updating song:', error);
      setMessage('Error updating song.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Song</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.labels}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Artist Name:
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Release Year:
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Duration (seconds):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Cover URL:
          <input
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </label>
        <br />
        <div className={styles.botones}>
        <button type="submit" className={styles.boton}>Update Song</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      {/* Botón para ir a la página de inicio */}
      <br></br>
        <div className={styles.botones}>
      <Link to="/">
        <button className={styles.boton}>Inicio</button>
      </Link>
      </div>
    </div>
  );
};

export default EditSongPage;
