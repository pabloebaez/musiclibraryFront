// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistList from './components/ArtistList';
import SongList from './components/SongList';
import ArtistDetails from './components/ArtistDetails';
import SongDetails from './components/SongDetails';
import AddArtistPage from './pages/AddArtistPage';
import EditArtistPage from './pages/EditArtistPage';
import DeleteArtistPage from './pages/DeleteArtistPage';
import AddSongPage from './pages/AddSongPage';
import EditSongPage from './pages/EditSongPage';
import DeleteSongPage from './pages/DeleteSongPage'; // Importa DeleteSongPage
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artists" element={<ArtistList />} />
          <Route path="/songs" element={<SongList />} />
          <Route path="/artist/:id" element={<ArtistDetails />} />
          <Route path="/song/:id" element={<SongDetails />} />
          <Route path="/add-artist" element={<AddArtistPage />} />
          <Route path="/edit-artist/:id" element={<EditArtistPage />} />
          <Route path="/delete-artist/:id" element={<DeleteArtistPage />} />
          <Route path="/add-song" element={<AddSongPage />} />
          <Route path="/edit-song/:id" element={<EditSongPage />} />
          <Route path="/delete-song/:id" element={<DeleteSongPage />} /> {/* Agrega esta línea */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
