import React, {Component} from "react";
import { BrowserRouter as Router, Route, hashHistory, Switch } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import "../scss/app.scss";
import { Provider } from "react-redux";
import initStore from "./store";

class App extends Component {

    render(){
        return(
            <Provider store={initStore()}>
                <Router history={hashHistory}>
                    <Switch>
                        <Route exact  path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;

