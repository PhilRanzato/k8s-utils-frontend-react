import React, { Component } from 'react';
import Pods from './components/pods';
import Services from './components/services';
import Connection from './components/connection';
import Exec from './components/exec';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


let endpoint = process.env.REACT_APP_GO_SERVER;
// let endpoint = "http://localhost";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pods: [],
      services: [],
    };
  }

  componentDidMount() {
    fetch(endpoint + "/api/pods")
      .then((res) => res.json())
      .then((data) => {
        // to debug, just in case
        console.log(endpoint)
        this.setState({
          pods: JSON.parse(data),
          services: this.state.services,
        })
      })
      .catch(console.log)

    fetch(endpoint + "/api/services")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          pods: this.state.pods,
          services: JSON.parse(data),
        })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        {/* to use this: npm install react-router-dom */}
        <Router>
          <div style={{ height: "100vh", display: "flex" }}>
            <nav>
              {/* to use this: npm install react-pro-sidebar */}
              <ProSidebar>
                <Menu iconShape="square">
                  <MenuItem>Dashboard
                      <Link to="/" />
                  </MenuItem>
                  <SubMenu title="Components">
                    <MenuItem>Pods
                        <Link to="/pods" />
                    </MenuItem>
                    <MenuItem>Services
                        <Link to="/services" />
                    </MenuItem>
                    <MenuItem>Test Connection
                        <Link to="/connection-test" />
                    </MenuItem>
                    <MenuItem>Exec into pods
                        <Link to="/exec" />
                    </MenuItem>
                  </SubMenu>
                </Menu>
              </ProSidebar>
            </nav>
            <div style={{ display: "flex", justifyContent: "space-evenly", justifySelf: "right" }}>
              <Switch>
                <Route path="/pods">
                  <Pod state={this.state} />
                </Route>
                <Route path="/services">
                  <Service state={this.state} />
                </Route>
                <Route path="/connection-test">
                  <ConnectionTest state={this.state} />
                </Route>
                <Route path="/exec">
                  <ExecCommand state={this.state} />
                </Route>
                <Route path="/">
                  <h1 style={{ display: "flex", textAlign: "center" }}>Welcome!<br />Navigate the menu on the left</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

function Pod(state) {
  return (
    <div>
      <Pods pods={state.state.pods} style={{ width: "50vh" }}></Pods>
    </div>
  )
}

function Service(state) {
  return (
    <div >
      <Services svcs={state.state.services} style={{ width: "50vh" }}></Services>
    </div>
  )
}

function ConnectionTest(state) {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Pods pods={state.state.pods} style={{ width: "50vh" }}></Pods>
      <Services svcs={state.state.services} style={{ width: "50vh" }}></Services>
      <Connection ></Connection>
    </div>
  )
}

function ExecCommand(state) {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Pods pods={state.state.pods} style={{ width: "50vh" }}></Pods>
      <Exec pods={state.state.pods}></Exec>
    </div>
  )
}

export default App;
