import ajax from './ajax'
// 注册
export const reqUserRegister = (userInfo) => {
    return ajax({
        url: '/user/register',
        method: 'post',
        data: userInfo
    })
}

// 登录
export const reqUserLogin = (userInfo) => {
    return ajax({
        url: '/user/login',
        method: 'post',
        data: userInfo
    })
}

// 发布订单
export const reqOrderAdd = (orderInfo) => {
    return ajax({
        url: '/order/add',
        method: 'post',
        data: orderInfo
    })
}
// 接收订单
export const reqOrderReceive = (orderId) => {
    return ajax({
        url: '/order/receive',
        method: 'post',
        data: orderId
    })
}

// 取消接单
export const reqOrderCancel = (orderId) => {
    return ajax({
        url: '/order/cancel',
        method: 'post',
        data: orderId
    })
}



// 完成订单
export const reqOrderPay = (payInfo) => {
    return ajax({
        url: '/order/pay',
        method: 'post',
        data: payInfo
    })
}

// 显示订单
export const reqOrderShow = (orderShowInfo) => {
    return ajax({
        url: '/order/show',
        method: 'post',
        data: orderShowInfo
    })
}

// 显示接单
export const reqOrderDone = (orderDoneInfo) => {
    return ajax({
        url: '/order/done',
        method: 'post',
        data: orderDoneInfo
    })
}
// 显示我发布的订单
export const reqOrderPush = (orderPushInfo) => {
    return ajax({
        url: '/order/push',
        method: 'post',
        data: orderPushInfo
    })
}

// 删除订单
export const reqOrderDel = (orderDelInfo) => {
    return ajax({
        url: '/order/del',
        method: 'post',
        data: orderDelInfo
    })
}

// 显示用户信息
export const reqUserInfo = () => {
    return ajax({
        url: '/user/info',
        method: 'get',
    })
}


// 修改用户信息
export const reqUserUpdate = (userInfo) => {
    return ajax({
        url: '/user/update',
        method: 'post',
        data: userInfo
    })
}
export const reqPasswordUpdate = (password) => {
    return ajax({
        url: '/user/password',
        method: 'post',
        data: password
    })
}


// 密码验证
export const reqPasswordCheck = (password) => {
    return ajax({
        url: '/user/check',
        method: 'post',
        data: password
    })
}



// 添加招聘信息
export const reqRecruitAdd = (RecruitInfo) => {
    return ajax({
        url: '/recruit/add',
        method: 'post',
        data: RecruitInfo
    })
}

// 删除招聘信息
export const reqRecruitDel = (RecruitId) => {
    return ajax({
        url: '/recruit/del',
        method: 'post',
        data: RecruitId
    })
}

// 显示招聘信息
export const reqRecruitShow = (RecruitInfo) => {
    return ajax({
        url: '/recruit/show',
        method: 'post',
        data: RecruitInfo
    })
}
// 修改招聘信息
export const reqRecruitUpdate = (RecruitInfo) => {
    return ajax({
        url: '/recruit/update',
        method: 'post',
        data: RecruitInfo
    })
}


// 积分兑换奖品展示
export const reqGoodsShow = (goodsInfo) => {
    return ajax({
        url: '/goods/show',
        method: 'post',
        data: goodsInfo
    })
}


// 积分兑换奖品
export const reqGoodsExchange = (goodsId) => {
    return ajax({
        url: '/goods/exchange',
        method: 'post',
        data: goodsId
    })
}



