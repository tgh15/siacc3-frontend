import React, { Fragment, useContext, useState } from 'react';

import { 
  Card, 
  CardBody, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle, 
  UncontrolledDropdown, 
  UncontrolledButtonDropdown, 
} from 'reactstrap';

//Icon
import { 
  Tag, 
  Info, 
  Edit, 
  Star, 
  Trash, 
  Folder, 
  Download, 
  MoreHorizontal, 
} from 'react-feather';

//Components
import { ModalBase }                             from '../modals-base';
import { FormRename }                            from './FormRename';
import UnFavorite                                from "@src/assets/icons/unfavorite.svg";
import CustomToast                               from '../custom-toast';
import AddToTags                                 from './AddToTag';
import FormDelete                                from '../form-delete/FormDelete';

import DriveApi                                  from '../../../services/pages/drive';
import DriveHomeApi                              from '../../../services/pages/drive/home';
import DriveTrashApi                             from '../../../services/pages/drive/trash';
import DriveFavoriteApi                          from '../../../services/pages/drive/favorite';

//Context
import { FileManagerContext }                    from '../../../context/FileManagerContext';

//Helper
import Helper                                    from '../../../helpers';


export const DropdownFilemanagerTable = (props) => {
  //Props
  const { data }                            = props;
  
  //Helper
  const {getRoleByMenuStatus}               = Helper;

  //State
  const [show, setShow]                     = useState(false);
  const [loading, setLoading]               = useState(false);
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [showModalTag, setShowModalTag]     = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  //Context
  const { 
    tags,
    getData, 
    apiActive, 
    menuActive, 
    fullScreen, 
    setDataDetail, 
    setDataSelected, 
    handlerFullScren, 
  } = useContext(FileManagerContext);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  };

  const favIcon = () => {
    if (!getInObject(data, "is_favorite", "option")) {
      return (
        <Fragment>
          <DropdownItem 
            tag     = 'a' 
            onClick = {() => { setFavorite(props.data.id) }}
          >
            <Star size={14}/>&nbsp;Favorite
          </DropdownItem>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <DropdownItem 
            tag     = 'a' 
            onClick = {() => { setUnFavorite(props.data.id) }}
          >
            <img 
              src   = {UnFavorite} 
              style = {{ width: "15px", fill: "red" }}
            />&nbsp;Hapus Favorite
          </DropdownItem>
        </Fragment>
      )
    }
  };

  const seeDetail = () => {
    if (!fullScreen) {
      handlerFullScren()
    };

    setDataSelected(data)
    
    DriveApi.get({
      path: "?detail=" + getInObject(data,"id",""),
      onSuccess: (res) => {
        setDataDetail(res)
      }, onFail: (err) => {
        CustomToast("danger", err)
      }
    })
  };

  const toggleModal = () => {
    setShow(!show)
  };

  const setUnFavorite = (id) => {
    DriveFavoriteApi.setUnFavorite({
      id: id,
      onSuccess: (res) => {
        CustomToast("success", "Berhasil dihapus dari favorit")
        getData(apiActive)
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  };

  const setFavorite = (id) => {
    DriveFavoriteApi.setFavorite({
      id: id,
      onSuccess: (res) => {
        CustomToast("success", "Berhasil ditambahkan ke favorit")
        getData(apiActive)
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  };

  const deleteFileFromTag = () => {
    DriveApi.deleteFromTag({
      data: {
        object_id: props.data.id,
        tag_id: props.data.tags[0].id
      },
      onSuccess: (res) => {
        CustomToast("success", "Berhasil dihapus dari Tag")
        getData(apiActive)
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  };

  const onDelete = () => {
    setLoading(true)
    DriveTrashApi.moveToTrash({
      id: props.data.id,
      onSuccess: (res) => {
        setLoading(false)
        setShowDeleteForm(false)
        CustomToast("success", "Data Berhasil dihapus")
        getData(apiActive)
      }, onFail: (err) => {
        console.log(err)
      }
    })
  };

  const download = () => {
    DriveHomeApi.download({
      id: props.data.id,
      onSuccess: (res) => {
      },
      onFail: (err) => {
        console.log(err)
      }
    })
  };

  const getInObject = (data, fieldName, type) => {
    if (menuActive == "recent") {
      if (type == "option") {
        return data.object.option[fieldName]
      }

      return data.object[fieldName]
    } else {
      if (type == "option") {
        return data.option[fieldName]
      }
      return data[fieldName]
    }
  };

  return (
    <Fragment>
      {/* modal Rename */}
      <ModalBase 
        show    = {show} 
        size    = "sm" 
        title   = "Ubah Nama" 
        setShow = {toggleModal}
      >
        <FormRename
          id      = {props.data.id}
          type    = {props.data.mime ? "File" : "Folder"}
          onBack  = {() => {toggleModal();}}
          oldName = {props.data.name}
        />
      </ModalBase>

      {/* Modal Tag */}
      <ModalBase 
        size    = "sm" 
        show    = {showModalTag} 
        title   = "Tambahkan ke Tag" 
        setShow = {() => {setShowModalTag(!showModalTag)}}
      >
        <AddToTags 
          tags    = {tags} 
          onClose = {() => {setShowModalTag(!showModalTag)}}
        />
      </ModalBase>

      <FormDelete
        show        = {showDeleteForm}
        title       = {`Hapus ${props.data.mime ? "File" : "Folder"}`}
        setShow     = {(par) => setShowDeleteForm(par)}
        loading     = {loading} 
        onDelete    = {onDelete}
        description = {`${props.data.mime ? "File" : "Folder"} ${props.data.name}`}
      />

      <UncontrolledDropdown direction='right'>
        <div id="aksi-file">
          <DropdownToggle 
            tag   = 'div' 
            color = ''
          >
            <MoreHorizontal 
              size      = {20} 
              className = 'mr-1'
            />
          </DropdownToggle>
        </div>

        <DropdownMenu>
          {
            getRoleByMenuStatus('File Manajemen', 'favorite') ? 
              favIcon()
            : null
          }
          {
            getRoleByMenuStatus('File Manajemen', 'detail') ? 
              <DropdownItem 
                tag     = 'a' 
                onClick = {() => {seeDetail()}}
              >
                <Info size={14}/>&nbsp;Lihat Detail
              </DropdownItem>
            :  null
          }
          {
            getRoleByMenuStatus('File Manajemen', 'rename') ? 
              <DropdownItem 
                tag     = 'a' 
                onClick = {() => {toggleModal()}}
              >
                <Edit size={14}/>&nbsp;Ubah Nama
              </DropdownItem>
            : null
          }
          {
            getRoleByMenuStatus('File Manajemen', 'move') ? 
              <DropdownItem tag='a'>
                <Folder size={14}/>&nbsp;Pindah ke Folder Lain
              </DropdownItem>
            : null
          }
          {
            getRoleByMenuStatus('File Manajemen', 'add_to_tag') ? 
              props.data.tags ?
                <DropdownItem
                  tag     = 'a'
                  onClick = {() => {deleteFileFromTag()}}
                >
                  <Tag size={14}/>&nbsp;Hapus dari Tag
                </DropdownItem>
              :
                <DropdownItem
                  tag     = 'a'
                  onClick = {() => {
                    setShowModalTag(!showModalTag)
                    setDataSelected(props.data)
                  }}
                >
                  <Tag size={14} />&nbsp;Tambah Ke Tag
                </DropdownItem>
            : null
          }
          {
            getRoleByMenuStatus('File Manajemen', 'download') ? 
              <DropdownItem 
                tag     = 'a' 
                onClick = {() => {download()}}
              >
                <Download size={14}/>&nbsp;Unduh
              </DropdownItem>
            : null
          }
          {
            getRoleByMenuStatus('File Manajemen', 'delete') ? 
              <DropdownItem 
                tag     = 'a' 
                onClick = {() => {setShowDeleteForm(true)}}
              >
                <Trash size={14}/> Hapus
              </DropdownItem>
            : null
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );
};