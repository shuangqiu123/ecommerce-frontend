import React from "react";
import sytles from "./SpecialtyTag.less";

interface ITagProps {
	tag: string;
}

const SpecialtyTag: React.FC<ITagProps> = ({
	tag
}) => (
	<span className={sytles.tag}>
		{tag}
	</span>
);

export default SpecialtyTag;