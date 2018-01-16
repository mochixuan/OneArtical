const BASE_URL = "https://interface.meiriyiwen.com/article/"

//今日文章
const today_articel = BASE_URL+"today?dev=1"
//特定文章
const specified_articel = BASE_URL+"day?dev=1&date="
//随机文章
const random_articel = BASE_URL+"random?dev=1"

const opts = {
    method: 'GET',
    headers: {
        //'Accept': 'application/json',
        //表单
        //'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0'  //坑啊，花了三小时,提示服务端，我是网页端(骗他) //https://zhidao.baidu.com/question/1767408752449075980.html
    },
    //body: formData
}

const getArticle = (url) => {
    return fetch(url,opts)
        .then( response => response.json())
        .then(data => data)
        .catch(error => error)
}

const getTodayArticle = ()=> getArticle(today_articel)

const getSpecifiedArticle = (date)=> getArticle(specified_articel+date)

const getRandomArticle = ()=> getArticle(random_articel)

export {getTodayArticle,getSpecifiedArticle,getRandomArticle}