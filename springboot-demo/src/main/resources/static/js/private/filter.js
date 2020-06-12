//1535077309000 => Mar 4th, 2018 
// Vue.filter('FormatDataEn', function (val, ms) {
//     var dt = new Date(ms);
//     var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec");
//     var w = new Array("Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
//     var d = new Array("st", "nd", "rd", "th");
//     mn = dt.getMonth();
//     wn = dt.getDay();
//     dn = dt.getDate();
//     var dns;
//     if (((dn % 10) < 1) || ((dn % 10) > 3)) {
//         dns = d[3];
//     } else {
//         dns = d[(dn % 10) - 1];
//         if ((dn == 11) || (dn == 12)) {
//             dns = d[3];
//         }
//     }
//     return m[mn] + " " + dn + dns + "， " + dt.getFullYear()
// });

//1535077309000 => 2018-08-30 13:09:23 
Vue.filter('getLocalTime', function (val, ms) {
    var d = new Date(ms);    //根据时间戳生成的时间对象
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    if(month<10) month="0"+month;
    if(date<10) date="0"+date;
    if(hour<10) hour="0"+hour;
    if(minute<10) minute="0"+minute;
    if(second<10) second="0"+second;
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
});


