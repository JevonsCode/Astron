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
export function RequestGet(path) {
    return Taro.request({
        url: `https://astron.db.jevons.xyz/${path}`,
        header: {
            "content-type": "application/json"
        }
    });
}

