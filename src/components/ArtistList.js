import React, { useEffect, useState } from 'react';
import { getArtists } from '../services/api';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await getArtists();
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError(error);
      }
    };

    fetchArtists();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id} style={{ marginBottom: '20px' }}>
            <div>
              <img
                src={artist.photoUrl}
                alt={artist.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            </div>
            <div>
              <h2>{artist.name}</h2>
              <p>{artist.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
