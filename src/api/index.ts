
import { RequestGet } from "@/utils/index";

/**
 * @desc get 获取 news 数据
 */
export function obtainNews() {
    return RequestGet("astron_news_data");
}
