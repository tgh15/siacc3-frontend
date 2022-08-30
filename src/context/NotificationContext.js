import { createContext, useEffect, useState } from "react"
import NotificationAPI from "../services/pages/notification"

//Firebase
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const NotificationContext = createContext(null)

const NotificationProvider = (props) => {
  
  const [notifications, setNotifications] = useState([])
  const [notificationUnread, setNotificationUnread] = useState(0)

  const getNotifications = () => {
    NotificationAPI.unreadNotification().then(res => {
      let datas = [];
      res.data.map(item => {
        datas.push(item.notification)
      })

      setNotifications(datas)
      setNotificationUnread(res.data.filter(item => item.is_read === false).length);
    }, err => {
      console.log(err)
    })
  }

  const handleReadNotification = id => {
    let formData;

    if (Array.isArray(id)) {
      formData = {
        uuid: localStorage.getItem("uuid"),
        notification_id: 0
      }
    } else {
      formData = {
        uuid: localStorage.getItem("uuid"),
        notification_id: id
      }
    }

    NotificationAPI.readNotification(formData).then(res => {
      if (res.status === 200) {
        getNotifications()
      }
    }, err => {
      console.log(err)
    });
  }

  //Receive Message
  onMessage(getMessaging, (payload) => {
    let _oldNotification = notifications;
    let _oldNotificationCount = notificationUnread;
    let _newData = {
      notification: {
        id: parseInt(payload.data.notification_id),
        title: payload.notification.title,
        body: payload.notification.body,
        kind: payload.data.kind,
        icon: payload.notification.image,
        content: payload.data.content,
        created_at: payload.data.created_at,
        updated_at: payload.data.created_at,
      }
    };

    _oldNotification.unshift(_newData);
    setNotificationUnread(_oldNotificationCount + 1);
    setNotifications([..._oldNotification]);
  });


  useEffect(() => {
    if (localStorage.getItem("userData")) {
      getNotifications()
    }
  }, []);


  return <NotificationContext.Provider
    value={{
      notifications,
      setNotifications,
      notificationUnread,
      setNotificationUnread,
      getNotifications,
      handleReadNotification,
    }}> {props.children}</NotificationContext.Provider>
}


export { NotificationContext, NotificationProvider }