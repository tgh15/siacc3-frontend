import { useRef } from "react";
import IconX from "../../../assets/icon-x.png";
import PopUp from "../PopUp";

const Tidaksimpan = () => {
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
						<p className="ket-popup tw-my-8">Draft Video Tidak Tersimpan !</p>
						<button className="btn-y-popup tw-mx-auto tw-flex">OK</button>
					</div>
				</div>
			</PopUp>
		</>
	);
};

export default Tidaksimpan;
