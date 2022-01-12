import { Address } from "cluster";
import { getItem, setItem } from "./localstorage";

const saveAddressInformation = (address: Address): void => {
	setItem("/demostore/address", address);
};

const getAddressInformation = (): void => {
	getItem("/demostore/address");
};

export { saveAddressInformation, getAddressInformation };