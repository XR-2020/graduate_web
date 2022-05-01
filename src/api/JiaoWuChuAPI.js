import request from '../utils/request';


export const insertJiaoWuChu = query => {
    return request({
        url: '/insertJiaoWuChu',
        method: 'post',
        data: query
    });
};
