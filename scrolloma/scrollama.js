var scrolly = document.querySelector("#scrolly");
var article = scrolly.querySelector("article");

// initialize the scrollama
var scroller = scrollama();

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }
  response.element.classList.add("is-active");
  var el = response.element;
  updateChartFlowerVis(+el.dataset.step)
}

function handleStepExit(response) {
  // response = { element, direction, index }
  response.element.classList.remove("is-active");



}

function init() {
  scroller
    .setup({
      step: "#scrolly  article .step",
      debug: false,
      offset: 0.5
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);


  window.addEventListener("resize", scroller.resize);
}

// kick things off
init();