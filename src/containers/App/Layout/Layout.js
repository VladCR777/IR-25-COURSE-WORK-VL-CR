import React from "react";
import { StyledHeader, IconsWrapper } from "./Layout.styled";

const Layout = () => (
    <StyledHeader>
        
        <div className="homePageWrapper">
            <IconsWrapper>
                <p style={{ color: 'white', marginLeft: '10px' }}>Course Work 1</p>  
            </IconsWrapper>
        </div>
    </StyledHeader>
);

export default Layout;

