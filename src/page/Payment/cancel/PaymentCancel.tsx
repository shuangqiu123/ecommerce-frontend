import React from "react";
import Confirmation from "@/components/Confirmation";

const Cancel: React.FC = () => (
	<Confirmation
		title="Payment Canceled"
		description="It seems like your payment has been canceled. You can go to the order history to re-pay the order."
		buttonName="Order History"
		address="/user/home/orderHistory"
	/>
);

export default Cancel;