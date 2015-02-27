var hrate = 0;
var gauge_hrate = new JustGage({
    id: "gauge_hrate",
    value: hrate,
    valueFontColor: ["#ffffff"],
    min: 50,
    max: 150,
    showMinMax: false,
    gaugeWidthScale: 1.2,
    label: "bpm",
    labelFontColor: ["#ffffff"],
    levelColors: ["#5DDBC6"],
    gaugeColor: ["#333333"],
    levelColorsGradient: false,
    title: " "
});

//var ws = new WebSocket('ws://54.65.100.97:8500/');	yaoki
var ws = new WebSocket('ws://10.10.10.2:8500/');


ws.onmessage = function(event) {
    var data = JSON.parse(event.data);
    hrate = data[1];
    gauge_hrate.refresh(hrate);

    // デバッグ用
    console.log("event.data: " + event.data);
    console.log("data[1]: " + data[1]);
    console.log("hrate: " + hrate);
};

// チャート設定
ccchart.base('', {config : {
    "useVal"       : "no", //値を表示
    "xScaleFont"   : "100 16px 'meiryo'", //水平軸目盛フォント
    "yScaleFont"   : "100 16px 'meiryo'", //垂直軸目盛フォント
    // "hanreiFont"   : "100 16px 'meiryo'", //凡例フォント
    // "hanreiColor"  : "#FFFFFF", //凡例フォント
    // "hanreiRadius" : "0", //凡例フォント
    // "shadows"      : {"hanrei": ['#FFF', 0, 0, 0]}, //凡例フォント
    "hanreiYOffset": "-100",
    "paddingTop"   : "50", //上パディング
    "paddingRight" : "140", //右パディング
    "useShadow"    : "no", //影
    "height"       : "230", //チャート高さ
    "width"        : "1000", //チャート幅
    // "useMarker"    : "ring", //マーカー種類
    "markerWidth"  : "16", //マーカー大きさ
    "valYOffset"   : "8", //値オフセット
    "valXOffset"   : "-8", //値オフセット
    "bg"           : ["#000000"], //背景色
    "textColor"    : ["#000000"], //テキスト色
    "lineWidth"    : "5" //ラインの太さ
}});

var chart_hrate = {
"config": {
    // "title": "Heart Rate (bpm)",
    // "type": "line",
    // "type": "bezi2",
    "type": "stackedarea",
    // "minY": 50,
    // "maxY": 150,
    "roundDigit": 0,
    "xScaleSkip": 3,
    "maxWsColLen": 8,
    "bg": ["#000000"],
    "colorSet": ["#5DDBC6"]
},
"data": [
    ["time"],
    ["hrate"]
]
};

ccchart.wsCloseAll();//一旦クリア
//ccchart		yaoki
//    .init('chart_hrate', chart_hrate)
//    .ws('ws://54.65.100.97:8501')
//    .on('message', ccchart.wscase.oneColAtATime)
    //.on('message', ccchart.wscase.someColsAtATime)
ccchart		
    .init('chart_hrate', chart_hrate)
    .ws('ws://10.10.10.2:8501')
    .on('message', ccchart.wscase.oneColAtATime)

