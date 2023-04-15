import { useRef } from "react";
import "./Tambah.css";
import Add from "../../assets/add.png";
import Modal from "../Modal/Modal";
import SimbolUpload from "../../assets/simbol-upload.png";
import SimbolThumbnail from "../../assets/simbol-thumbnail.png";
import Berhasilunggah from "../PopUp/Unggah/Berhasilunggah";
import Konfirmasidraft from "../PopUp/Unggah/Konfirmasidraft";
import Kategori from "../Dropdown/Kategori";
import Role from "../Dropdown/Role";

const Tambah = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal}>
				<img src={Add} alt="" className="tw-w-8" />
			</button>
			<Modal ref={modalRef}>
				<p className="tw-text-center [color:#6E7191] tw-font-semibold">
					Tambah Video Tutorial
				</p>
				{/* <form action=""> */}
					<div className="tw-mt-8 tw-mb-2 tw-grid tw-grid-cols-2 tw-gap-12">
						<div>
							<div className="input-group">
								<label htmlFor="judul">Judul</label>
								<input
									type="text"
									name="judul"
									id="judul"
									placeholder="Judul Video"
								/>
							</div>
							<Role/>
							<Kategori/>
							<div className="input-group">
								<label htmlFor="deskripsi">Deskripsi</label>
								<input
									type="text"
									name="deskripsi"
									id="deskripsi"
									placeholder="Isi deskripsi kegiatan disini"
									className="tw-pb-10"
								/>
							</div>
							<div className="input-group">
								<label htmlFor="tags">Tags</label>
								<input
									type="text"
									name="tags"
									id="tags"
									placeholder="Isi tags untuk mempermudah pengguna mencari video"
									className="tw-pb-6"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="preview">Preview</label>
							<div className="tw-flex tw-items-center tw-justify-center tw-w-full">
								<label for="preview" class="label-input-video">
									<div className="isi-input-video">
										<img src={SimbolUpload} alt="" className="tw-w-12 tw-mb-2" />
										<p className="tw-mb-2 tw-text-sm tw-text-gray-500">
											Upload Video Baru disini
										</p>
									</div>
									<input id="preview" type="file" className="tw-hidden" />
								</label>
							</div>
							<div className="input-group type-video">
								<label htmlFor="filename">Filename</label>
								<input
									type="text"
									name="filename"
									id="filename"
									value="VID123.mp4"
									className="tw-pb-2"
								/>
								<label htmlFor="videolink">Video Link</label>
								<input
									type="text"
									name="videolink"
									id="videolink"
									value="siaccinfo.id/video/tutorial"
									className="tw-pb-1"
								/>
							</div>
							<div className="input-group">
								<div className="tw-flex">
									<div className="tw-w-full">
										<label
											htmlFor="thumbnail"
											className="tw-cursor-pointer tw-w-full"
										>
											Thumbnail
										</label>
										<label
											className="tw-[padding-bottom:1.5px] tw-cursor-pointer"
											htmlFor="thumbnail"
										>
											Upload Thumbnail
										</label>
										<input id="thumbnail" type="file" className="tw-hidden" />
									</div>
									<div className="tw-ml-auto tw-w-auto tw-self-center">
										<img src={SimbolThumbnail} alt="" className="tw-w-9" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="tw-flex tw-mt-3 tw-mb-4">
						<Konfirmasidraft/>
						<Berhasilunggah />
					</div>
				{/* </form> */}
			</Modal>
		</>
	);
};

export default Tambah;
