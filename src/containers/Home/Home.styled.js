import styled from 'styled-components';

export const HomeContainer = styled.main`
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SquaresContainer = styled.div`
  display: flex;
  gap: 2rem; 
  margin-bottom: 2rem;
`;

export const Square = styled.div`
  width: 250px;
  height: 250px;
  background-color: darkred;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const StartButton = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: brown;
  }
`;
