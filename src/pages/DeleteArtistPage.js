import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Importar Link
import { deleteArtist, getArtistById } from '../services/api';
import styles from './css/HomePage.module.css';

const DeleteArtistPage = () => {
  const [artist, setArtist] = useState(null);
  const [message, setMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState(''); // Estado para mensaje de confirmación
  const navigate = useNavigate();
  const { id } = useParams(); // Usa useParams para obtener el id

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getArtistById(id);
        if (response.data) {
          setArtist(response.data);
        } else {
          setMessage('Ese artista no existe en la base de datos.'); // Mensaje si no se encuentra el artista
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
        setMessage('Error al obtener los detalles del artista.');
      }
    };
    fetchArtist();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteArtist(id);
      setConfirmMessage('El artista se ha eliminado correctamente.'); // Mensaje de confirmación
      setTimeout(() => {
        navigate('/artists'); // Redirige a la lista de artistas después de 2 segundos
      }, 2000);
    } catch (error) {
      console.error('Error deleting artist:', error);
      setMessage('Error al eliminar el artista.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Eliminar Artista</h1>
      {message ? (
        <p>{message}</p>
      ) : artist ? (
        <div>
          <div>
            <h2>{artist.name}</h2>
            <img src={artist.photoUrl} alt={artist.name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <p><strong>Biografía:</strong> {artist.bio}</p>
          </div>
          <p>¿Estás seguro de que quieres eliminar al artista {artist.name}?</p>
          <div className={styles.botones}> 
          <button onClick={handleDelete} className={styles.boton}>Eliminar Artista</button>
                    {/* Botón para ir a la página de inicio */}
          <Link to="/">
            <button className={styles.boton}>Inicio</button>
          </Link>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del artista...</p>
      )}
      {confirmMessage && <p>{confirmMessage}</p>} {/* Mostrar mensaje de confirmación */}
    </div>
  );
};

export default DeleteArtistPage;
