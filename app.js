function meetupCallback(result) {
  /** JSONP-called from their API because they can't do CORS.
   * fills in details about next meetup
   */
  "use strict";
  if ('next_event' in result.data) {
    var ne = result.data.next_event;
    var date = new Date(ne.time);
    var month = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"][date.getMonth()];
    var day = date.getDate();
    var niceday = day + superScriptDaySuffix(day);
    var h1 = document.getElementById("next-meetup-headline");
    if ((new Date()).toDateString() == date.toDateString()) {
       h1.innerHTML = "Next meetup is today!";
    } else {
        h1.innerHTML = "Next meetup " + month + " " + niceday;
    }
  } else {
    var h1 = document.getElementById("next-meetup-headline");
    h1.innerHTML = "Next meetup TBD";

    h1.insertAdjacentHTML('afterend',
      '<p>Check back later or subscribe to our <a ' +
      'href="http://www.meetup.com/Berlin-Application-Security-Cryptography-Meetup">' +
      'meetup group</a></p>');
  }

}
function superScriptDaySuffix(day) {
  "use strict";
   /** returns <sup>th</sup> or st, nd dependong on the number
   */
  var s = day.toString();
  var last =  s.slice(-1);
  if (last == "1") {
    return "<sup>st</sup>";
  } else if (last == "2") {
    return "<sup>nd</sup>";
  } else if (last == "3") {
    return "<sup>rd</sup>";
  } else {
    return "<sup>th</sup>";
  }

}
function talkMetaData() {
  "use strict";
  /** fill in talk-metadata from the flat file
   *
   */
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./talks.json");
  //xhr.responseText = "json"; // doesn't work in IE.
  xhr.onload = function(load) {
    var talks = JSON.parse(load.target.responseText);
    var section = document.getElementById("next-meetup-talks");
    section.innerHTML = "";
    /*
     <div class="presentation">
       <h3 class="presentation-title"></h3>
       <p class="presentation-author"></p>
       <p class="presentation-abstract"></p>
     </div>

     Generated DOM code follows:
     */
    for (var i=0; i< talks.length; i++) {
      var talk = talks[i];

      var div = document.createElement('DIV');
      div.setAttribute("class", "presentation");

      var h3 = document.createElement('H3');
      h3.setAttribute("class", "presentation-title");
      div.appendChild(h3);
      h3.textContent = talk.title;

      var p = document.createElement('P');
      p.setAttribute("class", "presentation-author");
      div.appendChild(p);
      p.textContent = talk.author;

      if (talk.abstract) {
        var p_0 = document.createElement('P');
        p_0.setAttribute("class", "presentation-abstract");
        div.appendChild(p_0);
        p_0.textContent = talk.abstract;
      }

      if (talk.bio) {
        var p_1 = document.createElement('P');
        p_1.setAttribute("class", "presentation-bio");
        div.appendChild(p_1);
        p_1.textContent = talk.bio;
      }

      section.appendChild(div);
    }
  };
  xhr.send();
}

addEventListener("DOMContentLoaded", function() {
  "use strict";
  talkMetaData();
});

