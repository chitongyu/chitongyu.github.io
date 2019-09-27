/*
 * @Author: Huanghao
 * @Date: 2019-09-09 21:39:41
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-16 21:19:49
 * @Description: 
 */
function formatMoney(value) {
    if (value) {
        value = Number(value);
        return '￥ ' + value.toFixed(2);
    }
};

function statusName(val) {
    let statusName = '';
    switch (val) {
        case 0: {
            statusName = '已取消';
            break;
        }
        case 10: {
            statusName = '未付款';
            break;
        }
        case 20: {
            statusName = '已付款';
            break;
        }
    }
    return statusName;
};
//组织类型
function orgType(val) {
    let str = '';
    switch (val) {
        case '1': {
            str = '部门';
            break;
        }
        case '2': {
            str = '班组';
            break;
        }
        default:
            str = val;
    }
    return str;
};
//任务状态 
function taskStatus(val) {
    let str = '';
    switch (val) {
        case 0: {
            str = '未开始';
            break;
        }
        case 1: {
            str = '进行中';
            break;
        }
        case 2: {
            str = '已完成';
            break;
        }
        case 3: {
            str = '已关闭';
            break;
        }
        case 4: {
            str = '已延期';
            break;
        }
        default:
            str = val;
    }
    return str;
};
export default {
    formatMoney,
    statusName,
    orgType,
    taskStatus
}