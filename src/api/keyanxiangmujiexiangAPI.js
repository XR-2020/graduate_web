import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllKeYanXiangMuJieXiang = query => {
    return request({
        url: '/getAllKeYanXiangMuJieXiang',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchKeYanXiangMuJieXiang = query => {
    return request({
        url: '/getSearchKeYanXiangMuJieXiang',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteKeYanXiangMuJieXiang = query => {
    return request({
        url: '/deleteKeYanXiangMuJieXiang',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneKeYanXiangMuJieXiang = query => {
    return request({
        url: '/deleteOneKeYanXiangMuJieXiang',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getKeYanXiangMuJieXiangDetail = query => {
    return request({
        url: '/getKeYanXiangMuJieXiangDetail',
        method: 'get',
        params: query
    });
};
