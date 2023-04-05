import { useRef } from "react";
import Modal from "../Modal/Modal";
import SimbolUpload from "../../assets/simbol-upload.png";
import SimbolThumbnail from "../../assets/simbol-thumbnail.png";
import IconEdit from "../../assets/Edit.png";
import Role from '../Dropdown/Role'
import Kategori from '../Dropdown/Kategori'

const Edit = () => {
	const modalRef = useRef();
	const openModal = () => {
		modalRef.current.openModal();
	};
	return (
		<>
			<button onClick={openModal}>
				<img src={IconEdit} alt="" className="[width:20px]" />
			</button>
			<Modal ref={modalRef}> 
				<p className="tw-text-center [color:#6E7191] tw-font-semibold">
					Edit Video Tutorial
				</p>
				<form action="">
					<div className="tw-mt-8 tw-mb-2 tw-grid tw-grid-cols-2 tw-gap-12">
						<div>
							<div className="input-group">
								<label htmlFor="judul">Judul</label>
								<input type="text" name="judul" id="judul" placeholder="Judul Video"/>
							</div>
							<Role/>
							<Kategori/>
							<div className="input-group">
								<label htmlFor="deskripsi">Deskripsi</label>
								<input type="text" name="deskripsi" id="deskripsi" placeholder="Isi deskripsi kegiatan disini" className="pb-10"/>
							</div>
							<div className="input-group">
								<label htmlFor="tags">Tags</label>
								<input type="text" name="tags" id="tags" placeholder="Isi tags untuk mempermudah pengguna mencari video" className="pb-4"/>
							</div>
						</div>
						<div>
							<label htmlFor="preview">Preview</label>		
							<div class="flex items-center justify-center w-full">
								<label for="preview" class="label-input-video">
									<div class="isi-input-video">
										<img src={SimbolUpload} alt="" className="tw-w-12 tw-mb-2"/>
										<p class="tw-mb-2 tw-text-sm tw-text-gray-500">Upload Video Baru disini</p>
									</div>
									<input id="preview" type="file" class="hidden" />
								</label>
							</div> 
							<div className="input-group type-video">
								<label htmlFor="filename">Filename</label>
								<input type="text" name="filename" id="filename" value="VID123.mp4" className="tw-pb-2"/>
								<label htmlFor="videolink">Video Link</label>
								<input type="text" name="videolink" id="videolink" value="siaccinfo.id/video/tutorial" className="tw-pb-2"/>
							</div>
							<div className="input-group tw-cursor-pointer">
								<div className="flex">
									<div className="w-full">
										<label htmlFor="thumbnail" className="tw-cursor-pointer tw-w-full">Thumbnail</label>
										<label className="[padding-bottom:1.5px] tw-cursor-pointer" htmlFor="thumbnail">Upload Thumbnail</label>
										<input id="thumbnail" type="file" className="tw-hidden" />
									</div>
									<div className="tw-ml-auto tw-w-auto tw-self-center">
										<img src={SimbolThumbnail} alt="" className="tw-w-9"/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex mt-3">
						<button className="btn-x">Batal</button>
						<button className="btn-y ml-auto">Simpan</button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default Edit;
