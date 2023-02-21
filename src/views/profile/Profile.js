//css
import './profile.css';

//Image
import Helper                 from '../../helpers';
import DefaultAvatar          from '@src/assets/images/logo/user.png';
import logoKejaksaan          from '@src/assets/images/logo/logo-kejaksaan.png';
import IdentificationQrcode   from '../../components/widgets/identification-qrcode/identificationQrcode';

const CardProfile = (props) => {

   return (        
      <div className="ant-card ant-card-bordered emp-card border-non text-center">
         <div 
            style       = {{padding: '10px 10px 0px'}}
            className   = "ant-card-body" 
         >
            <div 
               style       = {{width: '60px'}}
               className   = "ant-image" 
            >
               <img 
                  alt         = "logo" 
                  src         = {logoKejaksaan}
                  className   = "ant-image-img logo-kejaksaan" 
               />
            </div>
            <div className="ant-card ant-card-bordered emp-card-profile">
               <div className="ant-card-body">
                  <p className="m-0 pt-2">
                     KEJAKSAAN AGUNG RI
                  </p>
                  <p 
                     style       = {{fontSize: '18px'}}
                     className   = "m-0 text-bold" 
                  >
                     {props.employeeDetail.name}
                  </p>
                  <p className="pb-2">
                     NIP : {props.employeeDetail.identity_id}
                  </p>
               </div>
            </div>
               <img 
                  alt         = "profile" 
                  src         = {props.employeeDetail.photo != "" ? props.employeeDetail.photo : DefaultAvatar}
                  style       = {{'height': '150px', 'width': '150px'}} 
                  className   = "rounded"
                  onError     = {Helper.fallbackImage_}
               />
            <div className="text-center mt-3 mb-2">
               <h5 className="m-0 f-2 font-weight-bolder">
                  {props.employeeDetail.workunit}
               </h5>
               <h5 className="text-bold f-2 font-weight-bolder">
                  {props.employeeDetail.sector}
               </h5>
            </div>

            {/* QR Code */}
            <IdentificationQrcode
               width       = "140px"
               uuid_user   = {Helper.getUserData().uuid_user} 
            />
            <div className="ant-card ant-card-bordered emp-card-profile">
               <div 
                  style       = {{padding: '10px'}}
                  className   = "ant-card-body" 
               ></div>
            </div>
            <br/>
         </div>
      </div>
   );
};

export default CardProfile;