/**
 * 分类：class
 *
 * 赛事：event
 *    ---| 赛事类型：eventclass
 *    ---| 赛事列表：eventlist
 *    ----- --------/id
 *    ----- --------/eventName
 *    ---- --------/eventclass
 *    ---- --------/eventTimeStart
 *    ---- --------/eventTimeEnd
 *    ---- --------/eventstatus
 * 比赛： game
 *   ----/id
 *   ---| 比赛名：gameName
 *   ---| 比赛战队-A：gameTeamA
 *   --| 比赛战队-B：gameTeamB
 *   ---| 比赛时间：gameTimeStart
 *   ---| 比赛时间：gameTimeEnd
 *   ---| 赛事类型：eventclass
 *   ---/ 赛事状态：gamestatus
 *
 * 竞猜：quiz
 *  ----| 竞猜规则 quizrules
 *  ----|竞猜列表 quizlist
 *  ---- --------/id:
 *  ---- --------/gameName:
 *  -------------/gameId:
 *  ------------/quizRules：
 *  ------------/Ateamodds:
 *   -----------/Bteamodds:
 *   ----------/quizMinCoin:
 *   ---------/quizTimeStart
 *  ---------/quizTimeEnd
 *  --------- /quizTotalJoin
 *  --------- /quizAteamJoin
 *  --------- /quizBteamJoin
 *  --------- /quizTotalCoin
 *   --------- /quizAteamCoin
 *  --------- /quizBteamCoin
 *  ------- /quizStatus
 * 规则：rules
 *
 * 最低值/最下值: min
 *
 * 赔率：odds
 *
 * 金币：coin
 *
 * 战队：team
 */


































module.exports = {
  //mock数据返回

  //赛事分类枚举  - game
  'GET /gametype': [{value:'LOL',code:'1'},{value:'足球',code:'2'},{value:'Dota',code:'3'},{value:'篮球',code:'10'}],
  //赛事列表  - game
  'GET /gamelist': [{
    gid:1,
    gname:'中国VS韩国',
    gtype:'2',
    gtypeStr:'足球',
    gstartTime:'2018-02-01 09:00',
  },{
    gid:2,
    gname:'日本VS韩国',
    gtype:'2',
    gtypeStr:'足球',
    gstartTime:'2018-02-03 09:00',
  }],
  //赛事列表  - game
  'GET /gamelist/detail/1': {
    gid:1,
    gname:'中国VS韩国',
    gtype:'2',
    gtypeStr:'足球',
    gstartTime:'2018-02-01 09:00',
    gamelist:[
      {
        id:1,
        gname:''
      }
    ]
  },
  'POST /users':{name:'JSLite'},
  'POST /users/2':"22323sd",
  'POST /users':function(data,url){
    // data 接受传递数据
    // url 请求
    // 接受
    // - form-data
    // - x-www-form-urlencoded
    // - raw
    if(data.name === 'jslite'){
      return {name:'卧槽121221'}
    }else{
      return {name:'yyy'}
    }
  }
};
