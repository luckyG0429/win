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
 *   ---/所属赛事：eventName
 *   ---所属赛事id：eventId
 *
 * 竞猜：quiz
 *  ----| 竞猜规则 quizrules
 *  ----|竞猜列表 quizlist
 *  --id: 竞猜id
 *
 *
 *   ----------/quizMinCoin:
 *
 *  ---------/quizTimeEnd
 *  --------- /
 *  --------- /
 *  --------- /
 *  --------- /quizGoldTotal
 *   --------- /quiz
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
  'GET /module/event/eventcategory': [{value:'LOL',code:'1'},{value:'足球',code:'2'},{value:'Dota',code:'3'},{value:'篮球',code:'10'}],
  //赛事列表  - game
  'GET /module/event/eventlist': {
    data:[{
      id:1,
      eventName:'中国VS日本',
      eventclass:'2',
      eventclassStr:'足球',
      eventTimeStart:'2018-02-01 09:00',
      eventTimeEnd:'2018-02-05 09:00',
      eventstatus:1,
      eventstatusStr:'已发布',
    },{
      id:3,
      eventName:'中国VS韩国',
      eventclass:'2',
      eventclassStr:'足球',
      eventTimeStart:'2018-02-01 09:00',
      eventTimeEnd:'2018-02-05 09:00',
      eventstatus:1,
      eventstatusStr:'已发布',
    }]
  },
  //比赛列表  - game
  'GET /module/game/gamelist.htm':{
    resultCode: 200,
    info:'操作成功',
    eData:{
        total:80,
        pageSequence:1,
        pageSize:10,
    },
   data:[{
      id:'201',
      gameName:'20180201上午场',
      gameTeamA:'恒大足球',
      gameTeamB:'和田君队',
      gameTimeStart:'2018-02-01 09:00',
      gameTimeEnd:'2018-02-01 12:00',
      eventclass:'足球',
      gamestatus:0,
      eventName:'中国VS韩国',
      eventId:2
      }, {
        id:'202',
        gameName:'20180201上午场',
        gameTeamA:'恒大足球',
        gameTeamB:'和田君队',
        gameTimeStart:'2018-02-01 15:00',
        gameTimeEnd:'2018-02-01 18:00',
        eventclass:'足球',
        gamestatus:1,
        eventName:'中国VS韩国',
        eventId:2
      }]
  },
  'GET /module/game/gamedetail':{
    id:'202',
    gameName:'0201上午场',
    gameTeamA:'恒大足球',
    gameTeamB:'和田君队',
    gameTimeStart:'',
    gameTimeEnd:'2018-02-01 15:00',
    eventclass:'2018-02-01 18:00',
    gamestatus:'0',
    eventName:'中国VS韩国',
    eventId:2
  },

  'GET /module/quiz/quizrules':[{code:'1',value:'猜大小'},{code:'2',value:'猜胜负'},{code:'3',value:'胜分差'}],
  'GET /module/quiz/quizlist':{
    data:[
      {
        id:'201',
        gameName:'20180201上午场',
        gameTeamA:'恒大足球',
        gameTeamB:'和田君队',
        gameTimeStart:'2018-02-01 09:00',
        gameTimeEnd:'2018-02-01 12:00',
        eventclass:'足球',
        gamestatus:1,
        eventName:'中国VS韩国',
        eventId:2,
        quizlist:[{
          id: 1,
          gameName: '0201上午场',
          gameId: '202',
          quizRules: '猜大小',
          Ateamodds: '0.94',
          Bteamodds: '0.65',
          quizMinCoin: '100',
          quizTimeStart: '2018-01-25 09:00',
          quizTimeEnd: '2018-02-01 09:00',
          quizTotalJoin: '100231',
          quizAteamJoin: '21922',
          quizBteamJoin: '87328',
          quizTotalCoin: '10899000',
          quizAteamCoin: '4090900',
          quizBteamCoin: '5800000',
          quizStatus: 1,
        }, {
          id: 3,
          gameName: '0201上午场',
          gameId: '202',
          quizRules: '胜分差',
          Ateamodds: '0.95',
          Bteamodds: '0.95',
          quizMinCoin: '50',
          quizTimeStart: '2018-01-25 09:00',
          quizTimeEnd: '2018-02-01 09:00',
          quizTotalJoin: '1002310',
          quizAteamJoin: '219229',
          quizBteamJoin: '873281',
          quizTotalCoin: '1089990000',
          quizAteamCoin: '409090000',
          quizBteamCoin: '580000000',
          quizStatus: 0,
        }]
      },
      {
        id:'202',
        gameName:'0201上午场',
        gameTeamA:'恒大足球',
        gameTeamB:'和田君队',
        gameTimeStart:'2018-02-01 09:00',
        gameTimeEnd:'2018-02-01 12:00',
        eventclass:'足球',
        gamestatus:0,
        eventName:'中国VS韩国',
        eventId:2,
        quizlist:[{
          id: 1,
          gameName: '0201上午场',
          gameId: '202',
          quizRules: '猜大小',
          Ateamodds: '0.94',
          Bteamodds: '0.65',
          quizMinCoin: '100',
          quizTimeStart: '2018-01-25 09:00',
          quizTimeEnd: '2018-02-01 09:00',
          quizTotalJoin: '0',
          quizAteamJoin: '0',
          quizBteamJoin: '0',
          quizTotalCoin: '0',
          quizAteamCoin: '0',
          quizBteamCoin: '0',
          quizStatus: 1,
      }, {
        id: 3,
        gameName: '0201上午场',
        gameId: '202',
        quizRules: '胜分差',
        Ateamodds: '0.95',
        Bteamodds: '0.95',
        quizMinCoin: '50',
        quizTimeStart: '2018-01-25 09:00',
        quizTimeEnd: '2018-02-01 09:00',
        quizTotalJoin: '0',
        quizAteamJoin: '0',
        quizBteamJoin: '0',
        quizTotalCoin: '0',
        quizAteamCoin: '0',
        quizBteamCoin: '0',
        quizStatus: 1,
      }]
  }]
  },

  'GET /module/quiz/quizdetail':{
    id:3,
    gameName:'0201上午场',
    gameId:'202',
    quizRules:'胜分差',
    Ateamodds:'0.95',
    Bteamodds:'0.95',
    quizMinCoin:'50',
    quizTimeStart:'2018-01-25 09:00',
    quizTimeEnd:'2018-02-01 09:00',
    quizTotalJoin:'1002310',
    quizAteamJoin:'219229',
    quizBteamJoin:'873281',
    quizTotalCoin:'1089990000',
    quizAteamCoin:'409090000',
    quizBteamCoin:'580000000',
    quizStatus:1,
  },


};
