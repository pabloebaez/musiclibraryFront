import React, { useState } from 'react';
import { addArtist } from '../services/api';
import { Link } from 'react-router-dom'; // Importar Link
import styles from './css/addArtist.module.css';

const AddArtistPage = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newArtist = {
      name,
      bio,
      photoUrl
    };

    try {
      await addArtist(newArtist);
      setMessage('Artist added successfully!');
      setName('');
      setBio('');
      setPhotoUrl('');
    } catch (error) {
      console.error('Error adding artist:', error);
      setMessage('Error adding artist.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Agregar Artista</h1>
      <div className={styles.formulario}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.labels}>
            Name:
            <input
              type="text" 
              placeholder='Nombre del Artista'
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.labels}>
            Bio:
            <textarea
              className={styles.input}
              placeholder='Biografia del Artista'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.labels}>
            Photo URL:
            <input
              type="text"
              placeholder='URL de la foto del Artista'
              className={styles.input}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <br />
          <div className={styles.botonContainer}>
            <button className={styles.boton} type="submit">Add Artist</button>
            <Link to="/">
        <button className={styles.boton}>Inicio</button>
      </Link>
          </div>
        </form>
      </div>
      
      <br />
      {/* Botón para ir a la página de inicio */}
      
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddArtistPage;
