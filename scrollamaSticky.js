      // using d3 for convenience
      var main = document.querySelector("main");
      var scrolly = document.querySelector("#stickyScrolly");
      var sticky = scrolly.querySelector(".sticky-thing");
      var article = scrolly.querySelector("article");
      var steps = article.querySelectorAll(".step");

      // initialize the scrollama
      var scroller = scrollama();

      // scrollama event handlers
      function handleStepEnter(response) {
        // response = { element, direction, index }
        var el = response.element;

        // remove is-active from all steps
        // then add is-active to this step
        steps.forEach((step) => step.classList.remove("is-active"));
        el.classList.add("is-active");

        // update graphic based on step
        sticky.querySelector("p").innerText = el.dataset.step;
      }

      function init() {
        scroller
          .setup({
            step: "#stickyScrolly article .step",
            offset: 0.5,
            debug: false,
          })
          .onStepEnter(handleStepEnter);

        // setup resize event
        window.addEventListener("resize", scroller.resize);
      }

      // kick things off
      init();