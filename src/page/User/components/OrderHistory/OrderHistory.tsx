/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table } from "antd";
import React from "react";
import styles from "./OrderHistory.less";

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
		title: "Status",
		dataIndex: "status",
		width: 140
	},
	{
		title: "Manage",
		dataIndex: "manage",
		render: () => (
			<div className={styles.links}>
				<a>View</a>
				<a>Edit</a>
				<a>Cancel</a>
			</div>
		)
	},
];

const OrderHistory: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>Order History</h1>
			</div>
			<div className={styles.table}>
				<Table
					columns={columns}
					dataSource={[{
						orderId: "123123",
						date: "2020-12-01",
						name: "Shuang Qiu",
						status: "Confirmed"
					},
					{
						orderId: "123123",
						date: "2020-12-01",
						name: "Shuang Qiu",
						status: "Confirmed"
					},
					{
						orderId: "123123",
						date: "2020-12-01",
						name: "Shuang Qiu",
						status: "Confirmed"
					},
					{
						orderId: "123123",
						date: "2020-12-01",
						name: "Shuang Qiu",
						status: "Confirmed"
					}]}
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