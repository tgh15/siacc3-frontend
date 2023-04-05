import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { VideoContext } from "../../Context/VideoContext";

import Modal from "../Modal/Modal";

const VideoFilter = (props) => {
  const { videoFilter } = useContext(VideoContext);
  const [showDate, setShowDate] = useState(false);

  const [dropDownState, setDropDownState] = useState({
    role: true,
    kategori: true,
  });
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [filterParams, setFilterParams] = useState({
    sort: "ASC",
    role: ["Semua Role"],
    kategori: "",
    upload_date: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
  });

  const handleChange = (e) => {
    setFilterParams({
      ...filterParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRole = (e) => {
    if (e.target.checked) {
      if (e.target.name === "Semua Role") {
        console.log("semua");
        setFilterParams({
          ...filterParams,
          role: [e.target.name],
        });
      } else {
        setFilterParams({
          ...filterParams,
          role: [
            ...filterParams.role.filter((a) => a != "Semua Role"),
            e.target.name,
          ],
        });
      }
    } else {
      setFilterParams({
        ...filterParams,
        role: filterParams.role.filter((a) => a != e.target.name),
      });
    }
  };

  const filter = () => {
    console.log(filterParams);
    videoFilter(filterParams);
    props.modalRef.current.closeModal();
  };

  return (
    <Modal ref={props.modalRef} modal_md>
      <p className="tw-text-center [color:#6E7191] tw-font-semibold tw-mb-9">
        Filter Video
      </p>
      <label className="[color:#6E7191] tw-text-xs tw-font-medium">
        Urutkan dari
      </label>
      <div className="tw-flex tw-my-4">
        <input
          onChange={(e) => handleChange(e)}
          type="radio"
          name="sort"
          className="[width:18px]"
          value="ASC"
          checked={filterParams.sort === "ASC"}
        />
        <label htmlFor="terbaru" className="[color:#6E7191] tw-text-xs tw-ml-3">
          Terbaru
        </label>
      </div>
      <div className="tw-flex tw-mb-9">
        <input
          onChange={(e) => handleChange(e)}
          type="radio"
          name="sort"
          className="[width:18px]"
          id="terlama"
          value="DESC"
          checked={filterParams.sort === "DESC"}
        />
        <label htmlFor="terlama" className="[color:#6E7191] tw-text-xs tw-ml-3">
          Terlama
        </label>
      </div>
      {/* // tgl upload */}
      <div className="input-group tw-cursor-pointer">
        <label htmlFor="waktuunggah" className="tw-cursor-pointer tw-w-full">
          Waktu Unggah
        </label>
        <div className="">
          <div className="tw-w-full tw-flex">
            <input
              id="waktuunggah"
              type="text"
              readOnly
              value={`${new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(
                filterParams.upload_date[0].startDate
              )} - ${new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(filterParams.upload_date[0].endDate)}`}
              name="waktuunggah"
            />
            <svg
              onClick={() => setShowDate(!showDate)}
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
          </div>
          <div
            className={`${
              showDate ? "tw-flex" : "tw-hidden"
            } tw-justify-center tw-transition-all`}
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setFilterParams({
                  ...filterParams,
                  upload_date: [item.selection],
                });
                // console.log(state);
              }}
              moveRangeOnFirstSelection={false}
              ranges={filterParams.upload_date}
            />
          </div>
        </div>
      </div>
      {/* //Role */}
      <div className="input-group tw-relative tw-items-center tw-flex tw-justify-between">
        <div className="tw-w-full">
          <label htmlFor="role">Role</label>
          <input
            className="tw-w-full"
            type="select"
            name="role"
            id="role"
            value={filterParams.role.join(" / ")}
            // onChange={(e) => handleChange(e)}
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
            <label htmlFor="semua-role">Semua Role</label>
            <input
              name="Semua Role"
              onChange={(e) => handleChangeRole(e)}
              // checked
              id="semua-role"
              type="checkbox"
              style={{ width: "1rem" }}
              checked={filterParams.role.includes("Semua Role")}
            />
          </div>

          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-4 tw-flex tw-justify-between">
            <label htmlFor="admin-daerah">Admin Daerah</label>
            <input
              name="Admin Daerah"
              id="admin-daerah"
              type="checkbox"
              style={{ width: "1rem" }}
              checked={filterParams.role.includes("Admin Daerah")}
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
              checked={filterParams.role.includes("Admin Pusat")}
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
              checked={filterParams.role.includes("Verifikator Daerah")}
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
              checked={filterParams.role.includes("Verifikator Pusat")}
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
              checked={filterParams.role.includes("Pimpinan Daerah")}
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
              checked={filterParams.role.includes("Pimpinan Pusat")}
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
              checked={filterParams.role.includes("Agen")}
              onChange={(e) => handleChangeRole(e)}
            />
          </div>
        </div>
      </div>

      {/* kategori */}
      {/* <div className="input-group">
        <label htmlFor="kategori">Kategori</label>
        <input
          type="text"
          name="kategori"
          id="kategori"
          placeholder="Kategori"
        />
      </div> */}
      <div className="input-group tw-relative tw-items-center tw-flex tw-justify-between">
        <div className="tw-w-full">
          <label htmlFor="kategori">Kategori</label>
          <input
            type="text"
            name="kategori"
            id="kategori"
            value={filterParams.kategori}
            onChange={(e) => handleChange(e)}
            placeholder="Kategori"
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
          } tw-absolute tw-max-h-64 tw-overflow-y-scroll tw-top-16 tw-left-0 tw-right-0 tw-bg-gray-200 tw-rounded-lg tw-shadow-md`}
        >
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({ ...filterParams, kategori: "Communication" });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Communication
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({ ...filterParams, kategori: "Feeds" });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Feeds
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "File Manajemen",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              File Manajemen
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Voice & Video Call",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Voice & Video Call
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Voice & Video Call",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Voice & Video Call
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Menu Dashboard",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Dashboard
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Menu Performance",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Performance
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Advanced Search",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Advanced Search
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Menu List Draft",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu List Draft
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Menu Topik Populer",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Topik Populer
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({ ...filterParams, kategori: "Menu Profile" });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Profile
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  filterParams,
                  kategori: "Menu Struktur Organisasi",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Struktur Organisasi
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Menu Daftar Satker",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Daftar Satker
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({ ...filterParams, kategori: "Menu License" });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu License
            </button>
          </div>
          <div className="tw-border-b-2 tw-border-gray-300 tw-text-sm tw-p-2">
            <button
              onClick={() => {
                setFilterParams({
                  ...filterParams,
                  kategori: "Menu Tautan Akun",
                });
                setDropDownState({
                  ...dropDownState,
                  kategori: !dropDownState.kategori,
                });
              }}
            >
              Menu Tautan Akun
            </button>
          </div>
        </div>
      </div>
      <button
        className="tw-bg-green-700 tw-text-white tw-p-4 tw-w-full tw-rounded-md"
        onClick={() => filter()}
      >
        Filter
      </button>
    </Modal>
  );
};

export default VideoFilter;
