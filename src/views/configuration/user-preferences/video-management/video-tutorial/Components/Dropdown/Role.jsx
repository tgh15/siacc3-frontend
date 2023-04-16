import React, { useState } from "react";
import IconDropdown from "../../assets/Forward.png";
import './Dropdown.css'

const Role = () => {
	const [selected, setSelected] = useState("");
	const [open, setOpen] = useState(false);

	const dataDropdown = [
		{ value: "Semua Role" },
		{ value: "Admin Daerah" },
		{ value: "Admin Pusat" },
		{ value: "Verifikator Daerah" },
		{ value: "Verifikator Pusat" },
		{ value: "Pimpinan Daerah" },
		{ value: "Pimpinan Pusat" },
		{ value: "Agen" },
	];


	return (
		<div className="role">
			<div className="input-group">
				<label>Role</label>
				<div className="tw-flex">
					<input
						type="text"
						name="role"
						value="Role"
						className="[color:#C0C0C0]"
					/>
					<img
						src={IconDropdown}
						onClick={() => setOpen(!open)}
						alt=""
						className="tw-w-6 -tw-mt-2 tw-cursor-pointer"
					/>
				</div>
			</div>
			<ul
				className={`[background-color:#EFF0F6] tw-px-7 tw-shadow-xl tw-w-full tw-overflow-y-auto ${
					open ? "[max-height:300px]" : "[display:none]"
				} `}
			>
				{dataDropdown.map(item => {
					return (
						<div className="tw-border-b-2 tw-flex">
							<label htmlFor={item.value} className="[color:#575757] [font-size:13px] tw-py-4 tw-self-center">{item.value}</label>
							<input type="radio" name={item.value} id={item.value} className="tw-ml-auto [width:19px]"/>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export default Role;
