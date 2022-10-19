import moment               from "moment";
import { useHistory }       from "react-router";
import { useLocation }      from "react-router-dom";

import fallback from '../assets/images/portrait/small/150x150.png';

const CustomTableNumber = ({ key, pagination }) => {
    if (pagination.current_page == 1) {
        return key + 1
    } else {
        return ((pagination.current_page - 1) * 10) + (key + 1)
    }
}

const dateIndo  = (paramsDate) => {
    var date = new Date(paramsDate);

    return date.getDate() + " " + monthIndo(date.getMonth()) + " " + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes()
}
const dateIndo1 = (paramsDate) => {
    var date = new Date(paramsDate);

    return date.getDate() + " " + monthIndo(date.getMonth()) + " " + date.getFullYear()
}

const dayIndo = (paramsDate) => {
    var date = new Date(paramsDate);
    switch (date.getDay()) {
        case 0:
            return "Minggu";
        case 1:
            return "Senin";
        case 2:
            return "Selasa";
        case 3:
            return "Rabu";
        case 4:
            return "Kamis";
        case 5:
            return "Jumat";
        case 6:
            return "Sabtu";
        default:
            return "Tes";
    }
}

const monthIndo = (paramsMonth) => {
    var month = parseInt(paramsMonth) + 1;

    switch (month) {
        case 1:
            return "Januari";
        case 2:
            return "Februari";
        case 3:
            return "Maret";
        case 4:
            return "April";
        case 5:
            return "Mei";
        case 6:
            return "Juni";
        case 7:
            return "Juli";
        case 8:
            return "Agustus";
        case 9:
            return "September";
        case 10:
            return "Oktober";
        case 11:
            return "November";
        case 12:
            return "Desember";
    }
}

const rankingText = (num) => {
    switch (num) {
        case 1:
            return "Pertama";
        case 2:
            return "Kedua";
        case 3:
            return "Ketiga"
        default:
            return "Ke-" + num
    }
}

const defaultAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${name ?? "UN"}&background=4e73df&color=fff&bold=true`
}

const FileSize = (size) => {
    let kb = (size / 1024);
    if (kb < 1) {
        return size + " bytes";
    } else {
        let mb = (kb / 1024);
        if (mb < 1) {
            return parseFloat(kb).toFixed(2) + " kb"
        } else {
            return parseFloat(kb / 1024).toFixed(2) + " mb"
        }
    }
}

const Redirectlogout = (err) => {
    let history = useHistory();
    if (err.response.status == 410) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        localStorage.clear()
        history.push("/");
    }
}


const actionTypeIndo = (val) => {
    switch (val) {
        case "moved":
            return "Dipindahkan oleh ";
            break;
        case "created":
            return "Dibuat oleh ";
            break;
        case "copied":
            return "Disalin oleh ";
            break;
        case "renamed":
            return "Diubah oleh ";
            break;
        case "uploaded":
            return "Ditambahkan Oleh ";
            break;
    }
}

const accessRole = (val) => {
    switch (val) {
        case 0:
            return "Belum Ada Status ";
            break;
        case 1:
            return "Hanya Membaca ";
            break;
        case 2:
            return "Perbolehkan Unggah dan Ubah Berkas ";
            break;
        case 3:
            return "Hanya Bisa Unggah Berkas ";
            break;
    }
}

const getTimeAgo = (stringDate) => {

    moment.updateLocale('id', {
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lalu",
            s: 'beberapa detik yang lalu',
            ss: '%d detik yang lalu',
            m: "semenit yang lalu",
            mm: "%d menit yang lalu",
            h: "satu jam yang lalu",
            hh: "%d jam yang lalu",
            d: "sehari yang lalu",
            dd: "%d hari yang lalu",
            w: "seminggu yang lalu",
            ww: "%d minggu yang lalu",
            M: "sebulan yang lalu",
            MM: "%d bulan yang lalu",
            y: "setahun yang lalu",
            yy: "%d tahun yang lalu"
        }
    });

    moment.locale('id');
    return moment(stringDate).fromNow(true);
};

const fallbackImage_ = (val) => {
    val.target.src = fallback;
};

const fallbackImage = (val) => {
    val.onerrpr = null;
    val.src = fallback;
};

const getParemeterFromString = (stringURL, param) => {
    let url = new URL(stringURL);
    var result = url.searchParams.get(param);

    return result;
};

const getRoleByMenuStatus = (menu, feature) => {
    let sidebar, status;

    if (menu === "Beranda" || menu === "Topik Populer" || menu === "Dashboard" || menu === "Crawling Data" || menu === "Performance" || menu === "Daftar Persetujuan Berita" || menu === "Laporan Masyarakat" || menu === "Berita Tersimpan" || menu === "Analisis" || menu === "Laporan" || menu === "File Manajemen") {
        sidebar = JSON.parse(localStorage.getItem('menu')).filter((data) => (data.label === menu));
    } else {
        let subMenu = JSON.parse(localStorage.getItem('menu')).filter((data) => (data.label === 'Konfigurasi'));
        sidebar = subMenu[0].children.filter((data) => (data.label === menu));
    }
    if (sidebar.length > 0) {
        status = sidebar[0].features.filter((data) => {
            if (data.feature.name.toLowerCase() === feature.toLowerCase()) {
                return data;
            }
        })
    } else {
        status = [];
    }

    return status.length > 0 ? status[0].is_active : false;
};

const shortenWord = (string) => {
    if (countWord(string) < 100) {
        return string;
    }
    return string.substr(0, string.lastIndexOf(' ', 950));
};

const countWord = (string) => {
    return string.split(' ').length;
};

function getCookieName(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else {
        console.log('--something went wrong---');
    }
}

const getDurationCall = (startTime, endTime) => {

    let start   = moment(startTime);
    let end     = moment(endTime)

    let duration = moment.duration(end.diff(start));
    
    let hours   = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();

    if(hours > 0 && minutes > 0 && seconds > 0){
        return `${hours} Jam ${minutes} Menit ${seconds} Detik`
    }else if(minutes > 0 && seconds > 0){
        return `${minutes} Menit ${seconds} Detik`
    }else{
        return `${seconds} Detik`
    }
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}

const formatDate = (stringDate) => {
    var newDate = new Date(stringDate);

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const minutes   = ('0'+newDate.getMinutes()).slice(-2);;
    const hours     = ('0'+newDate.getHours()).slice(-2);;
    const date      = newDate.getDate();
    const year      = newDate.getFullYear();
    const month     = monthNames[newDate.getMonth()];

    return date + " " + month + " " + year + ", " + hours + ":" + minutes ;
};

const getYearsBefore = (howManyYears) => {
    const year = new Date().getFullYear();
    return Array.from({length : howManyYears}, (v, i) => ({ label : year - howManyYears + i + 1, value : year - howManyYears + i + 1})).reverse();
}

const getMonthName = () => {
    const monthName = moment.months();
    return monthName.map((data) => (
        {
            label : data,
            value : data
        }
    ))
};

const Helper = {
    dayIndo                 : dayIndo,
    dateIndo                : dateIndo,
    dateIndo1               : dateIndo1,
    fileSize                : FileSize,
    countWord               : countWord,
    accessRole              : accessRole,
    getTimeAgo              : getTimeAgo,
    rankingText             : rankingText,
    shortenWord             : shortenWord,
    defaultAvatar           : defaultAvatar,
    getCookieName           : getCookieName,
    fallbackImage           : fallbackImage,
    fallbackImage_          : fallbackImage_,
    actionTypeIndo          : actionTypeIndo,
    Redirectlogout          : Redirectlogout,
    getDurationCall         : getDurationCall,
    customTableNumber       : CustomTableNumber,
    getRoleByMenuStatus     : getRoleByMenuStatus,
    getParemeterFromString  : getParemeterFromString,
    useQuery                : useQuery,
    shortenLargeNumber      : shortenLargeNumber,
    formatDate              : formatDate,
    getYearsBefore          : getYearsBefore,
    getMonthName            : getMonthName
}

export default Helper;