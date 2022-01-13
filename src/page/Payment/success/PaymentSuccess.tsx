import { EOrderActionTypes } from "@/common/Order";
import { IItemDisplay } from "@/interface/Item";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

interface IQuery {
	orderId: string;
}

export const PaymentSuccess: React.FC = () => {
	const { orderId } = useParams<IQuery>();
	const history = useHistory();
	const dispatch = useDispatch();
	const search = useLocation().search;
	const paymentId = new URLSearchParams(search).get("paymentId");
	const PayerID = new URLSearchParams(search).get("PayerID");

	useEffect(() => {
		if (!PayerID || !paymentId || !orderId) {
			history.push("/");
		}
		dispatch({
			type: EOrderActionTypes.payOrder,
			payload: {
				orderId,
				paymentId,
				payerId: PayerID
			},
			callback: (data: IItemDisplay[] | null, error: Record<string, string>) => {
				if (error) {
					history.push("/");
					return;
				}
				if (data) {
					history.push("/order/" + orderId);
					return;
				}
				history.push("/order/success");
			}
		});
	}, [history, dispatch, paymentId, PayerID, orderId]);

	return (<></>);
};