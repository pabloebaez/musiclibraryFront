// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArtists, getSongs } from '../services/api';
import styles from './css/HomePage.module.css';


const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchType, setSearchType] = useState('all');

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

  // Filter artists and songs based on the search term and type
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArtists([]);
      setFilteredSongs([]);
      return;
    }

    if (searchType === 'artist') {
      const filteredArtistList = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArtists(filteredArtistList);
      setFilteredSongs([]);
    } else if (searchType === 'song') {
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
      setFilteredArtists([]);
    } else {
      const filteredArtistList = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredSongList = songs.filter(song => {
        const artistName = artists.find(artist => artist.id === song.artistId)?.name.toLowerCase() || '';
        return (
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.releaseYear.toString().includes(searchTerm) ||
          Math.floor(song.duration / 60).toString().includes(searchTerm) ||
          artistName.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredArtists(filteredArtistList);
      setFilteredSongs(filteredSongList);
    }
  }, [searchTerm, searchType, artists, songs]);

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <Link to="/add-artist" className={styles.botonesNav}>Add Artist</Link>
        <Link to="/add-song" className={styles.botonesNav}>Add Song</Link>
      </div>
      <div className={styles.logo}>
        <h1 className={styles.tituloApp}>Music App</h1>
        <h2 className={styles.subTitulo}>By Pablo Baez DEV</h2>
      </div>
      <div className={styles.cajaBusqueda}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className={styles.select}>
          <option value="all">Todos</option>
          <option value="artist">Artista</option>
          <option value="song">Canción</option>
        </select>
        <input className={styles.boxSearch}
          type="text"
          placeholder="Buscar por Canción o Artista"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.trim() !== '' && searchType !== 'song' && (
        <>
          <h2 className={styles.titulo2}>Artistas</h2>
          <div className={styles.resultados}>
            <ul className={styles.detallesR}>
              {filteredArtists.length > 0 ? (
                filteredArtists.map(artist => (
                  <li className={styles.li} key={artist.id}>
                    <h3>
                      <Link className={styles.links} to={`/artist/${artist.id}`}>{artist.name}</Link>
                    </h3>
                    <img 
                      src={artist.photoUrl} 
                      alt={artist.name} 
                      className={styles.imagen} 
                    />
                    <p className={styles.descripcion}>{artist.bio}</p>
                    
                    <div className={styles.linea}></div>
                  </li>
                ))
              ) : (
                <p>Artistas no encontrados</p>
              )}
            </ul>
          </div>
        </>
      )}

      {searchTerm.trim() !== '' && searchType !== 'artist' && (
        <>
          <h2 className={styles.titulo2}>Canciones</h2>
          <div className={styles.resultados}>
            <ul className={styles.detallesR}>
              {filteredSongs.length > 0 ? (
                filteredSongs.map(song => (
                  <li className={styles.li} key={song.id}>
                    <h3>
                      <Link className={styles.links} to={`/song/${song.id}`}>{song.title}</Link>
                    </h3>
                    <img 
                      src={song.coverUrl} 
                      alt={song.title} 
                      className={styles.imagen} 
                    />
                    <div className={styles.textoInfo}>
                      <p className={styles.descripcion}>
                        <strong>Artista: </strong> 
                        <Link to={`/artist/${song.artistId}`}>
                          {artists.find(artist => artist.id === song.artistId)?.name}
                        </Link>
                      </p>
                    <p className={styles.descripcion}><strong>Año de lanzamiento: </strong> {song.releaseYear}</p>
                    <p className={styles.descripcion}><strong>Duración: </strong> {Math.floor(song.duration / 60)}:{song.duration % 60 < 10 ? '0' : ''}{song.duration % 60} minutos</p>
                    </div>
                    
                    
                    <div className={styles.linea}></div>
                  </li>
                ))
              ) : (
                <p>Canciones no encontradas</p>
              )}
            </ul>
          </div>
        </>
      )}

      <footer className={styles.footer}>
        <p>Desarrollado por Pablo Baez DEV {new Date().getFullYear()} / <a href="https://pablobaezdev.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.links}>Visita mi Portafolio Web</a></p>
      </footer>
    </div>
  );
};

export default HomePage;
