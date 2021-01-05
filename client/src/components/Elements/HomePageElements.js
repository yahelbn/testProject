import styled from "styled-components";
import { Button } from "react-bootstrap";

export const HomePageContainer = styled.div`
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
  background: #dcd9c6;
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  color: #fff;
  margin-bottom: 35px;

  @media screen and (max-width: 820px) {
    margin-bottom: 10px;
  }
`;

export const ImageWrapper = styled.div`
  justify-content: center;
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 50px;

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const CardOfImage = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  min-width: 150px;
  height: 230px;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  direction: ${({ rtl }) => (rtl ? `rtl` : `ltr`)};

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 618px) {
    height: 230px;
  }

  @media screen and (max-width: 490px) {
    height: 130px;
  }
`;

export const CardIcon = styled.img`
  height: 130px;
  width: 130px;
  margin-bottom: 10px;
  @media screen and (max-width: 1128px) {
    height: 110px;
    width: 110px;
  }

  @media screen and (max-width: 490px) {
    height: 50px;
    width: 50px;
  }
`;

export const CardH1 = styled.h1`
  text-align: center;
  font-size: 1rem;
  color: black;
  margin-bottom: 5px;
  direction: ${({ rtl }) => (rtl ? `rtl` : `ltr`)};
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const DivOfUserName = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
`;

export const HeaderOfUser = styled.h4`
  margin-right: 20px;
`;

export const AdminButton = styled(Button)``;
