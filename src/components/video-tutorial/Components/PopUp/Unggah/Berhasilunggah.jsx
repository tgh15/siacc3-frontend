import { useRef } from "react";
import IconSuccess from "../../../assets/icon-success.png";
import PopUp from "../PopUp";

const Berhasilunggah = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal} className="btn-y ml-auto">
				Simpan
			</button>

			<PopUp ref={modalRef}>
				<div className="isi-popup">
					<div>
						<img src={IconSuccess} alt="" className="icon-popup" />
						<p className="ket-popup tw-mt-10">Video Berhasil Diunggah !</p>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Berhasilunggah;
