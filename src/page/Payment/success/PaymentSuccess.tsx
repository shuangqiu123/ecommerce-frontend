import { EOrderActionTypes } from "@/common/Order";
import { IOrderCompletionResponse } from "@/interface/Order";
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
			callback: (data: IOrderCompletionResponse | null, error: Record<string, string>) => {
				if (error) {
					history.push("/");
					return;
				}
				if (data?.items) {
					if (data.items.length > 0) {
						history.push("/checkout/" + orderId);
					}
					else {
						history.push("/user/home/orderHistory");
					}
					return;
				}
				history.push("/order/success");
			}
		});
	}, [history, dispatch, paymentId, PayerID, orderId]);

	return (<></>);
};