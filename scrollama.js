var scrolly = document.querySelector("#scrolly");
var article = scrolly.querySelector("article");

// initialize the scrollama
var scroller = scrollama();

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }
  // add to color to current step
  response.element.classList.add("is-active");
}

function handleStepExit(response) {
  // response = { element, direction, index }
  // remove color from current step
  response.element.classList.remove("is-active");
}

function init() {
  // 1. setup the scroller with the bare-bones options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      debug: false,
      offset: 0.5
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

  // 3. setup resize event
  window.addEventListener("resize", scroller.resize);
}

// kick things off
init();