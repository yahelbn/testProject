import styled from "styled-components";
import { Link } from "react-router-dom";

export const DashboardContainer = styled.div`
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
  color: #000000;
  margin-bottom: 35px;
`;

export const LinkDash = styled(Link)`
  margin-bottom: 35px;
  margin-left: 10px;
  margin-right: 10px;

  font-size: 25px;
  color: #fff;
`;

export const Row = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
