import { observable } from "mobx";
import Taro from "@tarojs/taro";

const counterStore = observable({
    counter: 0,
});

export default counterStore;
