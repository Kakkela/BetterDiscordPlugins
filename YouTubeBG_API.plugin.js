//META{"name":"YouTubeBG_API"}*//

class YouTubeBG_API {
  
  
  /** BD FUNCTIONS **/
 
  getName         () { return "YouTubeBG with API"; }
  getDescription  () { return "Proof of concept for YouTube and Twitch based backgrounds. Requires theme that has custom background implemented into \"app-mount\"-element with layers on top transparent."; }
  getVersion      () { return "0.4.0"; }
  getAuthor       () { return "Kakkela"; }
  
  
 injectVBG() {

   //=============================================================================================================================//
   // Below is five settings to control some aspects of the plugin (settings inside discord might be added at some point),        //
   // fill them accordingly.                                                                                                      //
   //=============================================================================================================================//

   var YTplaylistID = "PL52FeSv68gcTzdUhvCrFADhI-B-L9x5h_" ;
   var YTVideoID = "ccp24-zhwdo";
   var TwitchID = "monstercat";
   var soundoff = "1";
   const playerChoice = 3; // 0 = Simple YouTube Video, 1 = Simple YouTube Playlist, 2 = PlayerAPI Video, 3 = PlayerAPI Playlist, 4 = Twitch

   var div = document.createElement("div");
   div.className = "video-background";
   div.setAttribute("style", "background: #000;position: fixed;top: 0; right: 0; bottom: 0; left: 0;z-index: -1;");

   if (playerChoice == 0) {
     //=================================//
     // YouTube simple video loading    //
     //=================================//
     
     div.innerHTML = "<div class=\"video-foreground\"><iframe id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\" src=\"https://www.youtube.com/embed/" + YTVideoID + "?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=" + soundoff +"\" frameborder=\"0\" allowfullscreen></iframe></div>";

     } else if (playerChoice == 1) {
       //=================================//
       // YouTube simple playlist loading //
       //=================================//
       div.innerHTML = "<div class=\"video-foreground\"><iframe id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\" src=\"https://www.youtube.com/embed?listType=playlist&list=" + YTplaylistID + "&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=" + soundoff +"\" frameborder=\"0\" allowfullscreen></iframe></div>";

     } else if (playerChoice == 2) {
       //=================================//
       // YouTube vidoe loading with API  //
       //=================================//

       div.innerHTML = "<div id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\"></div>";
       
       $.getScript("https://www.youtube.com/player_api", function() {});
       var player;
       window.onYouTubePlayerAPIReady = function() {
         player = new YT.Player('videoframe', {
           width: "100%" ,
           height: "100%" ,
           videoId: YTVideoID,
           playerVars: {
             controls: "0",
             loop: "1",
             enablejsapi: "1",
             autoplay: "1",
             mute: soundoff
           },
           events: {
             'onReady': onPlayerReady
           }
         });
       };
       function onPlayerReady(event) {
         event.target.playVideo()
       };

     } else if (playerChoice == 3) {
       //===================================//
       // YouTube playlist loading with API //
       //===================================//
      
       div.innerHTML = "<div id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\"></div>";
      
       $.getScript("https://www.youtube.com/player_api", function() {});
       var player
       window.onYouTubePlayerAPIReady = function() { 
         player = new YT.Player('videoframe', {
           width: "100%" ,
           height: "100%" ,
           playerVars: {
             controls: "0",
             loop: "1",
             enablejsapi: "1",
             mute: soundoff,
             iv_load_policy: "3",
             listType: "playlist",
             list: YTplaylistID
           },
           events: {
             'onReady': onPlayerReady
           }
         });
       };
       function onPlayerReady(event) {
         event.target.playVideo()
         event.target.setShuffle({shufflePlaylist:"true"})
         event.target.nextVideo()
       };

     } else if (playerChoice == 4) {
       //=================================//
       // Twitch simple channel loading   //
       //=================================//
       div.innerHTML = "<div id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\"></div>";
       
       $.getScript("https://embed.twitch.tv/embed/v1.js", function() {
         new Twitch.Embed("videoframe", {
           layout: "video" ,
           width: "100%" ,
           height: "100%" ,
           channel: TwitchID,
           muted: "false"
         });
       });
     }

     document.getElementById("app-mount").appendChild(div);
     document.getElementById("app-mount").style.zIndex = "-2";
     console.log("Video Background injected");
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
