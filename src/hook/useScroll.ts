/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useEffect, useState } from "react";

export const useScroll = (): [boolean, boolean, boolean] => {
	const [down, setDown] = useState<boolean>(false);
	const [up, setUp] = useState<boolean>(false);
	const [top, setTop] = useState<boolean>(false);

	const debounce = useCallback(() => {
		let startTime: Date = new Date();
		let scroll = window.scrollY;

		return () => {
			const curTime: Date = new Date();
			
			if (curTime.getMilliseconds() - startTime.getMilliseconds() >= 50) {
				const currentScroll = window.scrollY;
				setTop(currentScroll === 0);
				setDown(currentScroll - scroll >= 120);
				setUp(scroll - currentScroll >= 120);
				scroll = currentScroll;
				startTime = curTime;
			}
			else {
				setTimeout(() => {
					const currentScroll = window.scrollY;
					setTop(currentScroll === 0);
					setDown(currentScroll - scroll >= 120);
					setUp(scroll - currentScroll >= 120);
					scroll = currentScroll;
				}, 100);
			}
		};
	}, []);

	useEffect(() => {
		document.addEventListener("scroll", debounce());
	}, [debounce]);


	return [up, down, top];
};