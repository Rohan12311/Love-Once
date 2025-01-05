import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {
  const navigate = useNavigate();

  const move = () => {
    navigate('/My_Heart')
  }
  return (
    <OuterContainer>
      <Container>
        <img src="/Yes.gif" alt="Shy bubu" />
        <h2>Thanku bubu aapn jau ya haa firayla maja cutula ga</h2>
        <Button click={move} name="To see My heart" />
      </Container>
    </OuterContainer>
  );
};

export default Page2;

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;

  img {
    height: 200px;
    width: 200px;
  }

  @media (max-width: 768px) {
    img {
      height: 150px; /* Smaller image for mobile */
      width: 150px;
    }
  }
`;


