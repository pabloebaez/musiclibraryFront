// src/components/SongForm.js
import React, { useState } from 'react';

function SongForm({ song = {}, artists = [], onSubmit }) {
  const [title, setTitle] = useState(song.title || '');
  const [artistId, setArtistId] = useState(song.artistId || '');
  const [releaseYear, setReleaseYear] = useState(song.releaseYear || '');
  const [duration, setDuration] = useState(song.duration || '');
  const [coverUrl, setCoverUrl] = useState(song.coverUrl || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      artistId,
      releaseYear,
      duration,
      coverUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Artist:</label>
        <select
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          required
        >
          <option value="">Select Artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Release Year:</label>
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration (in seconds):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cover URL:</label>
        <input
          type="text"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Song</button>
    </form>
  );
}

export default SongForm;
