import request from '../utils/request';


export const insertSheKeChu = query => {
    return request({
        url: '/insertSheKeChu',
        method: 'post',
        data: query
    });
};
export const editSheKeChu = query => {
    return request({
        url: '/editSheKeChu',
        method: 'post',
        data: query
    });
};
export const getAllSheKeChu = query => {
    return request({
        url: '/getAllSheKeChu',
        method: 'get',
        params: query
    });
};
//产学研关键词全局查询
export const getSearchSheKeChu = query => {
    return request({
        url: '/getSearchSheKeChu',
        method: 'get',
        params: query
    });
};
export const deleteSheKeChu = query => {
    return request({
        url: '/deleteSheKeChu',
        method: 'post',
        params: query,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
};
//删除一个产学研
export const deleteOneSheKeChu = query => {
    return request({
        url: '/deleteOneSheKeChu',
        method: 'post',
        params: query
    });
};
export const getSheKeChuDetail = query => {
    return request({
        url: '/getSheKeChuDetail',
        method: 'get',
        params: query
    });
};
export const getSheKeChuDetailBadge = query => {
    return request({
        url: '/getSheKeChuDetailBadge',
        method: 'get',
        params: query
    });
};
export const passSheKeChuChu = query => {
    return request({
        url: '/passSheKeChuChu',
        method: 'post',
        params: query
    });
};
export const getSheKeChuMetails = query => {
    return request({
        url: '/getSheKeChuMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
