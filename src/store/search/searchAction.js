import * as TYPES from "./type";
// import { listPatients,getPatient } from "../graphql/queries";
// import { graphqlOperation, API } from "aws-amplify";
import appListData from "@/assets/appListData.json"
import recomendData from "@/assets/recomendData.json"
const isExist = (str,keyword) => {return str.toUpperCase().indexOf(keyword.toUpperCase())!=-1}
let filterListData=[],filterRecomendData
export function getPatientInfo(self){
  return dispatch=>{
    let keyword = self.state.sirenId
    filterListData = appListData.feed.entry.filter(element => {
        return (isExist(element['im:name'].label,keyword) || isExist(element['category']['attributes'].label,keyword || isExist(element['summary'].label,keyword) ))
    });
    filterRecomendData = recomendData.feed.entry.filter(element => {
        return (isExist(element['im:name'].label,keyword) || isExist(element['category']['attributes'].label,keyword || isExist(element['summary'].label,keyword) ))
    });
    dispatch(changeSearchListState({filterListData,filterRecomendData}));
  };
}
 
function changeSearchListState(filterData){
  return{
    type: TYPES.SEARCH_LIST,
    text: filterData
  }
}
