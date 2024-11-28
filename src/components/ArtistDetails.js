// src/components/ArtistDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtistById } from '../services/api';
import './desing.css';

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getArtistById(id);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtist();
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1>{artist.name}</h1>
      <img 
        src={artist.photoUrl} 
        alt={artist.name} 
        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '50%' }} 
      />
      <p>{artist.bio}</p>
      
      {/* Botones para editar, agregar y eliminar artista */}
      <div className='botones'>
        <Link to="/">
        <button className='boton'>Inicio</button>
        </Link>
        <Link to={`/edit-artist/${id}`}>
          <button className='boton'>Edit Artist</button>
        </Link>
        <Link to="/add-artist">
          <button className='boton'>New Artist</button>
        </Link>
        <Link to={`/delete-artist/${id}`}>
          <button className='boton'>Delete Artist</button>
        </Link>
      </div>
    </div>
  );
};

export default ArtistDetails;
