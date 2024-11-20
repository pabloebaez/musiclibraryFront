import React, { useState } from 'react';
import { addArtist } from '../services/api';
import { Link } from 'react-router-dom'; // Importar Link
import './style.css';

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
    <div className='container'>
      <h1>Add Artist</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label className='labels'>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className='labels'>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <br />
        <label className='labels'>
          Photo URL:
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>
        <br />
        <button className='boton' type="submit">Add Artist</button>
      </form>
      <br />
      {/* Botón para ir a la página de inicio */}
      <Link to="/">
        <button className='boton'>Inicio</button>
      </Link>
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddArtistPage;
