import Player from "../VideoPlayer/Player";
import Modal from "../Modal/Modal";

import Search from "../../assets/search.png";
import Play from "../../assets/play.png";
import Thumbnail from "../../assets/thumbnail.png";
import { useContext, useEffect, useRef } from "react";
import VideoSuggest from "./VideoSuggest";
import VideoShare from "./VideoShare";
import { VideoContext } from "../../Context/VideoContext";

const VideoDetail = props => {
	const { listPlaylist, modalData, setModalData } = useContext(VideoContext);
	const suggestBtnRef = useRef();
	const shareBtnRef = useRef();

	useEffect(() => {
		console.log(listPlaylist);
	}, [listPlaylist]);
  
	return (
		<Modal ref={props.modalRef} modal_lg>
			<p className="tw-text-center [color:#6E7191] tw-font-semibold">
				Video Tutorial
			</p>
			<div className="tw-flex tw-mt-5">
				<span className="tw-bg-white tw-border tw-border-gray-200 tw-ml-auto tw-flex [border-radius:43px] md:tw-w-96 tw-w-auto">
					<img src={Search} alt="" className="tw-px-4 tw-py-3" />
					<input
						type="text"
						placeholder="Cari Video Tutorial"
						className="tw-outline-none tw-mr-4 tw-placeholder-gray-500 tw-text-xs [color:#575757]"
					/>
				</span>
			</div>
			<div className="tw-grid tw-grid-cols-3 [margin-top:30px] tw-gap-6">
				<div className="tw-col-span-2">
					<Player
						source={modalData.source}
						poster="https://www.w3schools.com/html/img_girl.jpg"
					/>
					<div className="tw-my-4">
						<p className="tw-text-sm tw-font-semibold tw-text-black">
							{modalData.judul}
						</p>
						<div className="tw-flex tw-justify-between">
							<div className="[font-size:10px] [color:#6E7191] tw-mt-2">
								{modalData.tags?.join(", ")}
							</div>
							<div className="tw-flex tw-gap-4">
								<button
									className="tw-text-xs tw-p-2 tw-border tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-border-gray-300 tw-border-solid"
									onClick={() => shareBtnRef.current.openModal()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="tw-w-6 tw-h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
										/>
									</svg>
									Bagikan
								</button>
								{/* <Bagikan />
                  <Saran /> */}
								<button
									className="tw-text-xs tw-p-2 tw-border tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-border-gray-300 tw-border-solid"
									onClick={() => suggestBtnRef.current.openModal()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="tw-w-6 tw-h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
										/>
									</svg>

									<p className="tw-mb-0 tw-self-center">Saran</p>
								</button>
							</div>
						</div>
					</div>
					{/* <DeskripsiVideo /> */}
					<div className="[background-color:#F4F4F4] tw-rounded-2xl tw-py-3 tw-px-4">
						<p className="[font-size:13px] tw-font-medium">Deskripsi Video</p>
						<div className="[height:1px] [background-color:#D5D5D5] tw-mt-2 tw-mb-3"></div>
						<p className="[color:#6E7191] tw-font-medium [font-size:10px]">
							Diperbarui pada{" "}
							{modalData.tanggal_upload &&
								new Intl.DateTimeFormat("id-ID", {
									year: "numeric",
									month: "long",
									day: "numeric",
								}).format(new Date(modalData.tanggal_upload))}
						</p>
						<p className="[color:#6E7191] tw-mt-1 [font-size:10px]">
							{modalData.deskripsi}
						</p>
					</div>
				</div>
				<div className="tw-col-span-1">
					<div className="tw-border [border-color:#D9DBE9] tw-p-4 tw-rounded-2xl">
						<div>
							<p className="[font-size:13px] tw-font-semibold">
								{modalData.kategori}
							</p>
							<p className="[color:#4E4B66] [font-size:10px]">
								{listPlaylist.length} Video
							</p>
						</div>
						<div className="tw-mt-5 [height:61vh] tw-overflow-auto">
							<div className="tw-mx-3">
								{listPlaylist.map((playlist, idx) => (
									<div
										onClick={() => setModalData(playlist)}
										className="tw-border tw-cursor-pointer [padding:14px] [border-color:#D9DBE9] tw-rounded-lg tw-flex tw-mb-4"
										key={idx}
									>
										<div className={`Player ? 'tw-relative tw-contents' : 'tw-relative'`}>
											<img
												src={"http://147.139.162.58:5002" + playlist.thumbnail}
												alt=""
												className="tw-w-28 tw-h-16 tw-rounded-lg"
											/>
											<button className={`Player ? 'tw-contents' : 'tw-relative tw-absolute tw-top-5 [left:40%]'`}>
												<img src={Play} alt="" className="tw-w-6 tw-contents" />
											</button>
										</div>
										<div className="tw-self-center tw-ml-4">
											<p className="[font-size:10px] tw-font-semibold">
												{playlist.judul}
											</p>
											<p className="[font-size:10px] [color:#4E4B66]">
												{Math.floor(playlist.durasi / 60) +
													"." +
													Math.floor(playlist.durasi % 60)}{" "}
												Menit
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<VideoSuggest
				modalRef={suggestBtnRef}
				judul={modalData.judul}
				durasi={modalData.durasi}
				thumbnail={"http://147.139.162.58:5002" + modalData.thumbnail}
			/>
			<VideoShare modalRef={shareBtnRef} />
		</Modal>
	);
};

export default VideoDetail;