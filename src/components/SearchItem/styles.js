import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 14px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 140px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  padding-top: 8px;
  font-weight: bold;
`;

export const RateContainer = styled.View`
  padding-top: 4px;
  flex-direction: row;
  align-items: center;
`;

export const Rate = styled.Text`
  padding-left: 4px;
  color: #fff;
  font-size: 12px;
`;
