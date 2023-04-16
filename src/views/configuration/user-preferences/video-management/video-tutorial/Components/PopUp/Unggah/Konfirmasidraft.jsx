import { useRef } from "react";
import IconConfirm from "../../../assets/icon-confirm.png";
import PopUp from "../PopUp";
import Tersimpan from "./Tersimpan";
import Tidaksimpan from "./Tidaksimpan";

const Konfirmasidraft = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal} className="btn-x">
				Batal
			</button>
			<PopUp ref={modalRef}>
				<div className="isi-popup">
					<div>
						<img src={IconConfirm} alt="" className="icon-popup" />
						<p className="ket-popup tw-my-8 text-center">
							Apakah anda ingin menyimpan draft ?
						</p>
						<div className="tw-flex tw-gap-8">
							<Tidaksimpan />
							<Tersimpan />
						</div>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Konfirmasidraft;
