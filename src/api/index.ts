
import { RequestGet, RequestGetTest } from "@/utils/index";

/**
 * @desc get 获取 news 数据
 */
export function obtainNews() {
    return RequestGet("astron/astron_news_data");
}

/**
 * @desc get 获取 news 数据
 */
export function obtainStars() {
    return RequestGet("astron/astron_stars_data");
}

/**
 * WeChat 登录
 */
export function weChat_login(data:object) {
    return RequestGetTest("astron/astron_login_wx", data);
}

/**
 * WeChat 登录
 */
export function collections_find(data:object) {
    return RequestGetTest("astron/astron_collections_find", data);
}

/**
 * collect add
 */
export function collections_add(data:object) {
    return RequestGetTest("astron/astron_collections_add", data);
}

/**
 * @param collections
 * @return 对应 news
 */
export function collections_which(data:object) {
    return RequestGetTest("astron/astron_collections_which", data);
}

