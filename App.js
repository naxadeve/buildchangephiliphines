import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import SecondPage from './src/SecondPage';
import SignUp from './src/SignUp';
import StepList from './src/StepList';
import Login from './src/Login';
import SuccessfulLogin from './src/SuccessfulLogin';
import CheckList from './src/components/CheckList';
import ReportForm from './src/components/ReportForm';
import Guidelines from './Guidelines';
import Select from './Select';


class App extends Component {

  constructor() {
    super();
    this.state = { hasToken: false, isTokenLoaded: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('token')
    .then((token) => {
      this.setState({ hasToken: token !== null, isTokenLoaded: true });
    });
  }
  render() {
    console.log(this.state.isTokenLoaded);
    if (!this.state.isTokenLoaded) {
      return (
        <ActivityIndicator />
      );
    }
    return (

        <Provider store={store}>
          <Router>
            <Scene key="root">
                <Scene
                  key="SignUp"
                  component={SignUp}
                  title="SignUp"
                />

                <Scene
                  key="SecondPage"
                  component={SecondPage}
                  title="SecondPage"
                  hideNavBar
                //  initial={!this.state.hasToken}
                />

                <Scene
                  key="Login"
                  component={Login}
                  title="Login"
                  type="replace"
                />

                <Scene
                  key="StepList"
                  component={StepList}
                  title="Step list"
                />

                <Scene
                  key="Successful_Login"
                  component={SuccessfulLogin}
                  title="Site list"
              //  initial={this.state.hasToken}
                />
                <Scene
                  key="CheckList"
                  component={CheckList}
                  title="Checklist"
                />
                <Scene
                  key="ReportForm"
                  component={ReportForm}
                  title="Report form"
                />
                <Scene
                  key="Guidelines"
                  component={Guidelines}
                  title="Guidelines"
                />
                <Scene
                  key="Select"
                  component={Select}
                  title="Select"
                  hideNavBar
                  initial
                />
                </Scene>
          </Router>
        </Provider>
      );
    }

  }

export default App;
