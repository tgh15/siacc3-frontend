import { Fragment, lazy, useContext, useRef, useState } from "react";
import { VideoContext } from "../../../../views/configuration/user-preferences/video-management/video-tutorial/Context/VideoContext";
import { VideoTutorialContext } from "../../../../context/VideoTutorialContext";
import VideoDelete from "../ModalContent/VideoDelete";
import VideoDetail from "../ModalContent/VideoDetail";
import VideoUpdate from "../ModalContent/VideoUpdate";
import classes from "./Table.module.css";

// const VideoUpdate = lazy(() => import("../ModalContent/VideoUpdate"));
const role = "Admin Daerah";

const Table = (props) => {
  return <table className="tw-w-full">{props.children}</table>;
};

export const THead = (props) => {
  return (
    <thead className="tw-p-4">
      <tr className="tw-text-center tw-my-6">
        {props.columns.map((col, idx) => (
          <th
            className={
              idx === 0 ? "tw-md:px-4 tw-px-auto" : "tw-md:px-12 tw-px-auto"
            }
            key={idx}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TBody = (props) => {
  const detailRef = useRef();
  const updateRef = useRef();
  const deleteRef = useRef();

  const sourceEndpoint =
    !process.env.NODE_ENV || process.env.NODE_ENV === "production"
      ? window._env_.REACT_APP_API_GATEWAY
      : process.env.REACT_APP_API_GATEWAY;

  const { setVideoUpdateState } = useContext(VideoContext);
  const { modalData, setModalData, getListPlaylist, putVideoVisibility } =
    useContext(VideoTutorialContext);

  const openModalVideo = async (row) => {
    await setModalData(row);
    await getListPlaylist("", row.kategori);
    await detailRef.current.openModal();
  };

  const openModalUpdate = async (row) => {
    await setVideoUpdateState(row);
    await updateRef.current.openModal();
  };
  const openModalDelete = (row) => {
    setModalData(row);
    deleteRef.current.openModal();
  };

  return (
    <>
      <tbody>
        {props.rows.map((row, idx) => (
          <Fragment key={(Math.random() * 10).toString()}>
            <tr key={idx} className={classes.row_card}>
              <td>{idx + 1}</td>
              <td>
                <div
                  className="tw-flex tw-items-center tw-gap-3 tw-text-left tw-cursor-pointer"
                  onClick={() => openModalVideo(row)}
                >
                  <img
                    src={sourceEndpoint + row.thumbnail}
                    className="tw-w-40 tw-h-24 tw-object-cover tw-rounded-md tw-my-2"
                    alt={row.judul}
                  />
                  <div>
                    <h1 className="tw-font-semibold tw-text-sm tw-text-black">
                      {row.judul}
                    </h1>
                    <span>
                      Durasi :
                      {Math.floor(row.durasi / 60) +
                        "." +
                        Math.floor(row.durasi % 60)}{" "}
                      Menit
                    </span>
                  </div>
                </div>
              </td>
              <td>{row.kategori}</td>
              <td>{row.role.join(", ")}</td>
              <td>
                {new Intl.DateTimeFormat("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(row.tanggal_upload))}
              </td>
              <td>
                <div className="tw-flex tw-gap-3 tw-z-10">
                  <button
                    onClick={() =>
                      putVideoVisibility(
                        row.uuid,
                        row.visibility,
                        Math.random().toString() // TODO: replace with current user id
                      )
                    }
                  >
                    {row.visibility ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="tw-w-5 tw-h-5 tw-text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="tw-w-5 tw-h-5 tw-text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                  <button onClick={() => openModalUpdate(row)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="tw-w-5 tw-h-5 tw-text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                  <button onClick={() => openModalDelete(row)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="tw-w-5 tw-h-5 tw-text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr className="tw-h-2"></tr>
          </Fragment>
        ))}
      </tbody>
      <VideoUpdate modalRef={updateRef} data={modalData} />
      <VideoDetail modalRef={detailRef} data={modalData} />
      <VideoDelete modalRef={deleteRef} data={modalData} />
    </>
  );
};

export default Table;
