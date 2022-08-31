import React from 'react';
import {
  Container,
  RateContainer,
  Rate,
  Title,
  ActionContainer,
  DetailsButton,
  DeleteButton,
} from './styles';
import { Ionicons, Feather } from '@expo/vector-icons';

function FavoriteItem({ data, deleteMovie, navigatePage }) {
  return (
    <Container>
      <Title size={22}>{data.title || data.name}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{parseFloat(data.vote_average).toFixed(1)}/10</Rate>
      </RateContainer>
      <ActionContainer>
        <DetailsButton onPress={() => navigatePage(data)}>
          <Title size={18}>Ver detalhes</Title>
        </DetailsButton>
        <DeleteButton onPress={() => deleteMovie(data.id)}>
          <Feather name="trash" size={26} color="#fff" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

export default FavoriteItem;
