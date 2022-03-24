import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getAllRongYu= query => {
    return request({
        url: '/getAllRongYu',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchRongYu = query => {
    return request({
        url: '/getSearchRongYu',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteRongYu = query => {
    return request({
        url: '/deleteRongYu',
        method: 'post',
        params: query
    });
};
//删除一个产学研
export const deleteOneRongYu = query => {
    return request({
        url: '/deleteOneRongYu',
        method: 'post',
        params: query
    });
};
//批量导入
export const insertHonor = query => {
    return request({
        url: '/insertHonor',
        method: 'post',
        params: query
    });
};
//申报添加
export const updateHonor = query => {
    return request({
        url: '/updateHonor',
        method: 'post',
        params: query
    });
};
