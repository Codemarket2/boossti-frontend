/* v3.1 */
function _tabs(n) {
  var html = '';
  for (var i = 1; i <= n; i++) {
    html += '\t';
  }
  return '\n' + html;
}

// source: https: //stackoverflow.com/questions/2255689/how-to-get-the-file-path-of-the-currently-executing-javascript-code
function _path() {
  var scripts = document.querySelectorAll('script[src]');
  var currentScript = scripts[scripts.length - 1].src;
  var currentScriptChunks = currentScript.split('/');
  var currentScriptFile = currentScriptChunks[currentScriptChunks.length - 1];
  return currentScript.replace(currentScriptFile, '');
}
var _snippets_path = _path();

var data_basic = {
  snippets: [
    {
      thumbnail: 'preview/basic-01.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<h1>Beautiful Content. Responsive.</h1>' +
        '<p><i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</i></p>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-02.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-03.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1>Heading 1 Text Goes Here.</h1>' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-04.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h2>Heading 2 Text Goes Here.</h2>' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-05.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/oleg-laptev-545268-unsplash-VD7ll2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-06.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/jon-lalin-731093-unsplash-(1)-tdmMt1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-07.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adam-birkett-209727-unsplash-(2)-H2BMm1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },
    {
      thumbnail: 'preview/basic-08.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '<div class="column half">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-09.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<h1>Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-10.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        '<p>This is a special report</p>' +
        '<h1>Lorem Ipsum is simply dummy text of the printing industry</h1>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-11.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h2 class="size-48">Lorem Ipsum is simply dummy text</h2>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-12.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-13.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<hr>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-14.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        '<i class="icon ion-checkmark"></i>' +
        '<h3>List Item</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        '<i class="icon ion-checkmark"></i>' +
        '<h3>List Item</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-15.png',
      category: '120',
      html:
        '<div class="is-social">' +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        '\n<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        '\n<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/basic-16.png',
      category: '120',
      html:
        '<div class="is-rounded-button-medium" style="margin:1em 0">' +
        '<a href="https://twitter.com/" style="background-color: #00bfff;"><i class="icon ion-social-twitter"></i></a>' +
        '<a href="https://www.facebook.com/" style="background-color: #128BDB"><i class="icon ion-social-facebook"></i></a>' +
        '<a href="mailto:you@example.com" style="background-color: #DF311F"><i class="icon ion-ios-email-outline"></i></a>' +
        '</div>&nbsp;',
    },

    /* Video */
    {
      thumbnail: 'preview/element-video.png',
      category: '120',
      html:
        '<div class="embed-responsive embed-responsive-16by9">' +
        '<iframe width="560" height="315" src="//www.youtube.com/embed/P5yHEKqx86U?rel=0" frameborder="0" allowfullscreen=""></iframe>' +
        '</div>',
    },

    /* Map */
    {
      thumbnail: 'preview/element-map.png',
      category: '120',
      html:
        '<div class="embed-responsive embed-responsive-16by9">' +
        '<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" class="mg1" src="https://maps.google.com/maps?q=Melbourne,+Victoria,+Australia&amp;hl=en&amp;sll=-7.981898,112.626504&amp;sspn=0.009084,0.016512&amp;oq=melbourne&amp;hnear=Melbourne+Victoria,+Australia&amp;t=m&amp;z=10&amp;output=embed"></iframe>' +
        '</div>',
    },

    /* Slider */

    // Slider Module (Slick)
    {
      thumbnail: 'preview/element-slider.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full" data-noedit data-module="slider" data-module-desc="Slider" data-html="' +
        encodeURIComponent(
          '<div id="{id}" class="slider-on-content" style="width:100%;height:500px;display:none">' +
            '<div class="is-boxes slider-image" style="background-image: url(\'https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide1.jpg\');">' +
            '</div>' +
            '<div class="is-boxes slider-image" style="background-image: url(\'https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide2.jpg\');">' +
            '</div>' +
            '<div class="is-boxes slider-image" style="background-image: url(\'https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide3.jpg\');">' +
            '</div>' +
            '</div>' +
            '' +
            '<scr' +
            'ipt>' +
            'var docReady = function (fn) {' +
            'var stateCheck = setInterval(function () {' +
            'if (document.readyState !== "complete") return;' +
            'clearInterval(stateCheck);' +
            'try { fn() } catch (e) { }' +
            '}, 1);' +
            '};' +
            'docReady(function () {' +
            'jQuery("#{id}").css("display","block");' +
            'jQuery("#{id}").slick({' +
            'dots: true,' +
            'arrows: true,' +
            'infinite: true,' +
            'speed: 500,' +
            'cssEase: "linear",' +
            'slidesToShow: 1,' +
            'autoplay: false,' +
            'autoplaySpeed: 3000,' +
            'fade: false,' +
            'adaptiveHeight: true,' +
            'responsive: [' +
            '{breakpoint: 480, settings: {arrows: false,slidesToShow: 1}}' +
            ']' +
            '});' +
            '});' +
            '</scr' +
            'ipt>' +
            ''
        ) +
        '" data-settings="' +
        encodeURIComponent(
          '[' +
            '{' +
            '"auto":false,' +
            '"arrow":true,' +
            '"dots":true,' +
            '"fade":false,' +
            '"height":"500",' +
            '"images":' +
            '[' +
            '{' +
            '"src": "https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide1.jpg", ' +
            '"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"' +
            '},' +
            '{' +
            '"src": "https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide2.jpg", ' +
            '"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"' +
            '},' +
            '{' +
            '"src": "https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/slide3.jpg", ' +
            '"caption": "", "link": "", "width": "450", "align": "", "position": "bottom left"' +
            '}' +
            ']' +
            '}]'
        ) +
        '"' +
        '>' +
        '</div>' +
        '</div>',
    },

    // Slider Module (Glide) => Experimental
    {
      thumbnail: 'preview/element-slider.png',
      glide: true,
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full" data-noedit data-module="slider-content" data-dialog-width="500px" data-module-desc="Slider" data-html="' +
        encodeURIComponent(
          '' +
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
            '<scr' +
            'ipt>' +
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
            '</scr' +
            'ipt>' +
            ''
        ) +
        '" data-settings="' +
        encodeURIComponent(
          '' +
            '{' +
            '"type": "carousel",' +
            '"autoplay":false,' +
            '"animationDuration":1000,' +
            '"gap":0,' +
            '"perView":1,' +
            '"hoverpause":true,' +
            '"arrow":true,' +
            '"dots":false' +
            '}'
        ) +
        '">' +
        '</div>' +
        '</div>',
    },

    /* Custom Code */
    {
      thumbnail: 'preview/element-code.png',
      category: '120',
      html:
        '<div class="row clearfix">' +
        '<div class="column full" data-noedit data-html="' +
        encodeURIComponent(
          '<h1 id="{id}">Lorem ipsum</h1>' +
            '<p>This is a code block. You can edit this block using the source dialog.</p>' +
            '<scr' +
            'ipt>' +
            'var docReady = function (fn) {' +
            'var stateCheck = setInterval(function () {' +
            'if (document.readyState !== "complete") return;' +
            'clearInterval(stateCheck);' +
            'try{fn()}catch(e){}' +
            '}, 1);' +
            '};' +
            'docReady(function() {' +
            "document.querySelector('#{id}').innerHTML ='<b>Hello World..!</b>';" +
            '});' +
            '</scr' +
            'ipt>'
        ) +
        '">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-02.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-46">Flying High</h1>' +
        '\n<p style="border-bottom: 2px solid #e74c3c; width: 60px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-04.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<p class="size-16">A BEAUTIFUL DAY IN OCTOBER</p>' +
        _tabs(1) +
        '<h1 class="size-50">Time to think, time to create.</h1>' +
        '\n</div>' +
        '\n<p class="size-16">— By David Anderson</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-07.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-96" style="text-align: center; color: rgb(204, 204, 204); line-height: 1.2">Sunday Lovely Sunday.</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center;"><i style="color: rgb(204, 204, 204);">By Jennifer Anderson</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-08.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="color: rgb(136, 136, 136);">WORDS FROM ANDREW JONES</p>' +
        '\n<h1 class="size-60">Home is wherever I\'m with you.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-09.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-32 is-title5-32 is-title-lite"><i>Simplify Things</i></h1>' +
        '\n<p style="color: rgb(136, 136, 136);">Natasha Williams</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Vivamus leo ante, consectetur sit amet.&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-10.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<p class="size-18">EMILLIA JONES</p>' +
        _tabs(1) +
        '<h1 class="size-96" style="line-height: 1.3">Hello, Summer.</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum dolor sit amet, consectetur adipiscing elit.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-13.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-64">Slow Living</h1>' +
        '\n</div>' +
        '\n<p>Vivian C. Bailey</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '\n<p>Vivamus leo ante, consectetur sit amet vulputate vel, sit amet lectus.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-16.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-42" style="text-align: center;">Simple, Versatile, Functional</h1>' +
        _tabs(1) +
        '<p class="size-18" style="text-align: center; line-height: 2.2">JANE SMITH</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-23.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32 is-title5-32 is-title-lite" style="width:100%;max-width: 340px;">New Style</h1>' +
        '\n<p>By David Smith</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-25.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21" style="text-align: center; letter-spacing: 4px;"><i>the</i></p>' +
        '\n<h1 class="size-68" style="text-align: center; letter-spacing: 18px;">OCEAN</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: center">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel, dapibus sit amet lectus.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: center"><i>Spencer Lane</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-27.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-96">A Little Story</h1>' +
        '\n</div>' +
        '\n<p style="border-bottom: 3px solid #333; width: 80px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: right;">JOHN ANDERSON</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-30.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center;">My Summer</h1>' +
        '\n<p style="text-align: center;"><i><span style="color: rgb(136, 136, 136);">"Lorem Ipsum is simply dummy text of the printing and typesetting industry."<br>Jane Clark</span></i></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-31.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1>Simple, clean, bright</h1>' +
        '\n<p class="size-16">— Samantha Holmes</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-33.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<p class="size-18">EMMA STAUFER</p>' +
        _tabs(1) +
        '<h1 class="size-48" style="text-transform: none">Back to December</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-35.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-60">Happiness.</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet. Vimamus ante.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet.&nbsp;Vimamus ante.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;"><i>Bryan Lewis</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-39.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="padding-20">' +
        '<h1 class="size-48 is-title5-48 is-title-lite">Spring in March</h1>' +
        '</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur elit.</p>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<p class="size-16" style="text-align: right;">Irene Johnson</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-40.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-80">Twenty Four Minutes</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center;">William Norris</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-41.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-50" style="text-align: right; letter-spacing: 6px;">Early Morning Riser</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: right;"><i>Jeff Watkins</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-43.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32" style="text-align: center; letter-spacing: 3px;">BEAUTY OF NATURE</h1>' +
        '\n<hr>' +
        '\n<p class="size-14" style="text-align: center; letter-spacing: 4px;">DAVID ANDERSON</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-46.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32 is-title3-32 is-title-lite" style="text-align: center;">October & November</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: right;"><i>Sarah Anderson</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-49.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-46">just chillin\'</h1>' +
        '\n<p class="size-16"><i style="color: rgb(136, 136, 136);">"Lorem Ipsum is simply dummy text." — Anne Marry</i></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-50.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center;">Michelle Duncan</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-54" style="text-align: center;">IN LOVE WITH YOUR LIFE</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel, dapibus sit amet lectus.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-51.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32 is-title4-32 is-title-lite" style="display:inline-block">Behind you.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-14" style="text-align: justify;"><i>Brenda Waller</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-52.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: center; letter-spacing: 10px;">CLEAN</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center;"><i>Words from Michael Williams</i></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet. Vivamus ante.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet. Vivamus ante.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-54.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="width:100%;max-width:350px;">' +
        _tabs(1) +
        '<p>A STORY.</p>' +
        _tabs(1) +
        '<h1 class="size-38">THE WHEELS ARE SPINNING</h1>' +
        _tabs(1) +
        '<p class="size-16" style="color: rgb(136, 136, 136);">Casey Lansford</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-55.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite" style="text-align: center;">Brave</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel, dapibus sit amet.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-14" style="text-align: center; letter-spacing: 5px;">RUTH WATTERS</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-57.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-54" style="text-align: left; letter-spacing: 2px;">Keep everything Simple</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p class="size-16" style="text-align: justify;"><i><span style="color: rgb(147, 147, 147);">Words from:<br> Brandon Lamberth</span></i></p>' +
        '</div>' +
        '<div class="column two-third">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-58.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-64 is-title5-64 is-title-bold">hello...</h1>' +
        '\n<p class="size-16" style="text-transform: uppercase; letter-spacing: 4px;">Lorem Ipsum is simply dummy text of the printing industry</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: justify; letter-spacing: 2px;">Samantha Holmes</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-59.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="color: rgb(198, 198, 198); text-align: center;font-weight:bold">Go explore.</h1>' +
        '\n<p class="size-14" style="text-align: center;"><i>Russel Y. Trevino </i></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-60.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-transform: uppercase; letter-spacing: 4px;">Heart-warming story from<br>Wilhelmina Bradley</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-54">Best friend</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-61.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display" style="width:100%;max-width:400px;margin: 0 auto">' +
        _tabs(1) +
        '<h1 class="size-42" style="letter-spacing: 5px;">WORDS FROM HEART</h1>' +
        _tabs(1) +
        '<p class="size-14" style="color: rgb(136, 136, 136); letter-spacing: 4px;">Stephen Garcia</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/article-62.png',
      category: '118',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center; letter-spacing: 2px;">A STORY</p>' +
        '\n<h1 class="size-54" style="text-align: center; letter-spacing: 2px;">Dancing in Harmony</h1>' +
        '\n<p style="text-align: center;"><i>"Lorem Ipsum is simply dummy text of the printing."</i></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center; text-transform: uppercase; letter-spacing: 3px;">Annie Baldwin </p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante.</p>' +
        '</div>' +
        '</div>',
    },

    /* HEADLINE */

    {
      thumbnail: 'preview/header-02.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title4-48" style="letter-spacing:5px">STUNNING</h1>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-07.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-92" style="margin-bottom:0;">Outstanding</h1>' +
        _tabs(1) +
        '<p style="margin-top:0">Lorem Ipsum is dummy text of the printing and typesetting industry</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Contact Us</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-08.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<i class="icon ion-coffee size-80" style="line-height:1"></i>' +
        '\n<div class="display">' +
        _tabs(1) +
        '<h1 class="size-80">Café & Bistro</h1>' +
        '\n</div>' +
        '\n<p><i>Lorem Ipsum is simply dummy text</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-09.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1>Calm, Pure, and lovely</h1>' +
        _tabs(1) +
        "<p>Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type</p>" +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small edit">Shop Now</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-23.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-80 is-title1-80 is-title-lite">Pure & Healthy</h1>' +
        '\n</div>' +
        '\n<p class="size-21">Lorem Ipsum has been the industry\'s standard text ever since the 1500s, when an unknown printer took a galley of type</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Our Products</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-25.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<div class="display">' +
        _tabs(1) +
        '<p class="size-21 is-info2">Welcome to our coffee shop</p>' +
        _tabs(1) +
        '<h1 class="size-100" style="text-transform: none">Smell it, taste it.</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30">Browse Menu</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-26.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-60">Planning a memorable trip? You came to the right place.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper">CONTACT US</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-27.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<p class="size-21">We are Creative Agency in New York</p>' +
        _tabs(1) +
        '<h1 class="size-112"><b>CLEAN. SIMPLE.</b></h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper">Get A Quote</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-28.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-64">Good for Health, Good for You</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div style="margin: 10px 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30">All Products</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-32.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-108">Stitch Studio</h1>' +
        _tabs(1) +
        '<p>Join Our Sewing Classes & Craft Workshops</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small">Contact Us</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-34.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-120" style="letter-spacing: 10px;">Unique.</h1>' +
        _tabs(1) +
        '<p>PLAN YOUR SPECIAL DAY</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="font-weight: 200">Book a Consultation</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-38.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-104 is-title-lite">DREAM HOME</h1>' +
        '\n<p class="size-24">BEAUTIFY YOUR HOME WITH MODERN FURNITURE SET.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper">New Arrivals</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-41.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-48">We Create and Design Beautiful Websites</h1>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Our Works</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-42.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-132" style="letter-spacing: 8px;">Tasty</h1>' +
        _tabs(1) +
        '<p>Healthy & Natural Food</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full right">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30">Our Menu</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-43.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-100" style="letter-spacing: 7px;">Mike Watson</h1>' +
        _tabs(1) +
        '<p class="size-21">Expert in Public Interior Design</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">View Portfolio</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-46.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-80" style="text-transform: none">Monday to Friday</h1>' +
        _tabs(1) +
        '<p>We make shopping way easier and convenient for you</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper">View Collection</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-47.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 3px;">Struggling to find the perfect event organizer? No worries. We\'re here to help you creating the event like no other.</h1>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-48.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-bold" style="line-height:1.7">Design<br>in<br>Silence</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-140"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: right; font-style: italic;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an<br>unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-49.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-80 is-title1-80 is-title-bold" style="text-align: center; letter-spacing: 9px;">STUDIO</h1>' +
        '\n<p class="size-21" style="text-align: center; text-transform: uppercase; letter-spacing: 6px;">EVERY DETAIL MATTERS</p>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: center; font-style: normal;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">OUR WORKS</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-50.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-50" style="letter-spacing: 5px;">A MININALIST STYLE</h1>' +
        '\n<br>' +
        '\n<p style="border-bottom: 2px solid #000; width: 90px; display: inline-block; margin-top: 0"></p>' +
        '\n<p>Lorem Ipsum is dummy text of printing industry</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">View Gallery</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-51.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3 class="size-21" style="letter-spacing: 3px;">THE LOOKBOOK</h3>' +
        '\n<h1 class="size-64" style="letter-spacing: 5px;"><b style="font-weight: 800;">NEW </b>SUMMER <b style="font-weight: 800;">TRENDS.</b></h1>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-52.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21" style="text-align: center; letter-spacing: 10px;">TRAVEL AGENCY</p>' +
        '\n<h1 class="size-80" style="text-align: center; letter-spacing: 3px; font-style: normal;">Where Will You Go Today?</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="center" style="margin: 15px 0">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">View Destinations</a>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-53.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-32 is-title4-32 is-title-lite" style="display: inline-block; letter-spacing: 10px;">MARY EDWARDS</h1>' +
        '\n<p style="margin-top: 7px;">Web Developer & Graphic Designer</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-54.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3 class="size-21" style="letter-spacing: 5px;">Spring 2020</h3>' +
        '\n<h1 class="size-68" style="letter-spacing: 9px; font-style: italic;">IT\'S YOUR TIME TO SHINE</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="margin: 20px 0">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper">Contact Us</a>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-55.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<p style="text-transform: uppercase; letter-spacing: 6px;">Creative Agency</p>' +
        '\n<h1 class="size-76" style="letter-spacing: 5px; font-weight: bold; text-transform: uppercase;">Innovation</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Get a Quote</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-56.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: center; letter-spacing: 11px; text-transform: uppercase;">Hello Friends</p>' +
        '\n<h1 style="letter-spacing: 3px; text-align: center; text-transform: uppercase;">This is Dave. I Develop Websites and Design Beautiful Things You Will Love</h1>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-57.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-80 is-title1-80 is-title-bold" style="text-align: center;">now or never</h1>' +
        '\n<p style="text-align: center; letter-spacing: 5px;">MEN\'S CLOTHING</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: center;">Lorem Ipsum is simply dummy text of the printing and typesetting industry, vivamus leo ante.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-58.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-transform: uppercase; letter-spacing: 2px;">Love for Food</p>' +
        '\n<h1 class="size-60" style="letter-spacing: 5px; text-transform: uppercase;">Eat & Dream</h1>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '\n<p style="border-bottom: 1px solid #000; width: 80px; display: inline-block;"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-59.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-50" style="letter-spacing: 2px; font-weight: bold;">We design and build awesome products that make a difference.</h1>' +
        '\n<p style="text-transform: uppercase; letter-spacing: 3px;">Lorem Ipsum is simply dummy text</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-60.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: center;line-height:1.4;"><i class="icon ion-android-favorite-outline size-32"></i></p>' +
        '\n<p style="line-height: 1; text-transform: uppercase; letter-spacing: 7px;text-align: center;">HOME DECOR</p>' +
        '\n<h1 class="size-68" style="font-style: normal; letter-spacing: 5px;text-align: center;">A Reflection of You</h1>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p class="size-14" style="text-transform: uppercase; letter-spacing: 4px;text-align: center;">Modern / Functional / Timeless</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-61.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21" style="color: rgb(231, 102, 60);letter-spacing: 4px;margin-bottom: 0px;">CREATIVITY. PEOPLE.</p>' +
        '\n<p style="border-bottom: 2px solid #bfbfbf; width: 40px; display: inline-block; margin-top: 14px;"></p>' +
        '\n<h1 class="size-60" style="text-transform: uppercase; letter-spacing: 3px">A Place to <b>Connect</b></h1>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-63.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-88 is-title-bold" style="letter-spacing: 3px;">Scale.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-100"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        "<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-104.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-60" style="font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">EXPAND YOUR BUSINESS</h1>' +
        '\n<p style="font-style: italic;" class="size-21">We build awesome things that make a difference</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div><a href="#" style="margin-top: 0px;margin-right: 0px;margin-bottom: 0px;margin-left: 0px;display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;" title="">Contact Us</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-105.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-42" style="text-align: right; letter-spacing: 2px;">Made with Love</h1>' +
        '</div>' +
        '<div class="column third">' +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="column third">' +
        '<p>Lorem Ipsum is dummy text of printing industry.</p>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-106.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="letter-spacing: 6px; line-height: 1;">Creative Agency You Can Trust</p>' +
        '\n<h1 class="size-72" style="font-weight: bold; letter-spacing: 5px;">AWESOME</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div><a href="#" style="margin-top: 0px;margin-right: 0px;margin-bottom: 0px;margin-left: 0px;display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 21px; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;" title="">Get a Quote</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/header-107.png',
      category: '101',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-transform: uppercase; letter-spacing: 3px;">CREATIVE<br>INSPIRING</p>' +
        '\n<h1 class="size-92" style="letter-spacing: 3px;">Design for Delight</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    /* PHOTOS */

    //TODO START

    {
      thumbnail: 'preview/photos-51.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/jon-lalin-731093-unsplash-(1)-tdmMt1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adam-birkett-209727-unsplash-(2)-H2BMm1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-52.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/chuttersnap-413002-unsplash-83HqE1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/caroline-bertolini-270870-unsplash-1j5FB2.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/theo-roland-740436-unsplash-WqnWJ3.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-50.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/oleg-laptev-545268-unsplash-VD7ll2.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-47.png',
      category: '102',
      html:
        '<div class="row clearfix" style="margin-left:-100px;margin-right:-100px">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/oleg-laptev-545268-unsplash-VD7ll2.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-48.png',
      category: '102',
      html:
        '<div class="row clearfix" style="padding: 0;">' +
        '<div class="column half" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/jon-lalin-731093-unsplash-(1)-tdmMt1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column half" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adam-birkett-209727-unsplash-(2)-H2BMm1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-49.png',
      category: '102',
      html:
        '<div class="row clearfix" style="padding: 0;">' +
        '<div class="column third" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/chuttersnap-413002-unsplash-83HqE1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column third" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/caroline-bertolini-270870-unsplash-1j5FB2.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column third" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/theo-roland-740436-unsplash-WqnWJ3.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-46.png',
      category: '102',
      html:
        '<div class="row clearfix" style="padding: 0;">' +
        '<div class="column full" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/oleg-laptev-545268-unsplash-VD7ll2.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-53.png',
      category: '102',
      html:
        '<div class="row clearfix" style="padding: 0;">' +
        '<div class="column third" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/chuttersnap-413002-unsplash-83HqE1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column third" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/caroline-bertolini-270870-unsplash-1j5FB2.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column third" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/theo-roland-740436-unsplash-WqnWJ3.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix" style="padding: 0;">' +
        '<div class="column half" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/jon-lalin-731093-unsplash-(1)-tdmMt1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '<div class="column half" style="padding: 0;">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adam-birkett-209727-unsplash-(2)-H2BMm1.jpg" alt="" style="margin: 0;float: left;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-14.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite" style="text-align: center;">PORTFOLIO</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/pawel-czerwinski-1080345-unsplash-Zxz1W1.jpg" alt="">' +
        '\n<h3 class="size-21">IMAGE CAPTION</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text</p>' +
        '</div>' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/agata-create-1137058-unsplash-(1)-UvBs02.jpg" alt="">' +
        '\n<h3 class="size-21">IMAGE CAPTION</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-15.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite" style="text-align: center;">Gallery</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/monika-grabkowska-742426-unsplash-AtCtH1.jpg" alt="">' +
        '\n<h3 class="size-18">CAPTION</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">Lorem Ipsum is dummy text.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mira-bozhko-456995-YiVKC1.jpg" alt="">' +
        '\n<h3 class="size-18">CAPTION</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">Lorem Ipsum is dummy text.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/lauren-mancke-63448-unsplash-AtCtH2.jpg" alt="">' +
        '\n<h3 class="size-18">CAPTION</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">Lorem Ipsum is dummy text.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-16.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/susanne-schwarz-1142929-unsplash-IZGK11.jpg" alt="">' +
        '\n<h3 class="size-21">IMAGE CAPTION</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is dummy text of the printing industry</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-17.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-54" style="letter-spacing: 6px;">GALLERY</h1>' +
        '\n<p style="border-bottom: 2.5px solid #b5b5b5;width: 60px;display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="img-circular">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/art-materials-close-up-color-pencils-1484263-jT5E21.jpg" alt="">' +
        '</div>' +
        '\n<p class="size-14">Lorem Ipsum is dummy text</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/oleg-laptev-546607-unsplash-SKGb82.jpg" alt="">' +
        '</div>' +
        '\n<p class="size-14">Lorem Ipsum is dummy text</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/michal-grosicki-XG2yA3.jpg" alt="">' +
        '</div>' +
        '\n<p class="size-14">Lorem Ipsum is dummy text</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-18.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center;letter-spacing: 2px;color: rgb(191, 191, 191);font-weight: bold;">Gallery.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/remi-muller-359340-unsplash-JOL3q1.jpg" alt="">' +
        '\n<p><i>Lorem Ipsum is dummy text</i></p>' +
        '</div>' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/dlanor-s-591314-unsplash-maNC32.jpg" alt="">' +
        '\n<p><i>Lorem Ipsum is dummy text</i></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-19.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-38" style="letter-spacing: 1px;">Creative Things We\'ve Done</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/agata-create-1132088-unsplash-(1)-adQTO1.jpg" alt="">' +
        '\n<p>IMAGE CAPTION</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/lucrezia-carnelos-1127196-unsplash-Y7ahO2.jpg" alt="">' +
        '\n<p>IMAGE CAPTION</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bright-bulb-close-up-1166643-oof1G3.jpg" alt="">' +
        '\n<p>IMAGE CAPTION</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-20.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/omar-lopez-32084-8ciiC1.jpg" alt="">' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is dummy text of the printing industry</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-21.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-46" style="letter-spacing: 5px;">CREATIVE THINGS WE HAVE CREATED LATELY</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-ORebV1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/ian-dooley-298771-unsplash-Hu2RU3.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/daniel-klopper-1142809-unsplash-pToHm2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-22.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3 class="size-24" style="font-style: normal; letter-spacing: 2px;">Caption.</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is dummy text of the printing industry</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/anthony-tran-1076077-vcoLP1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-23.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rawpixel-1200191-unsplash-Ms1O81.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<h4 class="size-21" style="letter-spacing: 2px;">IMAGE CAPTION</h4>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-24.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h4 class="size-21" style="letter-spacing: 2px;">IMAGE CAPTION</h4>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/iman-soleimany-zadeh-1205567-unsplash-AUqMZ2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-25.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/maksym-zakharyak-688728-unsplash-p9w092.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-60"></div>' +
        '\n<h4 class="size-21" style="letter-spacing: 2px; text-align: right;">IMAGE CAPTION</h4>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: right; color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-26.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-60"></div>' +
        '\n<h4 class="size-21" style="letter-spacing: 2px;">IMAGE CAPTION</h4>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rodion-kutsaev-24833-unsplash-HEuVp1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-27.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/monica-galentino-102655-unsplash-gfbdC1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Vivamus leo ante.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-28.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Vivamus leo ante.</p>" +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rawpixel-1197453-unsplash-a7ozj2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-29.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-XstZ21.jpg" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-budQW2.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="font-style: normal; letter-spacing: 2px;">Caption.</h3>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-30.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="font-style: normal; letter-spacing: 2px;">Caption.</h3>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sarah-dorweiler-211779-unsplash-dN96G1.jpg" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/kris-atomic-39874-unsplash-vpMhe2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-35.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rawpixel-1197458-unsplash-J52N31.jpg" alt="">' +
        '</div>' +
        '<div class="column half right">' +
        '<h3 style="text-align: right; letter-spacing: 3px;">Image Caption</h3>' +
        '\n<p style="text-align: right;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Vivamus leo ante sit amet.</p>' +
        '\n<p style="border-bottom: 2px solid #000; width: 60px; display: inline-block;"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-36.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 3px;">Image Caption</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Vivamus leo ante sit amet.</p>" +
        '\n<p style="border-bottom: 2px solid #000; width: 60px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-5F3zm1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-37.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="padding-right:30px">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-4r9Fa1.jpg" alt="">' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-80"></div>' +
        '\n<h3 class="size-48" style="text-align: right; font-weight: bold;">Goodbye, things.</h3>' +
        '\n<div class="spacer height-80"></div>' +
        '\n<p style="text-align: right; color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-38.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-80"></div>' +
        '\n<h3 class="size-48" style="font-weight: bold;">Behold the Beauty.</h3>' +
        '\n<div class="spacer height-80"></div>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="padding-left:30px">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-lbizY1.jpg" alt="">' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-39.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-ocaLR1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-40"></div>' +
        '\n<h3 class="size-38" style="text-align: center; letter-spacing: 3px;">WORK <b>01</b></h3>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: center;">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-40"></div>' +
        '\n<h3 class="size-38" style="text-align: center; letter-spacing: 3px;">WORK <b>02</b></h3>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: center;">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-mHAa32.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-40.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-OJKzv1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<div class="spacer height-180"></div>' +
        '\n<h3 class="size-24" style="letter-spacing: 2px;">Image Caption</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-41.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="spacer height-180"></div>' +
        '\n<h3 class="size-24" style="letter-spacing: 2px;">Image Caption</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-I81sR1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-69.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="center column half">' +
        '<div class="img-circular" style="width:270px;height:270px"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/raychan-1667344-unsplash-5M5cC1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="margin-top: 25px; letter-spacing: 1px;">Image Caption</h3>' +
        '\n<div class="spacer height-20"></div>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-70.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="margin-top: 25px; letter-spacing: 1px;">Image Caption</h3>' +
        '\n<div class="spacer height-20"></div>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="center column half">' +
        '<div class="img-circular" style="width:270px;height:270px"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/kris-atomic-39874-unsplash-(1)-by2om1.jpg" alt=""></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-71.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center;">' +
        _tabs(1) +
        '<div class="img-circular" style="width:270px;height:270px"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/vashishtha-jogi-101218-unsplash-(1)-qLaZ61.jpg" alt=""></div>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<h3 class="size-21" style="letter-spacing: 1px;">IMAGE CAPTION</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is simply dummy text of the printing industry</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center;">' +
        _tabs(1) +
        '<div class="img-circular" style="width:270px;height:270px"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/karl-jk-hedin-614069-unsplash-wq2fh2.jpg" alt=""></div>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<h3 class="size-21" style="letter-spacing: 1px;">IMAGE CAPTION</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is simply dummy text of the printing industry</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-72.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="margin:25px 0;width:270px;height:270px"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mae-mu-1634728-unsplash-YfIdG1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-20"></div>' +
        '\n<h3 class="size-38" style="letter-spacing: 3px;"><b class="size-42">01</b></h3>' +
        '\n<div class="spacer height-20"></div>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting  industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-20"></div>' +
        '\n<h3 class="size-38" style="letter-spacing: 3px;"><b class="size-42">02</b></h3>' +
        '\n<div class="spacer height-20"></div>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="column half center">' +
        '<div class="img-circular" style="margin:25px 0;width:270px;height:270px"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mae-mu-1675094-unsplash-mIDqg2.jpg" alt=""></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-73.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/inside-weather-dbh_vy7vice-unsplash-DALMx1.jpg" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<h4 style="font-style: italic; letter-spacing: 2px;">Caption</h4>' +
        '\n<p>Lorem Ipsum is simply dummy text</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-74.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<h4 style="font-style: italic; letter-spacing: 2px;">Caption</h4>' +
        '\n<p>Lorem Ipsum is simply dummy text</p>' +
        '</div>' +
        '<div class="column two-fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/inside-weather-bayizhkkjm4-unsplash-VhybU2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-75.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/phil-desforges-kp7p0-drgbg-unsplash-uoCld1.jpg" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/carl-revell-woxtqpbubpu-unsplash-qDOYv1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bibarys-ibatolla-xotjdtjyfws-unsplash-qDOYv2.jpg" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bruno-abatti-xzer0sqkpee-unsplash-rfD4g3.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-24" style="letter-spacing: 2px;">Caption</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-76.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-24" style="letter-spacing: 2px;">Caption</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/kelly-sikkema-mdadgzyxcve-unsplash-HLpZE1.jpg" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/drew-patrick-miller-15omq1s9de0-unsplash-mWuF91.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/fabrice-villard-du41jiai5ww-unsplash-RmVMS2.jpg" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/yusuf-evli-djqx057gbc0-unsplash-Vx3x11.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-77.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 1px;">Gallery</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/ruben-bagues-vpqfc4nidh0-unsplash-9uqtu2.jpg" alt="">' +
        '\n<p style="text-align: center; color: rgb(149, 149, 149);margin-top:0">Image Caption</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mitch-lensink-hx_dy7xeszo-unsplash-xpg6d1.jpg" alt="">' +
        '\n<p style="text-align: center; color: rgb(149, 149, 149);margin-top:0">Image Caption</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-IlCYO1.jpg" alt="">' +
        '\n<p style="text-align: center; color: rgb(149, 149, 149);margin-top:0">Image Caption</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/annie-spratt-e82beol6l2y-unsplash-eItnZ2.jpg" alt="">' +
        '\n<p style="text-align: center; color: rgb(149, 149, 149);margin-top:0">Image Caption</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/davide-ragusa-atutapqj4zw-unsplash-sQQiM1.jpg" alt="">' +
        '\n<p style="text-align: center; color: rgb(149, 149, 149);margin-top:0">Image Caption</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/julie-kwak-fry-tptmjrk-unsplash-3Rlxu2.jpg" alt="">' +
        '\n<p style="text-align: center; color: rgb(149, 149, 149);margin-top:0">Image Caption</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-78.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 1px;">Gallery</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/silvia-agrasar-227575-21Sbp1.jpg" alt="">' +
        '\n<p style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/silvia-agrasar-227135-unsplash-EPxWp2.jpg" alt="">' +
        '\n<p style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-79.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 1px;">Latest Works</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/snapbythree-my-yif5f2kao_y-unsplash-2G89F1.jpg" alt="">' +
        '</div>' +
        '<div class="column two-third">' +
        '<p style="text-align: justify; color: rgb(149, 149, 149);"><b>Caption</b><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<p style="text-align: justify; color: rgb(149, 149, 149);"><b>Caption</b><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/daniel-schludi-mbgxz7pt0jm-unsplash-2G89F2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-80.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 1px;">Portfolio</h1>' +
        '\n<p style="color: rgb(149, 149, 149);" class="size-16">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/luke-southern-hyvittjtkpi-unsplash-tXBIU1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/luke-southern-k5o-cuu9e6g-unsplash-zop4J2.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/liliana-olivares-g56o5l0zvmg-unsplash-yieQU3.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/photos-81.png',
      category: '102',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/herdian-indraputra-6knvj1fr3ug-unsplash-3aMS13.jpg" alt="">' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/yi-sk-u7yek0lrzmg-unsplash-KNpU64.jpg" alt="">' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    //TODO END

    {
      thumbnail: 'preview/profile-01.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">MEET OUR TEAM</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bangkit-ristant-395541-e0mhz1.jpg" alt=""></div>' +
        '\n<h3 class="size-21" style="letter-spacing: 2px;">VINCENT NELSON</h3>' +
        '\n<p style="color: #b7b7b7">WEB DESIGNER</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/redd-angelo-427759-33bDf2.jpg" alt=""></div>' +
        '\n<h3 class="size-21" style="letter-spacing: 2px;">NATHAN WILLIAMS</h3>' +
        '\n<p style="color: #b7b7b7">WEB DEVELOPER</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mads-schmidt-rasmussen-186319-8AVbA1.jpg" alt=""></div>' +
        '\n<h3 class="size-21" style="letter-spacing: 2px;">THOMAS CALVIN</h3>' +
        '\n<p style="color: #b7b7b7">ACCOUNT MANAGER</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-02.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">HIGHLY QUALIFIED TEAM</h1>' +
        '\n<p style="border-bottom: 2px solid #e74c3c; width: 60px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/samuel-zeller-413072-Tx4ai1.jpg" alt="">' +
        '\n<h3 class="size-21 is-title-lite">JENNIFER ASH</h3>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/michael-236683-Tx4ai2.jpg" alt="">' +
        '\n<h3 class="size-21 is-title-lite">MICHAEL ISON</h3>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/michael-221247-Hspxi3.jpg" alt="">' +
        '\n<h3 class="size-21 is-title-lite">JOHN CONWAY</h3>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-03.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 3px;">MEET THE EXPERTS</h1>' +
        '\n<p style="color: rgb(136, 136, 136);">Here are our awesome team.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/working-2618559_1920-kr4Af1.jpg" alt="">' +
        '\n<h3 class="size-21" style="letter-spacing: 2px;">Sarah Doe</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Founder</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rawpixel-632454-unsplash-ecHZN1.jpg" alt="">' +
        '\n<h3 class="size-21" style="letter-spacing: 2px;">David Anderson</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Programmer</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/girl-2618562_1920-KAzoZ2.jpg" alt="">' +
        '\n<h3 class="size-21" style="letter-spacing: 2px;">Jennifer Clarke</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Web Designer</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-04.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="font-size: 56px !important; letter-spacing: 3px; width: 400px; max-width: 100%; line-height: 1.2;">Meet <br>our amazing team.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/luke-ellis-craven-365822-wrHAg1.jpg" alt="">' +
        '\n<h5 class="size-21" style="letter-spacing: 2px;">Nathan Williams <span style="color: rgb(136, 136, 136);">/ Founder</span></h5>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/yoann-boyer-276971-S8TZu2.jpg" alt="">' +
        '\n<h5 class="size-21" style="letter-spacing: 2px;">Sarah Smith <span style="color: rgb(136, 136, 136);">/ Developer</span></h5>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/pablo-hermoso-429590-(1)-fP4pI3.jpg" alt="">' +
        '\n<h5 class="size-21" style="letter-spacing: 2px;">Jane Doe <span style="color: rgb(136, 136, 136);">/ Web Designer</span></h5>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-05.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 style="text-transform: none">Meet The Team</h1>' +
        '\n</div>' +
        '\n<p style="letter-spacing: 9px;">Here are our awesome team.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adult-1868750_1920-EzivE1.jpg" alt=""></div>' +
        '\n<h3 class="size-21">David Smith</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">CEO & Founder</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/noah-buscher-502067-(1)-rT7Vn1.jpg" alt=""></div>' +
        '\n<h3 class="size-21">Milla Clarke</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">Project Manager</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/berwin-coroza-495276-tXRrf2.jpg" alt=""></div>' +
        '\n<h3 class="size-21">John Rugg</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">Developer</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mark-skeet-537093-6gF113.jpg" alt=""></div>' +
        '\n<h3 class="size-21">Sarah Ashley</h3>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">Web Designer</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-07.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-46" style="letter-spacing: 2px;">OUR TEAM</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/girl-690119-c7s4t1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2>Your Name</h2>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/photo-1437915160026-6c59da36ede2-AakHA2.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2>Your Name</h2>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-08.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 4px;">MEET THE EXPERTS</h1>' +
        '\n<p>Here are our awesome team</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card max-390 is-light-text" style="width:calc(100%);background: #1c93ad;">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bernard-osei-608155-unsplash-BsEPC1.jpg" alt="" class="margin-0">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-21 margin-0" style="letter-spacing: 1px;">JANE FOSTER</h3>' +
        _tabs(2) +
        '<p class="size-16">Lorem Ipsum is simply dummy text.</p>' +
        _tabs(2) +
        '<div class="is-social edit size-14">' +
        _tabs(3) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em; color: #fff"></i></a>' +
        _tabs(3) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em; color: #fff"></i></a>' +
        _tabs(3) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline" style="color: #fff"></i></a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card max-390 is-light-text" style="width:calc(100%);background: #e0527e;">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-HAWqm1.jpg" alt="" class="margin-0">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-21 margin-0" style="letter-spacing: 1px;">MICHELLE DOE</h3>' +
        _tabs(2) +
        '<p class="size-16">Lorem Ipsum is simply dummy text.</p>' +
        _tabs(2) +
        '<div class="is-social edit size-14">' +
        _tabs(3) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em; color: #fff"></i></a>' +
        _tabs(3) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em; color: #fff"></i></a>' +
        _tabs(3) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline" style="color: #fff"></i></a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card max-390 is-light-text" style="width:calc(100%);background: #e17055">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/girl-from-behind-1741699-(1)-PqduN2.jpg" alt="" class="margin-0">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-21 margin-0" style="letter-spacing: 1px;">JANE WILLIAMS</h3>' +
        _tabs(2) +
        '<p class="size-16">Lorem Ipsum is simply dummy text.</p>' +
        _tabs(2) +
        '<div class="is-social edit size-14">' +
        _tabs(3) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em; color: #fff"></i></a>' +
        _tabs(3) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em; color: #fff"></i></a>' +
        _tabs(3) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline" style="color: #fff"></i></a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-12.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-32 is-title1-32 is-title-lite" style="line-height:1"><b>OUR TEAM</b></h1>' +
        '\n<p style="border-bottom: 2.5px solid #e74c3c; width: 60px; display: inline-block; margin-top: 0"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rawpixel-632454-unsplash-oLoHS1.jpg" alt=""></div>' +
        '\n<h3 class="size-21 is-title-lite">JOHN ANDERSON</h3>' +
        '\n<div class="size-12 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-tfqUv1.jpg" alt=""></div>' +
        '\n<h3 class="size-21 is-title-lite">DAVID CLARK</h3>' +
        '\n<div class="size-12 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rawpixel-1054600-unsplash-PylVl2.jpg" alt=""></div>' +
        '\n<h3 class="size-21 is-title-lite">NATASHA KERR</h3>' +
        '\n<div class="size-12 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-13.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21 is-info1">Discover More</p>' +
        '\n<h1 class="size-48 is-title1-48 is-title-lite">ABOUT ME</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sarah-noltner-687653-unsplash-6Agfw1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">Jeniffer Phillips</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-14.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 style="letter-spacing: 4px;">ABOUT ME</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/luke-porter-520986-unsplash-kjuDr1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">David Stuart</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-15.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">MEET OUR TEAM</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/nicole-honeywill-546846-unsplash-(1)-84PNj2.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">Laura Clark</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/alex-iby-480498-unsplash-JOL3q3.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">Michael Smith</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-16.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-38" style="letter-spacing: 2px;">OUR PASSIONATE TEAM</h1>' +
        '\n<p style="border-bottom: 2px solid #000;width: 70px;display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/nordwood-themes-166423-unsplash-(1)-4WJ2H1.jpg" alt="">' +
        '\n<h3 class="size-24" style="letter-spacing: 1px;">Roy Krueger</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-9Htn91.jpg" alt="">' +
        '\n<h3 class="size-24" style="letter-spacing: 1px;">Amanda Barnet</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-17.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">MEET THE TEAM</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/parker-johnson-1100877-unsplash-(1)-rufBy1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">Patricia Young</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">Angela Griffin</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/beautiful-close-up-color-1078058-Qywhs1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-18.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-18 is-info1">Hi World!</p>' +
        '\n<h1 class="size-48 is-title1-48 is-title-lite">I\'M AUDREY SMITH</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">I design beautiful and functional stuff</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/daniel-apodaca-584113-unsplash-(1)-U9Iby1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-19.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">MEET OUR TEAM</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/alex-shaw-1116446-unsplash-JWfd61.jpg" alt=""></div>' +
        '\n<h3 class="size-24" style="letter-spacing: 1px;">Yolanda Ludwig</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half center">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-JMXQP1.jpg" alt=""></div>' +
        '\n<h3 class="size-24" style="letter-spacing: 1px;">Anthony Fales</h3>' +
        '\n<p>Lorem Ipsum is simply text of the printing and typesetting industry.</p>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-20.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 5px;">HI, I\'M HENDRY CODY. I CREATE SIMPLE AND BEAUTIFUL WEBSITES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="letter-spacing: 1px;">Get in touch with me</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half center">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/simon-migaj-775713-unsplash-l8oSx1.jpg" alt=""></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-21.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-6Q6W91.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-80"></div>' +
        '\n<h1 style="text-transform: uppercase; letter-spacing: 6px; text-align: right;">Irene Waller</h1>' +
        '\n<br>' +
        '\n<div class="is-social right">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '\n<div class="spacer height-80"></div>' +
        '\n<p style="text-align: right;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-22.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-80"></div>' +
        '\n<h1 style="text-transform: uppercase; letter-spacing: 6px;">Kevin Josiah</h1>' +
        '\n<br>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '\n<div class="spacer height-80"></div>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-ayzzH2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-23.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-fxBmr1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p style="border-bottom: 2px solid #c3c2c2;width: 90px;display: inline-block;margin-top:22px;"></p>' +
        '\n<h1 style="font-weight: bold;">Jenny Barnett</h1>' +
        '\n<p style="letter-spacing: 3px; text-transform: uppercase;">Graphic Designer</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet vivamus leo ante.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-24.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="border-bottom: 2px solid #c3c2c2;width: 90px;display: inline-block;margin-top:22px;"></p>' +
        '\n<h1 style="font-weight: bold;">George Smith</h1>' +
        '\n<p style="letter-spacing: 3px; text-transform: uppercase;">Graphic Designer</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet vivamus leo ante.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-6SDpQ1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-26.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-z01lr1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2 style="text-align: center; letter-spacing: 3px;">Sabrina Watson</h2>' +
        '\n<div class="center">' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #c3c2c2;width: 60px;display: inline-block;margin-bottom:0"></p>' +
        '\n</div>' +
        '\n<p style="letter-spacing: 3px; font-size: 15px; text-align: center;">WEB DEVELOPER</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: center;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social center">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-27.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<h2 style="text-align: center; letter-spacing: 3px;">Julio Anderson</h2>' +
        '\n<div class="center">' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #c3c2c2;width: 60px;display: inline-block;margin-bottom:0"></p>' +
        '\n</div>' +
        '\n<p style="letter-spacing: 3px; font-size: 15px; text-align: center;">WEB DEVELOPER</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: center;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social center">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-SRJrq2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-29.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-otLsK1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div style="padding-left: 40px">' +
        _tabs(1) +
        '<div class="spacer height-40"></div>' +
        _tabs(1) +
        '<h1 class="size-64" style="font-weight: bold; letter-spacing: 3px;">Martha Massey</h1>' +
        _tabs(1) +
        '<div class="spacer height-40"></div>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem Ipsum dolor sit amet.</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<div class="size-14 is-social edit">' +
        _tabs(2) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(2) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(2) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-30.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="padding-right: 40px">' +
        _tabs(1) +
        '<div class="spacer height-40"></div>' +
        _tabs(1) +
        '<h1 class="size-64" style="font-weight: bold; letter-spacing: 3px;">James Tidwell</h1>' +
        _tabs(1) +
        '<div class="spacer height-40"></div>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem Ipsum dolor sit amet.</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<div class="size-14 is-social edit">' +
        _tabs(2) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(2) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(2) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-TUrpQ1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-43.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="img-circular" style="margin:15px 0;width:140px;height:140px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-DbQGW1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column two-third">' +
        '<h3 class="size-21">Amanda Davis</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-44.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-gs7XT1.jpg" alt="">' +
        '</div>' +
        '<div class="column two-third">' +
        '<h3 class="size-21">Ronald Evans</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div class="size-14 is-social edit">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-31.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="margin:30px 0;width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-DjWQ71.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="padding-left:40px">' +
        _tabs(1) +
        '<p style="text-align: center; color: rgb(119, 119, 119); letter-spacing: 1px;">Discover more about me.</p>' +
        _tabs(1) +
        '<h1 class="size-32" style="text-align: center; text-transform: uppercase; letter-spacing: 2px;">Charles Parker</h1>' +
        _tabs(1) +
        '<div class="center">' +
        _tabs(2) +
        '<p style="border-bottom: 2px solid #000;width: 60px;display: inline-block;margin-bottom:0"></p>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="spacer height-40"></div>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem Ipsum dolor sit amet.</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<div class="size-14 is-social edit center">' +
        _tabs(2) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(2) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(2) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-32.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="padding-right:40px">' +
        _tabs(1) +
        '<p style="text-align: center; color: rgb(119, 119, 119); letter-spacing: 1px;">Discover more about me.</p>' +
        _tabs(1) +
        '<h1 class="size-32" style="text-align: center; text-transform: uppercase; letter-spacing: 2px;">Sarah Smith</h1>' +
        _tabs(1) +
        '<div class="center">' +
        _tabs(2) +
        '<p style="border-bottom: 2px solid #000;width: 60px;display: inline-block;margin-bottom:0"></p>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<div class="spacer height-40"></div>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem Ipsum dolor sit amet.</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<div class="size-14 is-social edit center">' +
        _tabs(2) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter"></i></a>' +
        _tabs(2) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        _tabs(2) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half center">' +
        '<div class="img-circular" style="margin:30px 0;width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-c2y4f1.jpg" alt=""></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-59.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/florian-van-duyn-b66ga6c48he-unsplash-UHsG01.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-160" style="line-height: 180px; text-align: right;">A.</h1>' +
        '\n<h2 class="size-28" style="letter-spacing: 1px;">Ann Higby</h2>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-16" style="font-style: italic; font-family: serif;">Web Developer</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div class="is-social size-14">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-60.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-160" style="line-height: 180px;">M.</h1>' +
        '\n<h2 class="size-28" style="letter-spacing: 1px; text-align: right;">Michael Snow</h2>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-16" style="font-style: italic; font-family: serif; text-align: right;">Freelance Graphic Designer</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div class="is-social size-14">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/felipe-giacometti-4i5topi4k_c-unsplash-uRiHa1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-61.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/ellieelien-y_zbw7s2x3s-unsplash-7fXG32.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p style="letter-spacing: 2px; font-style: italic; color: rgb(188, 188, 188); font-family: Georgia, serif;">Hello</p>' +
        '\n<h1 class="size-32" style="letter-spacing: 1px;">I\'m <b>Olivia Maus</b>. I develop website and design awesome things <b>you will love</b>.</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social size-14">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-62.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="letter-spacing: 2px; font-style: italic; color: rgb(188, 188, 188); font-family: Georgia, serif;">Hello</p>' +
        '\n<h1 class="size-32" style="letter-spacing: 1px;">I\'m <b>Juanita Smith</b>. I develop website and design awesome things <b>you will love</b>.</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social size-14">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/genevieve-rusnac-uv_qxy6hseo-unsplash-qSqg21.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-63.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="font-size: 110px !important;"><b>About</b> us</h1>' +
        '\n<h3 style="letter-spacing: 1px;" class="size-24">Founded in 2019</h3>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.</p>' +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/martin-katler-y15xwiek6ba-unsplash-pWD4T1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-64.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="font-weight: bold; letter-spacing: 1px;">Hello, we are [Company Name]. We are a team of passionate design-thinkers & product strategist.</h1>' +
        '\n<p style="color: rgb(158, 158, 158); font-family: serif; font-style: italic;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-65.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/group-of-people-standing-indoors-3184396-cBo871.jpg" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 1px;">Our Story</h1>' +
        '\n<p style="border-bottom: 2px solid #f49400;width: 70px;display: inline-block;margin-top: 0;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-14" style="color: rgb(158, 158, 158);">1st floor, Building Name. <br>Street Name, City. State 456.<br>Phone: (123) 456 7890</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-66.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-35" style="text-align: center; font-weight: bold; letter-spacing: 1px;">who we are</h1>' +
        '\n<p class="size-16" style="text-align: center; color: rgb(158, 158, 158);">read the story about us and discover what we do.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bogomil-mihaylov-irbdbd6h_v8-unsplash-yXHmD1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-24" style="text-align: right; letter-spacing: 1px;">we\'re a team of passionate <span style="color: rgb(158, 158, 158);">design-thinkers</span></h3>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-67.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-28" style="margin-top: 15px;"><b>Who</b> We Are</h1>' +
        '\n<p style="border-bottom: 2px solid #000;width: 30px;display: inline-block;margin-top: 0;"></p>' +
        '</div>' +
        '<div class="column two-third">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/four-people-sitting-beside-wooden-table-3184327-iEien1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-68.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column third" style="padding-right: 30px;">' +
        '<p style="letter-spacing: 2px; margin-bottom:0;" class="size-16">ABOUT US</p>' +
        '\n<p style="border-bottom: 1px solid #000;width: 90px;display: inline-block;margin-top: 0;"></p>' +
        '\n<h1 class="size-32">We believe in simplicity</h1>' +
        '\n<p style="text-align: justify; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mae-mu-1533437-unsplash-Ti0dU2.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/agata-create-4sbdro9nd5c-unsplash-Ti0dU1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-69.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="color: rgb(158, 158, 158); letter-spacing: 1px;">ABOUT US</p>' +
        '\n<h1 class="size-46" style="letter-spacing: 1px;">We are CreativeStudio. We love to create and develop beautiful things.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p class="size-16" style="color: rgb(158, 158, 158); font-family: serif; font-style: italic;">1st floor, Building Name.<br>Street Name, City. State 456.<br>(123) 456 7890</p>' +
        '</div>' +
        '<div class="column two-third">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-70.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-46" style="width: 100%; max-width: 220px; font-weight: 600; letter-spacing: 1px;">About Us.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify; font-weight: 600;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/william-daigneault-dmycyllkazq-unsplash-pyPYL1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-71.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="font-weight: bold; letter-spacing: 1px;">Hello, we are <span style="color: rgb(178, 4, 9);">[Company Name]</span>. We are a team of passionate design-thinkers & product strategist.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80" style="border-left: 3px solid #e8e8e8;"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/jack-l-smith-ziustaoqndc-unsplash-ToAnR1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-72.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="text-align: center; letter-spacing: 2px;">Who are we?</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<p style="border-bottom: 3px solid #000;width: 30px;display: inline-block;margin-bottom: 0"></p>' +
        '\n<p class="size-16" style="text-align: center; color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>' +
        '\n<p style="border-bottom: 3px solid #000;width: 30px;display: inline-block;margin-top: 0;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="text-align: center;">' +
        _tabs(1) +
        "<a href=\"#\" class=\"is-btn\" title=\"\" style=\"margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(255, 76, 142); color: rgb(255, 255, 255); border-color: rgb(255, 76, 142); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;\" data-hover-bgcolor=\"#eb387a\" data-hover-color=\"#ffffff\" data-hover-bordercolor=\"#eb387a\" onmouseover=\"this.setAttribute('data-style',this.style.cssText);if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');\" onmouseout=\"this.setAttribute('style',this.getAttribute('data-style'));this.removeAttribute('data-style')\">Portfolio</a> &nbsp; <a href=\"#\" class=\"is-btn\" title=\"\" style=\"margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(23, 23, 23); color: rgb(255, 255, 255); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;\" data-hover-bgcolor=\"#ff4c8e\" data-hover-color=\"#ffffff\" data-hover-bordercolor=\"#ff4c8e\" onmouseover=\"this.setAttribute('data-style',this.style.cssText);if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');\" onmouseout=\"this.setAttribute('style',this.getAttribute('data-style'));this.removeAttribute('data-style')\">Contact</a>" +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-73.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 style="font-weight: bold; letter-spacing: 4px; line-height: 1.2; font-size: 57px !important;">WHO WE ARE</h1>' +
        '</div>' +
        '<div class="column two-third">' +
        '<p class="size-16" style="text-align: justify;">Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/erik-mclean-tn6xocyjy5u-unsplash-0uMCW1.jpg" alt="">' +
        '</div>	' +
        '</div>',
    },

    {
      thumbnail: 'preview/profile-74.png',
      category: '103',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-100" style="text-align: right; letter-spacing: 2px;">About.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column two-third">' +
        '<p style="text-align: justify;margin-top:0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    /* PRODUCTS */

    {
      thumbnail: 'preview/products-01.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">OUR PRODUCTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/photo-1459411552884-841db9b3cc2a-YO89Y1.jpg" alt="">' +
        '\n<h3>Product One, <b>$109</b></h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/photo-1471256737566-c7ddd846bee0-small-NBNfZ2.jpg" alt="">' +
        '\n<h3>Product Two, <b>$299</b></h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-19.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 3px; text-align: center;">SERVICES WE PROVIDE</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3>Creative Designs</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3>Web Development</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3>Brand Building&nbsp;</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3>Friendly Support</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-18.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 3px;">OUR SERVICES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-monitor-outline size-48"></i>' +
        '\n<h4 style="letter-spacing: 1px;">Service One</h4>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-gear-outline size-48"></i>' +
        '\n<h4 style="letter-spacing: 1px;">Service Two</h4>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-heart-outline size-48"></i>' +
        '\n<h4 style="letter-spacing: 1px;">Service Three</h4>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-compose-outline size-48"></i>' +
        '\n<h4 style="letter-spacing: 1px;">Service Four</h4>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-world-outline size-48"></i>' +
        '\n<h4 style="letter-spacing: 1px;">Service Five</h4>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-calendar-outline size-48"></i>' +
        '\n<h4 style="letter-spacing: 1px;">Service Six</h4>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-02.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        '<h1 class="size-48" style="letter-spacing: 2px">Our Products</h1>' +
        '\n<p class="size-18">We make shopping way easier & convenient for you</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/x98sw2520-sh1J31.jpg" alt=""></div>' +
        _tabs(2) +
        '<h3 class="size-21" style="letter-spacing: 1px;">Product One</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:20px 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/georgie-cobbs-467923-unsplash-G9q9p2.jpg" alt=""></div>' +
        _tabs(2) +
        '<h3 class="size-21" style="letter-spacing: 1px;">Product Two</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:20px 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/martin-widenka-555176-unsplash-sh1J33.jpg" alt=""></div>' +
        _tabs(2) +
        '<h3 class="size-21" style="letter-spacing: 1px;">Product Three</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:20px 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-04.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">OUR SERVICES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full code">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-monitor-outline size-48"></i>' +
        '\n<h3 class="size-18">Clean & Minimalist Design</h3>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-lightbulb-outline size-48"></i>' +
        '\n<h3 class="size-18">Modern Ideas</h3>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-world-outline size-48"></i>' +
        '\n<h3 class="size-18">Brand Building </h3>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-infinite-outline size-48"></i>' +
        '\n<h3 class="size-18">Unlimited Possibilities</h3>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-heart-outline size-48"></i>' +
        '\n<h3 class="size-18">Superior Supports </h3>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-gear-outline size-48"></i>' +
        '\n<h3 class="size-18">Web Development</h3>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-13.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-32" style="text-align: center; letter-spacing: 2px;">TOP RATED PRODUCTS</h1>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-7eFyL1.jpg" alt="">' +
        '\n<h3 class="size-21">PRODUCT NAME</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<p><a href="#">BUY NOW</a></p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-09yZA2.jpg" alt="">' +
        '\n<h3 class="size-21">PRODUCT NAME</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<p><a href="#">BUY NOW</a></p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-Tmg8p2.jpg" alt="">' +
        '\n<h3 class="size-21">PRODUCT NAME</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<p><a href="#">BUY NOW</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-05.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing:3px">SERVICES WE OFFER</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="list">' +
        '<i class="icon ion-android-bulb"></i>' +
        '\n<h3 class="size-24">Service One</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        '<i class="icon ion-android-favorite-outline"></i>' +
        '\n<h3 class="size-24">Service Two</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        '<i class="icon ion-android-desktop"></i>' +
        '\n<h3 class="size-24">Service Three</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-07.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite is-upper">OUR SERVICES</h1>' +
        '\n<p style="border-bottom: 2.5px solid #333; width: 70px; display: inline-block; margin-top: 25px"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p class="size-64 is-title1-64 is-title-bold" style="line-height: 1.5">01.</p>' +
        '\n<h3 class="size-24 is-title-lite">SERVICE ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-64 is-title1-64 is-title-bold" style="line-height: 1.5">02.</p>' +
        '\n<h3 class="size-24 is-title-lite">SERVICE TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-64 is-title1-64 is-title-bold" style="line-height: 1.5">03.</p>' +
        '\n<h3 class="size-24 is-title-lite">SERVICE THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-08.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite is-upper center">SERVICES WE PROVIDE</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p class="size-64 is-title1-64 is-title-bold">1</p>' +
        '\n<h3 class="size-21" style="line-height: 1.5">MODERN IDEAS</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-64 is-title1-64 is-title-bold">2</p>' +
        '\n<h3 class="size-21" style="line-height: 1.5">WEB DEVELOPMENT</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-64 is-title1-64 is-title-bold">3</p>' +
        '\n<h3 class="size-21" style="line-height: 1.5">SUPERIOR SUPPORTS</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-10.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-32" style="letter-spacing: 4px;">OUR SERVICES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-compose-outline size-32"></i>' +
        '\n<h3 class="size-24">Generate Ideas</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-gear-outline size-32"></i>' +
        '\n<h3 class="size-24">Development</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-monitor-outline size-32"></i>' +
        '\n<h3 class="size-24">Creative Designs</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-heart-outline size-32"></i>' +
        '\n<h3 class="size-24">Support</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-09.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-38" style="font-weight: 400;">OUR PRODUCTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/h-e-n-g-s-t-r-e-a-m-573432-unsplash-xt89A1.jpg" alt="">' +
        '\n<h3 class="size-18" style="font-weight: 400;">PRODUCT NAME, <span style="color: rgb(136, 136, 136);">$129</span></h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<p><a href="#" title="">BUY NOW</a></p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sarah-dorweiler-357724-unsplash-4cfGV2.jpg" alt="">' +
        '\n<h3 class="size-18" style="font-weight: 400;">PRODUCT NAME, <span style="color: rgb(136, 136, 136);">$79</span></h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<p><a href="#" title="">BUY NOW</a></p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/michael-frattaroli-234662-unsplash-QaduA1.jpg" alt="">' +
        '\n<h3 class="size-18" style="font-weight: 400;">PRODUCT NAME, <span style="color: rgb(136, 136, 136);">$49</span></h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<p><a href="#" title="">BUY NOW</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-15.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 3px; text-align: center;">SERVICES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-calendar size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3 class="size-24">Service One</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-gear-b size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3 class="size-24">Service Two</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-edit size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3 class="size-24">Service Three</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-12.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="padding-right: 40px">' +
        _tabs(1) +
        '<h1 class="size-42">Product Name</h1>' +
        _tabs(1) +
        '<p style="font-weight: bold;">$17,00</p>' +
        _tabs(1) +
        "<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<div><a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a></div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-5v3uL1.jpg" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-C3XHH1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div style="padding-left: 40px">' +
        _tabs(1) +
        '<h1 class="size-42">Product Name</h1>' +
        _tabs(1) +
        '<p style="font-weight: bold;">$14,00</p>' +
        _tabs(1) +
        "<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<div><a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a></div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-14.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32" style="letter-spacing: 3px;">SERVICES WE OFFER</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-android-bulb size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3>Service One</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-compose size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3>Service Two</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-gear-b size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3>Service Three</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #000; display: inline-block;"><i class="icon ion-android-call size-24"></i></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h3>Service Four</h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-20.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 3px;">SERVICES WE OFFER</h1>' +
        '\n<p style="border-bottom: 2.5px solid #333; width: 70px; display: inline-block; margin-top: 25px"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column center third">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-ios-monitor-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top:1.5em">Creative Design</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-ios-compose-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top:1.5em">Web Development</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-ios-gear-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top:1.5em">24/7 Supports</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-21.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 3px;">SERVICES WE OFFER</h1>' +
        '\n<p style="border-bottom: 2.5px solid #333; width: 70px; display: inline-block; margin-top: 25px"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column center third">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-ios-monitor-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top:1.5em">Creative Design</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-ios-compose-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top:1.5em">Web Development</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-ios-gear-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top:1.5em">24/7 Supports</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-17.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-android-bulb size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-android-favorite-outline size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-gear-b size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-code size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE FOUR</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-compose size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE FIVE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-android-people size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE SIX</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-16.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-calendar size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-gear-b size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-paper-airplane size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-monitor size-32" style="color: #c3c3c3;"></i>' +
        '\n<h3 class="size-21" style="margin-top: 5px;color: #888888;">SERVICE FOUR</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-03.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="font-weight:bold;"><span style="color: rgb(204, 204, 204);">OUR </span> PRODUCTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-7Vn0R1.jpg" alt="">' +
        '\n<p style="color: rgb(136, 136, 136); font-weight: normal;">' +
        _tabs(1) +
        'PRODUCT NAME' +
        _tabs(1) +
        '<br>' +
        _tabs(1) +
        '<a href="#" title="">$79</a>' +
        '\n</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/nordwood-themes-473050-jFvLM1.jpg" alt="">' +
        '\n<p style="color: rgb(136, 136, 136); font-weight: normal;">' +
        _tabs(1) +
        'PRODUCT NAME' +
        _tabs(1) +
        '<br>' +
        _tabs(1) +
        '<a href="#" title="">$99</a>' +
        '\n</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/toa-heftiba-448302-(1)-pXDhf1.jpg" alt="">' +
        '\n<p style="color: rgb(136, 136, 136); font-weight: normal;">' +
        _tabs(1) +
        'PRODUCT NAME' +
        _tabs(1) +
        '<br>' +
        _tabs(1) +
        '<a href="#" title="">$89</a>' +
        '\n</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-p8OMT2.jpg" alt="">' +
        '\n<p style="color: rgb(136, 136, 136); font-weight: normal;">' +
        _tabs(1) +
        'PRODUCT NAME' +
        _tabs(1) +
        '<br>' +
        _tabs(1) +
        '<a href="#" title="">$99</a>' +
        '\n</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-11.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32" style="letter-spacing: 4px; text-align: center;">OUR SERVICES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-compose-outline size-32"></i>' +
        '\n<h3 class="size-24">Generate Ideas</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-gear-outline size-32"></i>' +
        '\n<h3 class="size-24">Development</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-gear-outline size-32"></i>' +
        '\n<h3 class="size-24">Support</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-36.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/gaelle-marcel-jdxgmqjt1lu-unsplash-0N9uW1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div style="padding-left: 10px;">' +
        _tabs(1) +
        '<h2 style="letter-spacing: 1px;" class="size-38">Vintage Flower Vase</h2>' +
        _tabs(1) +
        '<p class="size-24" style="font-weight: bold;">$39</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        _tabs(1) +
        '<div><a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" title="" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<p class="size-12">Categories: Home Decor, New Arrival</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-37.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="padding-right: 10px;">' +
        _tabs(1) +
        '<h2 style="letter-spacing: 1px;" class="size-38">Green Wingtip Shoes</h2>' +
        _tabs(1) +
        '<p class="size-24" style="font-weight: bold;">$217</p>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        _tabs(1) +
        '<div><a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" title="" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        _tabs(1) +
        '<div class="spacer height-20"></div>' +
        _tabs(1) +
        '<p class="size-12">Categories: Shoes, Men</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/irene-kredenets-8j4diaobamo-unsplash-(1)-7VV9f2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-38.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/luke-southern-r1opyghnbd4-unsplash-MljtW1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p class="size-14">Store Name<br>Perth, Australia</p>' +
        '\n<h1 style="letter-spacing: 1px;">Stylish Cup</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '\n<p style="font-weight: bold" class="size-28">$17</p>' +
        '\n<p class="size-14">In stock: 126 items</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-39.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p class="size-14">Store Name<br>Perth, Australia</p>' +
        '\n<h1 style="letter-spacing: 1px;">Wooden Chair</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '\n<p style="font-weight: bold" class="size-28">$87</p>' +
        '\n<p class="size-14">In stock: 48 items</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/wooden-chair-qTO5r1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-40.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mitch-lensink-588486-unsplash-GDz4y1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p class="size-14" style="color: rgb(158, 158, 158); margin-bottom: 0px; letter-spacing: 1px;">Bikes</p>' +
        '\n<h2 style="letter-spacing: 2px;" class="size-32">CLASSIC BIKE</h2>' +
        '\n<p style="font-weight: bold;line-height:1.2;" class="size-21">$134</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div><a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" title="" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        '\n<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-41.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p class="size-14" style="color: rgb(158, 158, 158); margin-bottom: 0px; letter-spacing: 1px;">Furniture</p>' +
        '\n<h2 style="letter-spacing: 2px;" class="size-32">MODERN SOFA</h2>' +
        '\n<p style="font-weight: bold;line-height:1.2;" class="size-21">$439</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div><a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" title="" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        '\n<div class="spacer height-40"></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/christelle-bourgeois-97314-unsplash-p3tmH2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-42.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/adam-birkett-6cxznfcd2kq-unsplash-lqmrN1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2 style="letter-spacing: 1px;">Charge & Sync Cable</h2>' +
        '\n<p class="size-24" style="font-weight: bold;">$23</p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<ul style="list-style: initial;padding-left: 20px;">' +
        _tabs(1) +
        '<li>Lorem Ipsum is simply dummy text</li>' +
        _tabs(1) +
        '<li>Lorem Ipsum is simply dummy text</li>' +
        _tabs(1) +
        '<li>Lorem Ipsum is simply dummy text</li>' +
        '\n</ul>' +
        '\n<p class="size-14">Color Availability: White, Black</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div><div class="spacer height-20"></div>' +
        '\n<p class="size-14" style="margin-bottom: 5px;">Share:</p>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/home?status=https://example.com/"><i class="icon ion-social-twitter size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com/"><i class="icon ion-social-facebook size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://pinterest.com/pin/create/button/?url=https://example.com/&media=&description="><i class="icon ion-social-pinterest-outline size-14"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-43.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 style="letter-spacing: 1px;">Woman\'s Watch</h2>' +
        '\n<p class="size-24" style="font-weight: bold;">$79</p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<ul style="list-style: initial;padding-left: 20px;">' +
        _tabs(1) +
        '<li>Lorem Ipsum is simply dummy text</li>' +
        _tabs(1) +
        '<li>Lorem Ipsum is simply dummy text</li>' +
        _tabs(1) +
        '<li>Lorem Ipsum is simply dummy text</li>' +
        '\n</ul>' +
        '\n<p class="size-14">Color Availability: Soft Pink, Black, Brown, White</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div><div class="spacer height-20"></div>' +
        '\n<p class="size-14" style="margin-bottom: 5px;">Share:</p>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/home?status=https://example.com/"><i class="icon ion-social-twitter size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com/"><i class="icon ion-social-facebook size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://pinterest.com/pin/create/button/?url=https://example.com/&media=&description="><i class="icon ion-social-pinterest-outline size-14"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/plush-design-studio-777289-unsplash-tlEBZ1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-44.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/daniel-fontenele-s4kvecxgcdo-unsplash-2XhGF1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2 style="letter-spacing: 2px;" class="size-42">Extra Bass Earphone</h2>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s.</p>' +
        '\n\n<table class="default" style="border-collapse:collapse;width:100%;">' +
        _tabs(1) +
        '<tbody>' +
        _tabs(2) +
        '<tr style="border-bottom: 1px solid; border-color: rgb(158, 158, 158);">' +
        _tabs(3) +
        '<td class="size-14">Price</td>' +
        _tabs(3) +
        '<td style="text-align: right;" class="size-14">$34</td>' +
        _tabs(2) +
        '</tr>' +
        _tabs(2) +
        '<tr style="border-bottom: 1px solid; border-color: rgb(158, 158, 158);">' +
        _tabs(3) +
        '<td class="size-14">Color Availability</td>' +
        _tabs(3) +
        '<td style="text-align: right;" class="size-14">Black, White, Red</td>' +
        _tabs(2) +
        '</tr>' +
        _tabs(1) +
        '</tbody>' +
        '\n</table>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 11px; line-height: 1.5;" title="">Buy Now</a></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-14" style="margin-bottom: 5px; text-align: right;">Share:</p>' +
        '\n\n\n<div class="is-social" style="text-align: right;">' +
        _tabs(1) +
        '<a href="https://twitter.com/home?status=https://example.com/"><i class="icon ion-social-twitter size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com/"><i class="icon ion-social-facebook size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://pinterest.com/pin/create/button/?url=https://example.com/&media=&description="><i class="icon ion-social-pinterest-outline size-14"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-45.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 style="letter-spacing: 2px;" class="size-42">Ceramic Pitcher</h2>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s.</p>' +
        '\n\n<table class="default" style="border-collapse:collapse;width:100%;">' +
        _tabs(1) +
        '<tbody>' +
        _tabs(2) +
        '<tr style="border-bottom: 1px solid; border-color: rgb(158, 158, 158);">' +
        _tabs(3) +
        '<td class="size-14">Price</td>' +
        _tabs(3) +
        '<td style="text-align: right;" class="size-14">$41</td>' +
        _tabs(2) +
        '</tr>' +
        _tabs(2) +
        '<tr style="border-bottom: 1px solid; border-color: rgb(158, 158, 158);">' +
        _tabs(3) +
        '<td class="size-14">Color Availability</td>' +
        _tabs(3) +
        '<td style="text-align: right;" class="size-14">Black, Brown, White</td>' +
        _tabs(2) +
        '</tr>' +
        _tabs(1) +
        '</tbody>' +
        '\n</table>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 11px; line-height: 1.5;" title="">Buy Now</a></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-14" style="margin-bottom: 5px; text-align: right;">Share:</p>' +
        '\n\n\n<div class="is-social" style="text-align: right;">' +
        _tabs(1) +
        '<a href="https://twitter.com/home?status=https://example.com/"><i class="icon ion-social-twitter size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com/"><i class="icon ion-social-facebook size-14" style="margin-right: 2px;"></i></a>' +
        _tabs(1) +
        '<a href="https://pinterest.com/pin/create/button/?url=https://example.com/&media=&description="><i class="icon ion-social-pinterest-outline size-14"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/kara-eads-cxew49dylf4-unsplash-Ej12x2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-46.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/barrett-ward-p44rigl9v54-unsplash-vNiki1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-28" style="margin-top: 20px; letter-spacing: 1px;">Leather Watch</h1>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Availability: In stock<br>Delivery: 1 to 2 weeks</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">$91 | Buy Now</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-47.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-28" style="margin-top: 20px; letter-spacing: 1px;">Desk Lamp</h1>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Availability: In stock<br>Delivery: 1 to 5 days</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">$53 | Buy Now</a></div>' +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/swabdesign_official-nfkmjfxhqgc-unsplash-KsRhW2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-48.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/irene-kredenets-1690829-unsplash-qmqP41.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 style="letter-spacing: 2px;" class="size-48">Leather Handbag</h1>' +
        '\n<p class="size-28" style="font-weight: bold; margin:  0;">$213</p>' +
        '\n<p style="color: rgb(158, 158, 158); letter-spacing: 1px;" class="size-16">Availability: In stock</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 11px; line-height: 1.5;" title="">Buy Now</a></div><div class="spacer height-20"></div>' +
        '\n<p class="size-12" style="color: rgb(158, 158, 158);">Categories: New Arrival, Women, Handbags</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-49.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 style="letter-spacing: 2px;" class="size-48">Athletic Shoes</h1>' +
        '\n<p class="size-28" style="font-weight: bold; margin:  0;">$512</p>' +
        '\n<p style="color: rgb(158, 158, 158); letter-spacing: 1px;" class="size-16">Availability: In stock</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 11px; line-height: 1.5;" title="">Buy Now</a></div><div class="spacer height-20"></div>' +
        '\n<p class="size-12" style="color: rgb(158, 158, 158);">Categories: Men, Sport, Shoes</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/irene-kredenets-1686187-unsplash-CU0Rc2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-50.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/shop-slo-hkxuhdsbezy-unsplash-CdqN81.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-38" style="text-transform: uppercase; letter-spacing: 2px;">Silk <b>Pillow</b></h2>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Color Availability: Naxy, Red, White</p>' +
        '\n<p style="text-align: justify;" class="size-16">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">$99 | Buy Now</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-51.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h2 class="size-38" style="text-transform: uppercase; letter-spacing: 2px;">Rattan <b>Lamp</b></h2>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Color Availability: Brown, White</p>' +
        '\n<p style="text-align: justify;" class="size-16">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">$72 | Buy Now</a></div>' +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/content-pixie-6cfcrt-7thw-unsplash-pDbf91.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-52.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/michael-frattaroli-207278-unsplash-3XV7F1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p style="color: rgb(158, 158, 158);" class="size-14">Latest Products / Women / Sunglasses</p>' +
        '\n<h1 style="text-transform: uppercase; letter-spacing: 2px;" class="size-35">SUNGLASSES</h1>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '\n<p class="size-28" style="color: rgb(255, 143, 0); font-weight: 600;">$36</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 11px; line-height: 1.5;" title="">Buy Now</a></div>' +
        '\n<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-53.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="color: rgb(158, 158, 158);" class="size-14">Women / Tops / Knitwear</p>' +
        '\n<h1 style="text-transform: uppercase; letter-spacing: 2px;" class="size-35">KNITTED SWEATER</h1>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '\n<p class="size-28" style="color: rgb(255, 143, 0); font-weight: 600;">$49</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 11px; line-height: 1.5;" title="">Buy Now</a></div>' +
        '\n<div class="spacer height-20"></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/rocknwool-ujaxqq0tb5a-unsplash-khITm1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-54.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sincerely-media-tw917xag0wu-unsplash-c1cdS1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '\n<h1 class="size-42" style="letter-spacing: 1px;">Alexa Earrings</h1>' +
        '\n<p class="size-35" style="color: rgb(216, 67, 21); margin: 0px;">$22</p>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Color Availability: Brown, Silver, Black<br>Delivery: 1 to 3 days</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-55.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-42" style="letter-spacing: 1px;">Sofa Chair</h1>' +
        '\n<p class="size-35" style="color: rgb(216, 67, 21); margin: 0px;">$118</p>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Color Availability: Beige, Brown, White<br>Delivery: 1 to 2 weeks</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>' +
        '\n<div><a href="#" class="is-btn" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Cart</a> &nbsp; <a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small" style="padding: 10px 22px; font-size: 12px; line-height: 1.5;">Buy Now</a></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/daniil-silantev-1p6ankdw6s8-unsplash-O6mXc2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-56.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/pizza-3000285_1920-0ccra1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">Roberto Pizza</h1>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '\n<p style="color: rgb(158, 158, 158);"><span style="letter-spacing: 2px; color: rgb(246, 97, 51);">SIZE:</span><br>Small, Medium, Large</p>' +
        '\n<p><span style="letter-spacing: 2px; color: rgb(115, 169, 77);">TOPPINGS:</span><br><span color="#ef6c00" style="color: rgb(158, 158, 158);">Roast Beef, Mushrooms, Bacon, Pineapple, Pepperoni, Tomatoes, Extra Cheese</span></p>' +
        '\n<p class="size-28" style="font-family: Georgia, serif;">$15</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Place Order</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-57.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">Meat Burger</h1>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '\n<p style="color: rgb(158, 158, 158);"><span style="letter-spacing: 2px; color: rgb(228, 70, 70);">SIZE:</span><br>Small, Medium, Large</p>' +
        '\n<p><span style="letter-spacing: 2px; color: rgb(115, 169, 77);">EXTRAS:</span><br><span color="#ef6c00" style="color: rgb(158, 158, 158);">Burger Patty, Smoked Beef, Swiss Cheese, Cheese Sauce, Mushroom Sauce</span></p>' +
        '\n<p class="size-28" style="font-family: Georgia, serif;">$9</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Place Order</a></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sina-piryae-6xmqv6gccyu-unsplash-5lXVR1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-58.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/eiliv-sonas-aceron-0gq8fh1f54k-unsplash-cql6u1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-46" style="letter-spacing: 1px;">Rice Noodles</h1>' +
        '\n<p class="size-12" style="letter-spacing: 1px;"><i class="icon ion-android-time"></i>&nbsp;25 MINS&nbsp; &nbsp;<i class="icon ion-person"></i>&nbsp;&nbsp;2 PEOPLE&nbsp; &nbsp;<i class="icon ion-ios-flame"></i>&nbsp;142 CALORIES</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '\n<p class="size-28">$23</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Place Order</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-59.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-46" style="letter-spacing: 1px;">Strawberries Dessert</h1>' +
        '\n<p class="size-12" style="letter-spacing: 1px;"><i class="icon ion-android-time"></i>&nbsp;18 MINS&nbsp; &nbsp;<i class="icon ion-person"></i>&nbsp;&nbsp;1 PERSON&nbsp; &nbsp;<i class="icon ion-ios-flame"></i>&nbsp;93 CALORIES</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took.</p>' +
        '\n<p class="size-28">$14</p>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Place Order</a></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/karly-gomez-lk1q5ryd6tc-unsplash-16U971.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-60.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/charles-deluvio-271645-unsplash-pNDz81.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2 style="letter-spacing: 1px;" class="size-35">Jiaozi Dumplings</h2>' +
        '\n<p class="size-24" style="line-height: 1; font-family: Georgia, serif;">$7</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '\n<div><a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;">Add to Cart</a> &nbsp; <a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;">Buy Now</a></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Be the first to review this food</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-61.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 style="letter-spacing: 1px;" class="size-35">Chicken Dumplings</h2>' +
        '\n<p class="size-24" style="line-height: 1; font-family: Georgia, serif;">$9</p>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '\n<div><a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;">Add to Cart</a> &nbsp; <a href="#" class="is-btn" title="" style="margin: 3px 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 11px; letter-spacing: 3px;">Buy Now</a></div>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-14" style="color: rgb(158, 158, 158);">Be the first to review this food</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/charles-wr8ze_o-sji-unsplash-YyDs11.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-62.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/carly-jayne-2vgufemdhem-unsplash-VOUIN1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-46" style="letter-spacing: 2px;">Monte Cristo Toast&nbsp;<b class="size-24" style="color: rgb(239, 108, 0);letter-spacing: 0;">$13</b></h1>' +
        '\n<p style="color: rgb(158, 158, 158); font-family: monospace;" class="size-16">325 cal</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Order</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/products-63.png',
      category: '104',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-46" style="letter-spacing: 2px;">King Avocado Toast&nbsp;<b class="size-24" style="color: rgb(239, 108, 0);letter-spacing: 0;">$11</b></h1>' +
        '\n<p style="color: rgb(158, 158, 158); font-family: monospace;" class="size-16">170 cal</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div><a href="#" style="margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgba(0, 0, 0, 0); color: rgb(23, 23, 23); border-color: rgb(23, 23, 23); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;" title="">Add to Order</a></div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mariana-medvedeva-nm1fz-scxne-unsplash-T9wXJ1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-01.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">WHY CHOOSE US</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-android-desktop size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-android-create size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-camera size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-02.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-80 is-title-lite"><i>01</i></h1>' +
        '\n<h3>Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. Vivamus leo ante, consectetur sit amet.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-80 is-title-lite"><i>02</i></h1>' +
        '\n<h3>Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. Vivamus leo ante, consectetur sit amet.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-80 is-title-lite"><i>03</i></h1>' +
        '\n<h3>Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. Vivamus leo ante, consectetur sit amet.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-03.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite is-upper" style="text-align: center; font-weight: 300;">WHY CHOOSE US?</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3 class="size-24 default-font2" style="margin: 0 0 0 50px; font-weight: 300">Feature Item</h3>' +
        _tabs(1) +
        '<p style="margin: 5px 0 0 50px;  font-weight: 300">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3 class="size-24 default-font2" style="margin: 0 0 0 50px;  font-weight: 300">Feature Item</h3>' +
        _tabs(1) +
        '<p style="margin: 5px 0 0 50px;  font-weight: 300">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3 class="size-24 default-font2" style="margin: 0 0 0 50px;  font-weight: 300">Feature Item</h3>' +
        _tabs(1) +
        '<p style="margin: 5px 0 0 50px; font-weight: 300">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-04.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<i class="icon ion-ios-lightbulb-outline size-48" style="color: #e74c3c"></i>' +
        _tabs(1) +
        '<h3 class="size-18" style="line-height:1">CREATIVE IDEAS</h3>' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #e74c3c; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<i class="icon ion-ios-gear-outline size-48" style="color: #e74c3c"></i>' +
        _tabs(1) +
        '<h3 class="size-18" style="line-height:1">WEB DEVELOPMENT </h3>' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #e74c3c; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<i class="icon ion-ios-camera-outline size-48" style="color: #e74c3c"></i>' +
        _tabs(1) +
        '<h3 class="size-18" style="line-height:1">PHOTOGRAPHY</h3>' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #e74c3c; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<i class="icon ion-iphone size-48" style="color: #e74c3c"></i>' +
        _tabs(1) +
        '<h3 class="size-18" style="line-height:1">RESPONSIVE DESIGN</h3>' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #e74c3c; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<i class="icon ion-ios-paper-outline size-48" style="color: #e74c3c"></i>' +
        _tabs(1) +
        '<h3 class="size-18" style="line-height:1">DIGITAL MARKETING</h3>' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #e74c3c; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="padding-20">' +
        _tabs(1) +
        '<i class="icon ion-ios-clock-outline size-48" style="color: #e74c3c"></i>' +
        _tabs(1) +
        '<h3 class="size-18" style="line-height:1">ONLINE SUPPORT</h3>' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #e74c3c; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-05.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h4 class="size-28 display-font2">Discover</h4>' +
        '\n<h1 class="size-48 is-title1-48 is-title-lite is-upper">Why Choose Our Products</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/imac-Bz83W1.png" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3 class="size-24" style="margin: 0 0 0 50px">Feature Item</h3>' +
        _tabs(1) +
        '<p style="margin: 5px 0 0 50px">Lorem Ipsum is simply dummy text</p>' +
        '\n</div>' +
        '\n<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3 class="size-24" style="margin: 0 0 0 50px">Feature Item</h3>' +
        _tabs(1) +
        '<p style="margin: 5px 0 0 50px">Lorem Ipsum is simply dummy text</p>' +
        '\n</div>' +
        '\n<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-checkmark"></i>' +
        _tabs(1) +
        '<h3 class="size-24" style="margin: 0 0 0 50px">Feature Item</h3>' +
        _tabs(1) +
        '<p style="margin: 5px 0 0 50px">Lorem Ipsum is simply dummy text</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-06.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-images size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-android-desktop size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-android-clipboard size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: 2px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-android-options size-24" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<h3 class="size-21 is-title-lite">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-07.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p class="size-64 is-title1-64 is-title-bold">1</p>' +
        '\n<h3 class="size-24 is-title-lite" style="line-height: 1.5">CREATIVE IDEAS</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p class="size-64 is-title1-64 is-title-bold">2</p>' +
        '\n<h3 class="size-24 is-title-lite" style="line-height: 1.5">WEB DEVELOPMENT</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p class="size-64 is-title1-64 is-title-bold">3</p>' +
        '\n<h3 class="size-24 is-title-lite" style="line-height: 1.5">RESPONSIVE DESIGN</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p class="size-64 is-title1-64 is-title-bold">4</p>' +
        '\n<h3 class="size-24 is-title-lite" style="line-height: 1.5">ONLINE SUPPORT</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px;"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-08.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 default-font2" style="letter-spacing: 5px; font-weight: 300">FEATURES</h1>' +
        '\n<p style="border-bottom: 2px solid #333; width: 50px; display: inline-block; margin: 0"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<h1 class="size-48">01</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 2px; font-weight: 300">FEATURE ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h1 class="size-48">02</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 2px; font-weight: 300">FEATURE TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h1 class="size-48">03</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 2px; font-weight: 300">FEATURE THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-09.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">SPECIAL FEATURES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<i class="icon ion-android-bulb size-32"></i>' +
        '\n<h3 class="size-24">Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-android-globe size-32"></i>' +
        '\n<h3 class="size-24">Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-android-download size-32"></i>' +
        '\n<h3 class="size-24">Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-android-favorite-outline size-32"></i>' +
        '\n<h3 class="size-24">Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-10.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">OUR FEATURES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-bulb size-48"></i>' +
        _tabs(1) +
        '<h3 style="margin: 0 0 0 70px">FEATURE ITEM</h3>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-checkmark-circle size-48"></i>' +
        _tabs(1) +
        '<h3 style="margin: 0 0 0 70px">FEATURE ITEM</h3>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-favorite-outline size-48"></i>' +
        _tabs(1) +
        '<h3 style="margin: 0 0 0 70px">FEATURE ITEM</h3>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-wrench size-48"></i>' +
        _tabs(1) +
        '<h3 style="margin: 0 0 0 70px">FEATURE ITEM</h3>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-11.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-60 display-font2" style="letter-spacing: 10px; line-height: 1.5">WHAT MAKES US DIFFERENT</p>' +
        '\n<p style="border-bottom: 2px solid #333; width: 70px; display: inline-block; margin: 0"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<i class="icon ion-android-bulb size-32" style="color: #bdc3c7"></i>' +
        '\n<h3 class="size-21" style="letter-spacing: 1px; font-weight: 300">FEATURE 01</h3>' +
        '\n<p class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-android-desktop size-32" style="color: #bdc3c7"></i>' +
        '\n<h3 class="size-21" style="letter-spacing: 1px; font-weight: 300">FEATURE 02</h3>' +
        '\n<p class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-gear-b size-32" style="color: #bdc3c7"></i>' +
        '\n<h3 class="size-21" style="letter-spacing: 1px; font-weight: 300">FEATURE 03</h3>' +
        '\n<p class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-earth size-32" style="color: #bdc3c7"></i>' +
        '\n<h3 class="size-21" style="letter-spacing: 1px; font-weight: 300">FEATURE 04</h3>' +
        '\n<p class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-12.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-32" style="letter-spacing: 2px;"><b style="text-transform: uppercase;">What Makes Us Different</b></h1>' +
        '\n<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Lorem ipsum dolor sit amet vivamus leo ante.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/kara-michelle-544960-zjkQn1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<p><i class="icon ion-android-options size-24" style="color: #bdc3c7"></i></p>' +
        '\n<p>FEATURE ITEM<br>Lorem Ipsum is dummy.</p>' +
        '\n<p><i class="icon ion-images size-24" style="color: #bdc3c7"></i></p>' +
        '\n<p>FEATURE ITEM<br>Lorem Ipsum is dummy.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-13.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-48">01</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 3px; font-weight: 300">FEATURE ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-48">02</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 3px; font-weight: 300">FEATURE TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-48">03</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 3px; font-weight: 300">FEATURE THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-48">04</h1>' +
        '\n<h3 class="size-24 default-font2" style="letter-spacing: 3px; font-weight: 300">FEATURE FOUR</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-14.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 5px;">WHAT MAKES US DIFFERENT</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div style="text-align: center; width: 40px; height: 40px; line-height: 40px; border-radius: 50%; border: 2px solid #e67e22; display: inline-block;">' +
        _tabs(1) +
        '<i class="icon ion-android-desktop size-16" style="color: #e67e22"></i>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top: 30px; letter-spacing: 2px;">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div style="text-align: center; width: 40px; height: 40px; line-height: 40px; border-radius: 50%; border: 2px solid #e67e22; display: inline-block;">' +
        _tabs(1) +
        '<i class="icon ion-gear-b size-16" style="color: #e67e22;"></i>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top: 30px; letter-spacing: 2px;">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div style="text-align: center; width: 40px; height: 40px; line-height: 40px; border-radius: 50%; border: 2px solid #e67e22; display: inline-block;">' +
        _tabs(1) +
        '<i class="icon ion-paintbucket size-16" style="color: #e67e22;"></i>' +
        '\n</div>' +
        '\n<h3 class="size-24" style="margin-top: 30px; letter-spacing: 2px;">FEATURE ITEM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-15.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/aidan-hancock-440776-unsplash-8u7fo1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<p><i class="icon ion-monitor size-21" style="color: #bdc3c7"></i></p>' +
        '\n<p>FEATURE ITEM<br>Lorem ipsum dummy text</p>' +
        '\n<p><i class="icon ion-android-microphone size-21" style="color: #bdc3c7"></i></p>' +
        '\n<p>FEATURE ITEM<br>Lorem ipsum dummy text</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p><i class="icon ion-android-options size-21" style="color: #bdc3c7"></i></p>' +
        '\n<p>FEATURE ITEM<br>Lorem ipsum dummy text</p>' +
        '\n<p><i class="icon ion-images size-21" style="color: #bdc3c7"></i></p>' +
        '\n<p>FEATURE ITEM<br>Lorem ipsum dummy text</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-19.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">SMART SOLUTIONS FOR YOUR BUSINESS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-android-bulb size-32" style="color: #e67e22"></i>' +
        '\n<h3 class="size-24">Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-android-create size-32" style="color: #e67e22"></i>' +
        '\n<h3 class="size-24">Feature Item</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-27.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-card-circle is-light-text" style="width:50px;height:50px;padding:5px;background:#07d2c0;margin:0">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-code size-24"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="letter-spacing:1px;margin-top:20px">Feature One</h3>' +
        '\n<p style="border-bottom: 2px solid #07d2c0; width: 40px; display: inline-block; margin: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-card-circle is-light-text" style="width:50px;height:50px;padding:5px;background:#07d2c0;margin:0">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-code size-24"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="letter-spacing:1px;margin-top:20px">Feature Two</h3>' +
        '\n<p style="border-bottom: 2px solid #07d2c0; width: 40px; display: inline-block; margin: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-card-circle is-light-text" style="width:50px;height:50px;padding:5px;background:#07d2c0;margin:0">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-code size-24"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="letter-spacing:1px;margin-top:20px">Feature Three</h3>' +
        '\n<p style="border-bottom: 2px solid #07d2c0; width: 40px; display: inline-block; margin: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-card-circle is-light-text" style="width:50px;height:50px;padding:5px;background:#07d2c0;margin:0">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-code size-24"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="letter-spacing:1px;margin-top:20px">Feature Four</h3>' +
        '\n<p style="border-bottom: 2px solid #07d2c0; width: 40px; display: inline-block; margin: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-28.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full size-42">' +
        '<h1 style="max-width: 100%; width: 500px; font-weight: 400; letter-spacing: 1px;" class="size-38">We do the work. <br>You stay focused on your customers</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-lightbulb-outline size-42" style="color: #e81212;"></i>' +
        '\n<h3 class="size-21">Ideas</h3>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-gear-outline size-42" style="color: #15a207;"></i>' +
        '\n<h3 class="size-21">Development</h3>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-infinite-outline size-42" style="color: #fa6527;"></i>' +
        '\n<h3 class="size-21">Unlimited Possibilities</h3>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-29.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-lightbulb-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-gear-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-infinite-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-play-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-monitor-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-paperplane-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-30.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 style="letter-spacing: 1px;">Features</h1><div class="spacer height-20"></div>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is simply dummy text.</p>' +
        "\n<div><a href=\"#\" style=\"margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(52, 221, 135); color: rgb(255, 255, 255); border-color: rgb(52, 221, 135); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;\" data-hover-bgcolor=\"#2fd07e\" data-hover-color=\"#ffffff\" data-hover-bordercolor=\"#2fd07e\" onmouseover=\"this.setAttribute('data-style',this.style.cssText);if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');\" onmouseout=\"this.setAttribute('style',this.getAttribute('data-style'));this.removeAttribute('data-style')\">Read More</a></div>" +
        '</div>' +
        '<div class="column fourth">' +
        '<p><b>Feature Item</b><br>Lorem Ipsum is simply dummy text.</p>' +
        '\n<p><b>Feature Item</b><br>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<p><b>Feature Item</b><br>Lorem Ipsum is simply dummy text.</p>' +
        '\n<p><b>Feature Item</b><br>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-31.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 2px; font-weight: bold;"><span style="color: rgb(188, 188, 188);">Powerful</span> Features</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-infinite-outline size-42"></i>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-play-outline size-42"></i>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-gear-outline size-42"></i>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-lightbulb-outline size-42"></i>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-color-wand-outline size-42"></i>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-download-outline size-42"></i>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-32.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 3px;">OUR FEATURES</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-lightbulb-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-compose-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-gear-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-infinite-outline size-42"></i>' +
        '\n<p><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-33.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-72" style="letter-spacing: 3px;">Special Features.</h1>' +
        '</div>' +
        '<div class="column half">' +
        '<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the and typesetting printing industry.</span></p>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the and typesetting printing industry.</span></p>' +
        '\n<p class="size-16"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);">Lorem Ipsum is simply dummy text of the and typesetting printing industry.</span></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/features-34.png',
      category: '105',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 3px; text-align: left; text-transform: uppercase;">Special Features</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-ios-lightbulb-outline size-21" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<p class="size-16" style="margin-top: 0;"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-ios-gear-outline size-21" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<p class="size-16" style="margin-top: 0;"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-ios-color-wand-outline size-21" style="color: #888888"></i>' +
        '\n</div>' +
        '\n\n<p class="size-16" style="margin-top: 0;"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-ios-play-outline size-21" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<p class="size-16" style="margin-top: 0;"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-ios-settings size-21" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<p class="size-16" style="margin-top: 0;"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '<div class="column third">' +
        '<div style="text-align: center; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; border: 1px solid #888888; display: inline-block;margin-bottom: 25px">' +
        _tabs(1) +
        '<i class="icon ion-ios-world-outline size-21" style="color: #888888"></i>' +
        '\n</div>' +
        '\n<p class="size-16" style="margin-top: 0;"><b>Feature Item</b><br><span style="color: rgb(149, 149, 149);>"Lorem Ipsum is dummy text of the printing industry.</span></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-01.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21" style="color: #d4d4d4; font-family: \'Georgia\', serif;"><i>Discover</i></p>' +
        '\n<h1 class="size-32 is-title1-32 is-title-bold">HOW IT WORKS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-80 is-title-bold" style="color: #d4d4d4;">1.</h1>' +
        '\n<h3 class="size-24 is-title-lite">STEP 01</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-80 is-title-bold" style="color: #d4d4d4;">2.</h1>' +
        '\n<h3 class="size-24 is-title-lite">STEP 02</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-80 is-title-bold" style="color: #d4d4d4;">3.</h1>' +
        '\n<h3 class="size-24 is-title-lite">STEP 03</h3>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-02.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 4px;">HOW WE WORK</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 60px; display: inline-block; margin-top: 0"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h2 style="color: rgb(204, 204, 204);">01.</h2>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 style="color: rgb(204, 204, 204);">02.</h2>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 style="color: rgb(204, 204, 204);">03.</h2>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-03.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-38" style="letter-spacing: 1px;">THE PROCESS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p class="size-42" style="line-height: 1; font-weight: bold;">01.</p>' +
        '\n<h2 class="size-28">STEP ONE</h2>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Vivamus leo ante, consectetur sit amet.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/workplace-1245776_1280-oxBIU1.jpg" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/desk-office-hero-workspace-(1)-V8F292.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p class="size-42" style="line-height: 1; font-weight: bold;">02.</p>' +
        '\n<h2 class="size-28">STEP TWO</h2>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Vivamus leo ante, consectetur sit amet.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-04.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="text-align:center; letter-spacing: 4px; text-transform: uppercase;">HOW WE WORK</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-ios-arrow-right size-60"></i>' +
        _tabs(1) +
        '<h3 class="size-28">STEP 1</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-ios-arrow-right size-60"></i>' +
        _tabs(1) +
        '<h3 class="size-28">STEP 2</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-ios-arrow-right size-60"></i>' +
        _tabs(1) +
        '<h3 class="size-28">STEP 2</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-05.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-46" style="letter-spacing: 2px;">HOW IT WORKS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:90px;height:90px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-42" style="margin: 0px; font-weight: bold;">1</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step One</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:90px;height:90px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-42" style="margin: 0px; font-weight: bold;">2</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step Two</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:90px;height:90px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-42" style="margin: 0px; font-weight: bold;">3</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step Three</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-06.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-46" style="letter-spacing: 2px;">HOW IT WORKS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:90px;height:90px;padding:10px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-42" style="margin: 0px; font-weight: bold;">1</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step One</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:90px;height:90px;padding:10px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-42" style="margin: 0px; font-weight: bold;">2</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step Two</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:90px;height:90px;padding:10px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-42" style="margin: 0px; font-weight: bold;">3</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step Three</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-07.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21" style="color: #d4d4d4; font-family: \'Georgia\', serif;"><i>Discover</i></p>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold">OUR WORK STEPS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-24"><i class="icon ion-ios-chatboxes-outline size-32"></i> &nbsp;STEP 01</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-24"><i class="icon ion-ios-gear-outline size-32"></i> &nbsp;STEP 2</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-24"><i class="icon ion-ios-paperplane-outline size-32"></i> &nbsp;STEP 3</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-08.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-60">HOW</h1>' +
        '\n<h3 class="size-24">Step One</h3>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.8;">Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-60">IT</h1>' +
        '\n<h3 class="size-24">Step Two</h3>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.8;">Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-60">WORKS</h1>' +
        '\n<h3 class="size-24">Step Three</h3>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.8;">Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-09.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-50" style="letter-spacing: 2px; text-transform: uppercase;">Timeline Process</h1>' +
        '\n<p style="letter-spacing: 4px; text-transform: uppercase;">Discover How We Work</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<h3 class="size-18" style="border: 2px solid rgb(0, 0, 0); padding: 10px; display: inline-block; letter-spacing: 3px;">STEP ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h3 class="size-18" style="border: 2px solid rgb(0, 0, 0); padding: 10px; display: inline-block; letter-spacing: 3px;">STEP TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h3 class="size-18" style="border: 2px solid rgb(0, 0, 0); padding: 10px; display: inline-block; letter-spacing: 3px;">STEP THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-10.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">THE PROCESS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-android-bulb size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 1</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-compose size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 2</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-code size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 3</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:70px;height:70px;padding:15px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-android-desktop size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 4</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-11.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">THE PROCESS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-android-bulb size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 1</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-compose size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 2</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-code size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 3</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text" style="width:70px;height:70px;padding:15px;background:#000;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<i class="icon ion-android-desktop size-32"></i>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 style="margin-top:1.5em">Step 4</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-12.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h2 class="size-64" style="letter-spacing: 2px;">Timeline Process</h2>' +
        '\n<p class="size-21" style="letter-spacing: 1px;">Discover How We Work</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<p class="size-50 default-font1" style="line-height:1.3">01</p>' +
        '\n<h3 class="size-18">STEP ONE</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<p class="size-50 default-font1" style="line-height:1.3">02</p>' +
        '\n<h3 class="size-18">STEP TWO</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<p class="size-50 default-font1" style="line-height:1.3">03</p>' +
        '\n<h3 class="size-18">STEP THREE</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-13.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 style="letter-spacing: 3px;">WORK STEPS</h1>' +
        '\n<p style="border-bottom: 2px solid #333; width: 40px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-80" style="text-align: center;">01</h1>' +
        '\n<p style="text-align: left;">Lorem Ipsum is simply dummy text of the printing industry. Vivamus leo ante, dolor sit amet vel.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-80" style="text-align: center;">02</h1>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. Vivamus leo ante, dolor sit amet vel.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-80" style="text-align: center;">03</h1>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. Vivamus leo ante, dolor sit amet vel.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-14.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-18" style="font-style: italic;">Discover</p>' +
        '\n<h1 class="size-46" style="letter-spacing: 4px;">HOW WE WORK</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-android-bulb size-48" style="color: #ea653c;"></i>' +
        '\n<h3 class="size-21">STEP ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-compose size-48" style="color: #ea653c;"></i>' +
        '\n<h3 class="size-21">STEP TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-gear-b size-48" style="color: #ea653c;"></i>' +
        '\n<h3 class="size-21">STEP THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-15.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="letter-spacing: 2px;">STEP ONE</p>' +
        '\n<h1 class="size-42" style="font-weight: bold;">Discovery</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-BwYjC1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-FrSUb2.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<p style="letter-spacing: 2px;">STEP TWO</p>' +
        '\n<h1 class="size-42" style="font-weight: bold;">Design and Development</h1>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-16.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full" style="text-align: center;">' +
        '<h1 style="letter-spacing: 2px;">THIS IS HOW WE WORK</h1>' +
        '\n<p style="border-bottom: 2px solid #333; width: 70px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-clipboard size-32"></i>' +
        '\n<h3 class="size-21">STEP ONE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-gear-b size-32"></i>' +
        '\n<h3 class="size-21">STEP TWO</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-paper-airplane size-32"></i>' +
        '\n<h3 class="size-21">STEP THREE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-26.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 1px;" class="size-46">How<span style="font-weight: bold;"> [our company] </span>Works</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="color: rgb(158, 158, 158); text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-compose-outline size-48" style="color: #e74c3c"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">CREATE</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-world-outline size-48" style="color: #e74c3c"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">PUBLISH</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-paperplane-outline size-48" style="color: #e74c3c"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">START SELLING</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-list-outline size-48" style="color: #e74c3c"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">MANAGE</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-27.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: right; letter-spacing: 2px;">How it Works</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<div style="text-align: center"><i class="icon ion-ios-lightbulb-outline size-68"></i></div>' +
        '</div>' +
        '<div class="column two-fourth">' +
        '<p style="text-align: justify;">STEP ONE<br>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column two-fourth">' +
        '<p style="text-align: justify;">STEP TWO<br>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div style="text-align: center"><i class="icon ion-ios-list-outline size-68"></i></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<div style="text-align: center"><i class="icon ion-ios-paperplane-outline size-68"></i></div>' +
        '</div>' +
        '<div class="column two-fourth">' +
        '<p style="text-align: justify;">STEP THREE<br>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-28.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-42" style="font-weight: bold; letter-spacing: 2px;">HOW <br>WE WORKS</h1>' +
        '</div>' +
        '<div class="column two-third">' +
        '<p style="text-align: justify;"><b>1. Tell us what you need.</b> Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<p style="text-align: justify;"><b>2. Solution offer.</b> Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<p style="text-align: justify;"><b>3. Planning & design.</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<p><b>4. Implementing & maintenance.</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-29.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-46" style="font-weight: bold; letter-spacing: 1px;">4 simple <font style="color: #bdbdbd;">steps</font></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-lightbulb-outline size-42"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">PLAN</p>' +
        '\n<p class="size-14">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-heart-outline size-42"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">DESIGN</p>' +
        '\n<p class="size-14">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-compose-outline size-42"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">BUILD</p>' +
        '\n<p class="size-14">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-list-outline size-42"></i>' +
        '\n<p style="letter-spacing: 2px; line-height:1;">MANAGE</p>' +
        '\n<p class="size-14">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-30.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 1px; margin-left: -90px;" class="size-46 margin-left-1024-reset">How<span style="font-weight: bold;"> [our company]  </span>Works</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-54" style="font-family: monospace;">1.</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-54" style="font-family: monospace;">2.</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-54" style="font-family: monospace;">3.</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text.</p>" +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-54" style="font-family: monospace;">4.</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-31.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="text-align: center;">' +
        _tabs(1) +
        '<h1 style="text-align: center; letter-spacing: 2px;" class="size-35">This is how <font style="color: rgb(239, 108, 0);">we work</font></h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 50px; display: inline-block;"></p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">Step 1</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">Step 2</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">Step 3</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">Step 4</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-32.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 2px; text-align: left;">How it Works</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-24" style="letter-spacing: 1px;">Choose your product</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block; margin: 0;"></p>' +
        '\n<p style="text-align: justify; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-24" style="letter-spacing: 1px;">Add your design</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block; margin: 0;"></p>' +
        '\n<p style="text-align: justify; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-24" style="letter-spacing: 1px;">Processing</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block; margin: 0;"></p>' +
        '\n<p style="text-align: justify; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-24" style="letter-spacing: 1px;">Shipping</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block; margin: 0;"></p>' +
        '\n<p style="text-align: justify; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/steps-33.png',
      category: '106',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: right; letter-spacing: 2px;">WORK STEPS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fifth">' +
        '<h1 class="size-76" style="color: rgb(255, 143, 0);">01</h1>' +
        '</div>' +
        '<div class="column two-fifth">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column two-fifth">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '<div class="column fifth">' +
        '<h1 class="size-76" style="color: rgb(188, 188, 188); text-align: center;">02</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fifth">' +
        '<h1 class="size-76" style="color: rgb(255, 143, 0);">03</h1>' +
        '</div>' +
        '<div class="column two-fifth">' +
        '<p style="text-align: justify;">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-01.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 1px;">CHOOSE YOUR PLAN</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-76" style="color: rgb(222, 222, 222); line-height: 1; font-weight: bold;">01</h1>' +
        '\n<h3 class="size-24" style="font-weight: bold">LITE / $33</h3>' +
        '\n<p style="border-bottom: 2.5px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-76" style="color: rgb(222, 222, 222); line-height: 1; font-weight: bold;">02</h1>' +
        '\n<h3 class="size-24" style="font-weight: bold">ADVANCED / $59</h3>' +
        '\n<p style="border-bottom: 2.5px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-76" style="color: rgb(222, 222, 222); line-height: 1; font-weight: bold;">03</h1>' +
        '\n<h3 class="size-24" style="font-weight: bold">ULTIMATE / $77</h3>' +
        '\n<p style="border-bottom: 2.5px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-02.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-38" style="letter-spacing: 2px;">SIMPLE PRICING</h1>' +
        '\n<p style="border-bottom: 2px solid #000; width: 60px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-24 is-title-lite">STANDARD</h3>' +
        _tabs(2) +
        '<p style="color: #e74c3c; font-size: 24px; line-height: 1.4">$<span class="size-64" style="color: #e74c3c">29</span>/mo</p>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-24 is-title-lite">DELUXE</h3>' +
        _tabs(2) +
        '<p style="color: #e74c3c; font-size: 24px; line-height: 1.4">$<span class="size-64" style="color: #e74c3c">59</span>/mo</p>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-24 is-title-lite">ULTIMATE</h3>' +
        _tabs(2) +
        '<p style="color: #e74c3c; font-size: 24px; line-height: 1.4">$<span class="size-64" style="color: #e74c3c">79</span>/mo</p>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-04.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 1px;">SUBSCRIPTION PLANS</h1>' +
        '\n<p>Choose the right plan that works for you.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-76" style="color: rgb(204, 204, 204); line-height: 1;">01</h1>' +
        _tabs(2) +
        '<h3 class="size-24">BASIC / FREE</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-light-text shadow-1" style="width:calc(100%);background-color: #27ae60">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-76" style="line-height:1">02</h1>' +
        _tabs(2) +
        '<h3 class="size-24">DELUXE / $77</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-light-text shadow-1" style="width:calc(100%);background-color: #f39c12">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-76" style="line-height:1">03</h1>' +
        _tabs(2) +
        '<h3 class="size-24">PREMIUM / $89</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-05.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 default-font2" style="letter-spacing: 2px;">PRICING PLANS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h2 class="size-64">$31</h2>' +
        '\n<p class="size-16 default-font1">MONTHLY</p>' +
        '\n<h3 class="size-24 default-font2" style="line-height: 2; letter-spacing: 2px;">STANDARD</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:1.5em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-64">$57</h2>' +
        '\n<p class="size-16 default-font1">MONTHLY</p>' +
        '\n<h3 class="size-24 default-font2" style="line-height: 2; letter-spacing: 2px;">PREMIUM</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:1.5em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-64">$62</h2>' +
        '\n<p class="size-16 default-font1">MONTHLY</p>' +
        '\n<h3 class="size-24 default-font2" style="line-height: 2; letter-spacing: 2px;">ULTIMATE</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:1.5em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-06.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 1px;">PRICING PLANS</h1>' +
        '<p>Fair Prices. Excellent Services.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<div class="is-card is-card-circle is-light-text card" style="width:90px;height:90px;padding:15px;margin-top:20px;background-color: #2980b9;">' +
        _tabs(3) +
        '<div class="is-card-content-centered">' +
        _tabs(4) +
        '<p class="size-42" style="margin:0; color: #fff">$<b style="color: #fff">55</b></p>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<h3 class="size-24 is-title-lite" style="margin-top:25px">STANDARD</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Purchase</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<div class="is-card is-card-circle is-light-text card" style="width:90px;height:90px;padding:15px;margin-top:20px;background-color: #c0392b">' +
        _tabs(3) +
        '<div class="is-card-content-centered">' +
        _tabs(4) +
        '<p class="size-42" style="margin:0; color: #fff">$<b style="color: #fff">67</b></p>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<h3 class="size-24 is-title-lite" style="margin-top:25px">DELUXE</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Purchase</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<div class="is-card is-card-circle is-light-text card" style="width:90px;height:90px;padding:15px;margin-top:20px;background-color: #8e44ad">' +
        _tabs(3) +
        '<div class="is-card-content-centered">' +
        _tabs(4) +
        '<p class="size-42" style="margin:0; color: #fff">$<b style="color: #fff">72</b></p>' +
        _tabs(3) +
        '</div>' +
        _tabs(2) +
        '</div>' +
        _tabs(2) +
        '<h3 class="size-24 is-title-lite" style="margin-top:25px">PREMIUM</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Purchase</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-07.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-38">PLANS THAT MEET YOUR NEEDS</h1>' +
        '\n<p>Fair Prices. Excellent Services.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-28 is-title-lite">BASIC</h1>' +
        _tabs(2) +
        '<p style="border-bottom: 2px solid #333; width: 30px; display: inline-block; margin-top: 0"></p>' +
        _tabs(2) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever.</p>" +
        _tabs(2) +
        '<h4>$ <span class="size-64 is-title-bold" style="font-weight: 600">39</span></h4>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-28 is-title-lite">ADVANCED</h1>' +
        _tabs(2) +
        '<p style="border-bottom: 2px solid #333; width: 30px; display: inline-block; margin-top: 0"></p>' +
        _tabs(2) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever.</p>" +
        _tabs(2) +
        '<h4>$ <span class="size-64 is-title-bold" style="font-weight: 600">59</span></h4>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-28 is-title-lite">ULTIMATE</h1>' +
        _tabs(2) +
        '<p style="border-bottom: 2px solid #333; width: 30px; display: inline-block; margin-top: 0"></p>' +
        _tabs(2) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever.</p>" +
        _tabs(2) +
        '<h4>$ <span class="size-64 is-title-bold" style="font-weight: 600">79</span></h4>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-08.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 1px;">Plans That Meet Your Needs</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-76" style="color: rgb(222, 222, 222); font-weight: bold;">01</h1>' +
        '\n<h3 class="size-24" style="font-weight: bold">BASIC / <span style="color: rgb(27, 131, 223);">$55</span></h3>' +
        '\n<p style="border-bottom: 2px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        "\n<p>Lorem Ipsum is dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-76" style="color: rgb(222, 222, 222); font-weight: bold;">02</h1>' +
        '\n<h3 class="size-24" style="font-weight: bold">PREMIUM / <span style="color: rgb(27, 131, 223);">$77</span></h3>' +
        '\n<p style="border-bottom: 2px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        "\n<p>Lorem Ipsum is dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div style="margin:1.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-09.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48">Pricing Plans</h1>' +
        '\n<p>Choose the right plan that works for you. No hidden fees.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-60" style="font-weight: bold;">$17</h1>' +
        _tabs(2) +
        '<h2 class="size-28">BASIC</h2>' +
        _tabs(2) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-60" style="font-weight: bold;">$29</h1>' +
        _tabs(2) +
        '<h2 class="size-28">PREMIUM</h2>' +
        _tabs(2) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Buy Now</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-12.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">CHOOSE YOUR PLAN</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-64 is-title1-64 is-title-bold"><span style="font-size:30px">$</span>19</h1>' +
        '\n<h3 class="size-18 is-title1-18 is-title-bold">Per Month</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<div style="margin:2em 0 1em">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-64 is-title1-64 is-title-bold"><span style="font-size:30px">$</span>27</h1>' +
        '\n<h3 class="size-18 is-title1-18 is-title-bold">Per Month</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<div style="margin:2em 0 1em">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-64 is-title1-64 is-title-bold"><span style="font-size:30px">$</span>39</h1>' +
        '\n<h3 class="size-18 is-title1-18 is-title-bold">Per Month</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<div style="margin:2em 0 1em">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-10.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 default-font2" style="letter-spacing: 2px;">SIMPLE PRICING</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 class="size-64">$31</h2>' +
        '\n<p class="size-16 default-font1">MONTHLY</p>' +
        '\n<h3 class="size-28 default-font2" style="line-height: 2;letter-spacing: 2px;">STANDARD</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:2.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<h2 class="size-64">$57</h2>' +
        '\n<p class="size-16 default-font1">MONTHLY</p>' +
        '\n<h3 class="size-28 default-font2" style="line-height: 2;letter-spacing: 2px;">ULTIMATE </h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:2.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-15.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">PRICING PLANS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3>BASIC</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="font-size: 24px; line-height: 1.4">$<span class="size-64 is-title-lite">34</span>/ month</p>' +
        '\n<div style="margin:2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Choose Plan</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<h3>PREMIUM</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="font-size: 24px; line-height: 1.4">$<span class="size-64 is-title-lite">57</span>/ month</p>' +
        '\n<div style="margin:2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Choose Plan</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-16.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">PRICING PLANS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-48 is-title1-48 is-title-bold" style="color: rgb(204, 204, 204);">FREE</h1>' +
        '\n<h3 class="size-21">Try New Features</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:2em 0 1em">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-48 is-title1-48 is-title-bold">$19</h1>' +
        '\n<h3 class="size-21">Monthly</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:2em 0 1em">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-48 is-title1-48 is-title-bold">$227</h1>' +
        '\n<h3 class="size-21">Yearly</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<div style="margin:2em 0 1em">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-small is-btn-ghost1 is-upper edit">Buy Now</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-17.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42">PRICING PLANS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-32 is-title-lite">BASIC</h1>' +
        _tabs(2) +
        '<h4>$ <span class="size-76">39</span></h4>' +
        _tabs(2) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-light-text shadow-1" style="width:calc(100%);background-color: #f39c12">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-32 is-title-lite">PREMIUM</h1>' +
        _tabs(2) +
        '<h4>$ <span class="size-76">59</span></h4>' +
        _tabs(2) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-32 is-title-lite">ULTIMATE</h1>' +
        _tabs(2) +
        '<h4>$ <span class="size-76">99</span></h4>' +
        _tabs(2) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        _tabs(2) +
        '<div style="margin:1.2em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Select Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-18.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">SUBSCRIPTION  PLANS</h1>' +
        '\n<p style="letter-spacing: 1px;">We make everything way easier for you.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-35" style="letter-spacing: 2px;">STARTER</h1>' +
        _tabs(2) +
        '<h3 class="size-18" style="color: rgb(119, 119, 119); letter-spacing: 2px;">$19 / MONTH</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.5em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Choose Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-35" style="letter-spacing: 2px;">PRO</h1>' +
        _tabs(2) +
        '<h3 class="size-18" style="color: rgb(119, 119, 119); letter-spacing: 2px;">$59 / MONTH</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.5em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Choose Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h1 class="size-35" style="letter-spacing: 2px;">BUSINESS</h1>' +
        _tabs(2) +
        '<h3 class="size-18" style="color: rgb(119, 119, 119); letter-spacing: 2px;">$79 / MONTH</h3>' +
        _tabs(2) +
        '<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div style="margin:1.5em 0">' +
        _tabs(3) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Choose Plan</a>' +
        _tabs(2) +
        '</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-19.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 4px; text-align: center;">OUR PLANS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-24" style="line-height: 2;letter-spacing: 2px;">STANDARD</h3>' +
        _tabs(2) +
        '<h3 class="size-60" style="font-weight: bold;">$27</h3>' +
        _tabs(2) +
        '<h3 class="size-18" style="font-weight: bold;">Per Month</h3>' +
        _tabs(2) +
        '<p style="margin-top:0">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div><a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small">Get Started</a></div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-24" style="line-height: 2;letter-spacing: 2px;">DELUXE</h3>' +
        _tabs(2) +
        '<h3 class="size-60" style="font-weight: bold;">$39</h3>' +
        _tabs(2) +
        '<h3 class="size-18" style="font-weight: bold;">Per Month</h3>' +
        _tabs(2) +
        '<p style="margin-top:0">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div><a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small">Get Started</a></div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<h3 class="size-24" style="line-height: 2;letter-spacing: 2px;">ULTIMATE</h3>' +
        _tabs(2) +
        '<h3 class="size-60" style="font-weight: bold;">$55</h3>' +
        _tabs(2) +
        '<h3 class="size-18" style="font-weight: bold;">Per Month</h3>' +
        _tabs(2) +
        '<p style="margin-top:0">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        _tabs(2) +
        '<div><a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small">Get Started</a></div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/pricing-20.png',
      category: '107',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-28" style="line-height: 2;letter-spacing: 2px;">BASIC <span style="color: rgb(149, 149, 149);">PLAN</span></h3>' +
        '\n<h3>$ <span class="size-64">39</span></h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem ipsum dolor sit amet, vivamus ante.</p>" +
        '\n<div style="margin:2.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-28" style="line-height: 2;letter-spacing: 2px;">PRO <span style="color: rgb(149, 149, 149);">PLAN</span></h3>' +
        '\n<h3>$ <span style="font-size: 64px;">79</span></h3>' +
        "\n<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem ipsum dolor sit amet, vivamus ante.</p>" +
        '\n<div style="margin:2.2em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Get Started</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-01.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16">DISCOVER HOW GOOD WE ARE</p>' +
        '\n<h1 class="size-64" style="letter-spacing: 5px;">TEAM SKILLS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h2 class="size-64">85%</h2>' +
        '\n<h3 class="size-18 default-font2">WEB DESIGN</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-64">98%</h2>' +
        '\n<h3 class="size-18 default-font2">WEB DEVELOPMENT</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-64">77%</h2>' +
        '\n<h3 class="size-18 default-font2">PHOTOSHOP</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-02.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="default-font2 size-64" style="letter-spacing: 6px;">PROFESSIONAL SKILLS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:70px;height:70px;padding:15px;background: #6ab04c;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-28 default-font1" style="margin: 0">87%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="margin-top: 25px;">WEB DESIGN </h3>' +
        '\n<p style="line-height: 1.8">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:70px;height:70px;padding:15px;background: #e84393;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-28 default-font1" style="margin: 0">92%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="margin-top: 25px;">WEB DEVELOPMENT </h3>' +
        '\n<p style="line-height: 1.8">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:70px;height:70px;padding:15px;background: #0984e3;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-28 default-font1" style="margin: 0">99%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-21" style="margin-top: 25px;">CUSTOMER SUPPORT</h3>' +
        '\n<p style="line-height: 1.8">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-03.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48"><b>WORK <span style="color: #888888">SKILLS</span></b></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 90px; height: 90px; line-hieght: 90px; border-radius: 50%; border: 3px solid #888888; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-28" style="padding: 10px; color: rgb(136, 136, 136); line-height: 1.3; font-weight: bold;">93%</p>' +
        '\n</div>' +
        '\n<h3 class="size-24">Design / Graphics</h3>' +
        '\n<p>Lorem Ipsum is dummy text of printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 90px; height: 90px; line-hieght: 90px; border-radius: 50%; border: 3px solid #888888; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-28" style="padding: 10px; color: rgb(136, 136, 136); line-height: 1.3; font-weight: bold;">85%</p>' +
        '\n</div>' +
        '\n<h3 class="size-24">HTML & CSS</h3>' +
        '\n<p>Lorem Ipsum is dummy text of printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 90px; height: 90px; line-hieght: 90px; border-radius: 50%; border: 3px solid #888888; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-28" style="padding: 10px; color: rgb(136, 136, 136); line-height: 1.3; font-weight: bold;">77%</p>' +
        '\n</div>' +
        '\n<h3 class="size-24">WordPress</h3>' +
        '\n<p>Lorem Ipsum is dummy text of printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<div style="text-align: center; width: 90px; height: 90px; line-hieght: 90px; border-radius: 50%; border: 3px solid #888888; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-28" style="padding: 10px; color: rgb(136, 136, 136); line-height: 1.3; font-weight: bold;">89%</p>' +
        '\n</div>' +
        '\n<h3 class="size-24">Customer Support</h3>' +
        '\n<p>Lorem Ipsum is dummy text of printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-04.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        '<h1 style="letter-spacing: 25px;">PROFESSIONAL SKILLS</h1>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:60px;height:60px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<div class="size-24">91%</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h4 style="line-height: 2.2;">HTML & CSS</h4>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.7">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:60px;height:60px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<div class="size-24">83%</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h4 style="line-height: 2.2;">PHP</h4>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.7">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:60px;height:60px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<div class="size-24">72%</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h4 style="line-height: 2.2;">JavaScript</h4>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.7">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-dark-text shadow-1" style="width:60px;height:60px;padding:10px">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<div class="size-24">85%</div>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h4 style="line-height: 2.2;">Photoshop</h4>' +
        '\n<p style="color: rgb(136, 136, 136); line-height: 1.7">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-05.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">OUR <span style="color: #888888">SKILLS</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-android-favorite-outline size-32" style="color: #f39c12"></i>' +
        '\n<h3 class="size-21" style="color: #888888">WEB DESIGN</h3>' +
        '\n<p style="border-bottom: 2px solid #f39c12; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-code size-32" style="color: #f39c12"></i>' +
        '\n<h3 class="size-21" style="color: #888888">HTML & CSS</h3>' +
        '\n<p style="border-bottom: 2px solid #f39c12; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-android-globe size-32" style="color: #f39c12"></i>' +
        '\n<h3 class="size-21" style="color: #888888">BRANDING</h3>' +
        '\n<p style="border-bottom: 2px solid #f39c12; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-06.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 default-font2" style="letter-spacing: 2px;">PROFESSIONAL SKILLS</h1>' +
        '\n<p style="border-bottom: 2px solid #333; width: 50px; display: inline-block; margin: 0"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:100px;height:100px;padding:15px;background: #f0932b;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-32 default-font1">92%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-18 default-font2" style="margin-top: 25px;">CREATIVE DESIGN</h3>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:100px;height:100px;padding:15px;background:  #6ab04c;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-32 default-font1">80%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-18 default-font2" style="margin-top: 25px;">PROGRAMMING</h3>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:100px;height:100px;padding:15px;background: #eb4d4b;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-32 default-font1">77%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-18 default-font2" style="margin-top: 25px;">PHOTOGRAPHY</h3>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<div class="is-card is-card-circle is-light-text shadow-1" style="width:100px;height:100px;padding:15px;background: #0984e3;">' +
        _tabs(1) +
        '<div class="is-card-content-centered">' +
        _tabs(2) +
        '<p class="size-32 default-font1">83%</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '\n<h3 class="size-18 default-font2" style="margin-top: 25px;">PHOTOSHOP</h3>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-07.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="letter-spacing: 1px;">DISCOVER HOW GOOD WE ARE</p>' +
        '\n<h1 class="size-54" style="letter-spacing: 5px;">TEAM SKILLS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 class="size-60">85%</h2>' +
        '\n<h3 class="size-18 default-font2">WEB DESIGN</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h2 class="size-60">98%</h2>' +
        '\n<h3 class="size-18 default-font2">WEB DEVELOPMENT</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 class="size-60">77%</h2>' +
        '\n<h3 class="size-18 default-font2">PHOTOSHOP</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h2 class="size-60">83%</h2>' +
        '\n<h3 class="size-18 default-font2">ANIMATION</h3>' +
        '\n<p class="size-16" style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-08.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">OUR FINEST SKILLS</h1>' +
        '\n<p class="size-21">We create things beautifully.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div style="text-align: center; width: 120px; height: 120px; line-height: 120px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:12px;">80%</p>' +
        '\n</div>' +
        '\n<p>DESIGN</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div style="text-align: center; width: 120px; height: 120px; line-height: 120px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:12px;">75%</p>' +
        '\n</div>' +
        '\n<p>MARKETING</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div style="text-align: center; width: 120px; height: 120px; line-height: 120px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:12px;">92%</p>' +
        '\n</div>' +
        '\n<p>DEVELOPMENT</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-09.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-64" style="letter-spacing: 11px; font-weight: 400;">TEAM SKILLS</h1>' +
        '\n<p class="size-16">DISCOVER HOW GOOD WE ARE</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<i class="icon ion-ios-heart-outline size-48" style="line-height:1"></i>' +
        '\n<p class="size-16">WEB DESIGN</p>' +
        '\n<p class="size-64 default-font1" style="font-weight: 400; line-height: 1.2">87%</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<i class="icon ion-ios-gear-outline size-48" style="line-height:1"></i>' +
        '\n<p class="size-16">WEB DEVELOPMENT</p>' +
        '\n<p class="size-64 default-font1" style="font-weight: 400; line-height: 1.2">92%</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<i class="icon ion-ios-camera-outline size-48" style="line-height:1"></i>' +
        '\n<p class="size-16">PHOTOGRAPHY</p>' +
        '\n<p class="size-64 default-font1" style="font-weight: 400; line-height: 1.2">77%</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<i class="icon ion-ios-world-outline size-48" style="line-height:1"></i>' +
        '\n<p class="size-16">BRANDING</p>' +
        '\n<p class="size-64 default-font1" style="font-weight: 400; line-height: 1.2">80%</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-10.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="text-align: center; letter-spacing: 3px;">OUR CAPABILITIES</h1>' +
        '\n<p style="letter-spacing: 1px;">SEE WHAT WE ARE GOOD AT</p>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column center fourth">' +
        '<div style="text-align: center; width: 100px; height: 100px; line-height: 100px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:4px;">90%</p>' +
        '\n</div>' +
        '\n<p>WEB DESIGN</p>' +
        '</div>' +
        '<div class="column center fourth">' +
        '<div style="text-align: center; width: 100px; height: 100px; line-height: 100px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:4px;">78%</p>' +
        '\n</div>' +
        '\n<p>GRAPHIC DESIGN</p>' +
        '</div>' +
        '<div class="column center fourth">' +
        '<div style="text-align: center; width: 100px; height: 100px; line-height: 100px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:4px;">70%</p>' +
        '\n</div>' +
        '\n<p>PHOTOGRAPHY</p>' +
        '</div>' +
        '<div class="column center fourth">' +
        '<div style="text-align: center; width: 100px; height: 100px; line-height: 100px; border-radius: 50%; border: 3px solid #333; display: inline-block;">' +
        _tabs(1) +
        '<p class="size-32 is-title1-32 is-title-bold" style="padding:4px;">82%</p>' +
        '\n</div>' +
        '\n<p>MARKETING</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-11.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">TEAM <span style="color: #888888">SKILLS</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div style="padding-right:30px">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-sGkY41.jpg" alt="">' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-android-favorite-outline size-32" style="color: #f37312;"></i>' +
        '\n<h3 class="size-21" style="color: #888888;letter-spacing: 1px;">GRAPHIC DESIGN</h3>' +
        '\n<p style="border-bottom: 2px solid #f37312; width: 50px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-code size-32" style="color: #f37312"></i>' +
        '\n<h3 class="size-21" style="color: #888888; letter-spacing: 1px;">WEB DEVELOPMENT</h3>' +
        '\n<p style="border-bottom: 2px solid #f37312; width: 50px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-12.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: center; letter-spacing: 3px;">OUR CAPABILITIES</h1>' +
        '\n<p style="letter-spacing: 1px; text-align: center;">SEE WHAT WE ARE GOOD AT</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column center third">' +
        '<i class="icon ion-ios-heart-outline size-32" style="line-height:1"></i>' +
        '\n<p class="size-64" style="line-height: 1.2">95%</p>' +
        '\n<p style="letter-spacing: 2px;">WEB DESIGN</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<i class="icon ion-ios-gear-outline size-32" style="line-height:1"></i>' +
        '\n<p class="size-64" style="line-height: 1.2">90%</p>' +
        '\n<p style="letter-spacing: 2px;">WEB DEVELOPMENT</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<i class="icon ion-ios-camera-outline size-32" style="line-height:1"></i>' +
        '\n<p class="size-64" style="line-height: 1.2">87%</p>' +
        '\n<p style="letter-spacing: 2px;">PHOTOGRAPHY</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-13.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">TEAM <span style="color: #888888">SKILLS</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-lightbulb-outline size-48"></i>' +
        '\n<h3 class="size-24"><b><span style="color: #bdbdbd;">90%</span></b>&nbsp; CONCEPT & IDEAS</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-heart-outline size-48"></i>' +
        '<h3 class="size-24"><b><span style="color: #bdbdbd;">88%</span></b>&nbsp; WEB DESIGN</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-gear-outline size-48"></i>' +
        '\n<h3 class="size-24"><b><span style="color: #bdbdbd;">85%</span></b>&nbsp; WEB DEVELOPMENT</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-monitor-outline size-48"></i>' +
        '\n<h3 class="size-24"><b><span style="color: #bdbdbd;">77%</span></b>&nbsp; BRANDING</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-14.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">TEAM SKILLS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-lightbulb-outline size-32"></i>' +
        '\n<h3 class="size-21"><b><span style="color: #bdbdbd;">90%</span></b>&nbsp; CONCEPT IDEAS</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-heart-outline size-32"></i>' +
        '\n<h3 class="size-21"><b><span style="color: #bdbdbd;">88%</span></b>&nbsp; WEB DESIGN</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-compose-outline size-32"></i>' +
        '\n<h3 class="size-21"><b><span style="color: #bdbdbd;">88%</span></b>&nbsp; PHOTOGRAPHY</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-16.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 3px; font-weight: bold;">OUR <span style="color: rgb(149, 149, 149);">SKILLS</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h2 class="size-48">91%</h2>' +
        '\n<h3 class="size-21">CREATIVE DESIGN</h3>' +
        '\n<p style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-48">85%</h2>' +
        '\n<h3 class="size-21">PROGRAMMING</h3>' +
        '\n<p style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h2 class="size-48">80%</h2>' +
        '\n<h3 class="size-21">BRANDING</h3>' +
        '\n<p style="color: rgb(149, 149, 149);">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-23.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; font-weight: bold;" class="size-42">Our Expertise</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-lightbulb-outline size-35" style="color: #56b498"></i>' +
        '\n<h3 class="size-21">Concept & Ideas</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-heart-outline size-35" style="color: #56b498"></i>' +
        '\n<h3 class="size-21">Responsive Design</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-list-outline size-35" style="color: #56b498"></i>' +
        '\n<h3 class="size-21">Web Development</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-world-outline size-35" style="color: #56b498"></i>' +
        '\n<h3 class="size-21">Marketing</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-24.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; font-weight: bold;">Our Expertise</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-lightbulb-outline size-35" style="color: #56b498"></i>' +
        '\n<p><b>Concepting</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-heart-outline size-35" style="color: #56b498"></i>' +
        '\n<p><b>Responsive Web Design</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-list-outline size-35" style="color: #56b498"></i>' +
        '\n<p><b>Web Development</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-camera-outline size-35" style="color: #56b498"></i>' +
        '\n<p><b>Photography</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-locked-outline size-35" style="color: #56b498"></i>' +
        '\n<p><b>Security</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-world-outline size-35" style="color: #56b498"></i>' +
        '\n<p><b>Branding</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-25.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column half" style="padding-right: 35px;">' +
        '<h1 class="size-35" style="text-transform: uppercase; letter-spacing: 4px; margin-top: 0px;">What We\'re Good At</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-lightbulb-outline size-35" style="color: #d85138; line-height:1;"></i>' +
        '\n<p><b class="size-16">Concept & Ideas</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-14">Lorem ipsum is dummy text of printing industry.</p>' +
        '\n<i class="icon ion-ios-gear-outline size-35" style="color: #d85138; line-height:1"></i>' +
        '\n<p><b class="size-16">Web Development</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-14">Lorem ipsum is dummy text of printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-heart-outline size-35" style="color: #d85138; line-height:1"></i>' +
        '\n<p><b class="size-16">Responsive Design</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-14">Lorem ipsum is dummy text of printing industry.</p>' +
        '\n<i class="icon ion-ios-list-outline size-35" style="color: #d85138;line-height:1;"></i>' +
        '\n<p><b class="size-16">Marketing</b></p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-14">Lorem ipsum is dummy text of printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-26.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 2px;">TEAM SKILLS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix" style="background-color: rgb(250, 250, 250); padding: 5px;">' +
        '<div class="column fifth">' +
        '<h1 class="size-46" style="line-height: 2.5; text-align: center; font-family: courier;">90%</h1>' +
        '</div>' +
        '<div class="column two-fifth">' +
        '<p style="text-align: justify;"><b>Concepting</b><br>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix" style="background-color: rgb(250, 250, 250); padding: 5px;">' +
        '<div class="column fifth">' +
        '<h1 class="size-46" style="line-height: 2.5; text-align: center; font-family: courier;">85%</h1>' +
        '</div>' +
        '<div class="column two-fifth">' +
        '<p style="text-align: justify;"><b>Responsive Design</b><br>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix" style="background-color: rgb(250, 250, 250); padding: 5px;">' +
        '<div class="column fifth">' +
        '<h1 class="size-46" style="line-height: 2.5; text-align: center; font-family: courier;">87%</h1>' +
        '</div>' +
        '<div class="column two-fifth">' +
        '<p style="text-align: justify;"><b>Web Development</b><br>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/skills-27.png',
      category: '108',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 2px;">TEAM  <span style="color: #d85138;">SKILLS</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="center column fourth">' +
        '<div style="text-align: center;width: 100px;height: 100px;line-height: 100px;border-radius: 50%;border: 2px solid #d85138;display: inline-block;margin: 15px 0 0 0">' +
        _tabs(1) +
        '<p class="size-32" style="font-family: Georgia, serif; color: #d85138;">95%</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column two-fourth">' +
        "<p><b>Concepting</b><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="center column fourth">' +
        '<div style="text-align: center;width: 100px;height: 100px;line-height: 100px;border-radius: 50%;border: 2px solid #d85138;display: inline-block;margin: 15px 0 0 0">' +
        _tabs(1) +
        '<p class="size-32" style="font-family: Georgia, serif;color: #d85138;">87%</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column two-fourth">' +
        "<p><b>Responsive Design</b><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="center column fourth">' +
        '<div style="text-align: center;width: 100px;height: 100px;line-height: 100px;border-radius: 50%;border: 2px solid #d85138;display: inline-block;margin: 15px 0 0 0">' +
        _tabs(1) +
        '<p class="size-32" style="font-family: Georgia, serif; color: #d85138;">90%</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column two-fourth">' +
        "<p><b>Web Development</b><br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-01.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-64 display-font2" style="letter-spacing: 3px;">ACHIEVEMENTS</h1>' +
        '\n<p style="color: rgb(136, 136, 136); letter-spacing: 2px;">DISCOVER HOW GOOD WE ARE</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<h1 class="size-80">97</h1>' +
        '\n<p class="size-21">PROJECTS DONE</p>' +
        '\n<p style="border-bottom: 1.5px solid #000; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h1 class="size-80">200+</h1>' +
        '\n<p class="size-21">HAPPY CLIENTS</p>' +
        '\n<p style="border-bottom: 1.5px solid #000; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h1 class="size-80">15</h1>' +
        '\n<p class="size-21">AWARDS WON</p>' +
        '\n<p style="border-bottom: 1.5px solid #000; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-02.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-21 is-info1">Fun Facts</p>' +
        '\n<h1 class="size-48 is-title1-48 is-title-lite">WHAT MAKES US DIFFERENT</h1>' +
        '\n<p class="size-21">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<p class="size-48 is-title1-48" style="font-weight: 400; line-height: 1.3">100%</p>' +
        '\n<p>Satisfaction</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-48 is-title1-48" style="font-weight: 400; line-height: 1.3">45</p>' +
        '\n<p>Awards</p>' +
        '</div>' +
        '<div class="column third">' +
        '<p class="size-48 is-title1-48" style="font-weight: 400; line-height: 1.3">312</p>' +
        '\n<p>Happy Clients</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-03.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite is-upper"><b>ACHIEVEMENTS /</b> WHY WE\'RE GOOD</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-heart-outline size-48"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">100% SATISFACTION</p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-people-outline size-48"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">HAPPY CLIENTS</p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-compose-outline size-48"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">PROJECTS DONE</p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<i class="icon ion-ios-star-outline size-48"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">AWARDS</p>' +
        '\n<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-04.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-bold">ACHIEVEMENTS / <span style="color: #d4d4d4;">WHY WE ARE SO AWESOME</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-android-happy size-48"></i>' +
        '\n<p style="margin-top:0">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-android-bulb size-48"></i>' +
        '\n<p style="margin-top:0">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-android-star-outline size-48"></i>' +
        '\n<p style="margin-top:0">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-05.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<p class="size-28" style="font-weight: bold; position: absolute; left: -50px; top: 0; line-height: 1;">355</p>' +
        _tabs(1) +
        '<h2 class="size-28" style="margin: 0 0 0 70px">Happy Clients</h2>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<p class="size-28" style="font-weight: bold; position: absolute; left: -50px; top: 0; line-height: 1;">70+</p>' +
        _tabs(1) +
        '<h2 class="size-28" style="margin: 0 0 0 70px">Projects Done</h2>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<p class="size-28" style="font-weight: bold; position: absolute; left: -50px; top: 0; line-height: 1;">30</p>' +
        _tabs(1) +
        '<h2 class="size-28" style="margin: 0 0 0 70px">Awards Won</h2>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<p class="size-28" style="font-weight: bold; position: absolute; left: -50px; top: 0; line-height: 1;">19k</p>' +
        _tabs(1) +
        '<h2 class="size-28" style="margin: 0 0 0 70px">Followers</h2>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-06.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-64" style="letter-spacing: 3px; font-weight: 300">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<h1 class="size-64">130+</h1>' +
        '\n<p class="size-18">HAPPY CLIENTS</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<h1 class="size-64">72</h1>' +
        '\n<p class="size-18">PROJECTS DONE</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<h1 class="size-64">14</h1>' +
        '\n<p class="size-18">AWARDS WON</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<h1 class="size-64">99%</h1>' +
        '\n<p class="size-18">SATISFACTION</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-08.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-bold">OUR ACHIEVEMENTS</h1>' +
        '\n<p class="size-21">Discover things that make us different.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-android-contacts size-48"></i>' +
        '\n<h1 class="size-32 is-title1-32 is-title-bold">200+</h1>' +
        '\n<p><b>HAPPY CLIENTS</b><br>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-checkmark size-48"></i>' +
        '\n<h1 class="size-32 is-title1-32 is-title-bold">85</h1>' +
        '\n<p><b>PROJECTS DONE</b><br>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-10.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32 is-title1-32 is-title-lite" style="text-align: center;">WHY WE\'RE AWESOME</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-android-people size-24" style="line-height:1"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold">775</h1>' +
        '\n<p>HAPPY CLIENTS</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-checkmark size-24" style="line-height:1"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold">60+</h1>' +
        '\n<p>PROJECTS DONE</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-trophy size-24" style="line-height:1"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold">12</h1>' +
        '\n<p>AWARDS WON</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-11.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 4px;">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<h1 class="size-60" style="text-align: center; font-weight: bold;">600+</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 1px;">HAPPY CLIENTS</h3>' +
        '</div>' +
        '<div class="column fourth">' +
        '<h1 class="size-60" style="text-align: center; font-weight: bold;">234</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 1px;">PROJECTS</h3>' +
        '</div>' +
        '<div class="column fourth">' +
        '<h1 class="size-60" style="text-align: center; font-weight: bold;">17</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 1px;">AWARDS WON</h3>' +
        '</div>' +
        '<div class="column fourth">' +
        '<h1 class="size-60" style="text-align: center; font-weight: bold;">90k+</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 1px;">FOLLOWERS</h3>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-12.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-54"><b>FUN FACTS / </b><span style="color: rgb(143, 143, 143);">WHAT MAKES US DIFFERENT</span></h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<h1 class="size-54">300+</h1>' +
        '\n<h3 class="size-18" style="letter-spacing: 1px;">HAPPY CLIENTS</h3>' +
        '</div>' +
        '<div class="column fourth">' +
        '<h1 class="size-54">123</h1>' +
        '\n<h3 class="size-18" style="letter-spacing: 1px;">PROJECTS</h3>' +
        '</div>' +
        '<div class="column fourth">' +
        '<h1 class="size-54">78K+</h1>' +
        '\n<h3 class="size-18" style="letter-spacing: 1px;">SUBSCRIBERS</h3>' +
        '</div>' +
        '<div class="column fourth">' +
        '<h1 class="size-54">12</h1>' +
        '\n<h3 class="size-18" style="letter-spacing: 1px;">AWARDS WON</h3>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-13.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<h1 class="size-64" style="font-weight: bold;">200+</h1>' +
        '\n<p class="size-21" style="margin-bottom: 5px; color: rgb(149, 149, 149);">HAPPY CLIENTS</p>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block;margin-top:0"></p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h1 class="size-64" style="font-weight: bold;">77</h1>' +
        '\n<p class="size-21" style="margin-bottom: 5px; color: rgb(149, 149, 149);">PROJECTS DONE</p>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block;margin-top:0"></p>' +
        '</div>' +
        '<div class="column third center">' +
        '<h1 class="size-64" style="font-weight: bold;">12</h1>' +
        '\n<p class="size-21" style="margin-bottom: 5px; color: rgb(149, 149, 149);">AWARDS WON</p>' +
        '\n<p style="border-bottom: 2px solid #000; width: 50px; display: inline-block;margin-top:0"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-14.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 5px; text-align: center;">ACHIEVEMENTS</h1>' +
        '\n<p style="text-align: center; letter-spacing: 2px;">WHAT MAKES US DIFFERENT</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-android-happy size-48" style="color: #f35b1c;"></i>' +
        '\n<h3 class="size-21" style="line-height: 1; letter-spacing: 1px;">4k+ HAPPY CLIENTS</h3>' +
        '\n<p style="border-bottom: 2px solid #f35b1c; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-edit size-48" style="color: #f35b1c"></i>' +
        '\n<h3 class="size-21" style="line-height: 1; letter-spacing: 1px;">98 PROJECTS DONE</h3>' +
        '\n<p style="border-bottom: 2px solid #f35b1c; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-trophy size-48" style="color: #f35b1c"></i>' +
        '\n<h3 class="size-21" style="line-height: 1; letter-spacing: 1px;">12 AWARDS WON</h3>' +
        '\n<p style="border-bottom: 2px solid #f35b1c; width: 50px; display: inline-block;"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-15.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-contacts size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-28">Happy Clients</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-compose size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-28">Completed Projects</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-trophy size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-28">Awards Won </h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-favorite-outline size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-28">Followers </h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-16.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 1px;">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-contacts size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-24">Happy Clients</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-compose size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-24">Projects Done</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-favorite-outline size-32"></i>' +
        _tabs(1) +
        '<h3 class="size-24">Subscribers</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-17.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 5px; text-align: center;">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-contacts size-32"></i>' +
        _tabs(1) +
        '<h3 style="font-weight: bold;">400+</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-compose size-32"></i>' +
        _tabs(1) +
        '<h3 style="font-weight: bold;">123</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-favorite-outline size-32"></i>' +
        _tabs(1) +
        '<h3 style="font-weight: bold;">90k+</h3>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing industry.</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-18.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 5px; text-align: center;">ACHIEVEMENTS</h1>' +
        '\n<p style="text-align: center; letter-spacing: 2px;">WHAT MAKES US DIFFERENT</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<i class="icon ion-android-people size-24" style="margin-bottom:0"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold" style="margin-top: 0">400+</h1>' +
        '\n<p>HAPPY CLIENTS</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<i class="icon ion-android-checkbox-outline size-24" style="margin-bottom:0"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold" style="margin-top: 0">234</h1>' +
        '\n<p>PROJECTS DONE</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<i class="icon ion-trophy size-24" style="margin-bottom:0"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold" style="margin-top: 0">12</h1>' +
        '\n<p>AWARDS WON</p>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<i class="icon ion-android-favorite-outline size-24" style="margin-bottom:0"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-bold" style="margin-top: 0">70k+</h1>' +
        '\n<p>FOLLOWERS</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-28.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: left; letter-spacing: 2px;">ACHIEVEMENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="color: rgb(158, 158, 158); text-align: left;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third" style="border-right: 2px solid rgb(188, 188, 188);">' +
        '<h1 class="size-64" style="text-align: center; letter-spacing: 1px;">400+</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 3px;">HAPPY CLIENTS</h3>' +
        '</div>' +
        '<div class="column third" style="border-right: 2px solid rgb(188, 188, 188);">' +
        '<h1 class="size-64" style="text-align: center; letter-spacing: 1px;">123</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 3px;">PROJECTS DONE</h3>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-64" style="text-align: center; letter-spacing: 1px;">79k+</h1>' +
        '\n<h3 class="size-18" style="text-align: center; letter-spacing: 3px;">FOLLOWERS</h3>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-29.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: center; letter-spacing: 2px;">ACHIEVEMENTS</h1>' +
        '\n<p style="color: rgb(136, 136, 136); text-align: center; letter-spacing: 1px;" class="size-16">Disvover how good we are</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="center column fourth">' +
        '<i class="icon ion-ios-paperplane-outline size-72" style="line-height:1.3;color: #dcdcdc;"></i>' +
        '\n<h1 class="size-35" style="font-family: Georgia, serif; letter-spacing: 1px;">267</h1>' +
        '\n<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin-top: 0; line-height:1"></p>' +
        '\n<p class="size-14" style="margin-top: 0;line-height:1">PROJECTS DONE</p>' +
        '</div>' +
        '<div class="center column fourth">' +
        '<i class="icon ion-ios-people size-72" style="line-height:1.3;color: #dcdcdc;"></i>' +
        '\n<h1 class="size-35" style="font-family: Georgia, serif; letter-spacing: 1px;">500+</h1>' +
        '\n<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin-top: 0; line-height:1"></p>' +
        '\n<p class="size-14" style="margin-top: 0;line-height:1">HAPPY CUSTOMERS</p>' +
        '</div>' +
        '<div class="center column fourth">' +
        '<i class="icon ion-ios-heart-outline size-72" style="line-height:1.3;color: #dcdcdc;"></i>' +
        '\n<h1 class="size-35" style="font-family: Georgia, serif; letter-spacing: 1px;">95k+</h1>' +
        '\n<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin-top: 0; line-height:1"></p>' +
        '\n<p class="size-14" style="margin-top: 0;line-height:1">FOLLOWERS</p>' +
        '</div>' +
        '<div class="center column fourth">' +
        '<i class="icon ion-ios-star size-72" style="line-height:1.3;color: #dcdcdc;"></i>' +
        '\n<h1 class="size-35" style="font-family: Georgia, serif; letter-spacing: 1px;">11</h1>' +
        '\n<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin-top: 0; line-height:1"></p>' +
        '\n<p class="size-14" style="margin-top: 0;line-height:1">AWARDS WON</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-30.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">Milestones</h1>' +
        '\n<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>' +
        '</div>' +
        '<div class="center column fourth">' +
        '<i class="icon ion-ios-list-outline size-48" style="line-height:1.5;"></i>' +
        '\n<h1 class="size-28" style="font-family: Georgia, serif; letter-spacing: 1px;">127</h1>' +
        '\n<p class="size-16" style="margin-top: 0; line-height: 1;">PROJECTS DONE</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<i class="icon ion-ios-star size-48" style="line-height:1.5;"></i>' +
        '\n<h1 class="size-28" style="font-family: Georgia, serif; letter-spacing: 1px;">11</h1>' +
        '\n<p class="size-16" style="margin-top: 0;line-height:1">AWARDS WON</p>' +
        '</div>' +
        '<div class="center column fourth">' +
        '<i class="icon ion-ios-people size-48" style="line-height:1.5;"></i>' +
        '\n<h1 class="size-28" style="font-family: Georgia, serif; letter-spacing: 1px;">300+</h1>' +
        '\n<p class="size-16" style="margin-top: 0;line-height:1">HAPPY CLIENTS</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<i class="icon ion-ios-heart-outline size-48" style="line-height:1.5;"></i>' +
        '\n<h1 class="size-28" style="font-family: Georgia, serif; letter-spacing: 1px;">105k+</h1>' +
        '\n<p class="size-16" style="margin-top: 0;line-height:1">FOLLOWERS</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-31.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 3px;" class="size-42">FUN FACTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-100"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px;height: 60px;line-height: 60px;border-radius: 500px;padding: 15px;background: #f3f3f3;text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-ios-heart-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">12.000</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">Customers</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px; height: 60px; line-height: 60px; border-radius: 500px; padding: 15px; background: #f3f3f3; text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-ios-star size-32"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">23.000</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">Buyer Rating</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px; height: 60px; line-height: 60px; border-radius: 500px; padding: 15px; background: #f3f3f3; text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-ios-pricetag-outline size-32"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">99</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">New Features</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px; height: 60px; line-height: 60px; border-radius: 500px; padding: 15px; background: #f3f3f3; text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-social-facebook size-32"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">134.078</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">Facebook Likes</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-32.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 3px;" class="size-42">FUN FACTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-100"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px;height: 60px;line-height: 60px;border-radius: 500px;padding: 15px;background: #000;text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-android-favorite-outline size-32" style="color: #fff"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">12.000</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">Customers</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px; height: 60px; line-height: 60px; border-radius: 500px; padding: 15px; background: #000; text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-ios-star size-32" style="color: #fff"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">23.000</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">Buyer Rating</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px; height: 60px; line-height: 60px; border-radius: 500px; padding: 15px; background: #000; text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-android-checkbox-outline size-32" style="color: #fff"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">99</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">New Features</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column fourth">' +
        '<div class="center">' +
        _tabs(1) +
        '<div style="width: 60px; height: 60px; line-height: 60px; border-radius: 500px; padding: 15px; background: #000; text-align: center;display: inline-block;">' +
        _tabs(2) +
        '<i class="icon ion-thumbsup size-32" style="color: #fff"></i>' +
        _tabs(1) +
        '</div>' +
        _tabs(1) +
        '<h1 style="margin-top: 30px; margin-bottom: 0px; letter-spacing: 2px;" class="size-32">134.078</h1>' +
        _tabs(1) +
        '<p style="border-bottom: 3px solid #000; width: 30px; display: inline-block; margin: 0;"></p>' +
        _tabs(1) +
        '<p style="margin: 0;">Facebook Likes</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-33.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="color: rgb(158, 158, 158);">Fun Facts</p>' +
        '\n<h1 class="size-42" style="letter-spacing: 2px;">WHAT MAKES US DIFFERENT</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-100"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-48"><i class="icon ion-ios-world-outline"></i>&nbsp;<b>11</b></h1>' +
        '\n<p style="margin-bottom: 0px; letter-spacing: 1px;">YEAR OF EXPERIENCE</p>' +
        '\n<p style="margin-top: 0px; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-48"><i class="icon ion-ios-heart-outline"></i>&nbsp;<b>100<span style="font-size: 30px !important;">%</span></b></h1>' +
        '\n<p style="margin-bottom: 0px; letter-spacing: 1px;">POSITIVE FEEDBACK</p>' +
        '\n<p style="margin-top: 0px; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-48"><i class="icon ion-ios-star-outline"></i>&nbsp;<b>14</b></h1>' +
        '\n<p style="margin-bottom: 0px; letter-spacing: 1px;">NATIONAL AWARDS</p>' +
        '\n<p style="margin-top: 0px; color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/achievements-34.png',
      category: '109',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="color: rgb(158, 158, 158);">Fun Facts</p>' +
        '\n<h1 class="size-42" style="letter-spacing: 2px;">WHAT MAKES US DIFFERENT</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-100"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h1 class="size-48"><i class="icon ion-thumbsup"></i>&nbsp;<b>100<span style="font-size: 30px !important;">%</span></b></h1>' +
        '\n<hr style="margin: 10px 0 0 0">' +
        '\n<p style="letter-spacing: 1px;">POSITIVE FEEDBACK</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-48"><i class="icon ion-ios-people"></i>&nbsp;<b>455k</b></h1>' +
        '\n<hr style="margin: 10px 0 0 0">' +
        '\n<p style="letter-spacing: 1px;">USERS WORLDWIDE</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h1 class="size-48"><i class="icon ion-arrow-down-c"></i>&nbsp;<b>350</b></h1>' +
        '\n<hr style="margin: 10px 0 0 0">' +
        '\n<p style="letter-spacing: 1px;">DOWNLOADS PER DAY</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-24.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: center; letter-spacing: 4px;">HAPPY CLIENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-F0dm51.jpg" alt="">' +
        '\n<p class="size-21" style="margin-bottom: 4px; letter-spacing: 2px;">MARY PALS</p>' +
        '\n<p style="border-bottom: 1px solid #000; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-x5GRp1.jpg" alt="">' +
        '\n<p class="size-21" style="margin-bottom: 4px; letter-spacing: 2px;">WILMA FINN</p>' +
        '\n<p style="border-bottom: 1px solid #000; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-25.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-28" style="text-transform: uppercase; letter-spacing: 4px; text-align: left;">TESTIMONIALS</h1>' +
        '\n<p class="size-14" style="font-style: normal; letter-spacing: 2px; text-transform: uppercase; text-align: left;">Hear the interesting stories from our customers</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-S0R1k1.jpg" alt="">' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. — Nelson Sand</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-QqxYJ2.jpg" alt="">' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry. — Karin Sparks</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-26.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-F6TCZ1.jpg" alt="">' +
        '</div>' +
        '<div class="column two-third">' +
        '<div style="margin-top:10px"><i class="icon ion-quote size-24" style="color: #888888"></i></div>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<p class="size-14" style="color: #888888;">By George Howard</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-27.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="img-circular" style="margin:15px 0;width:170px;height:170px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-Q1XSO1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column two-third">' +
        '<div style="margin-top:10px"><i class="icon ion-quote size-24" style="color: #888888"></i></div>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '\n<p class="size-14" style="color: #888888;">By Lucas Fulmer</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-28.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        _tabs(1) +
        '<small>by Victoria Martin</small>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-29.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '<small>by Cathy Hartman</small>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry</p>' +
        _tabs(1) +
        '<small>by Josh Perkins</small>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-30.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 3px;">OUR HAPPY CLIENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-akB4h1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '<small>by Jason Butterfield</small>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        '<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '<small>by Paula Johnson</small>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-R79NY2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-31.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 3px;">OUR HAPPY CLIENTS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="img-circular" style="margin:15px 0;width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-ybeSl1.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet leo ante.</p>' +
        _tabs(1) +
        '<small>by Amy Meyers </small>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet leo ante.</p>' +
        _tabs(1) +
        '<small>by Christopher Cook </small>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="img-circular" style="margin:15px 0;width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-KUCDN4.jpg" alt=""></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-05.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">HAPPIEST CUSTOMERS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/watch-1663246_1920-8wuCM1.jpg" alt="">' +
        '\n<div class="spacer height-20"></div>' +
        '\n<i class="icon ion-quote size-24"></i>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<p class="size-14">by Your Name</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-frUlS1.jpg" alt="">' +
        '\n<div class="spacer height-20"></div>' +
        '\n<i class="icon ion-quote size-24"></i>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<p class="size-14">by Your Name</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-RXypm2.jpg" alt="">' +
        '\n<div class="spacer height-20"></div>' +
        '\n<i class="icon ion-quote size-24"></i>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '\n<p class="size-14">by Your Name</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-06.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-42" style="letter-spacing: 2px;">CUSTOMER TESTIMONIALS</h1>' +
        '<p>Hear the interesting stories from our lovely customers.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half center">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(1) +
        '<i class="icon ion-chatbubble-working size-48"></i>' +
        _tabs(1) +
        '<p>"Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s."</p>' +
        _tabs(1) +
        '<p class="size-14">by Your Name</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="column half center">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        '<div style="padding:30px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(1) +
        '<i class="icon ion-chatbubble-working size-48"></i>' +
        _tabs(1) +
        '<p>"Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s."</p>' +
        _tabs(1) +
        '<p class="size-14">by Your Name</p>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-07.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-60" style="letter-spacing: 11px;">WHAT PEOPLE SAY ABOUT US</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        "<p>Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">— John Smith, Web Developer</p>' +
        '</div>' +
        '<div class="column third">' +
        "<p>Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">— Dave Clark, Designer</p>' +
        '</div>' +
        '<div class="column third">' +
        "<p>Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">— Ellen Lage, Photographer</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-08.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 8px;">CLIENTS REVIEWS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/noah-buscher-548633-ExLNF1.jpg" alt=""></div>' +
        '\n<p style="color: #bdc3c7"><i class="icon ion-android-hangout size-32"></i></p>' +
        '\n<p class="size-16">Lorem Ipsum is simply dummy text of the printing industry. — Dave Smith</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/icons8-team-355990-Voloz1.jpg" alt=""></div>' +
        '\n<p style="color: #bdc3c7"><i class="icon ion-android-hangout size-32"></i></p>' +
        '\n<p class="size-16">Lorem Ipsum is simply dummy text of the printing industry. — Clara Wang</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<div class="img-circular"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/pexels-photo-girl-zZWwv1.jpg" alt=""></div>' +
        '\n<p style="color: #bdc3c7"><i class="icon ion-android-hangout size-32"></i></p>' +
        '\n<p class="size-16">Lorem Ipsum is simply dummy text of the printing industry. — Jane Doe</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-16.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 5px;">CLIENT REVIEWS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column center third">' +
        '<p class="size-21" style="margin-bottom:4px">JOHN WEBER</p>' +
        '\n<p style="border-bottom: 1px solid #000; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<p class="size-21" style="margin-bottom:4px">NICOLE HOLOWAY</p>' +
        '\n<p style="border-bottom: 1px solid #000; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column center third">' +
        '<p class="size-21" style="margin-bottom:4px">CHRIS WILLIAMS</p>' +
        '\n<p style="border-bottom: 1px solid #000; width: 40px; display: inline-block; margin-top: 0"></p>' +
        '\n<p style="color: rgb(119, 119, 119);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-17.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-6PDKL1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-32" style="text-align: center; font-weight: bold;">"Incredible services and awesome customer support."</h1>' +
        '\n<div class="spacer height-80"></div>' +
        '\n<p style="text-align: center;">BY THOMAS JONE<br>Project Manager at Company Name</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-18.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-32" style="text-align: center; font-weight: bold;">"Incredible services and awesome customer support."</h1>' +
        '\n<div class="spacer height-80"></div>' +
        '\n<p style="text-align: center;">BY MARGARET VICKREY<br>Web Developer at Company Name</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-OWu2H1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-19.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column center full">' +
        '<div class="img-circular" style="width:150px;height:150px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-TK4An1.jpg" alt=""></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column center full">' +
        '<div class="quote">' +
        _tabs(1) +
        '<i class="icon ion-quote"></i>' +
        _tabs(1) +
        "<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>" +
        '\n</div>' +
        '\n<p style="color: rgb(149, 149, 149);">By Christopher Maxime</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-40.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-24">"It\'s easy to use and customizable. A truly amazing features with reasonable prices."</h3>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-14">By Margaret Fuller</p>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter size-16" style="margin-right: 0.5em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook size-16" style="margin-right: 0.5em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts size-16"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/inside-weather-ybg3jopjas0-unsplash-tDa7p1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-41.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/marek-levak-gnvxujz_cxu-unsplash-ga0Rb1.jpg" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-24">"It\'s easy to use and customizable. A truly amazing features with reasonable prices."</h3>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-14">By Ella Vandegrift</p>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter size-16" style="margin-right: 0.5em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook size-16" style="margin-right: 0.5em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts size-16"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-42.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="text-align: center;">' +
        '<div class="img-circular" style="width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/alice-achterhof-4klszvmanme-unsplash-onIRm1.jpg" alt=""></div>' +
        '<h3>Mary Andrews</h3>' +
        '<p style="line-height: 1;" class="size-14">Web Designer based in New York</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="quote">' +
        '<i class="icon ion-quote size-21"></i>' +
        '<p class="size-18" style="text-align: center;">Lorem Ipsum is simply dummy text. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="text-align: center;">' +
        '<p style="border-bottom: 2px solid #000000; width: 60px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-43.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/yang-deng-ydeiwoqhsps-unsplash-A62nL1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h2 class="size-42" style="letter-spacing: 1px; font-weight: bold;">"All products are awesome with strong attention to details."</h2>' +
        '\n<p style="color: rgb(158, 158, 158); font-family: Georgia, serif; font-style: italic;">- Glenda Drake</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. <a href="#" title="">Read the Success Story</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-44.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h2 class="size-42" style="letter-spacing: 1px; font-weight: bold;">"All products are awesome with strong attention to details."</h2>' +
        '\n<p style="color: rgb(158, 158, 158); font-family: Georgia, serif; font-style: italic;">- Kyle Harrelson</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. <a href="#" title="">Read the Success Story</a></p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/jason-blackeye-gdrspeeq7ry-unsplash-IP5Da2.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-45.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sincerely-media-zfs8v4ujxa4-unsplash-QuMOb1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div style="padding-left: 20px;">' +
        _tabs(1) +
        '<div class="spacer height-100"></div>' +
        _tabs(1) +
        '<h1 style="margin-bottom:0" class="size-16"><b>Cathy Braswell</b></h1>' +
        _tabs(1) +
        '<p style="margin-top: 0; color: rgb(158, 158, 158);" class="size-14">Web Developer</p>' +
        _tabs(1) +
        '<div class="spacer height-80"></div>' +
        _tabs(1) +
        '<p class="size-18" style="text-align: justify;"><b>"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</b></p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-46.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="padding-right: 20px;">' +
        _tabs(1) +
        '<div class="spacer height-100"></div>' +
        _tabs(1) +
        '<h1 style="margin-bottom:0" class="size-16"><b>Louis Richardson</b></h1>' +
        _tabs(1) +
        '<p style="margin-top: 0; color: rgb(158, 158, 158);" class="size-14">Web Developer</p>' +
        _tabs(1) +
        '<div class="spacer height-80"></div>' +
        _tabs(1) +
        '<p class="size-18" style="text-align: justify;"><b>"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</b></p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/marten-bjork-707746-unsplash-r5u0H1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-47.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/woman-with-blonde-hair-wearing-blue-3283576-xmKhr2.jpg" alt="" style="margin: 0">' +
        '</div>' +
        '<div class="column half">' +
        '<hr style="border-top: 3px solid rgb(170, 146, 124);margin:0;">' +
        '\n<div class="spacer height-120"></div>' +
        '\n<h1 class="size-21" style="text-align: justify;">"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</h1>' +
        '\n<div class="spacer height-60"></div>' +
        '\n<p class="size-16" style="text-align: right; color: rgb(158, 158, 158); font-style: italic;">Sara Stark - Director at CreativeStudio</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-48.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<hr style="border-top: 3px solid rgb(170, 146, 124);margin:0;">' +
        '\n<div class="spacer height-120"></div>' +
        '\n<h1 class="size-21" style="text-align: justify;">"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</h1>' +
        '\n<div class="spacer height-60"></div>' +
        '\n<p class="size-16" style="text-align: left; color: rgb(158, 158, 158); font-style: italic;">Stacy  Hildebrand  - Director at Artive</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/person-holding-a-big-leaf-covering-his-face-3094224-TL0km3.jpg" alt="" style="margin:0">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-49.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/woman-wearing-red-beret-and-gray-long-sleeve-dress-with-wild-3518091-(1)-P27XS1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-120"></div>' +
        '\n<h3><b style="color: rgb(179, 179, 179); letter-spacing: 1.5px;">"All products are super awesome with strong attention to details."</b></h3>' +
        '\n<hr style="border-top: 2px solid #b3b3b3;width: 140px;margin: 0;">' +
        '\n<p class="size-14">Rachael Wilson, Director at CreativeStudio</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-50.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-120"></div>' +
        '\n<h3><b style="color: rgb(179, 179, 179); letter-spacing: 1.5px;">"All products are super awesome with strong attention to details."</b></h3>' +
        '\n\n<hr style="border-top: 2px solid #b3b3b3;width: 140px;margin: 0;">' +
        '\n<p class="size-14">Bobby Addison, Director at Artive</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/the-bialons-n1hdyt_uyxa-unsplash-20c8T1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-51.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-32" style="text-transform: uppercase; letter-spacing: 2px;"><b class="size-28">Our Customers Love What We Do</b></h1>' +
        '<hr style="border-top: 3px solid #FF5722;width: 50px;margin: 20px 0;">' +
        '</div>' +
        '<div class="column half">' +
        '<div class="quote" style="margin-top: 0">' +
        _tabs(1) +
        '<i class="icon ion-quote size-21"></i>' +
        _tabs(1) +
        '<p class="size-16">All products are super awesome with strong attention to details, customizable tools which can help us improve our business</p>' +
        _tabs(1) +
        '<p class="size-12" style="margin-top: 0px; color: rgb(158, 158, 158);">by Leonard Smith</p>' +
        '\n</div>' +
        '\n<div class="quote" style="margin-top: 0">' +
        _tabs(1) +
        '<i class="icon ion-quote size-21"></i>' +
        _tabs(1) +
        '<p class="size-16">It\'s easy to use and customizable. A truly amazing features with reasonable prices.</p>' +
        _tabs(1) +
        '<p class="size-12" style="margin-top: 0px; color: rgb(158, 158, 158);">by David Horan</p>' +
        '\n</div>' +
        '\n<div class="quote" style="margin-top: 0">' +
        _tabs(1) +
        '<i class="icon ion-quote size-21"></i>' +
        _tabs(1) +
        '<p class="size-16">User-friendly, unlimited features and awesome support.</p>' +
        _tabs(1) +
        '<p class="size-12" style="margin-top: 0px; color: rgb(158, 158, 158);">by Loraine Beck</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-52.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48" style="letter-spacing: 1px; font-weight: bold;">Our Clients Trust Us<span style="color: rgb(255, 143, 0);">.</span></h1>' +
        '\n<p class="size-16" style="color: rgb(158, 158, 158); letter-spacing: 1px;">Hear what they said</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full size-18">' +
        '<div style="margin-left: -40px; margin-bottom: -40px; line-height: 1;" class="margin-left-1024-reset">' +
        _tabs(1) +
        '<i class="icon ion-quote margin-left-1024-reset size-64" style="color: rgb(232, 232, 232);"></i>' +
        '\n</div>' +
        '\n<p style="font-size: 19px !important;">"All products are super awesome with strong attention to details, customizable tools which can help us improve our business." - Angie Todd</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="font-size: 19px !important;">"It\'s easy to use and customizable. A truly amazing features with reasonable prices." - Ruben Chapman</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p style="font-size: 19px !important;">"User-friendly, unlimited features and awesome support." - Mathew M. Brown</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-53.png',
      category: '110',
      html:
        '<div class="row clearfix center">' +
        '<div class="column half">' +
        '<div class="img-circular" style="margin:20px 0;width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/spencer-davis-bqgq2qd3mty-unsplash-CSt9i2.jpg" alt=""></div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="spacer height-40"></div>' +
        '\n<p style="text-align: justify; letter-spacing: 1px;" class="size-18">"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h1 style="margin-bottom:0" class="size-18"><b class="size-16">Geraldine Pipes</b></h1>' +
        '\n<p style="margin-top: 0; color: rgb(158, 158, 158);" class="size-14">Web Developer</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-54.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="spacer height-40"></div>' +
        '\n<p style="text-align: justify; letter-spacing: 1px;" class="size-18">"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<h1 style="margin-bottom:0" class="size-18"><b class="size-16">Elizabeth Johns</b></h1>' +
        '\n<p style="margin-top: 0; color: rgb(158, 158, 158);" class="size-14">Graphic Designer</p>' +
        '</div>' +
        '<div class="column half center">' +
        '<div class="img-circular" style="margin:20px 0;width:270px;height:270px;"><img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/photo-1549235377-962f47f40409-wcrYL1.jpg" alt=""></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-55.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/man-using-black-camera-3136161-u9GRr1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<div style="margin-left: -10px; margin-bottom: -50px; line-height: 1.8" class="margin-left-1024-reset">' +
        _tabs(1) +
        '<i class="icon ion-quote margin-left-1024-reset size-48" style="color: rgb(232, 232, 232);"></i>' +
        '\n</div>' +
        '\n<h1 class="size-42" style="letter-spacing: 1px;">It fits my requirements perfectly!</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-16" style="margin-bottom: 0"><b>Aaron Stephen</b></p>' +
        '\n<p style="margin-top: 0; color: rgb(158, 158, 158);" class="size-14">CEO of Artive</p>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: justify;">All products are super awesome with strong attention to details, customizable tools which can help us improve our business.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-56.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div style="margin-left: -10px; margin-bottom: -50px; line-height: 1.8" class="margin-left-1024-reset">' +
        _tabs(1) +
        '<i class="icon ion-quote margin-left-1024-reset size-48" style="color: rgb(232, 232, 232);"></i>' +
        '\n</div>' +
        '\n<h1 class="size-42" style="letter-spacing: 1px;">It fits my requirements perfectly!</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p class="size-16" style="margin-bottom: 0"><b>Darrel Roberts</b></p>' +
        '\n<p style="margin-top: 0; color: rgb(158, 158, 158);" class="size-14">Director at CreativeStudio</p>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: justify;">All products are super awesome with strong attention to details, customizable tools which can help us improve our business.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/photo-of-man-covering-his-face-with-leaf-3754279-OCoFs1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/quotes-57.png',
      category: '110',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="font-weight: bold;">Building trust through experience.</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-align: justify;">"All products are super awesome with strong attention to details, customizable tools which can help us improve our business."</p>' +
        '\n<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-happy size-32"></i>' +
        _tabs(1) +
        '<p><b>Richard Allen</b></p>' +
        _tabs(1) +
        '<p class="size-14" style="color: rgb(158, 158, 158);margin-top:0">CEO of CreativeStudio</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify;">"Has a bunch of amazing tools. Very easy to use and customizable. No need to make extra actions. It fits my requirements perfectly!"</p>' +
        '\n<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-android-happy size-32"></i>' +
        _tabs(1) +
        '<p><b>Sandra Stephenson </b></p>' +
        _tabs(1) +
        '<p class="size-14" style="color: rgb(158, 158, 158);margin-top:0">Director at Artive</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    /* PARTNERS */

    {
      thumbnail: 'preview/partners-03.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 5px; font-weight: 400;">OUR CLIENTS</h1>' +
        '\n<p class="size-16" style="letter-spacing: 1px; color: rgb(136, 136, 136);">We are globally trusted by the world\'s best names.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-05.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 style="letter-spacing: 7px;">OUR PARTNERS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="center" style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        '</div>' +
        '<div class="center" style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="">' +
        '</div>' +
        '<div class="center" style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '</div>' +
        '<div class="center" style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '<div class="center" style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-06.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="font-weight: bold; text-transform: uppercase;">Our Clients</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '</div>' +
        '<div style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="">' +
        '</div>' +
        '<div style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '<div style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        '</div>' +
        '<div style="display:inline-block;width:18%">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="">' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-01.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">OUR PARTNERS</h1>' +
        '\n<p class="size-21">We are globally recognized and trusted by the world\'s best names.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-07.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="letter-spacing: 2px; text-align: center;">OUR <b style="color: rgb(239, 108, 0);">CLIENTS</b></h1>' +
        '\n<p class="size-16" style="text-align: center; color: rgb(158, 158, 158);">We are globally recognized and trusted by the world\'s best names.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:10px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:10px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="">' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:10px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:10px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:10px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="">' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column third">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:10px;width:100%;box-sizing:border-box;text-align:center;">' +
        _tabs(2) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-08.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column half" style="padding-right: 20px;">' +
        '<h1 class="size-32" style="letter-spacing: 2px; margin-top: 20px;">OUR <b>PARTNERS</b></h1>' +
        '\n<p style="color: rgb(158, 158, 158);">We are globally recognized and trusted by the world\'s best names.</p>' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '\n<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-09.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 2px;" class="size-50"><b>Serving Clients with Passion.</b></h1>' +
        "\n<p>We are globally recognized and trusted by the world's best names.</p>" +
        '\n<hr style="border-top: 3px solid #FF5722;width: 60px;margin: 20px 0;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-10.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 3px;" class="size-42">OUR CLIENTS</h1>' +
        '\n<p class="size-14" style="text-align: center;">You can be the next to work with!</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="" style="margin: 0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block; margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="" style="margin: 0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block; margin: 0;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-11.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="letter-spacing: 3px; margin-top: 20px; text-align: center;">OUR PARTNERS</h1>' +
        '\n<p style="text-align: center;" class="size-14">We are globally recognized and trusted by the world\'s best names.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="center column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="" style="margin: 0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="center column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="center column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block; margin: 0;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="center column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="center column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="" style="margin: 0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="center column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-12.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-46" style="letter-spacing: 2px;">We Provide Proven Solutions to <b>Our Clients</b></h1>' +
        '\n<hr style="border-top: 3px solid #ffad06;width: 50px;margin: 20px 0;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-13.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-28" style="letter-spacing: 2px; text-align: center;">Our Clients</h1>' +
        '\n<p style="letter-spacing: 1px; text-align: center;" class="size-14">Serving Clients with Passion</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="" style="margin: 0;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="" style="margin: 0">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bbuzz.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="" style="margin: 0;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/partners-14.png',
      category: '111',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32" style="text-align: center; letter-spacing: 9px;">PARTNERS</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/sitepro.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/steady.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/infinitech.png" alt="">' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/design-firm.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bbuzz.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/onesight.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="">' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-01.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<h2 class="size-24">AS FEATURED ON</h2>' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/onesight.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/digitalmag.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-02.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">As featured on</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/digitalmag.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/onesight.png" alt="">' +
        '</div>' +
        '<div class="column fourth">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-03.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">AS FEATURED ON</h1>' +
        '\n<p class="size-21">Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="">' +
        '</div>' +
        '<div class="column third center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-05.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 7px;">AS FEATURED ON</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/digitalmag.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bbuzz.png" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/prosource.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/nett.png" alt="">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-06.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-21" style="text-align: center; letter-spacing: 3px;">AS FEATURED ON</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/prosource.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bbuzz.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/light-studio.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/worldwide.png" alt="">' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/digitalmag.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/nett.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/creative.png" alt="">' +
        '\n</div>' +
        '\n<div class="center" style="display:inline-block;width:18%">' +
        _tabs(1) +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/onesight.png" alt="">' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-07.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-21" style="text-align: center; letter-spacing: 3px;">AS SEEN ON</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="" style="margin: 0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/bbuzz.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block; margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '<div class="column fourth center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/digitalmag.png" alt="" style="margin:0">' +
        '\n<hr style="border-top: 1px solid #919191;width: 30px;display: inline-block;margin: 0;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/asfeaturedon-08.png',
      category: '112',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-18" style="text-align: center; letter-spacing: 3px;">AS FEATURED ON</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/mmedia.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/onesight.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/prosource.png" alt="" style="margin: 0;">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/upclick.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/nett.png" alt="" style="margin: 0;">' +
        '</div>' +
        '<div class="column third">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/digitalmag.png" alt="" style="margin: 0;">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-01.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<p class="size-132" style="font-weight: bold; line-height: 1.4">404</p>' +
        '\n<h1>PAGE NOT FOUND</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Back to Home</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-02.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-96 is-title1-96 is-title-bold">404</h1>' +
        '\n<p class="size-24">Oops! The page you\'re looking for doesn\'t exist.<br>Click the link below to return home.</p>' +
        '\n<p><a href="#">HOMEPAGE</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-03.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<i class="icon ion-alert-circled size-64"></i>' +
        '\n<h1 class="size-48 is-title2-48 is-title-lite">Oops, page not found.</h1>' +
        '\n<p>The page you are looking for might have been removed, had its name changed, or temporarily unavailable.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Homepage</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-04.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<i class="icon ion-android-sad size-64"></i>' +
        '\n<h1 class="size-48 is-title1-48 is-title-lite">Something\'s wrong here... </h1>' +
        '\n<p class="size-21">The page you requested couldn\'t be found. This could be a spelling error in the URL or a removed page.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small edit">Back to Home</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-06.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/lost-2747289-ThbrT1.png" alt="">' +
        '\n<p class="size-21" style="letter-spacing: 2px;">Sorry. The page you are looking for could not be found.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div style="margin: 25px 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Back to Home</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-07.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-60" style="letter-spacing: 3px; font-weight: bold">404 ERROR - PAGE NOT FOUND</h1>' +
        '\n<p class="size-21">Sorry, the page could not be found. You might be able to find what you are looking for from the homepage.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="margin: 10px 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Back to Home</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-08.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-196" style="letter-spacing: 12px; margin-bottom: 10px">404</h1>' +
        '\n<h3 class="size-32" style="letter-spacing: 8px;">PAGE NOT FOUND</h3>' +
        '\n<p class="size-21">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/404-09.png',
      category: '113',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-220" style="letter-spacing: 12px; margin-bottom: 0">404</h1>' +
        '\n<p>We are sorry, the page you are looking for could not be found. This could be a spelling error in the URL or a removed page.</p>' +
        '\n<div style="margin: 35px 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-btn-small edit">Contact Us</a> &nbsp;' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Homepage</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-01.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h3 class="size-32 is-title1-32 is-title-lite">STAY TUNED!</h3>' +
        '\n<h1 class="size-64 is-title1-64 is-title-bold">OUR WEBSITE IS COMING VERY SOON</h1>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<div class="is-social edit">' +
        _tabs(1) +
        '<div class="size-21">' +
        _tabs(2) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(2) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(2) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-02.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<i class="icon ion-android-bicycle size-64"></i>' +
        '\n<h1 class="size-80 is-title2-80 is-title-lite">WE ARE COMING SOON</h1>' +
        '\n<p class="size-18">Our website is under construction. We will be here with new awesome site.</p>' +
        '\n<div style="margin: 3em 0">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-btn-small edit">Contact Us</a> &nbsp;' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small edit">Notify Me</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-03.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<i class="icon ion-laptop size-64"></i>' +
        '\n<h1 class="size-48 is-title2-48 is-title-lite">SITE IS UNDER MAINTENANCE </h1>' +
        '\n<p class="size-24">Please check back in sometime.</p>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<div class="is-social edit size-21">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-04.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">MAINTENANCE MODE</h1>' +
        '\n<p class="size-24">Our website is under maintenance. Please comeback later.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<p class="size-64 is-title1-64 is-title-bold">90%</p>' +
        '\n<p>COMPLETED</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-05.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-96" style="letter-spacing: 19px; margin-bottom: 10px;">COMING SOON</h1>' +
        '\n<p style="text-transform: uppercase; letter-spacing: 2px;">CHECK BACK SOON FOR THE NEW AND IMPROVED SITE</p>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<div class="is-social edit size-18">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-06.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-64" style="letter-spacing: 5px;">OUR SITE IS COMING VERY SOON</h1>' +
        '\n<p>We are currently working on something awesome. We will be here soon.</p>' +
        '\n<div class="is-social edit size-18" style="margin: 30px 0">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small edit">Notify Me</a>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-07.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 class="size-80" style="letter-spacing: 4px; text-align: center; color: rgb(209, 209, 209);">COMING SOON.</h1>' +
        '\n</div>' +
        '\n<p style="text-align: center;">Our website is under construction. We will be here with new awesome site.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="center"><a href="#" class="is-btn is-btn-ghost1 is-upper">Notify Me</a></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-08.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<p style="border-bottom: 2px solid #b9b6b6;width: 210px;display: inline-block;"></p>' +
        '\n<h1 class="size-42" style="letter-spacing: 3px;">Sorry, our website is currently getting a face lift. Check back soon for the new awesome and improved site.</h1>' +
        '\n<p style="border-bottom: 2px solid #b9b6b6; width: 210px; display: inline-block; margin-top: 20px"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-13.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-180" style="text-align: left; font-weight: 600; line-height: 1; letter-spacing: 3px;">Coming Soon<span style="color: rgb(239, 108, 0);">.</span></h1>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-14.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div style="max-width: 420px; margin: 0 auto;">' +
        _tabs(1) +
        '<h1 class="size-42" style="font-weight: 400; text-align: center;">Our new website is on its way</h1>' +
        _tabs(1) +
        '<p style="text-align: center;">We are working hard on our new site. Sign up to be the first to know when it\'s ready.</p>' +
        _tabs(1) +
        "<div style=\"margin: 25px 0; text-align: center;\"><a href=\"#\" style=\"margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(52, 221, 135); color: rgb(255, 255, 255); border-color: rgb(52, 221, 135); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;\" title=\"\" data-hover-bgcolor=\"#2fd07e\" data-hover-color=\"#ffffff\" data-hover-bordercolor=\"#2fd07e\" onmouseover=\"this.setAttribute('data-style',this.style.cssText);if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');\" onmouseout=\"this.setAttribute('style',this.getAttribute('data-style'));this.removeAttribute('data-style')\">Notify Me</a></div>" +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/comingsoon-15.png',
      category: '114',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-60" style="font-weight: bold; text-align: center; letter-spacing: 1px;">We Are Building Awesome Thing</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p class="size-16" style="text-align: center;">Follow the news updates and you will be the first to know when our site is ready</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        "<div style=\"text-align: center;\"><a href=\"#\" style=\"margin: 0px; display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(7, 210, 192); color: rgb(255, 255, 255); border-color: rgb(7, 210, 192); border-width: 2px; border-radius: 0px; padding: 10px 22px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 12px; letter-spacing: 3px;\" title=\"\" data-hover-bgcolor=\"#00beac\" data-hover-color=\"#ffffff\" data-hover-bordercolor=\"#00beac\" onmouseover=\"this.setAttribute('data-style',this.style.cssText);if(this.getAttribute('data-hover-bordercolor')) this.style.borderColor=this.getAttribute('data-hover-bordercolor');if(this.getAttribute('data-hover-bgcolor')) this.style.backgroundColor=this.getAttribute('data-hover-bgcolor');if(this.getAttribute('data-hover-color')) this.style.color=this.getAttribute('data-hover-color');\" onmouseout=\"this.setAttribute('style',this.getAttribute('data-style'));this.removeAttribute('data-style')\">Stay Updated</a></div>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-100"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="is-social" style="text-align: center;">' +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter size-16" style="margin-right: 1em"></i></a>' +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook size-16" style="margin-right: 1em"></i></a>' +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts size-16"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-01.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-60">FAQs</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-compose-outline size-46"></i>' +
        '\n<h3 class="size-24">How do I sign up? </h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-close-outline size-46"></i>' +
        '\n<h3 class="size-24">How do I cancel my order?</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-ios-color-filter-outline size-46"></i>' +
        '\n<h3 class="size-24">What is account limits?</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-ios-gear-outline size-46"></i>' +
        '\n<h3 class="size-24">How do I update my settings?</h3>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-02.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-lite">FAQs</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-24">How do I create an account?</h3>' +
        '\n<p style="border-bottom: 2px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-24">How do I cancel my order?</h3>' +
        '\n<p style="border-bottom: 2px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-24">How do I close my account?</h3>' +
        '\n<p style="border-bottom: 2px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-24">How do I update my settings?</h3>' +
        '\n<p style="border-bottom: 2px solid #000; width: 40px; display: inline-block; margin-top:0"></p>' +
        '\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-03.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-60" style="font-weight: bold;">FAQs</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3>How do I sign up?</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3>How do I cancel or change my order?</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3>How do I contact customer support?</h3>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-04.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: center;">Frequently Asked Questions</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-21">HOW DO I CREATE AN ACCOUNT?</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="border-bottom: 2px solid #e67e22; width: 45px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21">WHAT\'S ACCOUNT LIMITS?</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="border-bottom: 2px solid #e67e22; width: 45px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21">HOW DO I CANCEL MY ORDER?</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="border-bottom: 2px solid #e67e22; width: 45px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-21">HOW DO I RESET MY PASSWORD?</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="border-bottom: 2px solid #e67e22; width: 45px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21">HOW DO I REPORT A BUG?</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="border-bottom: 2px solid #e67e22; width: 45px; display: inline-block;"></p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21">HOW DO I CLOSE MY ACCOUNT?</h3>' +
        '\n<p>Lorem Ipsum is dummy text of the printing and typesetting industry.</p>' +
        '\n<p style="border-bottom: 2px solid #e67e22; width: 45px; display: inline-block;"></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-05.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 2px;">FAQ</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-21 default-font2">HOW DO I SIGN UP?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-21 default-font2">WHAT\'S ACCOUNT LIMIT?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-21 default-font2">HOW DO I CONTACT SUPPORT?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-21 default-font2">HOW DO I UPDATE MY SETTINGS?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-21 default-font2">HOW DO I REPORT AN ISSUE?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 class="size-21 default-font2">HOW DO I CHANGE MY ORDER?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum dolor sit amet, consectetur elit.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-06.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-48" style="letter-spacing: 2px;">FAQ</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-21 default-font2">HOW DO I CREATE AN ACCOUNT? </h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21 default-font2">HOW DO I UPDATE MY SETTINGS?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21 default-font2">HOW DO I CHANGE MY PASSWORD?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-21 default-font2">HOW DO I CANCEL MY ORDER?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21 default-font2">HOW DO I CLOSE MY ACCOUNT?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-21 default-font2">HOW DO I CONTACT CUSTOMER SERVICE?</h3>' +
        '\n<p style="color: rgb(136, 136, 136);">Lorem Ipsum is simply dummy text of the printing industry.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-07.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-46" style="text-align: center; letter-spacing: 4px;">FAQ</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="font-weight: bold; letter-spacing: 1px;" class="size-18"><i class="icon ion-android-cart"></i>&nbsp; ORDER</h3>' +
        '\n<p class="size-16">How can I order?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span><br></p>' +
        '\n<p class="size-16">Is there a minimum order?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="font-weight: bold; letter-spacing: 1px;" class="size-18"><i class="icon ion-android-globe"></i>&nbsp; SHIPPING</h3>' +
        '\n<p class="size-16">Do you ship internationally?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '\n<p class="size-16">How fast will my order arrive?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 style="font-weight: bold; letter-spacing: 1px;" class="size-18"><i class="icon ion-card"></i>&nbsp; PAYMENT</h3>' +
        '\n<p class="size-16">What payment methods are accepted?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '\n<p class="size-16">How do I pay by credit card?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '</div>' +
        '<div class="column half">' +
        '<h3 style="font-weight: bold; letter-spacing: 1px;" class="size-18"><i class="icon ion-arrow-swap"></i>&nbsp; RETURN</h3>' +
        '\n<p class="size-16">What is the Return Policy?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '\n<p class="size-16">What items can I return?<br><span style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of printing</span></p>' +
        '</div>	' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-08.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="margin-left-1024-reset" style="text-transform: uppercase; margin-left: -120px; letter-spacing: 2px;">How can we help you?</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h2 class="size-21" style="letter-spacing: 1px;">How do I create an account?</h2>' +
        '\n\n<hr style="border-top: 3px solid #ebebeb; margin: 0">' +
        '\n<p class="size-16" style="color: rgb(158, 158, 158); text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h2 class="size-21" style="letter-spacing: 1px;">How do I update my settings?</h2>' +
        '\n<hr style="border-top: 3px solid #ebebeb; margin: 0">' +
        '\n<p class="size-16" style="color: rgb(158, 158, 158); text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>' +
        '</div>	' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h2 class="size-21" style="letter-spacing: 1px;">How do I contact customer servive?</h2>' +
        '\n<hr style="border-top: 3px solid #ebebeb; margin: 0">' +
        '\n<p class="size-16" style="color: rgb(158, 158, 158); text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-09.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="font-weight: bold; max-width: 500px; width: 100%; letter-spacing: 1px;">Frequently asked questions</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-24">What do you do?</h3>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify; color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-24">How does this work?</h3>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify; color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h3 class="size-24">What is the return policy?</h3>' +
        '</div>' +
        '<div class="column half">' +
        '<p style="text-align: justify; color: rgb(158, 158, 158);">An unknown printer took a galley of type &amp; scrambled it to make a type specimen book.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-10.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 style="text-align: center; letter-spacing: 2px;">All you need to know</h1>' +
        '\n<p style="border-bottom: 3px solid #e74c3c; width: 40px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3 class="size-21">How do the offers work?</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3 class="size-21">What is the return policy?</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h3 class="size-21">How do I get in touch?</h3>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-11.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 style="text-align: center; letter-spacing: 5px;" class="size-46">FAQ</h1>' +
        '\n<p style="border-bottom: 3px solid #ff8733; width: 30px; display: inline-block;"></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        '<h3 class="size-21">How can I order?</h3>' +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">Do you ship internationally?</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">What payment methods are accepted?</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="is-card is-dark-text shadow-1" style="width:calc(100%);">' +
        _tabs(1) +
        '<div style="padding:25px;width:100%;box-sizing:border-box;">' +
        _tabs(2) +
        '<h3 class="size-21">What is the Return Policy?</h3>' +
        _tabs(2) +
        '<p class="size-16" style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-12.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-42" style="text-align: center; letter-spacing: 4px;">FAQ</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p>How do the offers work?</p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p>What payment methods are accepted?</p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p>What is the Return Policy?</p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<p>How do I get in touch?</p>' +
        '\n<p style="color: rgb(158, 158, 158);" class="size-16">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p style="text-align: center;">Can\'t find what you are looking for here?</p>' +
        '\n<div style="text-align: center">' +
        _tabs(1) +
        '<a href="#" style="display: inline-block; text-decoration: none; transition: all 0.16s ease 0s; border-style: solid; cursor: pointer; background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 8px 17px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 10px; letter-spacing: 3px; margin-right: 12px;" title="">Email Us</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-13.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-32" style="text-align: center; letter-spacing: 1px;">Frequently Asked Questions</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-android-cart size-32" style="color: #06bd60;"></i>' +
        '\n<p>How can I buy your product?</p>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-earth size-32" style="color: #ff8733;"></i>' +
        '\n<p>Do you ship internationally?</p>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<i class="icon ion-card size-32" style="color: #ec4130;"></i>' +
        '\n<p>What payment methods are accepted?</p>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
        '</div>' +
        '<div class="column half">' +
        '<i class="icon ion-arrow-swap size-32" style="color: #efc414;"></i>' +
        '\n<p>What should I do if my product arrives damaged or is not what I ordered?</p>' +
        '\n<p style="color: rgb(158, 158, 158);">Lorem Ipsum is dummy text of the printing.</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/faq-14.png',
      category: '115',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 style="text-align: center; letter-spacing: 2px; text-transform: uppercase;" class="size-32">Help Center</h1>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-60"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-paper-outline size-32" style="color: #ff8733;"></i>' +
        '\n<h3 class="size-21">General FAQ</h3>' +
        '\n<p style="text-align: justify;" class="size-16">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. <a href="#" title="">Read More</a></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-cart-outline size-32" style="color: #06bd60;"></i>' +
        '\n<h3 class="size-21">Payment</h3>' +
        '\n<p style="text-align: justify;" class="size-16">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. <a href="#" title="">Read More</a></p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-box-outline size-32" style="color: #ec4130;"></i>' +
        '\n<h3 class="size-21">Shipping</h3>' +
        '\n<p style="text-align: justify;" class="size-16">Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. <a href="#" title="">Read More</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-01.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="embed-responsive embed-responsive-16by9">' +
        _tabs(1) +
        '<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" class="mg1" src="https://maps.google.com/maps?q=Melbourne,+Victoria,+Australia&amp;hl=en&amp;sll=-7.981898,112.626504&amp;sspn=0.009084,0.016512&amp;oq=melbourne&amp;hnear=Melbourne+Victoria,+Australia&amp;t=m&amp;z=10&amp;output=embed"></iframe>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-32 is-title1-32 is-title-lite">FIND US HERE</h1>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="is-social edit size-18">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-02.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-ios-alarm-outline size-48"></i>' +
        _tabs(1) +
        '<h3 style="margin: 0 0 0 70px">OPENING TIMES</h3>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">Monday – Friday: 9 AM – 4.30 PM<br>' +
        _tabs(1) +
        'Saturday: 8 AM – 2 PM</p>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="list">' +
        _tabs(1) +
        '<i class="icon ion-ios-home-outline size-48"></i>' +
        _tabs(1) +
        '<h3 style="margin: 0 0 0 70px">FIND US HERE</h3>' +
        _tabs(1) +
        '<p style="margin: 10px 0 0 70px">123 Street Name, City. State 456<br>' +
        _tabs(1) +
        'Phone: (123) 456 7890</p>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-04.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-18 is-title-lite">CONTACT US</h3>' +
        '\n<p style="border-bottom: 1px solid #333; width: 50px; display: inline-block; margin-top: 0"></p>' +
        '\n<p class="size-16">' +
        _tabs(1) +
        '<strong>Your Company Name</strong><br>' +
        _tabs(1) +
        '12345 Street Name, City.' +
        _tabs(1) +
        'State 12345<br>' +
        _tabs(1) +
        'P: (123) 456 7890 / 456 7891.' +
        '\n</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-18 is-title-lite">OPENING HOURS</h3>' +
        '\n<p style="border-bottom: 1px solid #333; width: 50px; display: inline-block; margin-top: 0"></p>' +
        '\n<p class="size-16">' +
        _tabs(1) +
        'Monday - Friday: 9:00 AM - 10:00 PM<br>' +
        _tabs(1) +
        'Saturday: 10:00 AM - 11:00 PM' +
        '\n</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-18 is-title-lite">STAY UPDATED</h3>' +
        '\n<p style="border-bottom: 1px solid #333; width: 50px; display: inline-block; margin-top: 0"></p>' +
        '\n<p class="size-16">' +
        _tabs(1) +
        'Follow us on:<br>' +
        _tabs(1) +
        'Facebook: <a href="#">Company Name</a><br>' +
        _tabs(1) +
        'Twitter: <a href="#">@companyname</a>' +
        '\n</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-05.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-map size-64" style="color: #e74c3c"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">OUR LOCATION</p>' +
        '\n<p>' +
        _tabs(1) +
        'Your Company Name<br>' +
        _tabs(1) +
        '12345 Street Name, City.' +
        _tabs(1) +
        'P: (123) 456 7890' +
        '\n</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-clock size-64" style="color: #e74c3c"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">OPENING HOURS</p>' +
        '\n<p>' +
        _tabs(1) +
        'Monday - Friday: 9:00 AM - 10:00 PM<br>' +
        _tabs(1) +
        'Sat: 10:00 AM - 11:00 PM' +
        '\n</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-chatbox-working size-64" style="color: #e74c3c"></i>' +
        '\n<p class="size-14" style="color: rgb(136, 136, 136);">STAY UPDATED</p>' +
        '\n<p>' +
        _tabs(1) +
        'Follow us on:<br>' +
        _tabs(1) +
        'Facebook: <a href="#" style="color: #333">Company Name</a><br>' +
        _tabs(1) +
        'Twitter: <a href="#" style="color: #333">@companyname</a>' +
        '\n</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-06.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 class="size-42 is-title-bold"  style="margin-top:0">Do you have something to say? Contact us!</h1>' +
        '</div>' +
        '<div class="column half">' +
        '<h1 class="size-32">YOUR COMPANY NAME</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p>' +
        _tabs(1) +
        '12345 Street Name, City.' +
        _tabs(1) +
        'State 12345<br>' +
        _tabs(1) +
        'P: (123) 456 7890 / 456 7891. <br>' +
        _tabs(1) +
        'Email:<br><a href="#" style="color: #333">companyname@example.com</a>' +
        '\n</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-07.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 class="size-32">Have questions? Give us a call <span style="color: rgb(230, 126, 34);">0 123 456 78 90</span></h1>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<div class="is-social edit">' +
        _tabs(1) +
        '<div class="size-18">' +
        _tabs(2) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(2) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(2) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        _tabs(1) +
        '</div>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-08.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<div class="display">' +
        _tabs(1) +
        '<h1 style="letter-spacing: 4px">GET IN TOUCH</h1>' +
        '\n</div>' +
        '\n<p>' +
        _tabs(1) +
        '12345 STREET NAME, CITY.' +
        _tabs(1) +
        'STATE 12345<br>' +
        _tabs(1) +
        'PHONE: (123) 456 7890 / 456 7891' +
        '\n</p>' +
        '\n<div class="is-social edit size-16">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-09.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-book-outline size-64" style="color: rgb(136, 136, 136);"></i>' +
        '\n<h6 style="letter-spacing: 2px; font-weight: normal">OUR LOCATION</h6>' +
        '\n<p>12 Street Name, City</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-telephone-outline size-64" style="color: rgb(136, 136, 136);"></i>' +
        '\n<h6 style="letter-spacing: 2px; font-weight: normal">CALL US</h6>' +
        '\n<p>(123) 456 7890 / 456 7891</p>' +
        '</div>' +
        '<div class="column third center">' +
        '<i class="icon ion-ios-compose-outline size-64" style="color: rgb(136, 136, 136);"></i>' +
        '\n<h6 style="letter-spacing: 2px; font-weight: normal">DROP US A LINE</h6>' +
        '\n<p><a href="mailto:#" style="color: #333">first.last@example.com</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-10.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="embed-responsive embed-responsive-16by9">' +
        '<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" class="mg1" src="https://maps.google.com/maps?q=Melbourne,+Victoria,+Australia&amp;hl=en&amp;sll=-7.981898,112.626504&amp;sspn=0.009084,0.016512&amp;oq=melbourne&amp;hnear=Melbourne+Victoria,+Australia&amp;t=m&amp;z=10&amp;output=embed"></iframe>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-20"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<h3 class="size-18 is-title-lite">CONTACT</h3>' +
        '\n<p class="size-16"><b>Company Name</b><br>123 Street Name, City.</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-18 is-title-lite">OPENING HOURS</h3>' +
        '\n<p class="size-16">Monday - Friday: 8 AM - 5 PM<br>Saturday: 10 AM - 3 PM</p>' +
        '</div>' +
        '<div class="column third">' +
        '<h3 class="size-18 is-title-lite">STAY IN TOUCH</h3>' +
        '\n<p class="size-16">Instagram: <a href="#">@companyname<br>Twitter: </a><a href="#">@companyname</a></p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-11.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-80" style="text-align: center; letter-spacing: 4px;">Hi... Let\'s get in touch!</h1>' +
        '\n<p style="text-align: center;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p>' +
        '\n<div class="spacer height-60"></div>' +
        '\n<div class="is-social center">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-12.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h2 style="text-transform: uppercase; letter-spacing: 6px; text-align: center;">GET CONNECTED</h2>' +
        '\n<div class="center">' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #000;width: 50px;display: inline-block;margin-bottom:0"></p>' +
        '\n</div>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p style="text-align: center;">' +
        _tabs(1) +
        '<b>Your Company Name, Inc.</b> 12345 Street Name, City. State 12345.<br>' +
        _tabs(1) +
        'P: (123) 456 7890 / 456 7891' +
        '\n</p>' +
        '\n<div class="is-social center">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-18.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/-5TpV91.jpg" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full center">' +
        '<h1 style="letter-spacing: 4px">CONTACT US</h1>' +
        '\n<p style="letter-spacing: 1px;">' +
        _tabs(1) +
        '123 STREET NAME, CITY.' +
        _tabs(1) +
        'STATE 12345<br>' +
        _tabs(1) +
        'PHONE: (123) 456 7890' +
        '\n</p>' +
        '\n<div class="is-social edit size-16">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-14.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-48 is-title1-48 is-title-bold" style="letter-spacing: 2px;">DROP IN OUR OFFICE.</h1>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<p><i class="icon ion-android-home size-24"></i>&nbsp; &nbsp;Company Name, Inc. 12345 Street, City. State 12345.<br><i class="icon ion-android-call size-24"></i>&nbsp; &nbsp;Phone: (123) 456 7890 / 456 7891</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-15.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-60" style="letter-spacing: 1px; text-align: center; font-weight: bold;">Drop us a line to get the conversation started.</h1>' +
        '\n<p style="text-align: center;">Please kindly write to us at companyname@example.com&nbsp;or call us on +123 4567 890</p>' +
        '\n<div class="center">' +
        _tabs(1) +
        '<p style="border-bottom: 2px solid #000;width: 70px;display: inline-block;margin-bottom:0"></p>' +
        '\n</div>' +
        '\n<div class="spacer height-80"></div>' +
        '\n<div class="is-social center">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-16.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-72" style="letter-spacing: 4px; text-align: center;">CONTACT US</h1>' +
        '\n<p style="text-align: center; letter-spacing: 3px; font-size: 19px !important;">(123) 456 7890</p>' +
        '\n<p style="text-align: center; color: rgb(119, 119, 119);">Monday - Friday: 8:00 AM - 5:00 PM</p>' +
        '\n<div class="spacer height-40"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="center">' +
        _tabs(1) +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Drop us a line</a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-19.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<p style="text-transform: uppercase; letter-spacing: 3px;">Talk To Us</p>' +
        '\n<h1 style="font-weight: bold;">Get in touch.</h1>' +
        '\n<div class="spacer height-80"></div>' +
        "\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>" +
        '\n<div class="spacer height-20"></div>' +
        '\n<p><b>Phone:</b><br>(123) 456 7890 / 456 7891</p>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<div class="size-18">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-ios-email-outline"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<div class="embed-responsive embed-responsive-16by9" style="height:360px"><iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" class="mg1" src="https://maps.google.com/maps?q=Melbourne,+Victoria,+Australia&amp;hl=en&amp;sll=-7.981898,112.626504&amp;sspn=0.009084,0.016512&amp;oq=melbourne&amp;hnear=Melbourne+Victoria,+Australia&amp;t=m&amp;z=10&amp;output=embed"></iframe></div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-41.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column two-third">' +
        '<h1 class="size-76" style="letter-spacing: 1px;">Let\'s stay in touch.</h1>' +
        '</div>' +
        '<div class="column third">' +
        '<p style="padding-top: 15px;"><b>Company Name</b><br>1st floor, Building Name. Street Name, City. State 12.<br>Phone: (123) 456 7890<br>Fax: (123) 456 7891</p>' +
        '\n<div class="is-social">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook" style="margin-right: 1em"></i></a>' +
        _tabs(1) +
        '<a href="mailto:you@example.com"><i class="icon ion-android-drafts"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-42.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<h1 class="size-72" style="letter-spacing: 2px;">Contact us</h1>' +
        '\n<p>Let\'s talk about everything! Send us an <a href="mailto:you@example.com" title="">email</a></p>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<div class="spacer height-80"></div>' +
        '</div>' +
        '</div>' +
        '<div class="row clearfix">' +
        '<div class="column third">' +
        '<i class="icon ion-ios-book-outline size-42" style="color: #e81212;"></i>' +
        '\n<p>123 Street Name, City. State</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-telephone-outline size-42" style="color: #15a207;"></i>' +
        '\n<p>(123) 456 7890 / 456 7891</p>' +
        '</div>' +
        '<div class="column third">' +
        '<i class="icon ion-ios-alarm-outline size-42" style="color: #fa6527;"></i>' +
        '\n<p>Monday - Fri: 9 AM - 5 PM</p>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-43.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/annie-spratt-sbdwf4-rlmu-unsplash-XD22V1.jpg" alt="">' +
        '</div>' +
        '<div class="column half">' +
        '<h1 style="letter-spacing: 1px;" class="size-35">We\'d love to hear from you...</h1>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p>Write to us at <a href="mailto:company@email.com" title="">company@email.com</a></p>' +
        '\n<p>1st floor, Building Name. Street Name, City. State 12345</p>' +
        '\n<p>Phone:<br>(123) 456 7890 / 456 7891</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social size-18">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 10px"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        '\n</div>' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-44.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column half">' +
        '<h1 style="letter-spacing: 1px;" class="size-35">We\'d love to hear from you...</h1>' +
        '\n<div class="spacer height-40"></div>' +
        '\n<p>Write to us at <a href="mailto:company@email.com" title="">company@email.com</a></p>' +
        '\n<p>1st floor, Building Name. Street Name, City. State 12345</p>' +
        '\n<p>Phone:<br>(123) 456 7890 / 456 7891</p>' +
        '\n<div class="spacer height-20"></div>' +
        '\n<div class="is-social size-18">' +
        _tabs(1) +
        '<a href="https://twitter.com/"><i class="icon ion-social-twitter" style="margin-right: 10px"></i></a>' +
        _tabs(1) +
        '<a href="https://www.facebook.com/"><i class="icon ion-social-facebook"></i></a>' +
        '\n</div>' +
        '</div>' +
        '<div class="column half">' +
        '<img src="https://contentbox-bucket.s3.amazonaws.com/public/assets/minimalist-blocks/images/callum-shaw-1s2rgks4wbm-unsplash-2evzt1.jpg" alt="">' +
        '</div>' +
        '</div>',
    },

    {
      thumbnail: 'preview/contact-46.png',
      category: '116',
      html:
        '<div class="row clearfix">' +
        '<div class="column full">' +
        '<p>Get in touch</p>' +
        '\n<h1 class="size-54" style="font-weight:400">We\'d love to hear from you info@example.com</h1>' +
        '</div>' +
        '</div>',
    },

    /* Buttons */

    {
      thumbnail: 'preview/button-01.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper">Read More</a> &nbsp;' +
        '\n<a href="#" class="is-btn is-btn-ghost1 is-upper">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-02.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper">Read More</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-03.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-04.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-btn-small">Read More</a> &nbsp;' +
        '\n<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-05.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-btn-small">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-06.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-btn-small">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-07.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-rounded-30">Read More</a> &nbsp;' +
        '\n<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-08.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-rounded-30">Read More</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-09.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-10.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-rounded-30 is-btn-small">Read More</a> &nbsp;' +
        '\n<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small">Buy Now</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-11.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost2 is-upper is-rounded-30 is-btn-small">Read More</a>' +
        '</div>',
    },

    {
      thumbnail: 'preview/button-12.png',
      category: '119',
      html:
        '<div>' +
        '<a href="#" class="is-btn is-btn-ghost1 is-upper is-rounded-30 is-btn-small">Buy Now</a>' +
        '</div>',
    },

    /*
        // Custom Module example (with just simple initial content) => Experimental
        {
        'thumbnail': 'preview/element-code.png',
        'category': '120',
        'html':
			    '<div class="row clearfix">' +
                    '<div class="column full" data-noedit data-module="my-custom-module" data-module-desc="My Module" data-html="' + // module file will be: assets/modules/my-custom-module.html
                        // Default HTML
                        encodeURIComponent('<h2>My Custom Module</h2>') +
                        '" data-settings="">' +
		            '</div>' +
			    '</div>'
        },

        // Custom Module example with initial content (see default HTML) and custom variables (see default settings) => Experimental
        // Example of custom script is also embedded in the HTML.
        {
		'thumbnail': 'preview/element-module.png',
		'category': '120',
		'html':
			    '<div class="row clearfix">' +
                    '<div class="column full" data-noedit data-module="my-custom-module" data-module-desc="My Module" data-html="' + // module file will be: assets/modules/my-custom-module.html
                        // Default HTML
                        encodeURIComponent('<h2>My Custom Module - Id: <span id="{id}">{id}</span></h2>' +
                        '<div class="is-subblock" data-subblock style="border:#efefef 1px solid;padding: 10px 30px;margin: 15px 0;background: #fff;">' + // a Sub Block is an editable area
                            '<p>' +
                                'This is an editable area inside a custom module.' +
                            '</p>' +
                        '</div>' +
                        '<scr' + 'ipt>' +
                            'document.querySelector("#{id}").style.color = "red";' +
                        '</scr' + 'ipt>' +
                        '') +

                        '" data-settings="' +
                        // Default Settings (Custom Variables)
                        encodeURIComponent('{"variable1": true, "variable2": "Hello World"}') + '"' +

                    '>' +

		            '</div>' +
			    '</div>'
        },

        // Custom Module example on how to use AJAX to get data from server
        {
		'thumbnail': 'preview/element-ajax.png',
		'category': '120',
		'html':
			    '<div class="row clearfix">' +
                    '<div class="column full" data-noedit data-module="my-ajax-module" data-dialog-width="500px" data-module-desc="Sample Ajax Request Module" data-html="' + // module file will be: assets/modules/my-ajax-module.html
                        // Default HTML
                        encodeURIComponent('<h2>Sample Content From Ajax Request</h2>' +
                        '<div id="{id}"></div>' +
                        '<scr' + 'ipt>' +
                            'var docReady = function (fn) {' +
                                'var stateCheck = setInterval(function () {' +
                                    'if (document.readyState !== "complete") return;' +
                                    'clearInterval(stateCheck);' +
                                    'try { fn() } catch (e) { }' +
                                '}, 1);' +
                            '};' +
                            'docReady(function () {' +
                                '' +
                                // https://happycoding.io/tutorials/javascript/ajax
                                'var xmlhttp = new XMLHttpRequest();' +
                                'xmlhttp.onreadystatechange = function() {' +
                                    'if (xmlhttp.readyState == XMLHttpRequest.DONE) {' + 
                                        'if (xmlhttp.status == 200) {' +
                                            'var jsonObj = JSON.parse(xmlhttp.responseText);' +
                                            'var randomMessagesArray = jsonObj.randomMessages;' +
                                            'var randomIndex = Math.floor(Math.random()*randomMessagesArray.length);' +
                                            'var messageObj = randomMessagesArray[randomIndex];' +
                                            'document.getElementById("{id}").innerHTML = messageObj.message;' +
                                            'document.getElementById("{id}").style.color = messageObj.color;' +
                                        '} else {' +
                                            'console.log("Status error: " + xmlhttp.status);' +
                                        '}' +
                                    '}' +
                                '};' +
                                'xmlhttp.open("GET", "assets/sampledata.txt", true);' +
                                'xmlhttp.send();' +
                                '' +
                            '});' +
                        '</scr' + 'ipt>' +
                        '') +

                        '" data-settings="' +
                        // Default Settings (Custom Variables)
                        encodeURIComponent('{"title": "Sample Content From Ajax Request", "requestUrl": "assets/sampledata.txt"}') + '"' +

                    '>' +

		            '</div>' +
			    '</div>'
        },        
        */
  ],
};

if (!(window.Glide || parent.Glide)) {
  for (let i = 0; i < data_basic.snippets.length; i++) {
    if (data_basic.snippets[i].glide) {
      data_basic.snippets.splice(i, 1);
      break;
    }
  }
}
