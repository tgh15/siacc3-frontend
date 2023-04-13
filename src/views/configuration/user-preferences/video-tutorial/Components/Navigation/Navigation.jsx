import React from "react";
import "./Navigation.css";

const Navigation = () => {
	return (
		<div className="tw-flex [margin-top:34px] tw-mb-4">
			<a href="#" className="[color:#153b20] vt-nav">Analitik Video</a>
			<a href="#" className="vt-nav-active [color:#153b20]">
				Daftar Video
			</a>
		</div>
	);
};

export default Navigation 