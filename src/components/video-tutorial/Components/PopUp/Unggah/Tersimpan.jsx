import { useRef } from "react";
import IconSuccess from "../../../assets/icon-success.png";
import PopUp from "../PopUp";

const Tersimpan = () => {
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
						<p className="ket-popup tw-my-8">Draft Video Tersimpan !</p>
						<button className="btn-y-popup tw-mx-auto tw-flex">OK</button>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Tersimpan;
