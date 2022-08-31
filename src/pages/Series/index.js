import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { getList, randomBanner } from '../../utils/movie';

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
  ActivityContainer,
} from './styles';
import SliderItem from '../../components/SliderItem';
import api, { APIKey } from '../../services/api';

function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [bannerSerie, setBannerSerie] = useState({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;

    const ac = new AbortController();

    async function getSeries() {
      const [popularData, topData] = await Promise.all([
        api.get('/tv/popular', {
          params: {
            api_key: APIKey,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/tv/top_rated', {
          params: {
            api_key: APIKey,
            language: 'pt-BR',
            page: 1,
          },
        }),
      ]);

      if (isActive) {
        const nowPopular = getList(10, popularData.data.results);
        const nowTop = getList(10, topData.data.results);

        setBannerSerie(
          popularData.data.results[randomBanner(popularData.data.results)]
        );

        setPopularSeries(nowPopular);
        setTopSeries(nowTop);

        setLoading(false);
      }
    }

    getSeries();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);
  function navigateDetailsPage(item) {
    navigation.navigate('Details', { id: item.id, params: 'tv' });
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
  function handleSearchSerie() {
    if (input === '') {
      return;
    }
    navigation.navigate('Search', { name: input, params: 'tv' });
    setInput('');
  }

  return (
    <Container>
      <Header title="Séries" />

      <SearchContainer>
        <Input
          placeholder="Stranger Things"
          placeholderTextColor="#ddd"
          defaultValue={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearchSerie}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Séries em alta</Title>
        <BannerButton
          activeOpacity={0.9}
          onPress={() => navigateDetailsPage(bannerSerie)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerSerie.backdrop_path}`,
            }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularSeries}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais votadas</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topSeries}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Series;
