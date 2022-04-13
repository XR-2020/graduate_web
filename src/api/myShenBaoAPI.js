import request from '../utils/request';

export const getDisData = query => {
    return request({
        url: '/getDisData',
        method: 'get',
        params: query
    });
};

export const getHadPassData = query => {
    return request({
        url: '/getHadPassData',
        method: 'get',
        params: query
    });
};

export const getDaiShenHeData = query => {
    return request({
        url: '/getDaiShenHeData',
        method: 'get',
        params: query
    });
};
