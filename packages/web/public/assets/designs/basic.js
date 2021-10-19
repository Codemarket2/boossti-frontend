function _tabs(n) {
  var html = '';
  for (var i = 1; i <= n; i++) {
    html += '\t';
  }
  return '\n' + html;
}

var data_basic = {
  designs: [
    {
      thumbnail: 'preview/01.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-light-text is-box">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(2) +
        '<div class="is-overlay-color"></div>' +
        _tabs(2) +
        '<div class="is-overlay-content"></div>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-centered is-opacity-95">' +
        _tabs(3) +
        '<div class="is-container is-builder container is-content-800">' +
        _tabs(4) +
        '<div class="row clearfix">' +
        _tabs(5) +
        '<div class="column full">' +
        _tabs(6) +
        '<div class="display">' +
        _tabs(7) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(7) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/02.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-centered">' +
        _tabs(3) +
        '<div class="is-container is-builder container is-content-800">' +
        _tabs(4) +
        '<div class="row clearfix">' +
        _tabs(5) +
        '<div class="column full">' +
        _tabs(6) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(6) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/03.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-4 is-box-img is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-8 is-box">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-640 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/04.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-8 is-box">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-640 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-4 is-box-img is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/05.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/06.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/15.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-4 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90 is-content-bottom">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h2>Lorem Ipsum</h2>' +
        _tabs(8) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-4 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90 is-content-bottom">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h2>Lorem Ipsum</h2>' +
        _tabs(8) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-4 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90 is-content-bottom">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h2>Lorem Ipsum</h2>' +
        _tabs(8) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/16.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90 is-content-bottom">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h2>Lorem Ipsum is simply dummy text</h2>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-light-text is-box">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(4) +
        '<div class="is-overlay-color"></div>' +
        _tabs(4) +
        '<div class="is-overlay-content"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-opacity-90 is-content-bottom">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h2>Lorem Ipsum is simply dummy text</h2>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/17.png',
      category: '1',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-boxed-layout is-box">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);" data-bottom-top="transform:translateY(-120px) scale(1.05);" data-top-bottom="transform:translateY(120px) scale(1.05)"></div>' +
        _tabs(2) +
        '<div class="is-overlay-color"></div>' +
        _tabs(2) +
        '<div class="is-overlay-content"></div>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-centered is-opacity-90">' +
        _tabs(3) +
        '<div class="is-container is-builder is-content-1100 container">' +
        _tabs(4) +
        '<div class="row clearfix">' +
        _tabs(5) +
        '<div class="column full">' +
        _tabs(6) +
        '<div class="display">' +
        _tabs(7) +
        '<h1>Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        _tabs(7) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    /* SLIDER */

    /*
    {
		'thumbnail': 'preview/24.png',
		'category': '2',
		'googleFonts': [],
		'contentCss': '',
		'contentClass': '',
		'html':
                '<div class="is-section is-section-100 is-box is-align-left is-bg-grey is-light-text">' +
                    _tabs(1) + '<div class="is-overlay">' +
                        _tabs(2) + '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="' +
                        
                        encodeURIComponent('' +
                        '<svg width="0" height="0" style="position:absolute;display:none;">' +
                            '<defs>' +
                                '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left"><path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path></symbol>' +
                                '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right"><path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path></symbol>' +
                            '</defs>' +
                        '</svg>' +
                        '<div id="{id}" class="glide" style="display:none">' +
                            '<div data-glide-el="track" class="glide__track">' +
                                '<ul class="glide__slides">' +
                                    '<li class="glide__slide">' +
                                        '<div data-subblock><img data-image-embed data-noresize data-sync src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide2.jpg" alt="" /></div>' +
                                        '<div class="is-slider-caption" style="left:4vw;bottom:4vw">Lorem Ipsum</div>' +
                                    '</li>' +
                                    '<li class="glide__slide">' +
                                        '<div data-subblock><img data-image-embed data-noresize data-sync src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide3.jpg" alt="" /></div>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                            '' +
                            '<div class="glide__arrows" data-glide-el="controls">' +
                                '<button class="glide__arrow glide__arrow--left" data-glide-dir="<"><svg class="is-icon-flex"><use xlink:href="#ion-ios-arrow-left"></use></svg></button>' +
                                '<button class="glide__arrow glide__arrow--right" data-glide-dir=">"><svg class="is-icon-flex"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                            '</div>' +
                        '</div>' +
                        '' +
                        '<scr' + 'ipt>' +
                            'var docReady = function (fn) {' +
                                'var stateCheck = setInterval(function () {' +
                                    'if (document.readyState !== "complete") return;' +
                                    'clearInterval(stateCheck);' +
                                    'try { fn() } catch (e) { }' +
                                '}, 1);' +
                            '};' +
                            'docReady(function () {' +
                                'document.querySelector("#{id}").style.display="";' +
                                'var _{id} = new Glide("#{id}", {' +
                                    'type: "carousel",' +
                                    'autoplay: false,' +
                                    'animationDuration: 1000,' +
                                    'gap: 0,' +
                                    'perView: 1,' +
                                    'hoverpause: true,' +
                                    'arrow: true,' +
                                    'dots: false,' +
                                '}).mount();' +
                                '_cleanClonedItems();' +
                            '});' +
                            'function _cleanClonedItems() {' +
                                'var clones = document.querySelectorAll(".glide__slide--clone");' +
                                'Array.prototype.forEach.call(clones, function(clone){' +
                                    'clone.removeAttribute("data-subblock");' +
                                    'clone.childNodes[0].removeAttribute("data-subblock");' +
                                '});' +
                            '}' +
                            '' +
                        '</scr' + 'ipt>' +
                        '') +
                        
                        '" data-settings="' +

                        encodeURIComponent('' +
                        '{' +
                            '"type": "carousel",' +
                            '"autoplay":false,' +
                            '"animationDuration":1000,' +
                            '"gap":0,' +
                            '"perView":1,' +
                            '"hoverpause":true,' +
                            '"arrow":true,' +
                            '"dots":false' +
                        '}') + '">' +

                    '</div>' +

                    _tabs(1) + '</div>' +
                    _tabs(1) + '<div class="is-boxes">' +
                        _tabs(2) + '<div class="is-box-centered">' +
                            _tabs(3) + '<div class="is-container is-builder is-content-640 container">' +
                                _tabs(4) + '<div class="row clearfix">' +
                                    _tabs(5) + '<div class="column full">' +
            		                    _tabs(6) + '<div class="display">' +
                		                    _tabs(7) + '<h1>Lorem Ipsum is simply dummy text</h1>' +
                                            _tabs(7) + '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
            		                    _tabs(6) + '</div>' +
                                    _tabs(5) + '</div>' +
                                _tabs(4) + '</div>' +
                            _tabs(3) + '</div>' +
                        _tabs(2) + '</div>' +
                    _tabs(1) + '</div>' +
                '\n</div>'
        },
        */

    {
      thumbnail: 'preview/24.png',
      category: '2',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box is-align-left is-bg-grey is-light-text">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="%3Cdiv%20id%3D%22{id}%22%20class%3D%22slider-on-box%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3B%22%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample2.jpg)%3B%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample1.jpg)%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%3E%0Avar%20docReady%3Dfunction(fn)%7Bvar%20stateCheck%3DsetInterval(function%20()%7Bif(document.readyState!%3D%3D%22complete%22)return%3BclearInterval(stateCheck)%3Btry%7Bfn()%7Dcatch(e)%7B%7D%7D%2C1)%3B%7D%3B%0AdocReady(function()%20%7B%0AjQuery(%22%23{id}%22).slick(%7B%0Adots%3A%20false%2Carrows%3A%20true%2Cinfinite%3A%20true%2Cspeed%3A%20500%2CcssEase%3A%20%22linear%22%2CslidesToShow%3A%201%2Cautoplay%3A%20true%2CautoplaySpeed%3A%203000%2Cfade%3A%20false%2CadaptiveHeight%3A%20true%2Cresponsive%3A%20%5B%7Bbreakpoint%3A%20480%2Csettings%3A%20%7Barrows%3A%20false%2CslidesToShow%3A%201%7D%7D%5D%0A%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E" data-settings="%5B%7B%22auto%22%3Atrue%2C%22arrow%22%3Atrue%2C%22dots%22%3Afalse%2C%22fade%22%3Afalse%2C%22height%22%3A%22100%25%22%2C%22images%22%3A%5B%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample2.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22550%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%2C%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample1.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22550%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%5D%7D%5D"></div>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-centered">' +
        _tabs(3) +
        '<div class="is-container is-builder is-content-640 container">' +
        _tabs(4) +
        '<div class="row clearfix">' +
        _tabs(5) +
        '<div class="column full">' +
        _tabs(6) +
        '<div class="display">' +
        _tabs(7) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(7) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/25.png',
      category: '2',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-align-left is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="%3Cdiv%20id%3D%22{id}%22%20class%3D%22slider-on-box%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3B%22%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample2.jpg)%3B%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample1.jpg)%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%3E%0Avar%20docReady%3Dfunction(fn)%7Bvar%20stateCheck%3DsetInterval(function%20()%7Bif(document.readyState!%3D%3D%22complete%22)return%3BclearInterval(stateCheck)%3Btry%7Bfn()%7Dcatch(e)%7B%7D%7D%2C1)%3B%7D%3B%0AdocReady(function()%20%7B%0AjQuery(%22%23{id}%22).slick(%7B%0Adots%3A%20false%2Carrows%3A%20true%2Cinfinite%3A%20true%2Cspeed%3A%20500%2CcssEase%3A%20%22linear%22%2CslidesToShow%3A%201%2Cautoplay%3A%20true%2CautoplaySpeed%3A%203000%2Cfade%3A%20false%2CadaptiveHeight%3A%20true%2Cresponsive%3A%20%5B%7Bbreakpoint%3A%20480%2Csettings%3A%20%7Barrows%3A%20false%2CslidesToShow%3A%201%7D%7D%5D%0A%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E" data-settings="%5B%7B%22auto%22%3Atrue%2C%22arrow%22%3Atrue%2C%22dots%22%3Afalse%2C%22fade%22%3Afalse%2C%22height%22%3A%22100%25%22%2C%22images%22%3A%5B%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample2.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%2C%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample1.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%5D%7D%5D"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/26.png',
      category: '2',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-align-left is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="%3Cdiv%20id%3D%22{id}%22%20class%3D%22slider-on-box%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3B%22%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample2.jpg)%3B%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample1.jpg)%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%3E%0Avar%20docReady%3Dfunction(fn)%7Bvar%20stateCheck%3DsetInterval(function%20()%7Bif(document.readyState!%3D%3D%22complete%22)return%3BclearInterval(stateCheck)%3Btry%7Bfn()%7Dcatch(e)%7B%7D%7D%2C1)%3B%7D%3B%0AdocReady(function()%20%7B%0AjQuery(%22%23{id}%22).slick(%7B%0Adots%3A%20false%2Carrows%3A%20true%2Cinfinite%3A%20true%2Cspeed%3A%20500%2CcssEase%3A%20%22linear%22%2CslidesToShow%3A%201%2Cautoplay%3A%20true%2CautoplaySpeed%3A%203000%2Cfade%3A%20false%2CadaptiveHeight%3A%20true%2Cresponsive%3A%20%5B%7Bbreakpoint%3A%20480%2Csettings%3A%20%7Barrows%3A%20false%2CslidesToShow%3A%201%7D%7D%5D%0A%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E" data-settings="%5B%7B%22auto%22%3Atrue%2C%22arrow%22%3Atrue%2C%22dots%22%3Afalse%2C%22fade%22%3Afalse%2C%22height%22%3A%22100%25%22%2C%22images%22%3A%5B%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample2.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%2C%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample1.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%5D%7D%5D"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/27.png',
      category: '2',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box is-align-left is-bg-grey is-light-text">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="%3Cdiv%20id%3D%22{id}%22%20class%3D%22slider-on-box%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3B%22%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample2.jpg)%3B%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample1.jpg)%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%3E%0Avar%20docReady%3Dfunction(fn)%7Bvar%20stateCheck%3DsetInterval(function%20()%7Bif(document.readyState!%3D%3D%22complete%22)return%3BclearInterval(stateCheck)%3Btry%7Bfn()%7Dcatch(e)%7B%7D%7D%2C1)%3B%7D%3B%0AdocReady(function()%20%7B%0AjQuery(%22%23{id}%22).slick(%7B%0Adots%3A%20false%2Carrows%3A%20true%2Cinfinite%3A%20true%2Cspeed%3A%20500%2CcssEase%3A%20%22linear%22%2CslidesToShow%3A%201%2Cautoplay%3A%20true%2CautoplaySpeed%3A%203000%2Cfade%3A%20false%2CadaptiveHeight%3A%20true%2Cresponsive%3A%20%5B%7Bbreakpoint%3A%20480%2Csettings%3A%20%7Barrows%3A%20false%2CslidesToShow%3A%201%7D%7D%5D%0A%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E" data-settings="%5B%7B%22auto%22%3Atrue%2C%22arrow%22%3Atrue%2C%22dots%22%3Afalse%2C%22fade%22%3Afalse%2C%22height%22%3A%22100%25%22%2C%22images%22%3A%5B%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample2.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22550%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%2C%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample1.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22550%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%5D%7D%5D"></div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/28.png',
      category: '2',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-align-left is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="%3Cdiv%20id%3D%22{id}%22%20class%3D%22slider-on-box%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3B%22%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample2.jpg)%3B%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample1.jpg)%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%3E%0Avar%20docReady%3Dfunction(fn)%7Bvar%20stateCheck%3DsetInterval(function%20()%7Bif(document.readyState!%3D%3D%22complete%22)return%3BclearInterval(stateCheck)%3Btry%7Bfn()%7Dcatch(e)%7B%7D%7D%2C1)%3B%7D%3B%0AdocReady(function()%20%7B%0AjQuery(%22%23{id}%22).slick(%7B%0Adots%3A%20false%2Carrows%3A%20true%2Cinfinite%3A%20true%2Cspeed%3A%20500%2CcssEase%3A%20%22linear%22%2CslidesToShow%3A%201%2Cautoplay%3A%20true%2CautoplaySpeed%3A%203000%2Cfade%3A%20false%2CadaptiveHeight%3A%20true%2Cresponsive%3A%20%5B%7Bbreakpoint%3A%20480%2Csettings%3A%20%7Barrows%3A%20false%2CslidesToShow%3A%201%7D%7D%5D%0A%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E" data-settings="%5B%7B%22auto%22%3Atrue%2C%22arrow%22%3Atrue%2C%22dots%22%3Afalse%2C%22fade%22%3Afalse%2C%22height%22%3A%22100%25%22%2C%22images%22%3A%5B%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample2.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%2C%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample1.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%5D%7D%5D"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/29.png',
      category: '2',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-align-left is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content content-selectable" data-module="slider" data-module-desc="Slider" data-html="%3Cdiv%20id%3D%22{id}%22%20class%3D%22slider-on-box%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3B%22%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample2.jpg)%3B%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22is-boxes%20slider-image%22%20style%3D%22background-image%3Aurl([%IMAGE_PATH%]images/sample1.jpg)%3B%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cscript%3E%0Avar%20docReady%3Dfunction(fn)%7Bvar%20stateCheck%3DsetInterval(function%20()%7Bif(document.readyState!%3D%3D%22complete%22)return%3BclearInterval(stateCheck)%3Btry%7Bfn()%7Dcatch(e)%7B%7D%7D%2C1)%3B%7D%3B%0AdocReady(function()%20%7B%0AjQuery(%22%23{id}%22).slick(%7B%0Adots%3A%20false%2Carrows%3A%20true%2Cinfinite%3A%20true%2Cspeed%3A%20500%2CcssEase%3A%20%22linear%22%2CslidesToShow%3A%201%2Cautoplay%3A%20true%2CautoplaySpeed%3A%203000%2Cfade%3A%20false%2CadaptiveHeight%3A%20true%2Cresponsive%3A%20%5B%7Bbreakpoint%3A%20480%2Csettings%3A%20%7Barrows%3A%20false%2CslidesToShow%3A%201%7D%7D%5D%0A%7D)%3B%0A%7D)%3B%0A%3C%2Fscript%3E" data-settings="%5B%7B%22auto%22%3Atrue%2C%22arrow%22%3Atrue%2C%22dots%22%3Afalse%2C%22fade%22%3Afalse%2C%22height%22%3A%22100%25%22%2C%22images%22%3A%5B%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample2.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%2C%7B%22src%22%3A%20%22[%IMAGE_PATH%]images/sample1.jpg%22%2C%20%22caption%22%3A%20%22%22%2C%20%22link%22%3A%20%22%22%2C%20%22width%22%3A%20%22450%22%2C%20%22position%22%3A%20%22bottom%20left%22%7D%5D%7D%5D"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    /* VIDEO */

    {
      thumbnail: 'preview/30.png',
      category: '3',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box is-bg-grey is-light-text">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-content" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="335px" ' +
        'data-html="' +
        encodeURIComponent(
          '' +
            _tabs(3) +
            '<video class="is-video-bg" playsinline autoplay muted loop>' +
            _tabs(4) +
            '<source src="[%IMAGE_PATH%]videos/example1.mp4" type="video/mp4">' +
            _tabs(3) +
            '</video>' +
            _tabs(3) +
            '<div class="is-overlay-video"></div>' +
            _tabs(2)
        ) +
        '"' +
        'data-settings="' +
        encodeURIComponent(
          '[{ "mp4": "[%IMAGE_PATH%]videos/example1.mp4", "poster": "", "overlay": 0.25}]'
        ) +
        '">' +
        '</div>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-centered is-content-bottom is-opacity-85">' +
        _tabs(3) +
        '<div class="is-container is-builder is-content-640 is-content-left container">' +
        _tabs(4) +
        '<div class="row clearfix">' +
        _tabs(5) +
        '<div class="column full">' +
        _tabs(6) +
        '<div class="display">' +
        _tabs(7) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(7) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/31.png',
      category: '3',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="335px" ' +
        'data-html="' +
        encodeURIComponent(
          '' +
            _tabs(5) +
            '<video class="is-video-bg" playsinline autoplay muted loop>' +
            _tabs(6) +
            '<source src="[%IMAGE_PATH%]videos/example1.mp4" type="video/mp4">' +
            _tabs(5) +
            '</video>' +
            _tabs(5) +
            '<div class="is-overlay-video"></div>' +
            _tabs(4)
        ) +
        '"' +
        'data-settings="' +
        encodeURIComponent(
          '[{ "mp4": "[%IMAGE_PATH%]videos/example1.mp4", "poster": "", "overlay": 0.25}]'
        ) +
        '">' +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-content-bottom is-opacity-85">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 is-content-left container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/32.png',
      category: '3',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="335px" ' +
        'data-html="' +
        encodeURIComponent(
          '' +
            _tabs(5) +
            '<video class="is-video-bg" playsinline autoplay muted loop>' +
            _tabs(6) +
            '<source src="[%IMAGE_PATH%]videos/example1.mp4" type="video/mp4">' +
            _tabs(5) +
            '</video>' +
            _tabs(5) +
            '<div class="is-overlay-video"></div>' +
            _tabs(4)
        ) +
        '"' +
        'data-settings="' +
        encodeURIComponent(
          '[{ "mp4": "[%IMAGE_PATH%]videos/example1.mp4", "poster": "", "overlay": 0.25}]'
        ) +
        '">' +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-content-bottom is-opacity-85">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 is-content-left container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/33.png',
      category: '3',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box is-bg-grey is-dark-text">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-content" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="335px" ' +
        'data-html="' +
        encodeURIComponent(
          '' +
            _tabs(3) +
            '<video class="is-video-bg" playsinline autoplay muted loop>' +
            _tabs(4) +
            '<source src="[%IMAGE_PATH%]videos/example1.mp4" type="video/mp4">' +
            _tabs(3) +
            '</video>' +
            _tabs(3) +
            '<div class="is-overlay-video"></div>' +
            _tabs(2)
        ) +
        '"' +
        'data-settings="' +
        encodeURIComponent(
          '[{ "mp4": "[%IMAGE_PATH%]videos/example1.mp4", "poster": "", "overlay": 0.25}]'
        ) +
        '">' +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/34.png',
      category: '3',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-dark-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="335px" ' +
        'data-html="' +
        encodeURIComponent(
          '' +
            _tabs(5) +
            '<video class="is-video-bg" playsinline autoplay muted loop>' +
            _tabs(6) +
            '<source src="[%IMAGE_PATH%]videos/example1.mp4" type="video/mp4">' +
            _tabs(5) +
            '</video>' +
            _tabs(5) +
            '<div class="is-overlay-video"></div>' +
            _tabs(4)
        ) +
        '"' +
        'data-settings="' +
        encodeURIComponent(
          '[{ "mp4": "[%IMAGE_PATH%]videos/example1.mp4", "poster": "", "overlay": 0.25}]'
        ) +
        '">' +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/35.png',
      category: '3',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-dark-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="video-bg" data-module-desc="Video Background" data-dialog-width="600px" data-dialog-height="335px" ' +
        'data-html="' +
        encodeURIComponent(
          '' +
            _tabs(5) +
            '<video class="is-video-bg" playsinline autoplay muted loop>' +
            _tabs(6) +
            '<source src="[%IMAGE_PATH%]videos/example1.mp4" type="video/mp4">' +
            _tabs(5) +
            '</video>' +
            _tabs(5) +
            '<div class="is-overlay-video"></div>' +
            _tabs(4)
        ) +
        '"' +
        'data-settings="' +
        encodeURIComponent(
          '[{ "mp4": "[%IMAGE_PATH%]videos/example1.mp4", "poster": "", "overlay": 0.25}]'
        ) +
        '">' +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    /* CUSTOM CODE */

    {
      thumbnail: 'preview/18.png',
      category: '4',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box is-bg-grey is-light-text">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="%3C!--%20EXAMPLE%3A%20Background%20Animation%20--%3E%0A%0A%3Cdiv%20style%3D%22overflow%3Ahidden%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3Bbackground%3Alinear-gradient(25deg%2C%23b1301c%2C%23fdecb0)%3B%22%3E%0A%3Ccanvas%20id%3D%22{id}%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3B%22%3E%3C%2Fcanvas%3E%0A%3C%2Fdiv%3E%0A%0A%3Cscript%3E%0A%0A(function()%20%7B%0A%0A%09var%20canvas%20%3D%20document.getElementById(&#39;{id}&#39;)%3B%0A%09var%20ctx%20%3D%20canvas.getContext(&#39;2d&#39;)%3B%0A%0A%09var%20ww%20%3D%20%24(window).width()%3B%0A%09var%20wh%20%3D%20%24(window).height()%3B%0A%0A%09canvas.width%20%3D%20ww%3B%0A%09canvas.height%3D%20wh%3B%0A%0A%09var%20partCount%20%3D%20100%3B%0A%09var%20particles%20%3D%20%5B%5D%3B%0A%0A%09window.addEventListener(&#39;resize&#39;%2C%20function()%7B%0A%09%09ww%20%3D%20%24(window).width()%3B%0A%09%09wh%20%3D%20%24(window).height()%3B%0A%09%09canvas.width%20%3D%20ww%3B%0A%09%09canvas.height%3D%20wh%3B%0A%0A%09%09clearCanvas()%3B%0A%09%09particles%20%3D%20%5B%5D%3B%0A%0A%09%09init()%3B%0A%09%7D)%3B%0A%09%0A%09particle%20%3D%20function()%7B%0A%09%09this.color%20%3D%20&#39;rgba(255%2C255%2C255%2C&#39;%2B%20Math.random()%2B&#39;)&#39;%3B%0A%09%09this.x%20%3D%20randomInt(0%2Cww)%3B%0A%09%09this.y%20%3D%20randomInt(0%2Cwh)%3B%0A%09%09this.direction%20%3D%20%7B%0A%09%09%09%22x%22%3A%20-1%20%2B%20Math.random()%20*%2012%2C%0A%09%09%09%22y%22%3A%20-1%20%2B%20Math.random()%20*%2012%0A%09%09%7D%3B%0A%09%09this.vx%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.vy%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.radius%20%3D%20randomInt(2%2C3)%3B%0A%09%09this.float%20%3D%20function()%7B%0A%09%09%09this.x%20%2B%3D%20this.vx%20*%20this.direction.x%3B%0A%09%09%09this.y%20%2B%3D%20this.vy%20*%20this.direction.y%3B%0A%09%09%7D%3B%0A%09%09this.changeDirection%20%3D%20function%20(axis)%20%7B%0A%09%09%09this.direction%5Baxis%5D%20*%3D%20-1%3B%0A%09%09%7D%3B%0A%09%0A%09%09this.boundaryCheck%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.x%20%3E%3D%20ww)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%20ww%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.x%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.y%20%3E%3D%20wh)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%20wh%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.y%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%3B%0A%09%09%0A%09%09this.draw%20%3D%20function%20()%20%7B%0A%09%09%09ctx.beginPath()%3B%0A%09%09%09ctx.fillStyle%20%3D%20this.color%3B%0A%09%09%09ctx.arc(this.x%2C%20this.y%2C%20this.radius%2C%200%2C%20Math.PI%20*%202%2C%20false)%3B%0A%09%09%09ctx.fill()%3B%0A%09%09%7D%3B%0A%09%7D%0A%0A%09function%20init%20()%20%7B%0A%09%09createParticles()%3B%0A%09%09drawParticles()%3B%0A%09%7D%0A%0A%09function%20animate()%20%7B%0A%20%20%20%20%20%20%20%20clearCanvas()%3B%0A%20%20%20%20%20%20%20%20drawParticles()%3B%0A%20%20%20%20%20%20%20%20updateParticles()%3B%0A%20%20%20%20%20%20%20%20requestAnimationFrame(animate)%3B%0A%09%7D%0A%20%20%0A%09function%20clearCanvas()%20%7B%0A%09%09ctx.clearRect(0%2C%200%2C%20ww%2C%20wh)%3B%0A%09%7D%0A%0A%09function%20createParticles()%7B%0A%09%09for%20(i%3D0%3Bi%3CpartCount%3Bi%2B%2B)%7B%0A%09%09%09var%20p%20%3D%20new%20particle()%3B%0A%09%09%09particles.push(p)%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20drawParticles()%20%7B%0A%09%09for%20(i%3D0%3Bi%3Cparticles.length%3Bi%2B%2B)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.draw()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20updateParticles()%20%7B%0A%09%09for%20(var%20i%20%3D%20particles.length%20-%201%3B%20i%20%3E%3D%200%3B%20i--)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.float()%3B%0A%09%09%09p.boundaryCheck()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20randomInt(min%2Cmax)%20%7B%0A%09%09return%20Math.floor(Math.random()*(max-min%2B1)%2Bmin)%3B%0A%09%7D%0A%09%0A%09init()%3B%0A%09animate()%3B%0A%0A%7D).call(this)%3B%0A%0A%3C%2Fscript%3E"></div>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-centered is-content-bottom is-opacity-90">' +
        _tabs(3) +
        '<div class="is-container is-builder is-content-640 is-content-left container">' +
        _tabs(4) +
        '<div class="row clearfix">' +
        _tabs(5) +
        '<div class="column full">' +
        _tabs(6) +
        '<div class="display">' +
        _tabs(7) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(7) +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/19.png',
      category: '4',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="%3C!--%20EXAMPLE%3A%20Background%20Animation%20--%3E%0A%0A%3Cdiv%20style%3D%22overflow%3Ahidden%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3Bbackground%3Alinear-gradient(25deg%2C%23b1301c%2C%23fdecb0)%3B%22%3E%0A%3Ccanvas%20id%3D%22{id}%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3B%22%3E%3C%2Fcanvas%3E%0A%3C%2Fdiv%3E%0A%0A%3Cscript%3E%0A%0A(function()%20%7B%0A%0A%09var%20canvas%20%3D%20document.getElementById(&#39;{id}&#39;)%3B%0A%09var%20ctx%20%3D%20canvas.getContext(&#39;2d&#39;)%3B%0A%0A%09var%20ww%20%3D%20%24(window).width()%3B%0A%09var%20wh%20%3D%20%24(window).height()%3B%0A%0A%09canvas.width%20%3D%20ww%3B%0A%09canvas.height%3D%20wh%3B%0A%0A%09var%20partCount%20%3D%20100%3B%0A%09var%20particles%20%3D%20%5B%5D%3B%0A%0A%09window.addEventListener(&#39;resize&#39;%2C%20function()%7B%0A%09%09ww%20%3D%20%24(window).width()%3B%0A%09%09wh%20%3D%20%24(window).height()%3B%0A%09%09canvas.width%20%3D%20ww%3B%0A%09%09canvas.height%3D%20wh%3B%0A%0A%09%09clearCanvas()%3B%0A%09%09particles%20%3D%20%5B%5D%3B%0A%0A%09%09init()%3B%0A%09%7D)%3B%0A%09%0A%09particle%20%3D%20function()%7B%0A%09%09this.color%20%3D%20&#39;rgba(255%2C255%2C255%2C&#39;%2B%20Math.random()%2B&#39;)&#39;%3B%0A%09%09this.x%20%3D%20randomInt(0%2Cww)%3B%0A%09%09this.y%20%3D%20randomInt(0%2Cwh)%3B%0A%09%09this.direction%20%3D%20%7B%0A%09%09%09%22x%22%3A%20-1%20%2B%20Math.random()%20*%2012%2C%0A%09%09%09%22y%22%3A%20-1%20%2B%20Math.random()%20*%2012%0A%09%09%7D%3B%0A%09%09this.vx%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.vy%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.radius%20%3D%20randomInt(2%2C3)%3B%0A%09%09this.float%20%3D%20function()%7B%0A%09%09%09this.x%20%2B%3D%20this.vx%20*%20this.direction.x%3B%0A%09%09%09this.y%20%2B%3D%20this.vy%20*%20this.direction.y%3B%0A%09%09%7D%3B%0A%09%09this.changeDirection%20%3D%20function%20(axis)%20%7B%0A%09%09%09this.direction%5Baxis%5D%20*%3D%20-1%3B%0A%09%09%7D%3B%0A%09%0A%09%09this.boundaryCheck%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.x%20%3E%3D%20ww)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%20ww%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.x%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.y%20%3E%3D%20wh)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%20wh%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.y%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%3B%0A%09%09%0A%09%09this.draw%20%3D%20function%20()%20%7B%0A%09%09%09ctx.beginPath()%3B%0A%09%09%09ctx.fillStyle%20%3D%20this.color%3B%0A%09%09%09ctx.arc(this.x%2C%20this.y%2C%20this.radius%2C%200%2C%20Math.PI%20*%202%2C%20false)%3B%0A%09%09%09ctx.fill()%3B%0A%09%09%7D%3B%0A%09%7D%0A%0A%09function%20init%20()%20%7B%0A%09%09createParticles()%3B%0A%09%09drawParticles()%3B%0A%09%7D%0A%0A%09function%20animate()%20%7B%0A%20%20%20%20%20%20%20%20clearCanvas()%3B%0A%20%20%20%20%20%20%20%20drawParticles()%3B%0A%20%20%20%20%20%20%20%20updateParticles()%3B%0A%20%20%20%20%20%20%20%20requestAnimationFrame(animate)%3B%0A%09%7D%0A%20%20%0A%09function%20clearCanvas()%20%7B%0A%09%09ctx.clearRect(0%2C%200%2C%20ww%2C%20wh)%3B%0A%09%7D%0A%0A%09function%20createParticles()%7B%0A%09%09for%20(i%3D0%3Bi%3CpartCount%3Bi%2B%2B)%7B%0A%09%09%09var%20p%20%3D%20new%20particle()%3B%0A%09%09%09particles.push(p)%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20drawParticles()%20%7B%0A%09%09for%20(i%3D0%3Bi%3Cparticles.length%3Bi%2B%2B)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.draw()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20updateParticles()%20%7B%0A%09%09for%20(var%20i%20%3D%20particles.length%20-%201%3B%20i%20%3E%3D%200%3B%20i--)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.float()%3B%0A%09%09%09p.boundaryCheck()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20randomInt(min%2Cmax)%20%7B%0A%09%09return%20Math.floor(Math.random()*(max-min%2B1)%2Bmin)%3B%0A%09%7D%0A%09%0A%09init()%3B%0A%09animate()%3B%0A%0A%7D).call(this)%3B%0A%0A%3C%2Fscript%3E"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-content-bottom is-opacity-90">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 is-content-left container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/20.png',
      category: '4',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-light-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="%3C!--%20EXAMPLE%3A%20Background%20Animation%20--%3E%0A%0A%3Cdiv%20style%3D%22overflow%3Ahidden%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3Bbackground%3Alinear-gradient(25deg%2C%23b1301c%2C%23fdecb0)%3B%22%3E%0A%3Ccanvas%20id%3D%22{id}%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3B%22%3E%3C%2Fcanvas%3E%0A%3C%2Fdiv%3E%0A%0A%3Cscript%3E%0A%0A(function()%20%7B%0A%0A%09var%20canvas%20%3D%20document.getElementById(&#39;{id}&#39;)%3B%0A%09var%20ctx%20%3D%20canvas.getContext(&#39;2d&#39;)%3B%0A%0A%09var%20ww%20%3D%20%24(window).width()%3B%0A%09var%20wh%20%3D%20%24(window).height()%3B%0A%0A%09canvas.width%20%3D%20ww%3B%0A%09canvas.height%3D%20wh%3B%0A%0A%09var%20partCount%20%3D%20100%3B%0A%09var%20particles%20%3D%20%5B%5D%3B%0A%0A%09window.addEventListener(&#39;resize&#39;%2C%20function()%7B%0A%09%09ww%20%3D%20%24(window).width()%3B%0A%09%09wh%20%3D%20%24(window).height()%3B%0A%09%09canvas.width%20%3D%20ww%3B%0A%09%09canvas.height%3D%20wh%3B%0A%0A%09%09clearCanvas()%3B%0A%09%09particles%20%3D%20%5B%5D%3B%0A%0A%09%09init()%3B%0A%09%7D)%3B%0A%09%0A%09particle%20%3D%20function()%7B%0A%09%09this.color%20%3D%20&#39;rgba(255%2C255%2C255%2C&#39;%2B%20Math.random()%2B&#39;)&#39;%3B%0A%09%09this.x%20%3D%20randomInt(0%2Cww)%3B%0A%09%09this.y%20%3D%20randomInt(0%2Cwh)%3B%0A%09%09this.direction%20%3D%20%7B%0A%09%09%09%22x%22%3A%20-1%20%2B%20Math.random()%20*%2012%2C%0A%09%09%09%22y%22%3A%20-1%20%2B%20Math.random()%20*%2012%0A%09%09%7D%3B%0A%09%09this.vx%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.vy%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.radius%20%3D%20randomInt(2%2C3)%3B%0A%09%09this.float%20%3D%20function()%7B%0A%09%09%09this.x%20%2B%3D%20this.vx%20*%20this.direction.x%3B%0A%09%09%09this.y%20%2B%3D%20this.vy%20*%20this.direction.y%3B%0A%09%09%7D%3B%0A%09%09this.changeDirection%20%3D%20function%20(axis)%20%7B%0A%09%09%09this.direction%5Baxis%5D%20*%3D%20-1%3B%0A%09%09%7D%3B%0A%09%0A%09%09this.boundaryCheck%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.x%20%3E%3D%20ww)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%20ww%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.x%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.y%20%3E%3D%20wh)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%20wh%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.y%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%3B%0A%09%09%0A%09%09this.draw%20%3D%20function%20()%20%7B%0A%09%09%09ctx.beginPath()%3B%0A%09%09%09ctx.fillStyle%20%3D%20this.color%3B%0A%09%09%09ctx.arc(this.x%2C%20this.y%2C%20this.radius%2C%200%2C%20Math.PI%20*%202%2C%20false)%3B%0A%09%09%09ctx.fill()%3B%0A%09%09%7D%3B%0A%09%7D%0A%0A%09function%20init%20()%20%7B%0A%09%09createParticles()%3B%0A%09%09drawParticles()%3B%0A%09%7D%0A%0A%09function%20animate()%20%7B%0A%20%20%20%20%20%20%20%20clearCanvas()%3B%0A%20%20%20%20%20%20%20%20drawParticles()%3B%0A%20%20%20%20%20%20%20%20updateParticles()%3B%0A%20%20%20%20%20%20%20%20requestAnimationFrame(animate)%3B%0A%09%7D%0A%20%20%0A%09function%20clearCanvas()%20%7B%0A%09%09ctx.clearRect(0%2C%200%2C%20ww%2C%20wh)%3B%0A%09%7D%0A%0A%09function%20createParticles()%7B%0A%09%09for%20(i%3D0%3Bi%3CpartCount%3Bi%2B%2B)%7B%0A%09%09%09var%20p%20%3D%20new%20particle()%3B%0A%09%09%09particles.push(p)%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20drawParticles()%20%7B%0A%09%09for%20(i%3D0%3Bi%3Cparticles.length%3Bi%2B%2B)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.draw()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20updateParticles()%20%7B%0A%09%09for%20(var%20i%20%3D%20particles.length%20-%201%3B%20i%20%3E%3D%200%3B%20i--)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.float()%3B%0A%09%09%09p.boundaryCheck()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20randomInt(min%2Cmax)%20%7B%0A%09%09return%20Math.floor(Math.random()*(max-min%2B1)%2Bmin)%3B%0A%09%7D%0A%09%0A%09init()%3B%0A%09animate()%3B%0A%0A%7D).call(this)%3B%0A%0A%3C%2Fscript%3E"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered is-content-bottom is-opacity-90">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 is-content-left container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<div class="display">' +
        _tabs(9) +
        '<h1>Lorem Ipsum is dummy text</h1>' +
        _tabs(9) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(8) +
        '</div>' +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/21.png',
      category: '4',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box is-bg-grey is-dark-text">' +
        _tabs(1) +
        '<div class="is-overlay">' +
        _tabs(2) +
        '<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="%3C!--%20EXAMPLE%3A%20Typed%20Animation%20--%3E%0A%0A%3Cdiv%20style%3D%22display%3Atable%3Bwidth%3A100%25%3Bheight%3A100%25%3Bbackground%3Alinear-gradient(25deg%2C%23b1301c%2C%23fdecb0)%22%3E%0A%3Cdiv%20class%3D%22display%22%20style%3D%22display%3A%20table-cell%3Bvertical-align%3A%20middle%3Btext-align%3A%20center%3Bpadding%3A%200%2020px%22%3E%0A%0A%3Ch1%20style%3D%22color%3Argba(255%2C255%2C255%2C0.8)%22%3EWe%20design%20cool%20%3Cspan%20id%3D%22{id}%22%20style%3D%22color%3Argba(255%2C255%2C255%2C0.8)%22%3E%3C%2Fspan%3E%3C%2Fh1%3E%0A%0A%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%0A%3Cscript%3E%0AloadScript(%22https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Ftyped.js%2F1.1.1%2Ftyped.min.js%22%2C%0A%20%20%20%20function()%7B%0A%20%20%20%20%20%20%24(%22%23{id}%22).typed(%7B%0A%20%20%20%20%20%20%20%20strings%3A%20%5B%22website.%22%2C%20%22android%20app.%22%2C%20%22iphone%20app.%22%2C%20%22pc%20software.%22%2C%20%22online%20shop.%22%5D%2C%0A%20%20%20%20%20%20%20%20typeSpeed%3A%201%2C%0A%20%20%20%20%20%20%20%20loop%3A%20true%2C%0A%20%20%20%20%20%20%20%20backDelay%3A%201000%0A%20%20%20%20%20%20%7D)%3B%0A%20%20%7D)%3B%0A%0Afunction%20loadScript(url%2C%20callback)%20%7B%0A%0A%20%20%20%20var%20script%20%3D%20document.createElement(%22script%22)%0A%20%20%20%20script.type%20%3D%20%22text%2Fjavascript%22%3B%0A%0A%20%20%20%20if%20(script.readyState)%20%7B%20%20%2F%2FIE%0A%20%20%20%20%20%20%20%20script.onreadystatechange%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(script.readyState%20%3D%3D%20%22loaded%22%20%7C%7C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20script.readyState%20%3D%3D%20%22complete%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20script.onreadystatechange%20%3D%20null%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20callback()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%20else%20%7B%20%20%2F%2FOthers%0A%20%20%20%20%20%20%20%20script.onload%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20callback()%3B%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20script.src%20%3D%20url%3B%0A%20%20%20%20document.body.appendChild(script)%3B%0A%7D%0A%3C%2Fscript%3E%0A%0A%3Cstyle%20scoped%3E%0A.typed-cursor%7B%0A%20%20%20%20color%3Argba(255%2C255%2C255%2C0.8)%20!important%3B%0A%20%20%20%20opacity%3A%201%3B%0A%20%20%20%20-webkit-animation%3A%20blink%200.7s%20infinite%3B%0A%20%20%20%20-moz-animation%3A%20blink%200.7s%20infinite%3B%0A%20%20%20%20animation%3A%20blink%200.7s%20infinite%3B%0A%7D%0A%40keyframes%20blink%7B%0A%20%20%20%200%25%20%7B%20opacity%3A1%3B%20%7D%0A%20%20%20%2050%25%20%7B%20opacity%3A0%3B%20%7D%0A%20%20%20%20100%25%20%7B%20opacity%3A1%3B%20%7D%0A%7D%0A%40-webkit-keyframes%20blink%7B%0A%20%20%20%200%25%20%7B%20opacity%3A1%3B%20%7D%0A%20%20%20%2050%25%20%7B%20opacity%3A0%3B%20%7D%0A%20%20%20%20100%25%20%7B%20opacity%3A1%3B%20%7D%0A%7D%0A%40-moz-keyframes%20blink%7B%0A%20%20%20%200%25%20%7B%20opacity%3A1%3B%20%7D%0A%20%20%20%2050%25%20%7B%20opacity%3A0%3B%20%7D%0A%20%20%20%20100%25%20%7B%20opacity%3A1%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E%0A%0A"></div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/22.png',
      category: '4',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-dark-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="%3C!--%20EXAMPLE%3A%20Background%20Animation%20--%3E%0A%0A%3Cdiv%20style%3D%22overflow%3Ahidden%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3Bbackground%3Alinear-gradient(25deg%2C%23b1301c%2C%23fdecb0)%3B%22%3E%0A%3Ccanvas%20id%3D%22{id}%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3B%22%3E%3C%2Fcanvas%3E%0A%3C%2Fdiv%3E%0A%0A%3Cscript%3E%0A%0A(function()%20%7B%0A%0A%09var%20canvas%20%3D%20document.getElementById(&#39;{id}&#39;)%3B%0A%09var%20ctx%20%3D%20canvas.getContext(&#39;2d&#39;)%3B%0A%0A%09var%20ww%20%3D%20%24(window).width()%3B%0A%09var%20wh%20%3D%20%24(window).height()%3B%0A%0A%09canvas.width%20%3D%20ww%3B%0A%09canvas.height%3D%20wh%3B%0A%0A%09var%20partCount%20%3D%20100%3B%0A%09var%20particles%20%3D%20%5B%5D%3B%0A%0A%09window.addEventListener(&#39;resize&#39;%2C%20function()%7B%0A%09%09ww%20%3D%20%24(window).width()%3B%0A%09%09wh%20%3D%20%24(window).height()%3B%0A%09%09canvas.width%20%3D%20ww%3B%0A%09%09canvas.height%3D%20wh%3B%0A%0A%09%09clearCanvas()%3B%0A%09%09particles%20%3D%20%5B%5D%3B%0A%0A%09%09init()%3B%0A%09%7D)%3B%0A%09%0A%09particle%20%3D%20function()%7B%0A%09%09this.color%20%3D%20&#39;rgba(255%2C255%2C255%2C&#39;%2B%20Math.random()%2B&#39;)&#39;%3B%0A%09%09this.x%20%3D%20randomInt(0%2Cww)%3B%0A%09%09this.y%20%3D%20randomInt(0%2Cwh)%3B%0A%09%09this.direction%20%3D%20%7B%0A%09%09%09%22x%22%3A%20-1%20%2B%20Math.random()%20*%2012%2C%0A%09%09%09%22y%22%3A%20-1%20%2B%20Math.random()%20*%2012%0A%09%09%7D%3B%0A%09%09this.vx%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.vy%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.radius%20%3D%20randomInt(2%2C3)%3B%0A%09%09this.float%20%3D%20function()%7B%0A%09%09%09this.x%20%2B%3D%20this.vx%20*%20this.direction.x%3B%0A%09%09%09this.y%20%2B%3D%20this.vy%20*%20this.direction.y%3B%0A%09%09%7D%3B%0A%09%09this.changeDirection%20%3D%20function%20(axis)%20%7B%0A%09%09%09this.direction%5Baxis%5D%20*%3D%20-1%3B%0A%09%09%7D%3B%0A%09%0A%09%09this.boundaryCheck%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.x%20%3E%3D%20ww)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%20ww%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.x%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.y%20%3E%3D%20wh)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%20wh%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.y%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%3B%0A%09%09%0A%09%09this.draw%20%3D%20function%20()%20%7B%0A%09%09%09ctx.beginPath()%3B%0A%09%09%09ctx.fillStyle%20%3D%20this.color%3B%0A%09%09%09ctx.arc(this.x%2C%20this.y%2C%20this.radius%2C%200%2C%20Math.PI%20*%202%2C%20false)%3B%0A%09%09%09ctx.fill()%3B%0A%09%09%7D%3B%0A%09%7D%0A%0A%09function%20init%20()%20%7B%0A%09%09createParticles()%3B%0A%09%09drawParticles()%3B%0A%09%7D%0A%0A%09function%20animate()%20%7B%0A%20%20%20%20%20%20%20%20clearCanvas()%3B%0A%20%20%20%20%20%20%20%20drawParticles()%3B%0A%20%20%20%20%20%20%20%20updateParticles()%3B%0A%20%20%20%20%20%20%20%20requestAnimationFrame(animate)%3B%0A%09%7D%0A%20%20%0A%09function%20clearCanvas()%20%7B%0A%09%09ctx.clearRect(0%2C%200%2C%20ww%2C%20wh)%3B%0A%09%7D%0A%0A%09function%20createParticles()%7B%0A%09%09for%20(i%3D0%3Bi%3CpartCount%3Bi%2B%2B)%7B%0A%09%09%09var%20p%20%3D%20new%20particle()%3B%0A%09%09%09particles.push(p)%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20drawParticles()%20%7B%0A%09%09for%20(i%3D0%3Bi%3Cparticles.length%3Bi%2B%2B)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.draw()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20updateParticles()%20%7B%0A%09%09for%20(var%20i%20%3D%20particles.length%20-%201%3B%20i%20%3E%3D%200%3B%20i--)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.float()%3B%0A%09%09%09p.boundaryCheck()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20randomInt(min%2Cmax)%20%7B%0A%09%09return%20Math.floor(Math.random()*(max-min%2B1)%2Bmin)%3B%0A%09%7D%0A%09%0A%09init()%3B%0A%09animate()%3B%0A%0A%7D).call(this)%3B%0A%0A%3C%2Fscript%3E"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    {
      thumbnail: 'preview/23.png',
      category: '4',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        _tabs(1) +
        '<div class="is-boxes">' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-light is-dark-text">' +
        _tabs(3) +
        '<div class="is-boxes">' +
        _tabs(4) +
        '<div class="is-box-centered">' +
        _tabs(5) +
        '<div class="is-container is-builder is-content-500 container">' +
        _tabs(6) +
        '<div class="row clearfix">' +
        _tabs(7) +
        '<div class="column full">' +
        _tabs(8) +
        '<h1>Lorem Ipsum is simply dummy text</h1>' +
        _tabs(8) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(7) +
        '</div>' +
        _tabs(6) +
        '</div>' +
        _tabs(5) +
        '</div>' +
        _tabs(4) +
        '</div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<div class="is-box-6 is-box is-bg-grey is-dark-text">' +
        _tabs(3) +
        '<div class="is-overlay">' +
        _tabs(4) +
        '<div class="is-overlay-content" data-module="code" data-module-desc="Custom HTML or Javascript " data-html="%3C!--%20EXAMPLE%3A%20Background%20Animation%20--%3E%0A%0A%3Cdiv%20style%3D%22overflow%3Ahidden%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3Bbackground%3Alinear-gradient(25deg%2C%23b1301c%2C%23fdecb0)%3B%22%3E%0A%3Ccanvas%20id%3D%22{id}%22%20style%3D%22width%3A100%25%3Bheight%3A100%25%3Bposition%3Aabsolute%3B%22%3E%3C%2Fcanvas%3E%0A%3C%2Fdiv%3E%0A%0A%3Cscript%3E%0A%0A(function()%20%7B%0A%0A%09var%20canvas%20%3D%20document.getElementById(&#39;{id}&#39;)%3B%0A%09var%20ctx%20%3D%20canvas.getContext(&#39;2d&#39;)%3B%0A%0A%09var%20ww%20%3D%20%24(window).width()%3B%0A%09var%20wh%20%3D%20%24(window).height()%3B%0A%0A%09canvas.width%20%3D%20ww%3B%0A%09canvas.height%3D%20wh%3B%0A%0A%09var%20partCount%20%3D%20100%3B%0A%09var%20particles%20%3D%20%5B%5D%3B%0A%0A%09window.addEventListener(&#39;resize&#39;%2C%20function()%7B%0A%09%09ww%20%3D%20%24(window).width()%3B%0A%09%09wh%20%3D%20%24(window).height()%3B%0A%09%09canvas.width%20%3D%20ww%3B%0A%09%09canvas.height%3D%20wh%3B%0A%0A%09%09clearCanvas()%3B%0A%09%09particles%20%3D%20%5B%5D%3B%0A%0A%09%09init()%3B%0A%09%7D)%3B%0A%09%0A%09particle%20%3D%20function()%7B%0A%09%09this.color%20%3D%20&#39;rgba(255%2C255%2C255%2C&#39;%2B%20Math.random()%2B&#39;)&#39;%3B%0A%09%09this.x%20%3D%20randomInt(0%2Cww)%3B%0A%09%09this.y%20%3D%20randomInt(0%2Cwh)%3B%0A%09%09this.direction%20%3D%20%7B%0A%09%09%09%22x%22%3A%20-1%20%2B%20Math.random()%20*%2012%2C%0A%09%09%09%22y%22%3A%20-1%20%2B%20Math.random()%20*%2012%0A%09%09%7D%3B%0A%09%09this.vx%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.vy%20%3D%200.3%20*%20Math.random()%3B%0A%09%09this.radius%20%3D%20randomInt(2%2C3)%3B%0A%09%09this.float%20%3D%20function()%7B%0A%09%09%09this.x%20%2B%3D%20this.vx%20*%20this.direction.x%3B%0A%09%09%09this.y%20%2B%3D%20this.vy%20*%20this.direction.y%3B%0A%09%09%7D%3B%0A%09%09this.changeDirection%20%3D%20function%20(axis)%20%7B%0A%09%09%09this.direction%5Baxis%5D%20*%3D%20-1%3B%0A%09%09%7D%3B%0A%09%0A%09%09this.boundaryCheck%20%3D%20function%20()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.x%20%3E%3D%20ww)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%20ww%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.x%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.x%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22x%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.y%20%3E%3D%20wh)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%20wh%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(this.y%20%3C%3D%200)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.y%20%3D%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.changeDirection(%22y%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%3B%0A%09%09%0A%09%09this.draw%20%3D%20function%20()%20%7B%0A%09%09%09ctx.beginPath()%3B%0A%09%09%09ctx.fillStyle%20%3D%20this.color%3B%0A%09%09%09ctx.arc(this.x%2C%20this.y%2C%20this.radius%2C%200%2C%20Math.PI%20*%202%2C%20false)%3B%0A%09%09%09ctx.fill()%3B%0A%09%09%7D%3B%0A%09%7D%0A%0A%09function%20init%20()%20%7B%0A%09%09createParticles()%3B%0A%09%09drawParticles()%3B%0A%09%7D%0A%0A%09function%20animate()%20%7B%0A%20%20%20%20%20%20%20%20clearCanvas()%3B%0A%20%20%20%20%20%20%20%20drawParticles()%3B%0A%20%20%20%20%20%20%20%20updateParticles()%3B%0A%20%20%20%20%20%20%20%20requestAnimationFrame(animate)%3B%0A%09%7D%0A%20%20%0A%09function%20clearCanvas()%20%7B%0A%09%09ctx.clearRect(0%2C%200%2C%20ww%2C%20wh)%3B%0A%09%7D%0A%0A%09function%20createParticles()%7B%0A%09%09for%20(i%3D0%3Bi%3CpartCount%3Bi%2B%2B)%7B%0A%09%09%09var%20p%20%3D%20new%20particle()%3B%0A%09%09%09particles.push(p)%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20drawParticles()%20%7B%0A%09%09for%20(i%3D0%3Bi%3Cparticles.length%3Bi%2B%2B)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.draw()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20updateParticles()%20%7B%0A%09%09for%20(var%20i%20%3D%20particles.length%20-%201%3B%20i%20%3E%3D%200%3B%20i--)%20%7B%0A%09%09%09p%20%3D%20particles%5Bi%5D%3B%0A%09%09%09p.float()%3B%0A%09%09%09p.boundaryCheck()%3B%0A%09%09%7D%0A%09%7D%0A%0A%09function%20randomInt(min%2Cmax)%20%7B%0A%09%09return%20Math.floor(Math.random()*(max-min%2B1)%2Bmin)%3B%0A%09%7D%0A%09%0A%09init()%3B%0A%09animate()%3B%0A%0A%7D).call(this)%3B%0A%0A%3C%2Fscript%3E"></div>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>',
    },

    /* OPTIONAL MODULE SECTIONS (FOR CUSTOM CMS). NOT USED IN STANDARD CONTENTBOX PACKAGE. */

    {
      thumbnail: 'preview/07.png',
      category: '51',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-stretch is-box">' +
        '<div>' +
        '<div class="is-module"></div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/08.png',
      category: '51',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered">' +
        '<div class="is-container container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-module"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/09.png',
      category: '51',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        '<div class="is-boxes">' +
        '<div class="is-box-4 is-box-img is-box">' +
        '<div class="is-overlay">' +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);"></div>' +
        '<div class="is-overlay-color"></div>' +
        '<div class="is-overlay-content"></div>' +
        '</div>' +
        '</div>' +
        '<div class="is-box-8 is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered">' +
        '<div class="is-container is-content-800 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-module"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/10.png',
      category: '51',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        '<div class="is-boxes">' +
        '<div class="is-box-8 is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered">' +
        '<div class="is-container is-content-800 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-module"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="is-box-4 is-box-img is-box">' +
        '<div class="is-overlay">' +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);"></div>' +
        '<div class="is-overlay-color"></div>' +
        '<div class="is-overlay-content"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/11.png',
      category: '51',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        '<div class="is-boxes">' +
        '<div class="is-box-6 is-light-text is-box">' +
        '<div class="is-overlay">' +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);"></div>' +
        '<div class="is-overlay-color"></div>' +
        '<div class="is-overlay-content"></div>' +
        '</div>' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered is-opacity-95">' +
        '<div class="is-container is-builder is-content-640 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<h1 style="margin:0.2em 0">Lorem Ipsum is dummy text</h1>' +
        '</div>' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="is-box-6 is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered">' +
        '<div class="is-container is-content-640 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-module"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/12.png',
      category: '51',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        '<div class="is-boxes">' +
        '<div class="is-box-6 is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered">' +
        '<div class="is-container is-content-640 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-module"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="is-box-6 is-light-text is-box">' +
        '<div class="is-overlay">' +
        '<div class="is-overlay-bg" style="background-image: url([%IMAGE_PATH%]images/sample1.jpg);"></div>' +
        '<div class="is-overlay-color"></div>' +
        '<div class="is-overlay-content"></div>' +
        '</div>' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered is-opacity-95">' +
        '<div class="is-container is-builder is-content-640 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<h1 style="margin:0.2em 0">Lorem Ipsum is dummy text</h1>' +
        '</div>' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    /* OPTIONAL PLACEHOLDER SECTIONS (FOR CUSTOM CMS). NOT USED IN STANDARD CONTENTBOX PACKAGE. */

    {
      thumbnail: 'preview/13.png',
      category: '52',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        '<div class="is-boxes">' +
        '<div class="is-box-7 is-bg-light is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered is-content-top">' +
        '<div class="is-container is-builder is-content-800 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<h1 style="margin:0.2em 0">Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        '</div>' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="is-box-5 is-bg-grey is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered is-content-top">' +
        '<div class="is-container is-content-500 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-placeholder"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/14.png',
      category: '52',
      googleFonts: [],
      contentCss: '',
      contentClass: '',
      html:
        '<div class="is-section is-section-100 is-shadow-1">' +
        '<div class="is-boxes">' +
        '<div class="is-box-5 is-bg-grey is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered is-content-top">' +
        '<div class="is-container is-content-500 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-placeholder"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="is-box-7 is-bg-light is-box">' +
        '<div class="is-boxes">' +
        '<div class="is-box-centered is-content-top">' +
        '<div class="is-container is-builder is-content-800 container">' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<h1 style="margin:0.2em 0">Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        '</div>' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },
  ],
};
