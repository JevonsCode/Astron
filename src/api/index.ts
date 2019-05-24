
import { RequestGet } from "@/utils/index";

/**
 * @desc get 获取 news 数据
 */
export function obtainNews() {
    return RequestGet("astron_news_data");
}

/**
 * @desc get 获取 news 数据
 */
export function obtainStars() {
    return RequestGet("astron_stars_data");
}

/**
 * WeChat 登录
 */
export function weChat_login(data:object) {
    return RequestGet("astron_login_wx", data);
}
