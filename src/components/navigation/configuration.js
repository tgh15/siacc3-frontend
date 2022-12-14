import { 
        Grid, 
        User, 
        Users,
        Clock, 
        Target,
        Monitor, 
        Sliders, 
        FileText,
        Settings, 
        UserCheck, 
        Briefcase, 
        GitPullRequest,
        XOctagon, 
    }                                   from "react-feather";

import Virus                            from '../../assets/icons/virus.svg';

let menu          = JSON.parse(localStorage.getItem('menu'));
let configuration = menu != undefined ? menu.filter((data) => (data.label === "Konfigurasi")) : null;
let children_     = [];

configuration != null && configuration.length > 0 && configuration[0].children != null && configuration[0].children.map((data) => {
    if(data.label === "Manajemen Pengguna"  && data.is_active === true){
        children_.push(
            {
                id : 'userManagement',
                title : 'Manajemen Pengguna',
                icon : <User />,
                navLink : '/configuration/user-management'
            }
        );
    }

    if(data.label === "Aktivitas Pengguna"  && data.is_active === true){
        children_.push(
            {
                id : 'userActivity',
                title : 'Aktifitas Pengguna',
                icon : <Clock />,
                navLink : '/configuration/user-activity'
            }
        );
    }

    if(data.label === "Privilage Role"  && data.is_active === true){
        children_.push(
            {
                id : 'privilage Role',
                title : 'Privilage Role',
                icon : <UserCheck />,
                navLink : '/configuration/privilage-role'
            }
        );
    }

    if(data.label === "Kategori"  && data.is_active === true){
        children_.push(
            {
                id : 'category',
                title : 'Kategori',
                icon : <Grid />,
                navLink : '/configuration/category'
            }
        );
    }

    if(data.label === "Struktur Organisasi"  && data.is_active === true){
        children_.push(
            {
                id : 'organizationalStructure',
                title : 'Struktur Organisasi',
                icon : <GitPullRequest />,
                navLink : '/configuration/organizational-structure'
            }
        );
    }

    if(data.label === "Unit Kerja"  && data.is_active === true){
        children_.push(
            {
                id : 'unitWork',
                title : 'Unit Kerja',
                icon : <Sliders />,
                navLink : '/configuration/unit-work'
            }
        );
    }

    if(data.label === "Jabatan"  && data.is_active === true){
        children_.push(
            {
                id : 'Position',
                title : 'Jabatan',
                icon : <Briefcase />,
                navLink : '/configuration/position'
            }
        );
    }

    if(data.label === "Daftar Satker"  && data.is_active === true){
        children_.push(
            {
                id : 'workUnitList',
                title : 'Daftar Satker',
                icon : <Users />,
                navLink : '/configuration/work-unit-list'
            }
        );
    }

    if(data.label === "Automation" && data.is_active === true){
        children_.push(
            {
                id : 'automation',
                title : 'Automation',
                icon : <Settings />,
                navLink : '/configuration/automation'
            }
        );
    }

    if(data.label === "Tautan Akun"  && data.is_active === true){
        children_.push(
            {
                id : 'linkAccount',
                title : 'Tautan Akun',
                icon : <Monitor />,
                navLink : '/configuration/link-account'
            }
        );
    }

    if(data.label === "Server Monitor"  && data.is_active === true){
        children_.push(
            {
                id : 'serverMonitor',
                title : 'Server Monitor',
                icon : <Monitor />,
                navLink : '/configuration/server-monitor'
            }
        );
    }

    if(data.label === "Setting Performance"  && data.is_active === true){
        children_.push(
            {
                id : 'settingPerformance',
                title : 'Setting Performance',
                icon : <Target />,
                navLink : '/configuration/setting-performance'
            }
        );
    }

    if(data.label === "License"  && data.is_active === true){
        children_.push(
            {
                id : 'license',
                title : 'Licensi',
                icon : <FileText />,
                navLink : '/configuration/license'
            }
        );
    }

    if(data.label === "Proteksi"  && data.is_active === true){
        children_.push(
            {
                id : 'proteksi',
                title : 'Proteksi',
                icon : <img src={Virus} width="12" height="12" style={{marginRight: '1.1rem'}}/>,
                navLink : '/configuration/proteksi'
            }
        );
    }

    if(data.label === "Restrict IP"  && data.is_active === true){
        children_.push(
            {
                id : 'restrict_ip',
                title : 'Restrict IP',
                icon : <XOctagon/>,
                navLink : '/configuration/restriction'
            }
        );
    }
});

export default [
    {
        id          : 'configuration',
        title       : 'Konfigurasi',
        icon        : <Settings/>,
        children    : children_
    }
];