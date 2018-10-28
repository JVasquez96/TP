    /*global BindClass */
/*jslint browser: true, indent: 4*/

/**
 * @file Manages the configuration of the HTML application. 
 * Loading the JSON data in application to binding the data into the page.
 * @author LG CSP-1
 */

/**
 * Description of module, defines module for whole file
 * @lends module: closureFunction
 * @module closureFunction
 */
(function () {
    'use strict';
    /** @type {object} */
    var info,
    /** @type {string} */
        dataSet;
    /**
     * Binds data to HTML Page.
     * @method bindData
     * @param {Object} jsonData - Object contains data to put into HTML
     * @example
     * For Example : 
     * 'jsonData.headerImage' will hold the path of an image to be set into the html page.
     * For Img Tag attribute 'data-bind-templateSix', we set value as 'headerImage'(See Below).
     *               
     *     //  img data-bind-templateSix = "headerImage"
     *       
     * To set the value from Object to html tag, we need to put the code : 
     *     //  info.set('headerImage', jsonData.headerImage)
     *
     * here, first argument is the name of html tag's attribute value and,
     *             second is the value from javascript Object.
     */
function init()
{

}

 function darFormatoAldia(day,month,year) {
    var formato ="";
    switch(day) {
        case "clear-day":
           info.set('asideBlock11Content1',jsonData.climaSunny);
        case "clear-night":
           info.set('asideBlock11Content1',jsonData.climaCloudy);
      case "rain":
           info.set('asideBlock11Content1',jsonData.climaRain);
        case "snow":
           info.set('asideBlock11Content1',jsonData.climaSunny);

      case "sleet":
          info.set('asideBlock11Content1',jsonData.climaCloudy);
        case "wind":
         info.set('asideBlock11Content1',jsonData.climaCloudy);

      case "fog":
        info.set('asideBlock11Content1',jsonData.climaCloudy);

     case "cloudy":
           info.set('asideBlock11Content1',jsonData.climaCloudy);
        case "partly-cloudy-day":
           info.set('asideBlock11Content1',jsonData.climaCloudy);

      case "partly-cloudy-night":
           info.set('asideBlock11Content1',jsonData.climaCloudy);

      default:
           info.set('asideBlock11Content1',jsonData.climaSunny);
    }
   } 
function updateTime()
{
      var dt = new Date();
      var time = dt.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});    
       info.set('asideBlock1Content1', time);
}
    function bindData(jsonData) {
        info = new BindClass('templateSix');
        console.log("ssds");

updateTime();

var meses = [
  "enero", "febrero", "marzo",
  "abril", "mayo", "junio", "julio",
  "agosto", "septiembre", "octubre",
  "noviembre", "diciembre"
]
   var dias=["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

var date = new Date();

var dia = date.getDate();
var mes = date.getMonth();
var yyy = date.getFullYear();
var fecha_formateada = dias[date.getUTCDay()]+', ' + dia + ' de ' + meses[mes];





var dateDay = fecha_formateada;


info.set('asideBlock1Content3', dateDay);

  //  info.set('asideBlock1Content3', jsonData.asideBlock1Content3);

 window.setInterval(updateTime,100);
        $.ajax({
          method: "GET",
          url: "https://api.darksky.net/forecast/7af51a01e29c8ddb7a548fad3cf35a05/-12.193731,-76.708493?units=si",
          crossDomain: true,
          dataType: 'jsonp',

        })
          .done(function( data ) {
            console.log( "Data Saved: ");
          
             
       
                 info.set('asideBlock11Content2', "↑"+ changeicon2(data.daily.data[0].icon, Math.round(data.daily.data[0].temperatureMax )) );
             info.set('asideBlock11Content3',"↓"+ changeicon2(data.daily.data[0].icon, Math.round(data.daily.data[0].temperatureMin )));
       
function changeiconTitle(icon, temp) {
    switch(icon) {
        case "clear-day":
           return info.set('asideBlock11Content1',jsonData.weather_clear);
        case "clear-night":
           return info.set('asideBlock11Content1',jsonData.weather_clearnight);
        case "cloudy":
           return info.set('asideBlock11Content1',jsonData.weather_cloudy);
        case "fog":
           return info.set('asideBlock11Content1',jsonData.weather_fog);
        case "partly-cloudy-day":
           return info.set('asideBlock11Content1',jsonData.weather_partlycloudy);
        case "partly-cloudy-night":
           return info.set('asideBlock11Content1',jsonData.weather_partlycloudynight);
        case "rain":
           return info.set('asideBlock11Content1',jsonData.weather_rain);
        case "sleet":
           return info.set('asideBlock11Content1',jsonData.weather_sleet);
        case "snow":
           return info.set('asideBlock11Content1',jsonData.weather_snow);
        case "sunny":
           return info.set('asideBlock11Content1',jsonData.weather_sunny);
        case "wind":
           return info.set('asideBlock11Content1',jsonData.weather_sleet);
    }
   } 



            
   function changeicon(icon, temp) {
      return temp+"°";           
   } 

   function changeicon2(icon, temp) {
      return temp +"°C";
   }
   
   function getDayString(number) {
    switch(number) {
        case 0:
            return "D";
        case 1:
            return "L";
      case 2:
            return "M";
        case 3:
            return "M";

      case 4:
            return "J";
        case 5:
            return "V";

      case 6:
            return "S";

    }
}

var html = "";

html += "<tr>"
for(var i=0; i<7; ++i) {
    var date = new Date();
    date.setDate(date.getDate() + i);
    html += "<td>" + getDayString(date.getDay()) + "</td>";
}
html += "</tr>"


html += "<tr>"
for(var i=0; i<7; ++i) {
    html += "<td>"  + changeicon(data.daily.data[i].icon,Math.round(data.daily.data[i].temperatureMax )) + "</td>"
}
html += "</tr>"

html += "<tr>"
for(var i=0; i<7; ++i) {
    html += "<td>" +  changeicon(data.daily.data[i].icon, Math.round(data.daily.data[i].temperatureMin))  + "</td>"
}


$("#tablaClima").html(html);

changeiconTitle(data.currently.icon, Math.round(data.currently.temperature));

var html2 = changeicon2(data.currently.icon, Math.round(data.currently.temperature));


function levenshtein(s1, s2) {
  var l1 = s1.length;
  var l2 = s2.length;
  var d = [];
  var c = 0;
  var a = 0;

  if(l1 == 0)
    return l2;

  if(l2 == 0)
    return l1;

  var d = new Array((l1 + 1) * (l2 + 1));
  a = l1 + 1;

  for(var i = 0; i <= l1; d[i] = i++);
  for(var j = 0; j <= l2; d[j * a] = j++);

  for(var i = 1; i <= l1; i++) {
    for(var j = 1; j <= l2; j++) {
      if(s1[i - 1] == s2[j - 1])
        c = 0;
      else
        c = 1;
      var r = d[j * a + i - 1] + 1;
      var s = d[(j - 1) * a + i] + 1;
      var t = d[(j - 1) * a + i - 1] + c;

      d[j * a + i] = Math.min(Math.min(r, s), t);
    }
  }

  return(d[l2 * a + l1]);
}
 ///indica la cantidad de cambios de caracterees para que sean iguales  == 5
console.log(levenshtein("Lonche con mamá","El Lonche con mi mamá"));

$("#logoClima").html(html2);

          });

        
        info.set('borderClima',jsonData.borderClima);
        /* Header Div */
        info.set('headerImage', jsonData.headerImage);
        /* Showcase Div */
        info.set('showcaseImg', jsonData.showcaseImg);
        info.set('heading1', jsonData.heading1);
        info.set('heading2', jsonData.heading2);
        info.set('heading3', jsonData.heading3);
        info.set('showcaseContent', jsonData.showcaseContent);
        /* Image Text Overlay */
        info.set('bannerImg', jsonData.bannerImg);
        info.set('NowNewsImage', jsonData.NowNewsImage);
       
        info.set('NowPlayingImage', jsonData.NowPlayingImage);
        info.set('bannerImgOverlayText', jsonData.bannerImgOverlayText);
        info.set('bannerImgOverlayContent', jsonData.bannerImgOverlayContent);
        /* Section Div */
        info.set('textSectionH1', jsonData.textSectionH1);
        info.set('textSectionH2', jsonData.textSectionH2);
        info.set('textSectionH3', jsonData.textSectionH3);
        info.set('textSectionH4', jsonData.textSectionH4);
        /* Side Div - 8 Blocks */
        // Block 1
       
        info.set('asideBlock1Content2', jsonData.asideBlock1Content2);

        // Block 2
        info.set('notificationtext', jsonData.notificationtext);
        info.set('notification0text', jsonData.notification0text);
        info.set('notification1text', jsonData.notification1text);
        info.set('notification2text', jsonData.notification2text);
        info.set('notification3text', jsonData.notification3text);
        info.set('notification4text', jsonData.notification4text);

        info.set('asideBlock3Content2', jsonData.asideBlock3Content2);
        info.set('asideBlock3Content3', jsonData.asideBlock3Content3);
        // Block 4
        info.set('asideBlock4Content1', jsonData.asideBlock4Content1);
        info.set('asideBlock4Content2', jsonData.asideBlock4Content2);
		info.set('asideBlock4Content3', jsonData.asideBlock4Content3);
        // Block 5
        info.set('asideBlock5Content1', jsonData.asideBlock5Content1);
        info.set('asideBlock5Content2', jsonData.asideBlock5Content2);
        info.set('asideBlock5Content3', jsonData.asideBlock5Content3);
        // Block 6
        info.set('asideBlock6Content1', jsonData.asideBlock6Content1);
        info.set('asideBlock6Content2', jsonData.asideBlock6Content2);
        info.set('asideBlock6Content3', jsonData.asideBlock6Content3);
        // Block 7
        info.set('asideBlock7Content1', jsonData.asideBlock7Content1);
        info.set('asideBlock7Content2', jsonData.asideBlock7Content2);
        info.set('asideBlock7Content3', jsonData.asideBlock7Content3);
        // Block 8
        info.set('asideBlock8Content1', jsonData.asideBlock8Content1);
        info.set('asideBlock8Content2', jsonData.asideBlock8Content2);
        info.set('asideBlock8Content3', jsonData.asideBlock8Content3);


        // Block 11
        info.set('asideBlock11Content1', jsonData.asideBlock11Content1);
        info.set('asideBlock11Content2', jsonData.asideBlock11Content2);
        info.set('asideBlock11Content3', jsonData.asideBlock11Content3);
        // Block 2
        info.set('asideBlock12Content1', jsonData.asideBlock12Content1);
        info.set('asideBlock12Content2', jsonData.asideBlock12Content2);
        info.set('asideBlock12Content3', jsonData.asideBlock12Content3);
        // Block 3
        info.set('asideBlock13Content1', jsonData.asideBlock13Content1);
        info.set('asideBlock13Content2', jsonData.asideBlock13Content2);
        info.set('asideBlock13Content3', jsonData.asideBlock13Content3);
        // Block 4
        info.set('asideBlock14Content1', jsonData.asideBlock14Content1);
        info.set('asideBlock14Content2', jsonData.asideBlock14Content2);
        info.set('asideBlock14Content3', jsonData.asideBlock14Content3);

          info.set('asideBlock13Content2X', jsonData.asideBlock13Content2X);
        info.set('asideBlock13Content3X', jsonData.asideBlock13Content3X);
        // Block 4
        info.set('asideBlock14Content1X', jsonData.asideBlock14Content1X);
        info.set('asideBlock14Content2X', jsonData.asideBlock14Content2X);
        info.set('asideBlock14Content3X', jsonData.asideBlock14Content3X);



        // Block 5
        info.set('asideBlock15Content1', jsonData.asideBlock15Content1);
        info.set('asideBlock15Content2', jsonData.asideBlock15Content2);
        info.set('asideBlock15Content3', jsonData.asideBlock15Content3);
        // Block 6
        info.set('asideBlock16Content1', jsonData.asideBlock16Content1);
        info.set('asideBlock16Content2', jsonData.asideBlock16Content2);
        info.set('asideBlock16Content3', jsonData.asideBlock16Content3);
        // Block 7
        info.set('asideBlock17Content1', jsonData.asideBlock17Content1);
        info.set('asideBlock17Content2', jsonData.asideBlock17Content2);
        info.set('asideBlock17Content3', jsonData.asideBlock17Content3);
        // Block 8
        info.set('asideBlock18Content1', jsonData.asideBlock18Content1);
        info.set('asideBlock18Content2', jsonData.asideBlock18Content2);
        info.set('asideBlock18Content3', jsonData.asideBlock18Content3);
    }
    /**
     * Represents Ajax Reauest.
     * @method loadDoc
     * @param {string} method - method of the request.
     * @param {string} url - url of the request.
     */
    function loadDoc(method, url) {
        var req = new XMLHttpRequest();
        req.open(method, url, true);
        req.onload = function () {
            dataSet = JSON.parse(req.responseText);
            bindData(dataSet);
        };
        req.onerror = function () {
            throw 'Cannot load file ' + url;
        };
        req.send();
    }
    /** @function */
    loadDoc('GET', 'data/data.json');
}());