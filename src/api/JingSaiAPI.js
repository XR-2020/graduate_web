import request from '../utils/request';
import qs from "qs";

// ---------------------------------------- 查询产学研数据
export const getAllJingSai= query => {
    return request({
        url: '/getAllJingSai',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchJingSai = query => {
    return request({
        url: '/getSearchJingSai',
        method: 'get',
        params: query
    });
};
//批量删除
export const deleteJingSai = query => {
    return request({
        url: '/deleteJingSai',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
//删除一个产学研
export const deleteOneJingSai = query => {
    return request({
        url: '/deleteOneJingSai',
        method: 'post',
        params: query
    });
};
//查看某个项目的参与人信息
export const getJingSaiDetail = query => {
    return request({
        url: '/getJingSaiDetail',
        method: 'get',
        params: query
    });
};

export const insertCompetition = query => {
    return request({
        url: '/insertCompetition',
        method: 'post',
        params: query
    });
};
export const updateCompetition = query => {
    return request({
        url: '/updateCompetition',
        method: 'post',
        data: query
    });
};
export const editCompetition = query => {
    return request({
        url: '/editCompetition',
        method: 'post',
        data: query
    });
};

