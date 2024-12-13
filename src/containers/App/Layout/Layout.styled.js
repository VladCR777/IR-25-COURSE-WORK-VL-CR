import styled from 'styled-components';

// export const StyledHeader = styled.div`
//     padding: 16px 20px 4px;
//     display: flex;
//     justify-content: space-around;
//     width: 100%;
//     table-layout: fixed;
//     border-spacing: 10px;
//     > div {
//         display: flex;
//     }
//     p {
//         font-size: 20px;
//     }
//     span {
//         font-size: 24px;
//     }
// `;

// export const IconsWrapper = styled.div`
//     display: flex;
//     > span {
//         margin: 0 12px;
//     }
// `



export const StyledHeader = styled.div`
    padding: 16px 20px 4px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background-color: black;  
    color: white;  
    .homePageWrapper {
        display: flex;
        justify-content: center;  
        width: 100%;
    }


    > div {
        display: flex;
        align-items: center;
    }

    p {
        font-size: 20px;
        margin-left: 10px;  
    }

    span {
        font-size: 24px;
    }
`;

export const IconsWrapper = styled.div`
    display: flex;
    align-items: center;

    > span {
        margin: 0 12px;
    }
`;