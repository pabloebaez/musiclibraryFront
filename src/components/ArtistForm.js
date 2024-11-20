// src/components/ArtistForm.js
import React, { useState } from 'react';

function ArtistForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const artist = { name, bio, photoUrl };
    onSubmit(artist);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Photo URL:</label>
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </div>
      <button type="submit">Add Artist</button>
    </form>
  );
}

export default ArtistForm;
