import React from 'react';
import {
    HomeContainer,
    SquaresContainer,
    Square,
    ButtonContainer,
    StartButton
} from './Home.styled';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <HomeContainer>
            <SquaresContainer>
                
                <div>
                    <Square>
                        DFS Algorithm
                    </Square>
                    <ButtonContainer>
                        <Link to="/DFS">
                            <StartButton onClick={() => alert('Запуск алгоритму для графів!')}>
                                Start
                            </StartButton>
                        </Link>
                    </ButtonContainer>
                </div>

                <div>
                    <Square>
                        Red Black Tree
                    </Square>
                    <ButtonContainer>
                        <Link to="/RBT">
                            <StartButton onClick={() => alert('Запуск алгоритму для структур даних!')}>
                                Start
                            </StartButton>
                        </Link>
                    </ButtonContainer>
                </div>
            </SquaresContainer>
        </HomeContainer>
    );
};

export default Home;
