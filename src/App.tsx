import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import HomePage from "@/page/HomePage";
import Login from "@/page/Login";
import Register from "./page/Register";
import OAuth from "./page/OAuth";
import Portfolio from "./page/Portfolio";

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/user/login">
					<Login />
				</Route>
				<Route exact path="/user/signup">
					<Register />
				</Route>
				<Route path="/oauth/:origin">
					<OAuth />
				</Route>
				<Route path="/:username">
					<Portfolio />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
