import React from "react";
import { Wrapper, IconsWrapper, VerticalLine, LogoWrapper, StyledText, IconBase } from "./Footer.styled";
import Icon, {
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    YoutubeOutlined,
    AliwangwangOutlined
} from "@ant-design/icons";

const Footer = () => {
    return (
        <Wrapper>
            <VerticalLine />
            <StyledText>
            <p>National University "Lviv Polytechnic" <br/> Vladyslav Surazhskyi <br/> 2024</p>
            </StyledText>
            <VerticalLine />
        </Wrapper>
    );
};

export default Footer;