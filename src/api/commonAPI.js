import request from '../utils/request';

export const getTeacherList = query => {
    return request({
        url: '/getTeacherList',
        method: 'get',
        params: query
    });
};
export const getXueKeJingSaiMetails = query => {
    return request({
        url: '/getXueKeJingSaiMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getRongYuChengHaoMetails = query => {
    return request({
        url: '/getRongYuChengHaoMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};

export const passRongYuChengHao = query => {
    return request({
        url: '/passRongYuChengHao',
        method: 'post',
        params: query
    });
};
export const passXueKeJingSai = query => {
    return request({
        url: '/passXueKeJingSai',
        method: 'post',
        params: query
    });
};
export const selectProject = query => {
    return request({
        url: '/selectProject',
        method: 'get',
        params: query
    });
};
export const login = query => {
    return request({
        url: '/login',
        method: 'get',
        params: query
    });
};
