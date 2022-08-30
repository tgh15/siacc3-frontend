import { AddUserToRoom } from "./AddUserToRoom"
import { ChangeAdmin } from "./ChangeAdmin"
import { MarkAsRead } from "./MarkAsRead"
import { MarkAsUnread } from "./MarkAsUnread"
import { MessageByRoom } from "./MessageByRoom"
import { RemoveMemberFromRoom } from "./RemoveMemberFromRoom"
import { Room } from "./Room"
import { RoomArchive } from "./RoomArchive"
import { UploadAttachment } from "./UploadAttachment"

const ChatApi = {
    room:Room,
    roomArchive : RoomArchive,
    messageByRoom : MessageByRoom,
    addUserToRoom : AddUserToRoom,
    removeMemberFromRoom : RemoveMemberFromRoom,
    changeAdmin : ChangeAdmin,
    markAsRead : MarkAsRead,
    markAsUnread : MarkAsUnread,
    uploadAttachment : UploadAttachment
}

export default ChatApi