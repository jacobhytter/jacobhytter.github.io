(function () {
  var conf = {
    duration: 250,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: false,
    rtl: false,
    // onInit: () => {},
    // onChange: () => {},
  };

  var siemas = [];
  initSiema(conf, '.siema-0');
  initSiema(conf, '.siema-1');
  initSiema(conf, '.siema-2');
  initSiema(conf, '.siema-3');
  //initSiema(conf, ".siema-4");
  //initSiema(conf, ".siema-5");

  // using Siema: https://pawelgrzybek.github.io/siema/ - has no indicators. Hence the handmade indicators
  function initSiema(conf, selector) {
    // console.log("initSiema:", selector);

    // create Siema
    conf.selector = selector;
    conf.onChange = onSlideChange;
    var siema = new Siema(conf);
    siemas.push(siema);

    var carouselElement = document.querySelector(selector);
    var carouselRoot = carouselElement.parentNode;
    var slides = carouselElement.firstChild.childElementCount;
    var indicator = document.querySelector('.carousel-indicator' + selector);

    // prev
    var prev = document.createElement('div');
    prev.classList.add('carousel-prev');
    carouselRoot.appendChild(prev);
    prev.addEventListener(
      'click',
      function () {
        prevSlide(selector);
      },
      false
    );

    // next
    var next = document.createElement('div');
    next.classList.add('carousel-next');
    carouselRoot.appendChild(next);
    next.addEventListener(
      'click',
      function () {
        nextSlide(selector);
      },
      false
    );

    // indicators
    for (var i = 0; i < slides; i++) {
      var child = document.createElement('div');
      child.classList.add('indicator');
      if (i === 0) {
        child.classList.add('selected');
      }
      indicator.appendChild(child);
      child.addEventListener('click', selectSlide.bind(this, selector, i), false);
    }
  }

  function onSlideChange() {
    // console.log("onSlideChange", this);
    setIndicator(this.config.selector, this.currentSlide);
  }

  function nextSlide(selector) {
    // console.log("nextSlide selector:", selector);
    var siema = findSiema(selector);
    siema.next();
  }

  function prevSlide(selector) {
    // console.log("prevSlide selector:", selector);
    var siema = findSiema(selector);
    siema.prev();
  }

  function selectSlide(selector, index) {
    // console.log("selectSlide selector:" + selector + " index", index);
    var siema = findSiema(selector);
    siema.goTo(index);
  }

  function findSiema(selector) {
    var len = siemas.length;
    for (var i = 0; i < len; i++) {
      if (siemas[i].config.selector === selector) {
        return siemas[i];
      }
    }
    return null;
  }

  function setIndicator(selector, index) {
    // console.log("setIndicator selector:" + selector + " index", index);
    var indicator = document.querySelector('.carousel-indicator' + selector);
    for (var i = 0; i < indicator.childNodes.length; i++) {
      i === index ? indicator.childNodes[i].classList.add('selected') : indicator.childNodes[i].classList.remove('selected');
    }
  }
})();
