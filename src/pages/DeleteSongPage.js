import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Importa Link
import { getSongById, deleteSong } from '../services/api';
import './style.css'; // Importa el archivo de estilos CSS

const DeleteSongPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getSongById(id);
        setSong(response.data);
      } catch (error) {
        setMessage('Esa canción no existe en la base de datos');
      }
    };
    fetchSong();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteSong(id);
      setMessage('La canción se ha eliminado correctamente');
      setTimeout(() => navigate('/songs'), 2000); // Redirige después de 2 segundos
    } catch (error) {
      setMessage('Error al eliminar la canción');
    }
  };

  if (!song) return <p>Cargando...</p>;

  return (
    <div className="container2">
      <h1>Eliminar Canción</h1>
      <h2 className='title2'>{song.title}</h2>
      <p className='title2'><strong>Artista:</strong> {song.Artist ? song.Artist.name : 'Artista no disponible'}</p>
      <p className='title2'><strong>Año de Lanzamiento:</strong> {song.releaseYear}</p>
      <p className='title2'><strong>Duración:</strong> {song.duration} segundos</p>
      <img src={song.coverUrl} alt={song.title} width="200" />
      <br></br>
      <button onClick={handleDelete} className="boton">Eliminar</button>
      <p>{message}</p>
      {/* Botón para ir a la página de inicio */}
      <Link to="/">
        <button className="boton">Inicio</button>
      </Link>
    </div>
  );
};

export default DeleteSongPage;
