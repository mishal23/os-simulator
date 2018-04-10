// Title Animation
var ml = { timelines: {}};

ml.timelines["ml5"] = anime.timeline({loop: false})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: function(e, i, l) {
      var offset = -0.625 + 0.625*2*i;
      return offset + "em";
    }
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-up',
    opacity: [0,1],
    translateY: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  });


// Main sub topics animation
var ml2= {timelines: {}};
ml2.timelines["ml6"] = anime.timeline({loop: false})
.add({
    targets: '.ml6 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 1700
  }).add({
    targets: '.ml6 .line',
    duration: 1000,
    easing: "easeOutExpo",
    translateY: function(e, i, l) {
      var offset = -0.625 + 0.625*2*i;
      return offset + "em";
    }
  }).add({
		targets: '.ml6 .letters-left1',
		opacity: [0,1],
		translateX: ["0.5em",0],
		easing: "easeOutExpo",
		duration: 1000,
		offset: '+=100'
	}).add({
		targets: '.ml6 .letters-right1',
    	opacity: [0,1],
    	translateX: ["-0.5em", 0],
    	easing: "easeOutExpo",
    	duration: 1000,
    	offset: '-=1000'
	}).add({
    targets: '.ml6 .letters-down1',
      opacity: [0,1],
      translateY: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 1000,
      offset: '-=1000'
  }).add({
    targets: '.ml6 .letters-up1',
      opacity: [0,1],
      translateY: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 1000,
      offset: '-=1000'
  });