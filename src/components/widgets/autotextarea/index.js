
import React, {
	useState,
	useEffect,
	useRef
} from "react";

const AutoTextArea = (props) => {

	const textAreaRef 							= useRef(null);

	const [text, setText] 						= useState(props.value);
	const [nullValue, setNullValue] 			= useState(true);
	const [parentHeight, setParentHeight] 		= useState("auto");
	const [textAreaHeight, setTextAreaHeight] 	= useState("auto");

	if (props.value == "") {
		if (textAreaRef.current != null && !nullValue) {

			setParentHeight(`50px`);
			setTextAreaHeight("50px");
			setText("")
			setNullValue(true);
		}
	}

	useEffect(() => {
		setParentHeight(`${textAreaRef.current.scrollHeight}px`);
		setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
	}, [text]);

	const onChangeHandler = (event) => {
		setTextAreaHeight("auto");
		setParentHeight(`${textAreaRef.current.scrollHeight}px`);
		setText(event.target.value);
		setNullValue(false)

		if (props.onChange) {
			props.onChange(event);
		}
	};

	return (
		<div
			style={{
				minHeight: parentHeight,
				width: "85%"
			}}
		>
			<textarea
				className="form-control"
				{...props}
				ref={textAreaRef}
				rows={1}
				style={{
					overflow: "hidden",
					height: textAreaHeight,
					resize: "none",
				}}
				onChange={onChangeHandler}
			/>
		</div>
	);
};

export default AutoTextArea;