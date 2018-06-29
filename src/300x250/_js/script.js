const banner = {
	tweenDelay: 1,
  wrapper: document.getElementById("wrapper"),
  draftSponsorLogos: document.getElementById("draft-sponsor-logos"),
  tuneIn: document.getElementById("tune-in"),
  watchLiveNow: document.getElementById("watch-live-now"),
  arrow: document.getElementById("arrow"),
  espnAppLogos: document.getElementById("espn-app-logos"),
	loop: 1,

	init: () => {
    //make banner visible on load
		banner.wrapper.style.display = "block";

    //set up event listeners
    banner.wrapper.addEventListener("mouseover", banner.onMouseOver);
		banner.wrapper.addEventListener("mouseout", banner.onMouseOut);
		banner.wrapper.addEventListener("click", banner.onBannerClick);

		//compare live date and time with user’s current date and time,
    const liveDate = new Date("June 1 2018 20:00:00 GMT-0400"), //June 1 2018, 8:00 PM EST
          currentDate = new Date(),
          timeDifference = liveDate.getTime() - currentDate.getTime(),
          daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if(timeDifference > 0){
      if(daysRemaining < 7 && daysRemaining > 0){ //the week of the draft
        //check if current date is the day before the draft
        banner.tuneIn.innerHTML = (currentDate.getDate() === liveDate.getDate() - 1) ? "TOMORROW<br>8<span>PM/ET</span>" : "FRIDAY<br>8<span>PM/ET</span>";
      }else if(daysRemaining === 0){
        //check if current date is the day of the draft
        banner.tuneIn.innerHTML = (currentDate.getDate() === liveDate.getDate()) ? "TONIGHT<br>8<span>PM/ET</span>" : "TOMORROW<br>8<span>PM/ET</span>";
      }
    }else{ //the draft is live!
      clickTag = "http://www.espn.com/watch/";
      banner.tuneIn.style.display = "none";
      banner.watchLiveNow.style.display = "block";
    }

    //start banner animation
    banner.startAnim();
	},

	startAnim: () => {
		TweenLite.from(banner.draftSponsorLogos, .7, {top:"259px", ease:Power2.easeOut, delay:banner.tweenDelay});
		banner.tweenDelay += .4;
    TweenLite.from(banner.tuneIn, .7, {top:"401px", ease:Power2.easeOut, delay:banner.tweenDelay});
    TweenLite.from(banner.watchLiveNow, .7, {top:"401px", ease:Power2.easeOut, delay:banner.tweenDelay});
    banner.tweenDelay += .4;
    TweenLite.from(banner.espnAppLogos, .7, {top:"463px", ease:Power2.easeOut, delay:banner.tweenDelay, onComplete: () => {
			if(banner.loop < 3){ //has animation looped three times?
	      banner.loop++;
				//three second pause then fade out
	    	TweenLite.delayedCall(3, banner.fadeOut);
			}
		}});
	},

  fadeOut: () => {
		TweenLite.to(banner.draftSponsorLogos, .75, {opacity:0});
		TweenLite.to(banner.tuneIn, .75, {opacity:0});
		TweenLite.to(banner.watchLiveNow, .75, {opacity:0});
		TweenLite.to(banner.espnAppLogos, .75, {opacity:0, onComplete:banner.reset});
  },

	reset: () => {
    banner.tweenDelay = 1;
    TweenLite.set(banner.draftSponsorLogos, {opacity:1});
    TweenLite.set(banner.tuneIn, {opacity:1});
    TweenLite.set(banner.watchLiveNow, {opacity:1});
    TweenLite.set(banner.espnAppLogos, {opacity:1});
    banner.startAnim();
	},

  onMouseOver: () => {
		TweenLite.to(banner.arrow, .25, {right:"6px"});
	},

	onMouseOut: () => {
		TweenLite.to(banner.arrow, .25, {right:"12px"});
	},

	onBannerClick: () => {
		window.open(clickTag);
	}
}

window.addEventListener("load", banner.init);
