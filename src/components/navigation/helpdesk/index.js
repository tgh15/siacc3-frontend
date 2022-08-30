import { Download, File, FileText, Home, Mail, MessageCircle, MessageSquare, Settings } from "react-feather"


export default  [
    {
        id: 'helpdeskHome',
        title: 'Beranda Helpdesk',
        icon: <Home size={20} />,
        navLink: '/helpdesk/home'
    },
    {
        id: 'helpdeskInbox',
        title: 'Kotak Masuk',
        icon: <Mail size={20} />,
        navLink: '/helpdesk/inbox'
    },
    {
        id: 'helpdeskMessageSaved',
        title: 'Pesan Disimpan',
        icon: <Download size={20} />,
        navLink: '/helpdesk/saved-messages'
    },
    {
        id: 'helpdeskMessageBot',
        title: 'Pesan Bot Monitoring',
        icon: <MessageSquare size={20} />,
        navLink: '/helpdesk/monitoring-bot-message'
    },
    {
        id: 'helpdeskReport',
        title: 'Laporan',
        icon: <File size={20} />,
        navLink: '/helpdesk/report'
    },
    {
        id: 'helpdeskSetting',
        title: 'Pengaturan',
        icon: <Settings size={20} />,
        children: [
            {
                id: 'helpdeskSettingCategory',
                title: 'Kategori',
                icon: <Settings size={12} />,
                navLink: '/helpdesk/setting'
            },
            {
                id: 'helpdeskSettingReportKind',
                title: 'Jenis Laporan',
                icon: <Settings size={12} />,
                navLink: '/helpdesk/report-kind'
            },
            {
                id: 'helpdeskChatbotConfiguration',
                title: 'Chat Bot',
                icon: <MessageCircle size={12} />,
                navLink: '/helpdesk/chatbot-configuration'
            },
            {
                id: 'helpdeskInstruction',
                title: 'Petunjuk',
                icon: <FileText size={12} />,
                navLink: '/helpdesk/instruction'
            },
        ]
    },
    
];