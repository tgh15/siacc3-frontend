import { useRef } from "react";
import IconSuccess from "../../../assets/icon-success.png";
import PopUp from "../PopUp";

const Terkirim = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal} className="btn-y tw-mx-auto tw-flex tw-mt-8 tw-mb-3">Kirim</button>
			<PopUp ref={modalRef}>
				<div className="isi-popup">
					<div>
						<img src={IconSuccess} alt="" className="icon-popup" />
						<p className="ket-popup tw-my-8 tw-text-center">Terkirim !</p>
						<button className="tw-btn-y-popup tw-mx-auto tw-flex">OK</button>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Terkirim;
