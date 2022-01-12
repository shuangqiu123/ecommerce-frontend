import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import HomePage from "@/page/HomePage";
import Login from "@/page/Login";
import Register, { EmailVerification, RegisterConfirmation } from "@/page/Register";
import ItemPage from "@/page/Item";
import ForgotPassword from "@/page/ForgotPassword";
import OAuth from "@/page/OAuth";
import Cart from "@/page/Cart";
import Error from "@/page/Error";
import ResetPassword from "@/page/ResetPassword";
import Checkout from "@/page/Checkout";

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/checkout/:orderId">
					<Checkout />
				</Route>
				<Route exact path="/newIn">
					<HomePage category={0}/>
				</Route>
				<Route exact path="/popular">
					<HomePage category={1} />
				</Route>
				<Route exact path="/user/login">
					<Login />
				</Route>
				<Route exact path="/user/signup">
					<Register />
				</Route>
				<Route exact path="/user/signup/confirm">
					<RegisterConfirmation />
				</Route>
				<Route exact path="/user/verifyEmail">
					<EmailVerification />
				</Route>
				<Route path="/user/forgotPassword">
					<ForgotPassword />
				</Route>
				<Route path="/user/resetPassword">
					<ResetPassword />
				</Route>
				<Route path="/item">
					<ItemPage />
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
				<Route path="/user/oauth/:origin">
					<OAuth />
				</Route>
				<Route component={Error} />
			</Switch>
		</Router>
	);
};

export default App;
