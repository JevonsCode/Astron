import { observable } from "mobx";

const whichNews = observable({
    params: {},
    news: []
});

export default whichNews;
