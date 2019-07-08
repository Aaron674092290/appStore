

//定义常量
export const SEARCH_HOT = 'SEARCH_HOT'
export const SEARCH_RESULT = 'SEARCH_RESULT'
export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT'

//actionCreator,这里是一个函数，返回action对象
const searchHot = (obj) => {return {type:SEARCH_HOT, obj}}
const searchResult = (obj) => {return {type:SEARCH_RESULT, obj}}
const clearSearchResult = (obj) => {return {type:CLEAR_SEARCH_RESULT, obj}}
const isExist = (str,keyword) => {return str.indexOf(keyword)!=-1}
import appListData from "@/assets/appListData.json"
//搜索热门关键字
export function searchHotAPI(){
	return async dispatch => {
		try{
			let hots = await {data:123};
			dispatch(searchHot(hots.data));
		} catch(error) {
			console.log(error);
		}
	}
}
//搜索热门关键字
export function clearSearchResultAPI(){
    return async dispatch => {
		try {
			dispatch(clearSearchResult([]));
		} catch(error) {
			console.log(error);
		}
	}
}

//通过关键字搜索
export function searchResultAPI(keyword,page){
	return async dispatch => {
		try {
			let result = await appListData.feed.entry.filter(element => {
                return (isExist(element['im:name'].label,keyword) || isExist(element['category']['attributes'].label,keyword || isExist(element['summary'].label,keyword) ))
            });
            console.log(result)
			dispatch(searchResult(result));
		} catch(error) {
			console.log(error);
		}
	}
}

