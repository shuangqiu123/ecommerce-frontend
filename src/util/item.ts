import { IItemLocalStorage } from "@/interface/Item";
import { getItem, setItem } from "./localstorage";


const addItemIntoCart = (item: IItemLocalStorage):boolean => {
	const items: IItemLocalStorage[] | null = getItem("/demostore/cart");
	if (!items) {
		setItem("/demostore/cart", [item]);
		return true;
	}
	for (const i of items) {
		if (i.id === item.id) {
			return false;
		}
	}
	items.push(item);
	setItem("/demostore/cart", items);
	return true;
};

const getItemsFromCart = (): IItemLocalStorage[] => {
	const items: IItemLocalStorage[] | null = getItem("/demostore/cart");
	if (items) {
		return items;
	}
	return [];
};

const removeItemFromCart = (id: string): void => {
	const items: IItemLocalStorage[] | null = getItem("/demostore/cart");
	setItem("/demostore/cart", items?.filter((item) => item.id !== id));
};

const setCart = (items: IItemLocalStorage[] | undefined): void => {
	if (!items) return;
	setItem("/demostore/cart", items);
};

export { addItemIntoCart, getItemsFromCart, removeItemFromCart, setCart };