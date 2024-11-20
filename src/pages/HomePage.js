// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArtists, getSongs } from '../services/api';

const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Fetch artists and songs data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await getArtists();
        setArtists(artistResponse.data);

        const songResponse = await getSongs();
        setSongs(songResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter artists and songs based on the search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArtists([]);
      setFilteredSongs([]);
      return;
    }

    // Filter artists
    const filteredArtistList = artists.filter(artist =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtists(filteredArtistList);

    // Filter songs
    const filteredSongList = songs.filter(song => {
      const artistName = artists.find(artist => artist.id === song.artistId)?.name.toLowerCase() || '';
      return (
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.releaseYear.toString().includes(searchTerm) ||
        Math.floor(song.duration / 60).toString().includes(searchTerm) ||
        artistName.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredSongs(filteredSongList);
  }, [searchTerm, artists, songs]);

  return (
    <div className='musicPort'>
      <div className='logo'>
        <h1 className='tituloApp'>Music App</h1>
        <h2 className='subTitulo'>By Pablo Baez</h2>
      </div>
      <div className='cajaBusqueda'>
        <input className='boxSearch'
          type="text"
          placeholder="Buscar por Nombre, Artista, duración o Año"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.trim() !== '' && (
        <>
        
          <h2 className='titulo2'>Artists</h2>
          <div className='resultados'>
          <ul className='detallesR'>
            {filteredArtists.length > 0 ? (
              filteredArtists.map(artist => (
                <li className='li' key={artist.id}>
                  <h3>
                    <Link className='links' to={`/artist/${artist.id}`}>{artist.name}</Link> {/* Enlace al detalle del artista */}
                  </h3>
                  <p className='descripcion'>{artist.bio}</p>
                  <img 
                    src={artist.photoUrl} 
                    alt={artist.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                  />
                  <div className='linea'></div>
                </li>
              ))
            ) : (
              <p>No artists found</p>
            )}
          </ul>
          </div>

          <h2 className='titulo2'>Songs</h2>
          <div className='resultados'>

          <ul className='detallesR'>
            {filteredSongs.length > 0 ? (
              filteredSongs.map(song => (
                <li className='li' key={song.id}>
                  <h3>
                    <Link className='links' to={`/song/${song.id}`}>{song.title}</Link> {/* Enlace al detalle de la canción */}
                  </h3>
                  <p className='descripcion'>
                    <strong>Artist:</strong> 
                    <Link to={`/artist/${song.artistId}`}>
                      {artists.find(artist => artist.id === song.artistId)?.name}
                    </Link>
                  </p>
                  <p className='descripcion'><strong>Release Year:</strong> {song.releaseYear}</p>
                  <p className='descripcion'><strong>Duration:</strong> {Math.floor(song.duration / 60)}:{song.duration % 60 < 10 ? '0' : ''}{song.duration % 60} minutes</p>
                  <img 
                    src={song.coverUrl} 
                    alt={song.title} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                  />
                  <div className='linea'></div>
                </li>
              ))
            ) : (
              <p>No songs found</p>
            )}
          </ul>
          </div>
          
          
        </>
        
      )}
      <footer className="footer">
      <p>Colombia 2024</p>
    </footer>
    </div>
    
  );
};

export default HomePage;
