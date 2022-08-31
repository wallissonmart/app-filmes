import React from 'react';
import { Container, Banner, RateContainer, Rate, Title } from './styles';
import { Ionicons } from '@expo/vector-icons';

function SearchItem({ data, navigatePage }) {
  function detailsMovie() {
    if (data.release_date === '') {
      alert('Filme ou Série ainda sem data!');
      return;
    }
    navigatePage(data);
  }
  return (
    <Container activeOpacity={0.7} onPress={detailsMovie}>
      {data?.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data.backdrop_path}`,
          }}
        />
      ) : (
        <Banner
          resizeMethod="resize"
          source={require('../../assets/no_photo.png')}
        />
      )}
      <Title>{data?.title || data?.name}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SearchItem;
