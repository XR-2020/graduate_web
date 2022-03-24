import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllJiaoYuGuiHua = query => {
    return request({
        url: '/getAllJiaoYuGuiHua',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchJiaoYuGuiHua = query => {
    return request({
        url: '/getSearchJiaoYuGuiHua',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteJiaoYuGuiHua = query => {
    return request({
        url: '/deleteJiaoYuGuiHua',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneJiaoYuGuiHua = query => {
    return request({
        url: '/deleteOneJiaoYuGuiHua',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getSearchJiaoYuGuiHuaDetail = query => {
    return request({
        url: '/getChanXueYanDetail',
        method: 'get',
        params: query
    });
};
export const updateJiaoYuGuiHua = query => {
    return request({
        url: '/updateJiaoYuGuiHua',
        method: 'post',
        params: query
    });
};
