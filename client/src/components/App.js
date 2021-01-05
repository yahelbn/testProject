import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*  Pages Component  */
import SignUp from "./SignUp";
import Login from "./Login";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import AdminPage from "./AdminPage";

import { AppContainer } from "./Elements/AppElements";

/*  The Main App and contain all the routes  */
function App() {
  return (
    <AppContainer>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100%", width: "100%" }}
      >
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Dashboard {...props} />}
            />

            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />

            <Route
              exact
              path="/signup"
              render={(props) => <SignUp {...props} />}
            />

            <Route
              exact
              path="/homepage"
              render={(props) => <HomePage {...props} />}
            />

            <Route
              exact
              path="/adminpage"
              render={(props) => <AdminPage {...props} />}
            />
          </Switch>
        </Router>
      </Container>
    </AppContainer>
  );
}

export default App;
