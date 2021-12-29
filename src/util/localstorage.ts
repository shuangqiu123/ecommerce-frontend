export const setItem = <T> (key: string, item: T): void => {
	localStorage.setItem(key, JSON.stringify(item));
};


export const getItem = <T> (key: string): T | null => {
	const item = localStorage.getItem(key);
	return item && JSON.parse(item);
};