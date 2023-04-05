import React, { useState } from "react";
import IconDropdown from "../../assets/Forward.png";
import './Dropdown.css'

const Kategori = () => {
	const [selected, setSelected] = useState("");
	const [open, setOpen] = useState(false);

	const dataDropdown = [
		{ value: "Feeds" },
		{ value: "Communication" },
		{ value: "File Manajemen" },
		{ value: "Voice & Video Call" },
		{ value: "Voice & Video Call" },
		{ value: "Menu Dashboard" },
		{ value: "Menu Performance" },
		{ value: "Advanced Search" },
		{ value: "Menu List Draft" },
		{ value: "Menu Topik Populer" },
		{ value: "Menu Profile" },
		{ value: "Menu Struktur Organisasi" },
		{ value: "Menu Daftar Satker" },
		{ value: "Menu License" },
		{ value: "Menu Tautan Akun" },
	];

	return (
		<div className="kategori">
			<div className="input-group">
				<label>Kategori</label>
				<div className="twflex">
					<input
						type="text"
						name="kategori"
						value="Kategori"
						className="[color:#C0C0C0]"
					/>
					<img
						src={IconDropdown}
						onClick={() => setOpen(!open)}
						alt=""
						className="tw-w-6 -tw-mt-2 twcursor-pointer"
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
						<li
							className="[color:#575757] [font-size:13px] tw-border-b-2 tw-py-4"
							value={item.value}
						>
							{item.value}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Kategori;
