import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import HomePage from "@/page/HomePage";
import Login from "@/page/Login";
import Register from "@/page/Register";
import ItemPage from "@/page/Item";
import OAuth from "@/page/OAuth";

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
				<Route path="/item">
					<ItemPage />
				</Route>
				<Route path="/oauth/:origin">
					<OAuth />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
