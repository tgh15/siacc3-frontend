import { useRef } from "react";
import IconSuccess from "../../../assets/icon-success.png";
import PopUp from "../PopUp";

const Berhasilhapus = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal} className="btn-y-popup">
				Ya
			</button>

			<PopUp ref={modalRef}>
				<div className="isi-popup">
					<div>
						<img src={IconSuccess} alt="" className="icon-popup" />
						<p className="ket-popup tw-mt-10">Video Berhasil Dihapus !</p>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Berhasilhapus;
