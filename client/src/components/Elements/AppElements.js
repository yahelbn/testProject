import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;

  //background: no-repeat center center fixed;
  /* background: url("../../Images/city.jpg") no-repeat left top,
    linear-gradient(#eb01a5, #d13531); */
  background-image: linear-gradient(
    0deg,
    rgba(220, 217, 198, 1) 42%,
    rgba(210, 221, 209, 1) 93%
  );
  background-repeat: no-repeat;
  background-size: cover;
`;
