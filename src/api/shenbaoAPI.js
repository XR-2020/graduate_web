import request from '../utils/request';

export const getAllWaiting = query => {
    return request({
        url: '/getAllWaiting',
        method: 'get',
        params: query
    });
};
