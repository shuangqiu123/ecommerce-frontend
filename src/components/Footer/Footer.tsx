import React from "react";
import GithubOutlined from "@ant-design/icons/GithubOutlined";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import styles from "./Footer.less";
import Icon from "@/components/Icon";


const Footer: React.FC = () => (
	<footer className={styles.footer}>
		<div className={styles.text}>
			<p>©Maintained by Shuang Qiu</p>
			<div className={styles.icons}>
				<Icon title="Github" href="https://github.com/shuangqiu123/eportfolio">
					<GithubOutlined />
				</Icon>
				<Icon title="Shuang's Blog" href="https://shuangqiu.blog">
					<HomeOutlined />
				</Icon>
			</div>
		</div>
	</footer>
);

export default Footer;