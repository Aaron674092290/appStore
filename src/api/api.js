import Server from './server';

class API extends Server{

  /**
   *  用途：获取list列表
   *  @url https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json
   *  @method get
   *  @return {promise}
   */
  async getList(params = {}){
    try{
      // let result = await this.axios('get', '/hk/rss/topfreeapplications/limit=100/json'); 
      let result = await this.axios('get', '/hk/rss/topfreeapplications/limit=100/json'); 
      if(result && (result.data instanceof Object) && result.http_code === 200){
        return result.data;
      }else{
        let err = {
          tip: '获取记录数据失败',
          response: result,
          data: params,
          url: '/hk/rss/topfreeapplications/limit=100/json',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API();