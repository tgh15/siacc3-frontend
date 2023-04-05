import gis                  from '../gis'
import draft                from '../draft'
import report               from '../report'
import beranda              from '../beranda'
import analysis             from '../analysis'
import dashboard            from '../dashboard'
import savedNews            from '../savedNews'
import performance          from '../performance'
import crawlingdata         from '../crawlingdata'
import approvalNews         from '../approvalNews'
import publicReport         from '../publicReport'
import popularTopic         from '../popularTopic'
import configuration        from '../configuration'
import fileManagement       from '../fileManagement'
import voiceVideoCall       from '../voiceVideoCall'
import videoStreaming       from '../videoStreaming'
import videoTutorial        from '../videoTutorial'
import reportCommunity      from '../publicReport'

let menuText  = localStorage.getItem('menu');
let menu      = JSON.parse(menuText);
let menu_     = [];

menu != undefined && menu.map((data) => {
  if(data.label === "Beranda"  && data.is_active === true){

    menu_.push(...beranda);
  }

  if(data.label === "Topik Populer" && data.is_active === true){
    menu_.push(...popularTopic);
  }

  if(data.label === "Dashboard" && data.is_active === true){
    menu_.push(...dashboard);
  }
  
  if(data.label === "GIS" && data.is_active === true){
    menu_.push(...gis);
  }

  if(data.label === "Crawling Data" && data.is_active === true){
    menu_.push(...crawlingdata);
  }

  if(data.label === "Performance" && data.is_active === true){
    menu_.push(...performance);
  }

  if(data.label === "Daftar Persetujuan Berita" && data.is_active === true){
    menu_.push(...approvalNews);
  }

  if(data.label === "Laporan Masyarakat" && data.is_active === true){
    menu_.push(...publicReport);
  }

  if(data.label === "Berita Tersimpan" && data.is_active === true){
    menu_.push(...savedNews);
  }

  if(data.label === "Analisis" && data.is_active === true){
    menu_.push(...analysis);
  }

  if(data.label === "Laporan" && data.is_active === true){
    menu_.push(...report);
  }
  
  if((data.label === "List Draft" || data.label === "Draft") && data.is_active === true){
    menu_.push(...draft);
  }

  if(data.label === "Voice dan Video Call" && data.is_active === true){
    menu_.push(...voiceVideoCall);
  }

  if(data.label === "File Manajemen" && data.is_active === true){
    menu_.push(...fileManagement);
  }

  if(data.label === "Siaran Langsung" && data.is_active === true){
    menu_.push(...videoStreaming);
  }

  if(data.label === "Konfigurasi" && data.is_active === true){
    menu_.push(...configuration);
  }

});

export default menu_;