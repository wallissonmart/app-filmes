import React, { useState, useEffect } from 'react';
import { Container, ListMovies, ActivityContainer } from './styles';

import api, { APIKey } from '../../services/api';

import { useNavigation, useRoute } from '@react-navigation/native';
import SearchItem from '../../components/SearchItem';
import { ActivityIndicator } from 'react-native';

function Search() {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const { name } = route.params;
    const { params } = route.params;

    async function getSearchData() {
      const response = await api.get(`/search/${params}`, {
        params: {
          query: name,
          api_key: APIKey,
          language: 'pt-BR',
          page: 1,
        },
      });

      if (isActive) {
        setData(response.data.results);
        setLoading(false);
      }
    }

    if (isActive) {
      getSearchData();
    }

    return () => {
      isActive = false;
    };
  }, []);

  function navigateDetailsPage(item) {
    const { params } = route.params;
    navigation.navigate('Details', { id: item.id, params: params });
  }
  if (loading) {
    return (
      <Container>
        <ActivityContainer>
          <ActivityIndicator size="large" color="#fff" />
        </ActivityContainer>
      </Container>
    );
  }
  return (
    <Container>
      <ListMovies
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchItem
            data={item}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Search;
