import React from 'react';
import Button from '../components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {
    const naviagte = useNavigate();
    const IfNo = () => {
        naviagte('/I_Love_you')
    }
    const IfYes = () => {
        naviagte('/Yes')
    }

  return (
    <OuterContainer>
      <Container>
        <img src="/PlzBubu.gif" alt="Shy bubu" />
        <h2>Plz bubu, chal na me tuja chota babu aahai na</h2>
        <ButtonGroup>
        <Button  click={IfYes} name="Yes" />
          <Button click={IfNo} name="No" />
        </ButtonGroup>
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px; /* Adds spacing between buttons */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons vertically on mobile */
    align-items: center; /* Center buttons horizontally */
    width: 100%; /* Make the group take full width for better positioning */
  }
`;
