import { createContext, useState } from "react";
import Swal from "sweetalert2";
import * as tus from "tus-js-client";
import axios from "axios";

export const VideoContext = createContext();

const API_URL = "http://147.139.162.58:5001/api/v1";
const API_URL_FILE = "http://147.139.162.58:5002/api/v1";

const VideoContextProvider = (props) => {
  // const [listVideoAdmin, setListVideoAdmin] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_page: 1,
  });
  // const [listVideoViewer, setListVideoViewer] = useState([]);
  const [listPlaylist, setListPlayLIst] = useState([]);
  const [modalData, setModalData] = useState({});
  const [videoUpdateState, setVideoUpdateState] = useState({});
  const [progress, setProgress] = useState(false);
  const [categories, setCategories] = useState([]);

  const getListVideoViewer = async (role) => {
    return await fetch(`${API_URL}/list-video-viewer?role=${role}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) =>
        setListVideoViewer((listVideoViewer) => (listVideoViewer = res.data))
      );
  };
  const setVideoVisibility = async (uuid, visibility, user_id) => {
    console.log(!visibility);
    return await fetch(`${API_URL}/update-video-visibility/${uuid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visibility: !visibility,
        user_id,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.err) {
          let videos = listVideoAdmin.map((vid) => {
            if (vid.uuid === uuid) vid.visibility = !vid.visibility;
            return vid;
          });
          console.log(videos);
          setListVideoAdmin((listVideoAdmin) => (listVideoAdmin = videos));
        }
      });
  };
  const getListVideoAdmin = async (page) => {
    return await fetch(`${API_URL}/list-video-admin?sort=asc&page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setListVideoAdmin((listVideoAdmin) => (listVideoAdmin = res.data));
        setPagination({
          current_page: res.current_page,
          total_page: res.total_page,
        });
        console.log(pagination);
      });
  };
  const addVideoSuggestion = async (suggest, video_id, user_id) => {
    return await fetch(`${API_URL}/add-suggestion`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        saran: suggest,
        video_id: video_id,
        user_id: user_id,
      },
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  };
  const deleteVideo = async (video_id) => {
    return await fetch(`${API_URL}/remove-video/${video_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.err) {
          setListVideoAdmin([
            ...listVideoAdmin.filter((list) => list.uuid !== video_id),
          ]);
          return true;
        }
      });
  };
  const videoAdminSearch = async (title) => {
    return await fetch(
      `${API_URL}/list-video-admin?sort=asc&page=1&search=${title}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) =>
        setListVideoAdmin((listVideoAdmin) => (listVideoAdmin = res.data))
      );
  };
  const postVideo = async (data) => {
    if (
      (data.video.type === "video/x-matroska" ||
        data.video.type === "video/mp4") &&
      (data.thumbnail.type === "image/png" ||
        data.thumbnail.type === "image/jpeg")
    ) {
      let uploadVideo = new tus.Upload(data.video, {
        endpoint: `${API_URL_FILE}/videos/`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: data.video.name,
          filetype: data.video.type,
        },
        onError: function (error) {
          console.log("Failed because: " + error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + "%");
          setProgress(percentage);
        },
        onSuccess: function () {
          let url = uploadVideo.url.split("/");
          let hash = url[url.length - 1];
          data.video_id = hash;
          delete data.video;
          setProgress(false);
          let uploadThumbnail = new tus.Upload(data.thumbnail, {
            endpoint: `${API_URL_FILE}/thumbnails/`,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
              filename: data.thumbnail.name,
              filetype: data.thumbnail.type,
            },
            onError: function (error) {
              console.log("Failed because: " + error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
              var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
              console.log(bytesUploaded, bytesTotal, percentage + "%");
            },
            onSuccess: function () {
              let url = uploadThumbnail.url.split("/");
              let hash = url[url.length - 1];
              data.thumbnail_id = hash;
              delete data.thumbnail;
              upload(data);
            },
          });
          uploadThumbnail
            .findPreviousUploads()
            .then(function (previousUploads) {
              if (previousUploads.length) {
                uploadThumbnail.resumeFromPreviousUpload(previousUploads[0]);
              }
              uploadThumbnail.start();
            });
        },
      });

      uploadVideo.findPreviousUploads().then(function (previousUploads) {
        if (previousUploads.length) {
          uploadVideo.resumeFromPreviousUpload(previousUploads[0]);
        }
        uploadVideo.start();
      });
    }
  };

  const upload = async (data) => {
    console.log(data);

    return await fetch(`${API_URL}/add-video`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.err) {
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Video Berhasil Diunggah",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            getListVideoAdmin(1);
          });
        }
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Video Gagal Diunggah",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const updateVideo = async (data) => {
    if (data.video_new && data.thumbnail_new) {
      console.log("upload new video and new thumbnail");
      if (
        (data.video_new.type === "video/x-matroska" ||
          data.video_new.type === "video/mp4") &&
        (data.thumbnail_new.type === "image/png" ||
          data.thumbnail_new.type === "image/jpeg")
      ) {
        console.log("upload new video and new thumbnail");
        let uploadVideo = new tus.Upload(data.video_new, {
          endpoint: `${API_URL_FILE}/videos/`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: data.video_new.name,
            filetype: data.video_new.type,
          },
          onError: function (error) {
            console.log("Failed because: " + error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + "%");
            setProgress(percentage);
          },
          onSuccess: function () {
            let url = uploadVideo.url.split("/");
            let hash = url[url.length - 1];
            data.video_id = hash;
            delete data.video;

            let uploadThumbnail = new tus.Upload(data.thumbnail_new, {
              endpoint: `${API_URL_FILE}/thumbnails/`,
              retryDelays: [0, 3000, 5000, 10000, 20000],
              metadata: {
                filename: data.thumbnail_new.name,
                filetype: data.thumbnail_new.type,
              },
              onError: function (error) {
                console.log("Failed because: " + error);
              },
              onProgress: function (bytesUploaded, bytesTotal) {
                var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(
                  2
                );
                console.log(bytesUploaded, bytesTotal, percentage + "%");
              },
              onSuccess: function () {
                let url = uploadThumbnail.url.split("/");
                let hash = url[url.length - 1];
                data.thumbnail_id = hash;
                delete data.thumbnail;
                postUpdate(data);
              },
            });
            uploadThumbnail
              .findPreviousUploads()
              .then(function (previousUploads) {
                if (previousUploads.length) {
                  uploadThumbnail.resumeFromPreviousUpload(previousUploads[0]);
                }
                uploadThumbnail.start();
              });
          },
        });

        uploadVideo.findPreviousUploads().then(function (previousUploads) {
          if (previousUploads.length) {
            uploadVideo.resumeFromPreviousUpload(previousUploads[0]);
          }
          uploadVideo.start();
        });
      }
    } else if (data.video_new) {
      console.log("upload only video");
      if (
        data.video_new.type === "video/x-matroska" ||
        data.video_new.type === "video/mp4"
      ) {
        let uploadVideo = new tus.Upload(data.video_new, {
          endpoint: `${API_URL_FILE}/videos/`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: data.video_new.name,
            filetype: data.video_new.type,
          },
          onError: function (error) {
            console.log("Failed because: " + error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + "%");
          },
          onSuccess: function () {
            let url = uploadVideo.url.split("/");
            let hash = url[url.length - 1];
            data.video_id = hash;
            delete data.video;
            postUpdate(data);
          },
        });

        uploadVideo.findPreviousUploads().then(function (previousUploads) {
          if (previousUploads.length) {
            uploadVideo.resumeFromPreviousUpload(previousUploads[0]);
          }
          uploadVideo.start();
        });
      }
    } else if (data.thumbnail_new) {
      console.log("upload only thumbnail");
      if (
        data.thumbnail_new.type === "image/png" ||
        data.thumbnail_new.type === "image/jpeg"
      ) {
        let uploadThumbnail = new tus.Upload(data.thumbnail_new, {
          endpoint: `${API_URL_FILE}/thumbnails/`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          metadata: {
            filename: data.thumbnail_new.name,
            filetype: data.thumbnail_new.type,
          },
          onError: function (error) {
            console.log("Failed because: " + error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + "%");
          },
          onSuccess: function () {
            let url = uploadThumbnail.url.split("/");
            let hash = url[url.length - 1];
            data.thumbnail_id = hash;
            delete data.thumbnail;
            postUpdate(data);
          },
        });
        uploadThumbnail.findPreviousUploads().then(function (previousUploads) {
          if (previousUploads.length) {
            uploadThumbnail.resumeFromPreviousUpload(previousUploads[0]);
          }
          uploadThumbnail.start();
        });
      }
    } else {
      console.log("no upload");
      postUpdate(data);
    }
  };
  const postUpdate = async (data) => {
    return await fetch(`${API_URL}/update-video/${data.uuid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.err) {
          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Video Berhasil Diupdatez",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            getListVideoAdmin(1);
          });
        }
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Video Gagal Diupdate",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const videoFilter = async (params) => {
    let date = `${new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(params.upload_date[0].startDate)} - ${new Intl.DateTimeFormat(
      "id-ID",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ).format(params.upload_date[0].endDate)}`;
    let url = "";
    params.role.includes("Semua Role")
      ? (url = `${API_URL}/list-video-admin?upload_date=${date}&sort=${params.sort}&page=1&category=${params.kategori}`)
      : (url = `${API_URL}/list-video-admin?upload_date=${date}&sort=${
          params.sort
        }&page=1&${params.role.map((r) => "role=" + r).join("&")}&category=${
          params.kategori
        }`);
    console.log(url);
    return await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (res) =>
          setListVideoAdmin((listVideoAdmin) => (listVideoAdmin = res.data))
        // console.log(res.data)
      );
  };
  const getListPlaylist = async (role, category) => {
    return await fetch(
      `${API_URL}/list-playlist?category=${category.replace(
        /[&]/g,
        "%26"
      )}&role=${role}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => setListPlayLIst(res.data))
      .then(() => {
        return listPlaylist;
      });
  };

  const getCategories = async () => {
    axios
      .get("http://192.168.52.90:8080/video-tutor/video/list/categories")
      .then((res) => setCategories(res.data.result));
  };

  const addCategory = async (newCategory) => {
    return await fetch(
      "http://192.168.52.90:8080/video-tutor/video/update-category",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...categories, newCategory]),
      }
    )
      .then((response) => response.json())
      .then((res) => setCategories([...categories, newCategory]));
  };

  const removeCategory = async (category) => {
    return await fetch(
      "http://192.168.52.90:8080/video-tutor/video/update-category",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categories.filter((item) => item !== category)),
      }
    )
      .then((response) => response.json())
      .then((res) =>
        setCategories(categories.filter((item) => item !== category))
      );
  };

  return (
    <VideoContext.Provider
      value={{
        // listVideoAdmin,
        setVideoVisibility,
        // getListVideoAdmin,
        addVideoSuggestion,
        deleteVideo,
        videoAdminSearch,
        // listVideoViewer,
        // getListVideoViewer,
        postVideo,
        videoFilter,
        getListPlaylist,
        listPlaylist,
        modalData,
        setModalData,
        videoUpdateState,
        setVideoUpdateState,
        updateVideo,
        progress,
        pagination,
        setPagination,
        categories,
        setCategories,
        getCategories,
        addCategory,
        removeCategory,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
