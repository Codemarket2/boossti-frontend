/*
    Hello World Plugin
*/

(function () {

    var button_html = '<button id="my_helloworld_button" title="Hello World" style="text-transform:none">hello</button>';

    _cb.addButton('helloworld', button_html, '#my_helloworld_button', function () {

        alert('Hello World');

    });

})();