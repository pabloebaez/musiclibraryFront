import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import { addSong, getArtistByName, addArtist } from '../services/api'; // Importa las funciones correspondientes

const AddSongPage = () => {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Buscar el artista por nombre
      let artistResponse = await getArtistByName(artistName);
      let artistId = artistResponse.data.id;

      if (!artistId) {
        // Si no existe, crea un nuevo artista
        const newArtist = { name: artistName };
        artistResponse = await addArtist(newArtist);
        artistId = artistResponse.data.id;
      }

      const newSong = {
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
    } catch (error) {
      console.error('Error adding song:', error);
      setMessage('Error adding song.');
    }
  };

  return (
    <div className='container'>
      <h2>Add New Song</h2>
      <form onSubmit={handleSubmit}>
        <label className='labels'>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label className='labels'>
          Artist Name:
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
        <br />
        <label className='labels'>
          Release Year:
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>
        <br />
        <label className='labels'>
          Duration (seconds):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <label className='labels'>
          Cover URL:
          <input
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </label>
        <br />
        <div className='botones'>
        <button type="submit" className='boton'>Add Song</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      {/* Botón para ir a la página de inicio */}
      <br></br>
      <Link to="/">
        <button className='boton'>Inicio</button>
      </Link>
    </div>
  );
};

export default AddSongPage;
