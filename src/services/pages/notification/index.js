

import { Get, Put } from '../../core/request';
import { notificationURL } from './url';

//GET
const getNotification   = (page) => Get(`${notificationURL.notificationPrefix}/${notificationURL.notification}?id=${localStorage.getItem('uuid')}&page_size=10&page=${page}`);
const unreadNotification = () => Get(`${notificationURL.notificationPrefix}/${notificationURL.notification}?id=${localStorage.getItem('uuid')}&is_read=false`)

//PUT
const readNotification  = (data) => Put(`${notificationURL.notificationPrefix}/${notificationURL.notification}/${notificationURL.notificationRead}`, data);

const NotificationAPI = {
    getNotification,
    readNotification,
    unreadNotification
};

export default NotificationAPI;