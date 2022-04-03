import request from '../utils/request';

export const updateHeBing = query => {
    return request({
        url: '/updateHeBing',
        method: 'post',
        data: query
    });
};
