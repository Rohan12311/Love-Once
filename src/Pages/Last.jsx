import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Last = () => {
    const navigate = useNavigate();

    const handleNoButtonMove = (e) => {
        // Function to move the "No" button randomly
        const noButton = e.target;
        const maxWidth = window.innerWidth - noButton.offsetWidth;
        const maxHeight = window.innerHeight - noButton.offsetHeight;
        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    };

    const handleYesButtonClick = () => {
        // Show the popup when the "Yes" button is clicked
        navigate('/Yes');
    };

    const handleNoButtonClick = () => {
        // Navigate to different page if the "No" button is clicked
        navigate('/Ny_Me_Ny');
    };

    return (
        <OuterContainer>
            <Container>
                <img src="/PlzPlz.gif" alt="Shy bubu" />
                <h2>Aasa nako nako pillu tu maja shonu babu aahai an maja cutula</h2>
                <ButtonGroup>
                    <StyledButton name="Yes" onClick={handleYesButtonClick}>
                        Yes
                    </StyledButton>
                    <StyledButton
                        name="No"
                        onClick={handleNoButtonClick}
                        onMouseOver={handleNoButtonMove} // Move "No" button on hover
                    >
                        No
                    </StyledButton>
                </ButtonGroup>
            </Container>
        </OuterContainer>
    );
};

export default Last;

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
      height: 150px;
      width: 150px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const StyledButton = styled.button`
  width: 100px;
`;
