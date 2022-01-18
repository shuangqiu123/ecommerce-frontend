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
import { PaymentSuccess } from "@/page/Payment";
import { Success } from "@/page/Order";
import Cancel from "@/page/Payment/cancel/PaymentCancel";
import User from "@/page/User";
import Authorized from "@/components/Authorized";
import SaveItem from "./page/SaveItem";

const App: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/checkout/:orderId">
					<Authorized>
						<Checkout />
					</Authorized>
				</Route>
				<Route exact path="/newIn">
					<HomePage category={0}/>
				</Route>
				<Route exact path="/popular">
					<HomePage category={1} />
				</Route>
				<Route path="/user/home">
					<Authorized>
						<User />
					</Authorized>
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
				<Route path="/payment/:orderId/success">
					<Authorized>
						<PaymentSuccess />
					</Authorized>
				</Route>
				<Route exact path="/order/success">
					<Authorized>
						<Success />
					</Authorized>
				</Route>
				<Route path="/payment/:orderId/cancel">
					<Authorized>
						<Cancel />
					</Authorized>
				</Route>
				<Route path="/saveItem">
					<SaveItem />
				</Route>
				<Route component={Error} />
			</Switch>
		</Router>
	);
};

export default App;
