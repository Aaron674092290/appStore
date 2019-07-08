import * as TYPES from "./type";
import appListData from "@/assets/appListData.json"
const initialState = {

};
 
export default function patientsList(state = initialState, action) {
  switch (action.type) {
    case TYPES.SEARCH_LIST:
      return {
        listData: action.text.filterListData,
        recomendData: action.text.filterRecomendData
      }
    default:
      return state;
  }
}