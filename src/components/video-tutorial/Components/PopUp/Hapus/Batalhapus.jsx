import { useRef } from "react";
import IconX from "../../../assets/icon-x.png";
import PopUp from "../PopUp";

const Batalhapus = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal} className="btn-x-popup">
				Tidak
			</button>
			<PopUp ref={modalRef}>
				<div className="isi-popup">
					<div>
						<img src={IconX} alt="" className="icon-popup" />
						<p className="ket-popup mt-10">Video Batal Dihapus !</p>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Batalhapus;
