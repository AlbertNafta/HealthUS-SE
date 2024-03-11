$(document).ready(function () {
    // List Slider

    const listSliderContainer = $('#list-slider .carousel-inner');
    listSliderContainer.empty();

    fetch('/hospital-list/query?page=0&limit=10')
    .then(res => res.json())
    .then(data => {
        data.items.forEach((item, idx) => {
            let listSliderItem = $(``);
            if (idx === 0) {
                listSliderItem = $(`
                    <div class="carousel-item active d-flex align-items-center justify-content-center">
                `);
            }
            else {
                listSliderItem = $(`
                    <div class="carousel-item d-flex align-items-center justify-content-center">
                `);
            }
            listSliderItem.append($(`
                    <div class="card">
                        <div class="card-img"><img src="${item.avatar}" class="d-block w-100" alt="Image ${idx}"></div>
                        <div class="card-body">
                            <a class="card-title h5 text-decoration-none" href="#">${item.name}</a>
                            <p class="card-text">${item.description}</p>
                        </div>
                    </div>
                </div>
            `));
            listSliderContainer.append(listSliderItem);
        });
    })
    .then(() => {
        var listSlider = document.querySelector('#list-slider .carousel');
  
        if (window.matchMedia("(min-width: 768px)").matches) {
          var carousel = new bootstrap.Carousel(listSlider, { interval: false });
          var carouselWidth = $('#list-slider .carousel-inner')[0].scrollWidth;
          var cardWidth = $('#list-slider .carousel-item').width();
          var scrollPos = 0;
  
          $('.carousel-control-prev', listSlider).on('click', function () {
            console.log('Prev');
            if (scrollPos > 0) {
              scrollPos -= cardWidth;
              $('#list-slider .carousel-inner').animate({ scrollLeft: scrollPos }, 500);
            }
          });
  
          $('.carousel-control-next', listSlider).on('click', function () {
            console.log('Next');
            if (scrollPos < carouselWidth - cardWidth) {
              scrollPos += cardWidth;
              $('#list-slider .carousel-inner').animate({ scrollLeft: scrollPos }, 500);
            }
          });
        }
    });

    // News
    

});