import React from "react";
import Particles from "react-particles-js";

import {
  DashboardContainer,
  Header,
  LinkDash,
  Row,
} from "../components/Elements/DashBoardElements";

export default function Dashboard() {
  /*  Particles animation  */
  const praticlesOut = {
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          value_area: 800,
        },
      },
    },
  };

  /*  The first page before all begins */
  return (
    <>
      <DashboardContainer>
        <Header>Welcome to Yahel's System</Header>
        <Row>
          <LinkDash to={"/login"}>Log In</LinkDash>
          <LinkDash to={"/signup"}>Sign Up</LinkDash>
        </Row>
        <Particles params={praticlesOut} />
      </DashboardContainer>
    </>
  );
}
