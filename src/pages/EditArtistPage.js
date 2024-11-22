import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Importar Link
import { getArtistById, updateArtist } from '../services/api';
import styles from './css/HomePage.module.css';

const EditArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getArtistById(id);
        setName(response.data.name);
        setBio(response.data.bio);
        setPhotoUrl(response.data.photoUrl);
      } catch (error) {
        console.error('Error fetching artist:', error);
        setMessage('Error fetching artist.');
      }
    };

    fetchArtist();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedArtist = {
      name,
      bio,
      photoUrl
    };

    try {
      await updateArtist(id, updatedArtist); 
      setMessage('Artist updated successfully!');
      navigate(`/artist/${id}`);
    } catch (error) {
      console.error('Error updating artist:', error);
      setMessage('Error updating artist.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Artist</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.labels}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.labels}>
          Photo URL:
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>
        <br />
        <button className={styles.boton} type="submit">Update Artist</button>
      </form>
      <br />
      <Link to="/">
        <button className={styles.boton}>Inicio</button>
      </Link>
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditArtistPage;
