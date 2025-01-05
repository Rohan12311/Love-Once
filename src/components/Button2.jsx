import React from 'react';
import styled from 'styled-components';

const Button2 = ({ name, onMouseOver, click }) => {
    return (
        <StyledButton 
            onMouseOver={onMouseOver} 
            onClick={click}
        >
            {name}
        </StyledButton>
    );
};

export default Button2;

const StyledButton = styled.button`
    width: 100px;
`;
