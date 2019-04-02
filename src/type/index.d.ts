
export interface INewItem {
    id: number, // 生成唯一值 news[n].id = `${Date.now()}${Math.floor(Math.random()*10000)}`
    title: string,
    content: string,
    pictures: string[]
}

export interface IUser {
    id: number, // 生成添加唯一值
    name: string,
    stars: IStars
}

interface IStars {
    news: number[], // 添加方法：unshift；内容：news[n].id
    name: string, 
}
