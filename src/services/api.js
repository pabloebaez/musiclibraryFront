import axios from 'axios';

const API_URL = 'https://apimusiclib.vercel.app/api/'; // Cambia esto a la URL de tu API

// Funciones para manejar artistas
export const getArtists = () => axios.get(`${API_URL}/artists`);
export const getArtistById = (id) => axios.get(`${API_URL}/artists/${id}`);
export const getArtistByName = (name) => axios.get(`${API_URL}/artists/by-name/${name}`); // Nueva función añadida
export const addArtist = (artist) => axios.post(`${API_URL}/artists`, artist);
export const updateArtist = (id, artist) => axios.put(`${API_URL}/artists/${id}`, artist); // Cambiado a PUT
export const deleteArtist = (id) => axios.delete(`${API_URL}/artists/${id}`);

// Funciones para manejar canciones
export const getSongs = () => axios.get(`${API_URL}/songs`);
export const getSongById = (id) => axios.get(`${API_URL}/songs/${id}`);
export const addSong = (song) => axios.post(`${API_URL}/songs`, song);
export const updateSong = (id, song) => axios.put(`${API_URL}/songs/${id}`, song); // Cambiado a PUT
export const deleteSong = (id) => axios.delete(`${API_URL}/songs/${id}`);

// Función para verificar si el artista existe y crear uno nuevo si no existe
export const addArtistIfNotExists = async (artistName) => {
  try {
    // Intentar obtener el artista por nombre
    const response = await getArtistByName(artistName);
    if (response.status === 404) {
      // El artista no existe, crear uno nuevo
      const newArtist = {
        name: artistName, // Utiliza el nombre del artista que se pasó
        bio: 'Default Bio',
        photoUrl: 'default_photo_url'
      };
      await addArtist(newArtist);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // El artista no existe, crear uno nuevo
      const newArtist = {
        name: artistName, // Utiliza el nombre del artista que se pasó
        bio: 'Default Bio',
        photoUrl: 'default_photo_url'
      };
      await addArtist(newArtist);
    } else {
      throw error;
    }
  }
};
