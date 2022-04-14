import request from '../utils/request';

export const updateHeBing = query => {
    return request({
        url: '/updateHeBing',
        method: 'post',
        data: query
    });
};
export const getAllWaiting = query => {
    return request({
        url: '/getAllWaiting',
        method: 'get',
        params: query
    });
};
export const newUpdateHeBing = query => {
    return request({
        url: '/newUpdateHeBing',
        method: 'post',
        data: query
    });
};
