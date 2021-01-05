import React, { useEffect, useState } from "react";
import {
  Header,
  HomePageContainer,
  ImageWrapper,
  CardOfImage,
  CardIcon,
  CardH1,
  DivOfUserName,
  HeaderOfUser,
} from "../components/Elements/HomePageElements";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";

import { useHistory } from "react-router-dom";

export default function HomePage(props) {
  const [result, setResult] = useState([]);
  const [roleUser, setRoleUser] = useState("");
  const [constructorHasRun, setConstructorHasRun] = useState(false);

  const history = useHistory();

  const username = props.location.state.detail.username;
  const password = props.location.state.detail.password;

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setResult(data);
    };
    search();
  }, []);

  const renderedCards = result.slice(0, 10).map((item, index) => {
    return (
      <CardOfImage key={index}>
        <CardH1>{item.title}</CardH1>
        <CardIcon src={item.url} />
      </CardOfImage>
    );
  });

  /*  Constructor works before everthing  */
  const constructor = () => {
    if (constructorHasRun) return;

    /*  Check the role of use by asking the server and server ask DynamoDB Aws  */
    const checkRoleOfUser = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/users/checkrole`,
        {
          params: {
            username: username,
            password: password,
          },
        }
      );
      setRoleUser(data);
      if (data !== "USER" && data !== "ADMIN") {
        history.push("/login");
      }
    };

    checkRoleOfUser();
    setConstructorHasRun(true);
  };

  constructor();

  /*  Handle click before pass to admin page ,check if use Role is admin */

  function goToAdminPage() {
    if (roleUser === "ADMIN") {
      history.push("/adminpage");
    } else {
      alert("You're not an admin");
    }
  }

  /*  rendring Home page  */
  return (
    <HomePageContainer>
      <DivOfUserName>
        <HeaderOfUser>{`${username}`}</HeaderOfUser>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => goToAdminPage()}
        >
          List of users
          <AiOutlineUnorderedList style={{ marginLeft: "10px" }} />
        </button>
      </DivOfUserName>
      <Header>Images </Header>
      <ImageWrapper>{renderedCards}</ImageWrapper>
    </HomePageContainer>
  );
}
