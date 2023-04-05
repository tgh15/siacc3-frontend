import { useRef } from "react";
import Delete from "../../../assets/Delete.png";
import IconConfirm from "../../../assets/icon-confirm.png";
import PopUp from "../PopUp";
import Batalhapus from "./Batalhapus";
import Berhasilhapus from "./Berhasilhapus";

const Konfirmasihapus = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal}>
				<img src={Delete} alt="" className="[width:20px]" />
			</button>
			<PopUp ref={modalRef}>
				<div className="isi-popup">
					<div>
						<img src={IconConfirm} alt="" className="icon-popup" />
						<p className="ket-popup tw-my-8 tw-text-center">
							Anda yakin ingin menghapus video ?{" "}
						</p>
						<div className="tw-flex tw-gap-8">
							<Batalhapus/>
							<Berhasilhapus/>
						</div>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Konfirmasihapus;
