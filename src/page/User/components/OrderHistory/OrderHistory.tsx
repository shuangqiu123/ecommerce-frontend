/* eslint-disable jsx-a11y/anchor-is-valid */
import { EOrderActionTypes } from "@/common/Order";
import { IOrder } from "@/interface/Order";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./OrderHistory.less";

const convertToDataSource = (orderList: IOrder[]) => {
	const mapStatus = (status: number) => {
		if (status === 0) {
			return "Unpaid";
		}
		else if (status === 1) {
			return "Confirmed";
		}
		return "Canceled";
	};
	return orderList.map(order => {
		return {
			orderId: order.orderId.substring(0, 6),
			date: order.createTime.substring(0, 10),
			amount: Number(order.payment).toFixed(2),
			name: order.shippingName ? order.shippingName : "-",
			status: mapStatus(order.status),
			statusCode: order.status,
			orderIdFull: order.orderId
		};
	});
};

const OrderHistory: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [orderList, setOrderList] = useState<IOrder[]>([]);

	const columns = [
		{
			title: "Order",
			dataIndex: "orderId",
			width: 120
		},
		{
			title: "Date",
			dataIndex: "date",
			width: 140
		},
		{
			title: "Ship To",
			dataIndex: "name",
			width: 170
		},
		{
			title: "Amount",
			dataIndex: "amount",
			width: 140
		},
		{
			title: "Status",
			dataIndex: "status",
			width: 140
		},
		{
			title: "Manage",
			dataIndex: "manage",
			render: (text: string, record: { statusCode: number; orderIdFull: string; }) => {
				return (
					<div className={styles.links}>
						{record.statusCode === 1 && (<a onClick={() => history.push("/checkout/" + record.orderIdFull)}>View</a>)}
						{record.statusCode === 0 && (<a onClick={() => history.push("/checkout/" + record.orderIdFull)}>Pay</a>)}
						{record.statusCode === 0 && (<a onClick={() => cancelOrder(record.orderIdFull)}>Cancel</a>)}
					</div>
				);
			}
		},
	];

	const cancelOrder = (orderId: string) => {
		dispatch({
			type: EOrderActionTypes.cancelOrder,
			payload: orderId,
			callback: () => {
				dispatch({
					type: EOrderActionTypes.getOrderList,
					callback: (orders: IOrder[]) => {
						setOrderList(orders);
					}
				});
			}
		});
	};

	useEffect(() => {
		dispatch({
			type: EOrderActionTypes.getOrderList,
			callback: (orders: IOrder[]) => {
				setOrderList(orders);
			}
		});
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>Order History</h1>
			</div>
			<div className={styles.table}>
				<Table
					columns={columns}
					dataSource={convertToDataSource(orderList)}
					pagination={{
						hideOnSinglePage: true
					}}
					scroll={{ x: 720 }}
				>
				</Table>
			</div>
		</div>
	);
};

export default OrderHistory;