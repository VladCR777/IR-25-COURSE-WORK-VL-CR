import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  margin-right: 20px;
  padding: 10px;
  background-color: #f0f0f0;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: Black;
  margin-bottom: 10px;
  text-align: center;
`;

export const TextArea = styled.textarea`
  width: 93%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;

  &:focus {
    border-color: brown;
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  color: #fff;
  background-color: darkred;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: brown;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const InfoSection = styled.div`
  margin-bottom: 15px;
  color: black;
`;

export const InfoTitle = styled.p`
  font-weight: bold;
  margin: 0 0 5px;
`;

export const InfoContent = styled.div`
  font-size: 14px;
  color: #555;
  padding: 5px 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const GraphCanvas = styled.svg`
  flex-grow: 1;
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
























































// import styled from 'styled-components';

// export const Container = styled.div`
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const GraphContainer = styled.svg`
//   width: 400px;
//   height: 400px;
//   border: 1px solid #ccc;
//   margin: 1rem 0;
// `;

// export const Vertex = styled.circle.attrs(({ x, y }) => ({
//   cx: x,
//   cy: y,
//   r: 20,
// }))`
//   fill: ${({ status }) =>
//     status === 'visited' ? '#28a745' : status === 'current' ? '#ffc107' : '#007bff'};
//   stroke: #fff;
//   stroke-width: 2px;
//   cursor: pointer;
// `;

// export const TextStyle = ({ x, y, label }) => {
//     return (
//       <text
//         x={x}
//         y={y + 5}
//         textAnchor="middle"
//         fontSize="14"
//         fill="black"
//       >
//         {label}
//       </text>
//     );
//   };

// export const ArrowMarker = styled.defs`
//   & > marker {
//     fill: #333;
//   }
// `;

// export const Edge = styled.line.attrs(({ from, to, vertices }) => {
//   const fromX = Math.cos((2 * Math.PI * from) / vertices.length) * 150 + 200;
//   const fromY = Math.sin((2 * Math.PI * from) / vertices.length) * 150 + 200;
//   const toX = Math.cos((2 * Math.PI * to) / vertices.length) * 150 + 200;
//   const toY = Math.sin((2 * Math.PI * to) / vertices.length) * 150 + 200;
 
//   // Розраховуємо відстань на 70% ближче до кінцевих координат
//   const adjustedFromX = fromX + (toX - fromX) * 0.1;
//   const adjustedFromY = fromY + (toY - fromY) * 0.1;

//   const adjustedToX = toX - (toX - fromX) * 0.1;
//   const adjustedToY = toY - (toY - fromY) * 0.1;

//   return {
//     x1: adjustedFromX,
//     y1: adjustedFromY,
//     x2: adjustedToX,
//     y2: adjustedToY,
//   };
// })`
//   stroke: #333;
//   stroke-width: 2px;
//   marker-end: url(#arrow);
// `;


// export const TextArea = styled.textarea`
//   width: 80%;
//   padding: 0.5rem;
//   margin-bottom: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
// `;

// export const Button = styled.button`
//   padding: 0.75rem 2rem;
//   margin: 0.5rem;
//   font-size: 1rem;
//   border: none;
//   border-radius: 5px;
//   background-color: #007bff;
//   color: white;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:disabled {
//     background-color: #ccc;
//     cursor: not-allowed;
//   }
// `;

// export const ControlsContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
// `;


