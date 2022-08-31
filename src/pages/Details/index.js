import React, { useState, useEffect } from 'react';
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
  ActivityContainer,
  ContentRelease,
  Release,
  ListProviders,
} from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import api, { APIKey } from '../../services/api';
import { Feather, Ionicons } from '@expo/vector-icons';
import Stars from 'react-native-stars/index';
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';
import { ScrollView, Modal, ActivityIndicator } from 'react-native';

import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage';
import WatchProviders from '../../components/WatchProviders';

function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);

  const { id } = route.params;
  const { params } = route.params;

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api.get(`/${params}/${id}`, {
        params: {
          api_key: APIKey,
          language: 'pt-BR',
        },
      });
      if (isActive) {
        setMovie(response.data);
        const isFavorite = await hasMovie(response.data);
        setFavoritedMovie(isFavorite);
        setLoading(false);
      }
    }
    async function getProviders() {
      const response = await api.get(`${params}/${id}/watch/providers`, {
        params: {
          api_key: APIKey,
        },
      });

      setProviders(response?.data?.results?.BR?.flatrate);
    }

    if (isActive) {
      getMovie();
      getProviders();
    }

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityContainer>
          <ActivityIndicator size="large" color="#fff" />
        </ActivityContainer>
      </Container>
    );
  }

  async function favoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
      movie.title
        ? alert('Filme removido da sua lista!')
        : alert('Série removida da sua lista!');
    } else {
      await saveMovie('@appfilmes', movie);
      setFavoritedMovie(true);
      movie.title
        ? alert('Filme adicionado à sua lista!')
        : alert('Série adicionada à sua lista!');
    }
  }
  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>
        <HeaderButton onPress={() => favoriteMovie(movie)}>
          {favoritedMovie ? (
            <Ionicons name="bookmark" size={28} color="#fff" />
          ) : (
            <Ionicons name="bookmark-outline" size={28} color="#fff" />
          )}
        </HeaderButton>
      </Header>
      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />

      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={28} color="#fff" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title || movie.name}</Title>

      {providers ? (
        <ListProviders
          data={providers}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.provider_id)}
          renderItem={({ item }) => <WatchProviders data={item} />}
        />
      ) : (
        <></>
      )}

      <ContentRelease>
        {movie.release_date ? (
          <Release>{movie.release_date.split('-').reverse().join('/')}</Release>
        ) : (
          <Release>
            {movie.first_air_date.split('-').reverse().join('/')}
          </Release>
        )}
      </ContentRelease>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74e" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74e" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
          disable={true}
        />
        <Rate>{parseFloat(movie.vote_average).toFixed(1)}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title || movie?.name}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}

export default Details;
