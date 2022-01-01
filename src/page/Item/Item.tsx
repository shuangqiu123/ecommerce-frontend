import ShopLayout from "@/layout/ShopLayout";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import React from "react";
import styles from "./Item.less";
import { Carousel, Divider, InputNumber } from "antd";
import image from "@/asset/image.jpg";
import image2 from "@/asset/image2.jpg";
import image3 from "@/asset/image3.jpg";
import Button from "@/components/Button";

const ItemPage: React.FC = () => {
	return (
		<ShopLayout>
			<div className={styles.itemWrapper}>
				<div className={styles.imageContainer}>
					<Carousel
						arrows
						prevArrow={<LeftOutlined />}
						nextArrow={<RightOutlined />}
						fade
					>
						<div className={styles.imageWrapper}>
							<img src={image} className={styles.image} />
						</div>
						<div className={styles.imageWrapper}>
							<img src={image2} className={styles.image} />
						</div>
						<div className={styles.imageWrapper}>
							<img src={image3} className={styles.image} />
						</div>
					</Carousel>
				</div>
				<div className={styles.contentContainer}>
					<h1 className={styles.title}>Nintendo Switch Pro Controller</h1>
					<div className={styles.productInfo}>
						<span>New In</span>
					</div>
					<div className={styles.price}>
						<span>$49.95</span>
					</div>
					<Divider />
					<div className={styles.qty}>
						<span>Quantity:</span>
					</div>
					<div className={styles.button}>
						<InputNumber
							size="large"
							min={1}
							max={99}
							defaultValue={1}
							onChange={() => null}
							controls={false}
							className={styles.input}
						/>
						<Button name="ADD TO CART" onClick={() => null} reverse />
					</div>
					<Divider />
					<div className={styles.description}>
						<span>Detail:</span>
						<p>Take your game sessions up a notch with the Pro Controller. Includes motion controls, HD rumble, built-in amiibo functionality, and more.</p>
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default ItemPage;