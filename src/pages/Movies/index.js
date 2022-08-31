import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Container, ListMovies } from './styles';

import { deleteMovie, getMoviesSave } from '../../utils/storage';
import FavoriteItem from '../../components/FavoriteItem';

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@appfilmes');

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id) {
    const response = await deleteMovie(id);
    setMovies(response);
  }

  function navigateDetailsPage(item) {
    const name = item.title ? 'movie' : 'tv';
    navigation.navigate('Details', { id: item.id, params: name });
  }

  return (
    <Container>
      <Header title="Favoritos" />
      <ListMovies
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Movies;
