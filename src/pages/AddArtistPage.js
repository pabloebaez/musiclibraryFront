import React, { useState, useEffect } from 'react';
import { addArtist, getArtists } from '../services/api';
import { Link } from 'react-router-dom';
import styles from './css/addArtist.module.css';

const AddArtistPage = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [nextId, setNextId] = useState(1); // Estado para el próximo ID

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getArtists();
        const artists = response.data;

        // Obtener el ID más alto
        if (artists.length > 0) {
          const highestId = Math.max(...artists.map(artist => artist.id));
          setNextId(highestId + 1); // Incrementar el ID más alto
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de datos
    if (!name.trim() || !bio.trim() || !photoUrl.trim()) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    const newArtist = {
      id: nextId, // Usar el ID generado
      name: name.trim(),
      bio: bio.trim(),
      photoUrl: photoUrl.trim()
    };

    console.log('Datos a enviar:', newArtist);

    try {
      const response = await addArtist(newArtist);
      console.log('Respuesta del servidor:', response.data);
      setMessage('Artist added successfully!');
      setName('');
      setBio('');
      setPhotoUrl('');
      setNextId(nextId + 1); // Incrementar el ID para el próximo artista
    } catch (error) {
      console.error('Error adding artist:', error.response ? error.response.data : error.message);
      setMessage('Error adding artist.');
      if (error.response) {
        setMessage(`Error: ${error.response.status} - ${error.response.data}`);
      } else {
        setMessage('Error: No se pudo conectar al servidor.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Agregar Artista</h1>
      <div className={styles.formulario}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.labels}>
            Nombre:
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
            Biografia:
            <textarea
              className={styles.input}
              placeholder='Biografia del Artista'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.labels}>
            URL de la foto:
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
            <button className={styles.boton} type="submit">Agregar Artista</button>
            <Link to="/">
              <button type="button" className={styles.boton}>Inicio</button>
            </Link>
          </div>
        </form>
      </div>
      
      <br />
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddArtistPage;
