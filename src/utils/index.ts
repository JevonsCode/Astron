import Taro from "@tarojs/taro";

export function RequestPost(data) {
    return Taro.request({
        url: "https://astron.db.jevons.xyz/" + data,
        data: {
            optionChoose: "F",
            findData: ""
        },
        method: "POST",
        header: {
            "content-type": "application/json"
        }
    });
//   .then((res) => {
//       console.log("res.data",res.data);
//   });
}
export function RequestGet(path:string, data?:object) {
    return Taro.request({
        url: `https://astron.db.jevons.xyz/${path}`,
        header: {
            "content-type": "application/json"
        },
        data
    });
}

// test
export function RequestGetTest(path:string, data?:object) {
    return Taro.request({
        url: `http://127.0.0.1:727/${path}`,
        header: {
            "content-type": "application/json"
        },
        data
    });
}

