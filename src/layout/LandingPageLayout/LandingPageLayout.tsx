import React from "react";
import Header from "@/components/Header";
import styles from "./LandingPageLayout.less";

const LandingPageLayout: React.FC = ({
	children
}) => (
	<div className={styles.landingPageLayout}>
		<Header isLogoWhite={false} />
		<div className={styles.childrenContainer}>
			{children}
		</div>
	</div>
);

export default LandingPageLayout;