import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSongById, getArtistById } from '../services/api';
import './desing.css'; // Importa el archivo de estilos CSS

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const songResponse = await getSongById(id);
        setSong(songResponse.data);

        const artistResponse = await getArtistById(songResponse.data.artistId);
        setArtist(artistResponse.data);
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSongDetails();
  }, [id]);

  if (!song || !artist) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>{song.title}</h2>
      <img 
        src={song.coverUrl} 
        alt={song.title} 
        style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
      />
      <p><strong>Artist:</strong> {artist.name}</p>
      <p className='text'><strong>Year of Release:</strong> {song.releaseYear}</p>
      <p className='text'>
        <strong>Duration:</strong> {Math.floor(song.duration / 60)}:
        {song.duration % 60 < 10 ? '0' : ''}
        {song.duration % 60} minutes
      </p>
      <p className='text'><strong>Artist Bio:</strong> {artist.bio}</p>

      {/* Botones para editar, agregar y eliminar canción */}
      <div className="botones">
      <Link to="/">
          <button className="boton">Inicio</button>
        </Link>
        <Link to={`/edit-song/${id}`}>
          <button className="boton">Edit Song</button>
        </Link>
        <Link to="/add-song">
          <button className="boton">New Song</button>
        </Link>
        <Link to={`/delete-song/${id}`}>
          <button className="boton">Delete Song</button>
        </Link>
      </div>
    </div>
  );
};

export default SongDetails;
