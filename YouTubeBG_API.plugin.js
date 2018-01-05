//META{"name":"YouTubeBG_API"}*//
var player
class YouTubeBG_API {
  
  
  /** BD FUNCTIONS **/
 
  getName         () { return "YouTubeBG with API"; }
  getDescription  () { return "Proof of concept for YouTube and Twitch based backgrounds. Requires theme that has custom background implemented into \"app-mount\"-element with layers on top transparent."; }
  getVersion      () { return "0.5.0"; }
  getAuthor       () { return "Kakkela"; }
  
    
  injectVBG() {

    //=============================================================================================================================//
    // Below is some settings to control some aspects of the plugin (settings inside discord might be added at some point),        //
    // fill them accordingly.                                                                                                      //
    //=============================================================================================================================//

    var YTplaylistID = "PL52FeSv68gcTzdUhvCrFADhI-B-L9x5h_" ;
    var YTVideoID = "ccp24-zhwdo";
    var soundoff = "1";
    var TwitchID = "monstercat";

    const playbackChoice = 1; // 0 = Video, 1 = Playlist
    const serviceChoice = 0; // 0 = YouTube, 1 = Twitch
    
    var div = document.createElement("div");
    div.className = "video-background";
    div.setAttribute("style", "background: #000;position: fixed;top: 0; right: 0; bottom: 0; left: 0;z-index: -1;");
   
    if (serviceChoice == 0) {
      
      $.getScript("https://www.youtube.com/player_api", function() {});
      document.getElementById("app-mount").appendChild(div);
      document.getElementById("app-mount").style.zIndex = "-2";

      if (playbackChoice == 0) {
        div.innerHTML = "<iframe id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\" src=\"https://www.youtube.com/embed/" + YTVideoID + "?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=" + soundoff +"\" frameborder=\"0\" allowfullscreen></iframe></div>";
        this.enablePlayer()

      } else if (playbackChoice == 1) {
        div.innerHTML = "<iframe id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\" src=\"https://www.youtube.com/embed?listType=playlist&list=" + YTplaylistID + "&controls=0&showinfo=0&rel=0&autoplay=1&enablejsapi=1&loop=1&mute=" + soundoff +"\" frameborder=\"0\" allowfullscreen></iframe></div>";
        this.enablePlayer()

      }
    } else if (serviceChoice == 1) {
      div.innerHTML = "<div id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\"></div>";
      $.getScript("https://embed.twitch.tv/embed/v1.js", function() {
        new Twitch.Embed("videoframe", {
          layout: "video" ,
          width: "100%" ,
          height: "100%" ,
          channel: TwitchID
        });
      });
    }
    document.getElementById("app-mount").appendChild(div);
    document.getElementById("app-mount").style.zIndex = "-2";  
  }

  enablePlayer() {
    if (typeof window.YT !== 'undefined') {
      player = new YT.Player('videoframe', {
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    window.onYouTubePlayerAPIReady = function() {
      player = new YT.Player('videoframe', {
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    function onPlayerReady(event) {
      event.target.setShuffle({shufflePlaylist:"true"})
      event.target.nextVideo()
    }
  }
  
  unload () {
    $("#videoframe").remove();
    $(".video-background").remove();  
  }
  
  stop () {
    $("#videoframe").remove();
    $(".video-background").remove(); 
  }
  
  load () {}
  
  start () {
    this.injectVBG();
  }
}
