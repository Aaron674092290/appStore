/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '';
if(process.env.NODE_ENV === 'development'){
  baseURL = 'https://itunes.apple.com';
}else{
  baseURL = 'https://itunes.apple.com';
}


export default {imgUrl, baseURL}