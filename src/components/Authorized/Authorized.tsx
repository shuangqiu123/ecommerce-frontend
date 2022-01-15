import { getItem } from "@/util/localstorage";
import { notification } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Authorized: React.FC = ({ children }) => {
	const history = useHistory();
	useEffect(() => {
		const user = getItem("/demostore/user");
		if (!user) {
			notification.error({
				message: "You must log in to view this page",
				duration: 3
			});
			history.push("/user/login");
		}
	}, [history]);

	return (<>{children}</>);
};

export default Authorized;