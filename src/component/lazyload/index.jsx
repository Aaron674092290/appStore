import React from 'react';

export default class Lazyload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            scrollHeight: 0,
            hasMore: true,// 判断接口是否还有数据，通过接口设置
            dataList:[], // 数据列表
        }
    }

    componentDidMount(){
        this.setState({
            scrollHeight: window.innerHeight - this.header.clientHeight
        })
    }

    // 处理滚动监听
    handleScroll(){
        const {hasMore} = this.state;
        if(!hasMore){
            return;
        }
        //下面是判断页面滚动到底部的逻辑
        if(this.scrollDom.scrollTop + this.scrollDom.clientHeight >= this.scrollDom.scrollHeight){
            this.fetchData()
        }
    }

    fetchData(){
        // 接口调用数据字段
        //传入的参数包括但不限于：pageIndex， pageSize。。。
        // 获取后更新的数据包括但不限于：dataList，hasMore。。。
    }

    render(){
        const {scrollHeight} = this.state;

        return (
            <div className='wrapper'>
                <div
                ref={body=>this.scrollDom = body} 
                className='scroll-body' 
                style={{height: scrollHeight}}
                onScroll={this.handleScroll.bind(this)}
                >
                </div>
            </div>
        )
    }
}
