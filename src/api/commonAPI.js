import request from '../utils/request';

// ---------------------------------------- 查询产学研数据
export const getTeacherList = query => {
    return request({
        url: '/getTeacherList',
        method: 'get',
        params: query
    });
};
export const crawlerWebSite = query => {
    return request({
        url: '/crawlerWebSite',
        method: 'get',
        params: query
    });
};
export const getChanXueYanMetails = query => {
    return request({
        url: '/getChanXueYanMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getJiaoYanMetails = query => {
    return request({
        url: '/getJiaoYanMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getJiaoYanLunWenMetails = query => {
    return request({
        url: '/getJiaoYanLunWenMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getPingGuZhongXinMetails = query => {
    return request({
        url: '/getPingGuZhongXinMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getJiaoYuGuiHuaMetails = query => {
    return request({
        url: '/getJiaoYuGuiHuaMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getZhuanLiMetails = query => {
    return request({
        url: '/getZhuanLiMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getHengXiangKeYanMetails = query => {
    return request({
        url: '/getHengXiangKeYanMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getZongXiangKeYanMetails = query => {
    return request({
        url: '/getZongXiangKeYanMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getZhuZuoMetails = query => {
    return request({
        url: '/getZhuZuoMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getKeYanLunWenMetails = query => {
    return request({
        url: '/getKeYanLunWenMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getRuanJianZhuZuoMetails = query => {
    return request({
        url: '/getRuanJianZhuZuoMetails',
        method: 'get',
        responseType:'arraybuffer',
        params: query
    });
};
export const getKeYanXiangMuJieXiangMetails = query => {
    return request({
        url: '/getKeYanXiangMuJieXiangMetails',
        method: 'get',
        responseType:'arraybuffer',
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
export const passChanXueYan = query => {
    return request({
        url: '/passChanXueYan',
        method: 'post',
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
export const passKeYanXiangMuJieXiang = query => {
    return request({
        url: '/passKeYanXiangMuJieXiang',
        method: 'post',
        params: query
    });
};
export const passRuanJianZhuZuo = query => {
    return request({
        url: '/passRuanJianZhuZuo',
        method: 'post',
        params: query
    });
};
export const passKeYanLunWen = query => {
    return request({
        url: '/passKeYanLunWen',
        method: 'post',
        params: query
    });
};
export const passZhuZuo = query => {
    return request({
        url: '/passZhuZuo',
        method: 'post',
        params: query
    });
};
export const passZongXiangKeYan = query => {
    return request({
        url: '/passZongXiangKeYan',
        method: 'post',
        params: query
    });
};
export const passHengXiangKeYan = query => {
    return request({
        url: '/passHengXiangKeYan',
        method: 'post',
        params: query
    });
};
export const passZhuanLi = query => {
    return request({
        url: '/passZhuanLi',
        method: 'post',
        params: query
    });
};
export const passJiaoYuGuiHua = query => {
    return request({
        url: '/passJiaoYuGuiHua',
        method: 'post',
        params: query
    });
};
export const passPingGuZhongXin = query => {
    return request({
        url: '/passPingGuZhongXin',
        method: 'post',
        params: query
    });
};
export const passJiaoYanLunWen = query => {
    return request({
        url: '/passJiaoYanLunWen',
        method: 'post',
        params: query
    });
};
export const passJiaoYan = query => {
    return request({
        url: '/passJiaoYan',
        method: 'post',
        params: query
    });
};
export const editHeBing = query => {
    return request({
        url: '/editHeBing',
        method: 'post',
        data: query
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
