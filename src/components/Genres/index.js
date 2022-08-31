import { Container, Name } from './styles';

function Genres({ data }) {
  return (
    <Container>
      <Name>{data.name}</Name>
    </Container>
  );
}

export default Genres;
