import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addSong, getArtistByName, getSongs, getArtists, addArtist } from '../services/api';
import styles from './css/addSong.module.css';

const AddSongPage = () => {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [message, setMessage] = useState('');
  const [nextId, setNextId] = useState(1);
  const [artistExists, setArtistExists] = useState(false);
  const [songExists, setSongExists] = useState(false);
  const [artistId, setArtistId] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

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

  const checkArtistExists = async (name) => {
    setLoading(true); // Iniciar carga
    try {
      const allArtistsResponse = await getArtists();
      const allArtists = allArtistsResponse.data || [];

      const exists = allArtists.some(artist => artist.name.toLowerCase() === name.toLowerCase());
      setArtistExists(exists);
      
      if (!exists) {
        setMessage('Este artista aún no existe en la base de datos. Debe crearlo primero.');
        setArtistId(null); // Reiniciar artistId si no existe
      } else {
        setMessage(''); // Limpiar el mensaje si el artista existe
        // Obtener el ID del artista
        const artistResponse = await getArtistByName(name);
        setArtistId(artistResponse.data.id); // Actualizar el estado de artistId
      }
    } catch (error) {
      console.error('Error al verificar el artista:', error);
      setMessage('Error al verificar el artista.');
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const checkSongExists = async (title) => {
    if (!artistId) return; // No verificar si no hay un artista seleccionado

    setLoading(true); // Iniciar carga
    try {
      const allSongsResponse = await getSongs();
      const allSongs = allSongsResponse.data;

      const exists = allSongs.some(song => 
        song.title.toLowerCase() === title.toLowerCase() && 
        song.artistId === artistId // Verificar si la canción pertenece al artista
      );

      setSongExists(exists);
      
      if (exists) {
        setMessage('Esta canción ya existe para este artista.'); // Mensaje de error
      } else {
        setMessage(''); // Limpiar el mensaje si la canción no existe
      }
    } catch (error) {
      console.error('Error al verificar la canción:', error);
      setMessage('Error al verificar la canción.');
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setTitle(title);
    checkSongExists(title); // Verificar si la canción existe al cambiar el input
  };

  const handleArtistChange = (e) => {
    const name = e.target.value;
    setArtistName(name); // Actualiza el estado inmediatamente
    checkArtistExists(name); // Llama a la función de verificación
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Comprobar si el artista existe
      if (!artistId) {
        if (!artistExists) {
          // Crear el artista si no existe
          const newArtist = { name: artistName };
          const artistResponse = await addArtist(newArtist);
          setArtistId(artistResponse.data.id); // Actualizar el estado de artistId
        }
      }

      // Verificar si la canción ya existe para el mismo artista
      if (songExists) {
        setMessage('Esta canción ya existe para este artista.'); // Mensaje de error
        return; // Salir de la función si la canción ya existe
      }

      const newSong = {
        id: nextId,
        title,
        artistId: artistId, // Usar el estado de artistId
        releaseYear,
        duration,
        coverUrl
      };

      await addSong(newSong);
      setMessage('¡Canción añadida exitosamente!'); // Mensaje de éxito
      setTitle('');
      setArtistName('');
      setReleaseYear('');
      setDuration('');
      setCoverUrl('');
      setNextId(nextId + 1);
    } catch (error) {
      // Manejo de errores en español
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          if (error.response.data.message === 'Artist not found') {
            setMessage('Artista no encontrado.'); // Mensaje traducido
          } else {
            setMessage(error.response.data.message); // Mensaje específico
          }
        } else {
          setMessage('Error al añadir la canción.'); // Mensaje de error genérico
        }
      } else {
        setMessage('Error al añadir la canción.'); // Mensaje de error genérico
      }
      console.error('Error al añadir la canción:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Agrega una nueva canción</h2>
      <div className={styles.formulario}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.labels}>
            Artista:
            <input
              type="text"
              placeholder='Artista de la Canción'
              className={styles.input}
              value={artistName}
              onChange={handleArtistChange} // Cambiar a la nueva función
            />
          </label>
          <br />
          <label className={styles.labels}>
            Titulo:
            <input
              type="text"
              placeholder='Titulo de la Canción'
              className={styles.input}
              value={title}
              onChange={handleTitleChange} // Cambiar a la nueva función
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
        {loading && <p>Verificando...</p>} {/* Mostrar mensaje de carga */}
        {message && <p>{message}</p>} {/* Mostrar el mensaje aquí */}
      </div>
      <br />
    </div>
  );
};

export default AddSongPage;
