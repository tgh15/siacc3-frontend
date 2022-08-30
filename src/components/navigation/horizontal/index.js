
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
import reportCommunity      from '../publicReport'

let menu = JSON.parse(localStorage.getItem('menu'));

let menu_ = [];

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

  if(data.label === "File Manajemen" && data.is_active === true){
    menu_.push(...fileManagement);
  }

  if(data.label === "Konfigurasi" && data.is_active === true){
    menu_.push(...configuration);
  }

  if(data.label === "Draft" && data.is_active === true){
    menu_.push(...draft);
  }

});

export default menu_;
