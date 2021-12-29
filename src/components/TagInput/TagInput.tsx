import { Input, Tag } from "antd";
import React, { useState } from "react";
import styles from "./TagInput.less";

interface ITagInput {
	value?: string[];
	onChange?: (value: string[]) => void;
}

const TagInput: React.FC<ITagInput> = ({
	value = [],
	onChange
}) => {
	const [inputValue, setInputValue] = useState<string>("");

	const createTag = () => {
		if (!inputValue || !value || value.includes(inputValue)) {
			return;
		}
		setInputValue("");
		onChange?.([...value, inputValue]);
	};

	const closeTag = (index: number) => {
		const tags = [...value];
		tags.splice(index, 1);
		onChange?.(tags);
	};

	return (
		<div className={styles.tagInput}>
			<Input
				className={`${styles.short} ${styles.input}`}
				placeholder="Enter tags"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onBlur={createTag}
				onPressEnter={createTag}
			/>
			<div className={styles.tagDisplay}>
				{value.map((v, index) => (
					<div className={styles.tagContainer}>
						<Tag
							key={index}
							color="magenta"
							closable
							onClose={() => closeTag(index)}
							className={styles.tag}
						>
							{v}
						</Tag>
					</div>
				))}
			</div>
		</div>
	);
};

export default TagInput;