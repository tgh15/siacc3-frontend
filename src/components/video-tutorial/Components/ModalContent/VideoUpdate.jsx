import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import SimbolThumbnail from "../../assets/simbol-thumbnail.png";
import Tags from "../Form/Tags";
import { VideoTutorialContext } from "../../../../context/VideoTutorialContext";

const sourceEndpoint =
  !process.env.NODE_ENV || process.env.NODE_ENV === "production"
    ? window._env_.REACT_APP_API_GATEWAY
    : process.env.REACT_APP_API_GATEWAY;

const VideoUpdate = (props) => {
  console.log("props", props);

  const {
    putVideo,
    videoUpdateState,
    setVideoUpdateState,
    listCategories,
    getListCategories,
    modifyCategories,
  } = useContext(VideoTutorialContext);

  const [newCategory, setNewCategory] = useState("");
  const [dropDownState, setDropDownState] = useState({
    role: true,
    kategori: true,
  });

  const handleChangeFile = (e) => {
    setVideoUpdateState({
      ...videoUpdateState,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleChange = (e) => {
    setVideoUpdateState({
      ...videoUpdateState,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeRole = (e) => {
    if (e.target.checked) {
      setVideoUpdateState({
        ...videoUpdateState,
        role: [...videoUpdateState.role, e.target.name],
      });
    } else {
      setVideoUpdateState({
        ...videoUpdateState,
        role: videoUpdateState.role.filter((a) => a != e.target.name),
      });
    }
  };

  const selectedTags = (tags) => {
    setVideoUpdateState({ ...videoUpdateState, tags: tags });
  };

  const handleSubmit = () => {
    let data = videoUpdateState;
    data.video_id = data.source;
    data.thumbnail_id = data.thumbnail;
    data.user_id = Math.random().toString(); // TODO: replace with logged user
    data.uploader_id = Math.random().toString(); // TODO: replace with logger user
    putVideo(data);
    props.modalRef.current.closeModal();
  };

  // load videos for admin and viewer also categories
  // when component is render/mounted
  useEffect(() => {
    // console.log("data", props.data);
    // setVideoUpdateState((value) => (value = props.data));
    getListCategories();
  }, []);

  return (
    <Modal ref={props.modalRef} modal_lg>
      <p className="tw-text-center [color:#6E7191] tw-font-semibold">
        Edit Video Tutorial
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
              value={videoUpdateState.judul}
              onChange={(e) => handleChange(e)}
              placeholder="Judul Video"
            />
          </div>
          <div className="input-group tw-relative tw-items-center tw-flex tw-justify-between">
            <div className="tw-w-full">
              <label htmlFor="role">Role</label>
              <input
                className="tw-w-full"
                type="select"
                name="role"
                id="role"
                readOnly
                value={videoUpdateState.role?.join(" / ")}
                placeholder="Admin/Verifikator/Agen"
              />
            </div>
            <button
              onClick={() =>
                setDropDownState({
                  ...dropDownState,
                  role: !dropDownState.role,
                })
              }
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <div
              className={`${
                dropDownState.role && "tw-hidden"
              } tw-z-10 tw-absolute tw-max-h-64 tw-overflow-y-scroll tw-top-16 tw-left-0 tw-right-0 tw-bg-gray-200 tw-rounded-lg tw-shadow-md`}
            >
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="admin-daerah">Admin Daerah</label>
                <input
                  name="Admin Daerah"
                  id="admin-daerah"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes("Admin Daerah")}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="admin-pusat">Admin Pusat</label>
                <input
                  name="Admin Pusat"
                  id="admin-pusat"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes("Admin Pusat")}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="verifikator-daerah">Verifikator Daerah</label>
                <input
                  name="Verifikator Daerah"
                  id="verifikator-daerah"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes(
                    "Verifikator Daerah"
                  )}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="verifikator-pusat">Verifikator Pusat</label>
                <input
                  name="Verifikator Pusat"
                  id="verifikator-pusat"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes("Verifikator Pusat")}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="pimpinan-daerah">Pimpinan Daerah</label>
                <input
                  name="Pimpinan Daerah"
                  id="pimpinan-daerah"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes("Pimpinan Daerah")}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="pimpinan-pusat">Pimpinan Pusat</label>
                <input
                  name="Pimpinan Pusat"
                  id="pimpinan-pusat"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes("Pimpinan Pusat")}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
                <label htmlFor="agen">Agen</label>
                <input
                  name="Agen"
                  id="agen"
                  type="checkbox"
                  style={{ width: "1rem" }}
                  checked={videoUpdateState.role?.includes("Agen")}
                  onChange={(e) => handleChangeRole(e)}
                />
              </div>
            </div>
          </div>
          {/* <Role /> */}

          <div className="input-group tw-relative tw-items-center tw-flex tw-justify-between">
            <div className="w-full">
              <label htmlFor="kategori">Kategori</label>
              <input
                type="text"
                name="kategori"
                id="kategori"
                value={videoUpdateState.kategori}
                readOnly
                onChange={(e) => handleChange(e)}
                placeholder="Kategori"
                required
              />
            </div>
            <button
              onClick={() =>
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                })
              }
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div
              className={`${
                dropDownState.kategori && "tw-hidden"
              } tw-absolute tw-max-h-64 tw-overflow-y-scroll tw-top-16 tw-left-0 tw-right-0 tw-bg-gray-200 tw-rounded-lg tw-shadow-md tw-z-10`}
            >
              <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2 tw-flex tw-justify-between">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />

                <button
                  onClick={() => {
                    modifyCategories("add", newCategory);
                    setNewCategory("");
                  }}
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              {listCategories.map((category, index) => (
                <div
                  className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2 tw-flex tw-justify-between"
                  key={index}
                >
                  <button
                    onClick={() => {
                      setVideoUpdateState({
                        ...videoUpdateState,
                        kategori: category,
                      });
                      setDropDownState({
                        ...dropDownState,
                        kategori: !dropDownState.kategori,
                      });
                    }}
                  >
                    {category}
                  </button>
                  <button onClick={() => modifyCategories("remove", category)}>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* <Kategori /> */}

          <div className="input-group">
            <label htmlFor="deskripsi">Deskripsi</label>
            <input
              value={videoUpdateState.deskripsi}
              onChange={(e) => handleChange(e)}
              type="text"
              name="deskripsi"
              id="deskripsi"
              placeholder="Isi deskripsi kegiatan disini"
              className="tw-pb-10"
            />
          </div>
          <Tags
            selectedTags={selectedTags}
            tags={videoUpdateState.tags || []}
          />
        </div>
        <div>
          <label htmlFor="preview">Preview</label>
          <div className="tw-flex tw-items-center tw-justify-center tw-w-full">
            <label htmlFor="preview" className="label-input-video">
              <div className="isi-input-video tw-overflow-hidden">
                {videoUpdateState.video_new ? (
                  <video
                    src={URL.createObjectURL(videoUpdateState.video_new)}
                    className="video-preview"
                  />
                ) : (
                  <>
                    <video
                      src={sourceEndpoint + "/" + videoUpdateState.source}
                      className="video-preview"
                    />
                  </>
                )}
              </div>
              <input
                id="preview"
                name="video_new"
                type="file"
                accept=".mkv, .mp4"
                className="tw-hidden"
                value={videoUpdateState.video_new?.filename}
                onChange={(e) => handleChangeFile(e)}
              />
            </label>
          </div>
          <div className="input-group type-video">
            <label htmlFor="filename">Filename</label>
            <input
              type="text"
              name="filename"
              id="filename"
              readOnly
              value={
                videoUpdateState.source
                  ? videoUpdateState.judul
                  : videoUpdateState.video_new?.name
                  ? videoUpdateState.video_new.name
                  : "Upload Video"
              }
              className="tw-pb-2"
            />
            <label htmlFor="videolink">Video Link</label>
            <input
              type="text"
              name="videolink"
              id="videolink"
              value="siaccinfo.id/video/tutorial"
              className="tw-pb-2"
            />
          </div>
          <div className="input-group tw-cursor-pointer">
            <div className="tw-flex" style={{ width: "100%" }}>
              <div className="tw-w-full">
                <label
                  htmlFor="thumbnail"
                  className="tw-cursor-pointer tw-w-full"
                >
                  Thumbnail
                </label>
                <label
                  className="[padding-bottom:1.5px] tw-cursor-pointer"
                  htmlFor="thumbnail"
                >
                  {videoUpdateState.thumbnail
                    ? videoUpdateState.judul
                    : videoUpdateState.thumbnail_new?.name
                    ? videoUpdateState.thumbnail_new.name
                    : "Upload Thumbnail"}
                </label>
                <input
                  id="thumbnail"
                  type="file"
                  className="tw-hidden"
                  accept=".jpeg, .jpg, .png"
                  value={videoUpdateState.thumbnail_new?.filename}
                  onChange={(e) => handleChangeFile(e)}
                  name="thumbnail_new"
                />
              </div>
              <div
                className="tw-ml-auto tw-w-auto tw-self-center"
                style={{ marginLeft: "auto" }}
              >
                <img src={SimbolThumbnail} alt="" className="tw-w-9" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-flex tw-justify-between tw-mt-3">
        <button className="btn-x">Batal</button>
        {/* <Konfirmasidraft />
        <Berhasilunggah /> */}
        <button className="btn-y tw-ml-auto" onClick={handleSubmit}>
          Simpan
        </button>
      </div>
      {/* </form> */}
    </Modal>
  );
};

export default VideoUpdate;
