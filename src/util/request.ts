import axios from "axios";

const HOST = process.env.REACT_APP_SERVER_HOST;
const token = localStorage.getItem("eportfolio/token") || "";

export default axios.create({
	baseURL: `${HOST}/api`,
	headers: {
		"Content-type": "application/json",
		"Authorization": token
	}
});