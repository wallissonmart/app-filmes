import { Container, Img } from './styles';

function WatchProviders({ data }) {
  return (
    <Container>
      <Img
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.logo_path}`,
        }}
      />
    </Container>
  );
}

export default WatchProviders;
