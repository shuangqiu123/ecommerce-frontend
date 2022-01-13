import React from "react";
import Confirmation from "@/components/Confirmation";

const Success: React.FC = () => (
	<Confirmation
		title="Order Confirmed"
		description="Thanks for shopping at DemoStore. Your order is now confirmed. You can check your order history by clicking on the button below."
		buttonName="Order History"
		address="/user/home/order"
	/>
);

export default Success;