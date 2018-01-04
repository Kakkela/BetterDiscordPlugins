//META{"name":"YouTubeBG"}*//

class YouTubeBG {
  
  
  /** BD FUNCTIONS **/
  
  getName         () { return "YouTubeBG"; }
  getDescription  () { return "Proof of concept for YouTube based backgrounds"; }
  getVersion      () { return "0.2.0"; }
  getAuthor       () { return "Kakkela"; }
  
  
  injectVBG() {
    var div = document.createElement("div");
    div.className = "video-background";
    div.setAttribute("style", "background: #000;position: fixed;top: 0; right: 0; bottom: 0; left: 0;z-index: -1;");
    div.innerHTML = "<div class=\"video-foreground\"><iframe id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\" src=\"https://www.youtube.com/embed/ccp24-zhwdo?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1\" frameborder=\"0\" allowfullscreen></iframe></div>";
    // Below is example of looping playlist as background
    //div.innerHTML = "<div class=\"video-foreground\"><iframe id=\"videoframe\" style=\"box-sizing: border-box;height: 56.25vw;left: 50%;min-height: 100%;min-width: 100%;transform: translate(-50%, -50%);position: absolute;top: 50%;width: 177.77777778vh;\" src=\"https://www.youtube.com/embed?listType=playlist&list=PL52FeSv68gcTzdUhvCrFADhI-B-L9x5h_&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1\" frameborder=\"0\" allowfullscreen></iframe></div>";
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
  
  load () {
  }
  
  start () {
    this.injectVBG();
  }
}
