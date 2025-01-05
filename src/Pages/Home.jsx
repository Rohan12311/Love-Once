import React from 'react';
import Button from '../components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const naviagte = useNavigate();
    const IfNo = () => {
        naviagte('/plz')
    }
    const IfYes = () => {
        naviagte('/Yes')
    }
  return (
    <OuterContainer>
      <Container>
        <img src="/Shybubu.gif" alt="Shy bubu" />
        <h2>kya aap mere sath date per chalogi</h2>
        <ButtonGroup>
          <Button  click={IfYes} name="Yes" />
          <Button click={IfNo} name="No" />
        </ButtonGroup>
      </Container>
    </OuterContainer>
  );
};

export default Home;

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px; /* Adds spacing between buttons */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons vertically on mobile */
    align-items: center; /* Center buttons horizontally */
    width: 100%; /* Make the group take full width for better positioning */
  }
`;
