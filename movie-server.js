const express=require("express");
//간단한 서버를 제작할 때 주로 express 사용

const request=require("request");
//다른 사이트 서버를 연결해서 데이터 읽을 때 사용

const app=express();
//서버 생성하기 -> 클라이언트가 접속할 때 까지 그냥 접속상태(listen)로 생성

const port=3355;
//port => 0~65535 까지 사용가능. 0~1023은 사용중인 포트. 나머지 중에서 임의 지정하여 사용 가능.
//리액트 포트는 3000
//3355와 충돌방지를 위해 아래 코드 추가
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//listen : 서버 대기상태
app.listen(port, ()=>{
    console.log("Server Start...", "http://localhost:3355")
})

app.get("/", (request, response)=>{
    response.send("Hello Node Server!!")
})

//mogodb 연결
/*
* mongodb => NoSql
*
* find() => SELECT * FROM movie
* find({mno:1}) => SELECT * FROM movie WHERE mno=1
* */
const Client=require("mongodb").MongoClient;

app.get("/movie_real2",(req, res)=>{
    //url
    var page=req.query.page;
    var rowSize=12;
    var skip=(page-1)*rowSize;
    /*
    * 1 page => skip 0
    * 2 page => skip 12
    * 3 page => skip 24
    * */
    var url="mongodb://211.238.142.181:27017";
    Client.connect(url, (err, client)=>{
        var db=client.db("mydb");
        db.collection("movie").find({cateno:1}).skip(skip).limit(rowSize)
            .toArray(function (err, docs) {
                res.json(docs);
            client.close();
        })
    })
})

//★★ Total Page
app.get("/movie_total", (req, res)=>{
    var cateno=req.query.cateno;
    var url="mongodb://211.238.142.181:27017";
    Client.connect(url, (err, client)=>{
        var db=client.db("mydb");
        //SELECT count(*) FROM movie WHERE cateno=:cateno
        db.collection("movie").find({cateno: Number(cateno)}).count(function (err, count) {
            res.json({total:Math.ceil(count/12.0)});
            client.close();
            return count;
        });
    })
})

// movie_home?no=1&data=1
// req.query.data
// nodejs 에서 사용자가 보낸 값 받을 때에는 query사용
app.get("/movie_home", (req, res)=>{
    var no=req.query.no; //request.getParameter("no");
    var site=" ";

    if(no==1) site="searchMainDailyBoxOffice.do";
    else if(no==2) site="searchMainRealTicket.do";
    else if(no==3) site="searchMainDailySeatTicket.do";
    else if(no==4) site="searchMainOnlineDailyBoxOffice.do";

    var url="http://www.kobis.or.kr/kobis/business/main/"+site;

    //json방식..
    request({url:url}, function (err, request, json) {
        console.log(json);

        //★★ 웹에서 일반 문자열로가지고 오기 때문에 json parsing을 해주어야 정상동작함
        //★★ res.json(json); => ERROR
        res.json(JSON.parse(json));
    })
})