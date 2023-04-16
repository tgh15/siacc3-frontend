import React, { useContext, useEffect, useRef, useState } from "react";


/**
 * Index file for video tutorial.
 * 
 * @todo:
 * - Get role of current login user
 * - Get user_id of current user
 * 
 */


// components
import Table, { TBody, THead } from "./Components/Table/Table";
import Navigation from "./Components/Navigation/Navigation";
import VideoAdd from "./Components/ModalContent/VideoAdd";
import VideoTutorial from "./Components/ModalContent/VideoTutorial";
import VideoFilter from "./Components/ModalContent/VideoFilter";
import SearchBar from "./Components/SearchBar/SearchBar";
import ImgFilter from "./assets/vector.png"

// context and providers
import VideoContextProvider, { VideoContext } from "./Context/VideoContext";
import VideoTutorialContextProvider, { VideoTutorialContext } from "../../../../../context/VideoTutorialContext"

// TODO: get role from current login session
const role = "Admin Daerah"

import "./tailwind"
import "./index.css"
tailwind.config = { prefix: "tw-" }

const VideoManagement = () => {
  const addRef = useRef();
  const filterRef = useRef();
  const tutorialRef = useRef();

  const {
    listVideoAdmin, getListVideoAdmin,
    progress, percentage,
    pagination, setPagination,
  } = useContext(VideoTutorialContext);

  const [filter, setFilter] = useState({
    sort: "asc",
    page: "1",
    kategori: "",
    search: "",
    role: [],
    upload_date: [{
      startDate: null,
      endDate: null
    }]
  })

  useEffect(() => {
    videoTutorial();
    window.addEventListener("hashchange", () => {
      videoTutorial();
    });
  }, [window, listVideoAdmin, percentage]);

  // load videos for admin and viewer also categories
  // when component is render/mounted 
  useEffect(() => {
    getListVideoAdmin(filter);
  }, []);

  // watch the search field
  useEffect(() => {
    setTimeout(() => {
      setFilter({ ...filter, page: "1" })
      getListVideoAdmin(filter);
    }, 1000);
  }, [filter.search]);


  const videoTutorial = () => {
    if (window.location.hash === "#tutor") {
      tutorialRef.current.openModal();
    } else {
      tutorialRef.current.closeModal();
    }
  };

  const prevPage = async () => {
    console.log("prev");
    await setPagination({
      ...pagination,
      current_page: pagination.current_page - 1,
    });
    await getListVideoAdmin(pagination.current_page - 1);
  };

  const nextPage = async () => {
    await setPagination({
      ...pagination,
      current_page: pagination.current_page + 1,
    });
    await getListVideoAdmin(pagination.current_page + 1);
    console.log("next");
  };

  const data = {
    columns: ["No", "Video", "Kategori", "Role", "Waktu Unggah", "Aksi"],
    rows: listVideoAdmin,
  };

  return (
    <>
      <div className="tw-min-h-screen tw-py-4 tw-px-8">
        <p className="[color:#1C643C] tw-font-semibold">
          Manajemen Video Tutorial
        </p>
        {progress && (
          <div className="tw-absolute tw-w-64 tw-right-10 tw-p-3 tw-top-36 tw-bg-white tw-shadow-md tw-rounded-md">
            <div className="tw-relative tw-pt-1">
              Upload Video...
              <div className="tw-overflow-hidden tw-h-2 tw-mb-4 tw-text-xs tw-flex tw-rounded tw-bg-emerald-200">
                <div
                  style={{ width: percentage + "%" }}
                  className="tw-shadow-none tw-flex tw-flex-col tw-text-center tw-whitespace-nowrap tw-text-white tw-justify-center tw-bg-emerald-500"
                ></div>
              </div>
            </div>
          </div>
        )}

        <Navigation />


        <div className="tw-self-center tw-flex">

          {/* <Filter /> */}
          <button
            className="tw-p-2 tw-w-8 tw-h-8 tw-rounded-md [background-color:#44624D] tw-text-white"
            onClick={() => filterRef.current.openModal()}
          >
            <img src={ImgFilter} alt="" />
          </button>

          {/* <CariVideo /> */}
          <SearchBar state={filter.search} setState={setFilter} />
        </div>
        <div className="tw-mb-4 tw-flex tw-justify-between">
          <button
            className="tw-p-1 tw-w-8 tw-h-8 tw-rounded-md [border-color:#44624D] tw-border-2 [color:#44624D]"
            onClick={() => addRef.current.openModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="tw-w-5 tw-h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <span className="tw-flex tw-items-center tw-mt-4 tw-text-sm [color:#4E4B66]">
            {`${pagination.current_page}  Dari  ${pagination.total_page}`}
            <button
              disabled={pagination.current_page <= pagination.total_page}
              onClick={prevPage}
              className={
                pagination.current_page <= pagination.total_page
                  ? "tw-text-gray-500"
                  : false
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="tw-w-5 tw-h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              disabled={pagination.current_page >= pagination.total_page}
              onClick={nextPage}
              className={
                pagination.current_page >= pagination.total_page
                  ? "tw-text-gray-500"
                  : false
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="tw-w-5 tw-h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="tw-relative tw-overflow-x-auto">
          <Table>
            <THead columns={data.columns} />
            <TBody rows={data.rows} />
          </Table>
        </div>
      </div>
      <VideoAdd modalRef={addRef} />
      <VideoTutorial modalRef={tutorialRef} />
      <VideoFilter modalRef={filterRef} />
    </>
  );
}

export default () => {
  return (
    <VideoTutorialContextProvider>
      <VideoContextProvider>
        <VideoManagement />
      </VideoContextProvider>
    </VideoTutorialContextProvider>
  )
}