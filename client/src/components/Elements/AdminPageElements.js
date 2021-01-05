import styled from "styled-components";

export const AdminPageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e6e6fa;

  @media screen and (max-width: 480px) {
    background: #fff;
  }
`;

export const Header = styled.h3`
  text-align: center;
  /* font-size: 2.2rem; */
  color: #000000;
  margin-bottom: 35px;
`;

export const SubHeader = styled.h3`
  text-align: center;
  color: #a9a9a9;
  margin-bottom: 35px;
`;
