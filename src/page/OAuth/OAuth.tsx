import { EOAuthActionTypes, Origin } from "@/common/OAuth";
import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";


interface IQuery {
	origin: string;
}

const OAuth: React.FC = () => {
	const { origin } = useParams<IQuery>();
	const search = useLocation().search;
	const token = new URLSearchParams(search).get("code");
	const dispatch = useDispatch();
	const history = useHistory();

	const callback = useCallback(() => {
		history.push("/");
	}, [history]);

	useEffect(() => {
		switch (origin) {
			case Origin.Google:
				dispatch({
					type: EOAuthActionTypes.googleToken,
					payload: token,
					callback
				});
		}
	}, [callback, dispatch, origin, token]);


	return (
		<></>
	);
};

export default OAuth;
