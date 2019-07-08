import React from 'react';
import API from '@/api/api';
import appListData from "@/assets/appListData.json"
import recomendData from "@/assets/recomendData.json"
import lookUp from "@/assets/lookUp.json"
import Loading from "@/component/loading"

import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import { getPatientInfo } from "@/store/search/searchAction.js";
import "./home.less";

class Home extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            appList: appListData.feed.entry.slice(0, 100),
            currentPageData: [],
            curPage: 1,
            pageSize: 10,
            recomendData: recomendData.feed.entry.slice(0, 10),
            lookUp: lookUp.results[0],

            hasMore: true,// 判断接口是否还有数据，通过接口设置
            loaded: true,  //本地加載是否已完成
            sirenId: "",   //搜索关键词
            cancelIcon:false   //搜索图片

        }
        this.textInput = React.createRef();
    }
    // initializeTouchEvents(){
    //     return (true);
    // }
   async scrollIntoView(){
       await this.setState({
            // cancelIcon:true
        })
        this.main.scrollIntoView()
    }
    async loseFocus(){
        if(this.input.value==''){
            await this.setState({
                cancelIcon:false
            })
        }
        this.input.blur()
    }
    async clearInput(){
        this.input.value = ''
        await this.setState({
            cancelIcon:false
        })
        this.input.focus()
        this.restoreData()
        
    }
    /**
    * 执行搜索操作，清空输入框恢复原来的数据
    */
    async handleSearchItemsChange(event) {
        event.persist();
        if (event.target.value != '') {
            await this.setState({
                cancelIcon:true,
                sirenId: event.target.value,
                curPage: 2,
                hasMore: true,
                loaded: false
            });
            const { getPatientInfo } = this.props;
            getPatientInfo(this)

        } else {
            this.setState({
                cancelIcon:false
            })
            this.restoreData()
        }

    }
    /**
   * 恢复之前备份的数据
   */
    async restoreData() {
        await this.setState({
            appList: appListData.feed.entry.slice(0, 100),
            currentPageData: appListData.feed.entry.slice(0, 10),
            curPage: 2,
            hasMore: true,
            recomendData: recomendData.feed.entry.slice(0, 10)
        })
    }

    /**
    * 获取app列表，调接口用这个，但是此demo接口报错拿不到数据
    */
    async getList() {
        try {
            let result = await API.getList();
            this.setState({ appList: result.data || [] })

        } catch (err) {
            throw (err);
        }
    }
    componentDidMount() {
        sessionStorage.setItem('appList', JSON.stringify(this.state.appList))
        this.fetchData()
    }
    async fetchData() {
        // 接口调用数据字段
        //传入的参数包括但不限于：pageIndex， pageSize。。。
        // 获取后更新的数据包括但不限于：dataList，hasMore。。。
        let curPage = this.state.curPage;
        await this.setState({
            loaded: true
        })
        let pushDate = this.state.appList.slice((curPage - 1) * 10, 10 * curPage)
        await setTimeout(() => { //模擬請求數據
            this.setState({
                currentPageData: [...this.state.currentPageData, ...pushDate],
                curPage: this.state.curPage + 1,
            }, () => {
                this.setState({
                    loaded: false
                })
            })
        }, 500);

        if (this.state.curPage >= Math.ceil(this.state.appList.length / 10) + 1) {
            this.setState({
                hasMore: false,
                // loaded: false
            })
        }


    }
    componentWillReceiveProps(nextprops) {
        this.setState({
            currentPageData: nextprops.listData.length > 10 ? nextprops.listData.slice(0, 10) : nextprops.listData,
            appList: nextprops.listData,
            recomendData: nextprops.recomendData
        })

    }
   

    render() {
        return (
            <div className='scrollBody' ref={ref=>this.main=ref}>
                <header className='border-bottom'>
                    {!this.state.cancelIcon && <img src={require("../../images/search.svg")} alt="" className='searchIcon' />}
                    <input onInput={this.handleSearchItemsChange.bind(this)} ref={ref=>this.input=ref} onFocus={this.scrollIntoView.bind(this)} className='search' placeholder='搜尋' />
                    { this.state.cancelIcon && <img src={require("../../images/close.svg")} className='cancelIcon' onClick={this.clearInput.bind(this)} alt=""/>}
                </header>
                <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={this.fetchData.bind(this)}
                    hasMore={!this.state.loaded && this.state.hasMore}
                    onTouchStart={this.loseFocus.bind(this)}
                >

                    <div className="x-scrollView border-bottom">
                        {this.state.recomendData.length > 0 && <div className="recomend">推介</div>}

                        <div className="scrollCont">
                            {this.state.recomendData.map((element, index) => {
                                return (
                                    <div className="scrollItem" key={index}>
                                        <img src={element['im:image'][2].label} className='appImg' alt="" />
                                        <p className='appName'>{element['im:name'].label}</p>
                                        <p className='appType'>{element['category']['attributes'].label}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="y-scrollView" >
                        {this.state.currentPageData.map((element, i) => {
                            return (
                                <div className="scrollItem border-bottom" key={i}>
                                    <div className="index">{i + 1}</div>
                                    <img className={(i + 1) & 1 ? "oddImg" : 'evenImg'} src={element['im:image'][2].label}></img>
                                    <div className="appDec">
                                        <p className='appName'>{element['im:name'].label}</p>
                                        <p className='appType'>{element['category']['attributes'].label}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {this.state.loaded && this.state.hasMore && <Loading className="loading"></Loading>}
                    {(!this.state.hasMore || this.state.appList.length <= 10) && <div className="nomore">沒有更多數據了！</div>}
                </InfiniteScroll>
            </div>

        )
    }
}
const mapStateToProp = state => {
    return ({ data: console.log(state.reducers.listData), listData: state.reducers.listData, recomendData: state.reducers.recomendData })
}
const mapDispatchToProp = dispatch => ({
    getPatientInfo: (self) => dispatch(getPatientInfo(self))
});
export default connect(
    mapStateToProp,
    mapDispatchToProp
)(Home);
