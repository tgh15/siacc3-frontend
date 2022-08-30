import DriveHomeApi from './home';
import DriveStatisticApi from './statistic';
import {Get} from './Get'
import  {Restore}  from './Restore';
import { Delete } from './Delete';
import {TagCreate} from './TagCreate';
import { TagGet } from './TagGet';
import { TagAddFile } from './TagAddFile';
import { Upload } from './Upload';
import { Comment } from './Comment';
import { User } from './User';
import { DeleteFileFromTag } from './DeleteFileFromTag';
import { Share } from './Share';
import { ShareDetail } from './ShareDetail';
import { ShareDelete } from './ShareDelete';
import { TagDelete } from './TagDelete';

const DriveApi = {
   get : Get,
   home : DriveHomeApi,
   statistic : DriveStatisticApi,
   restore : Restore,
   delete : Delete,
   tagCreate : TagCreate,
   tagGet : TagGet,
   tagAddFile : TagAddFile,
   upload : Upload,
   comment : Comment,
   user : User,
   deleteFromTag : DeleteFileFromTag,
   share : Share,
   shareDetail : ShareDetail,
   shareDelete : ShareDelete,
   tagDelete : TagDelete
}

export default DriveApi