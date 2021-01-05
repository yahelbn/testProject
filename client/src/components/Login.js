import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  /*  handle click submit   */
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    /*  Check if user is correct the server and server ask DynamoDB Aws  */

    await axios
      .get(`${process.env.REACT_APP_URL}/api/users/login`, {
        params: {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
        config,
      })
      .then((res) => {
        const data = res.data;
        if (data === true) {
          const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          };
          history.push({
            pathname: "/homepage",
            state: { detail: user },
          });
        } else {
          setError("Failed to log in");
        }
      });

    setLoading(false);
  }

  /*  rendring Login page  */
  return (
    <>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card style={{ background: "#fff5ee" }}>
          <Card.Body>
            <h2 className="text-center md-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" ref={usernameRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button
                disabled={loading}
                className="w-100 text-center mt-2"
                type="submit"
              >
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to={"/signup"}>Sign up</Link>
        </div>
      </div>
    </>
  );
}
