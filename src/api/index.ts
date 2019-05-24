
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
