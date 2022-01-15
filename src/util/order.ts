import { IOrderShippingForm } from "@/interface/Order";
import { getItem, setItem } from "./localstorage";

const saveAddressInformation = (address: IOrderShippingForm): void => {
	setItem("/demostore/address", address);
};

const getAddressInformation = (): IOrderShippingForm | null => {
	return getItem("/demostore/address");
};

export { saveAddressInformation, getAddressInformation };