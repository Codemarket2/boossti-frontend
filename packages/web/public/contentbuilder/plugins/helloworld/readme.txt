Hello World Plugin

To install the plugin, modify config file (contentbuilder\config.js) as follow:

	_cb.settings.plugins = ['helloworld'];

This plugin will add a 'Hello World' button on the 'More' popup on toolbar (click the 'More' button).

You can also add the "helloworld" button on the buttons or buttonsMore parameters: 

	var obj = $.contentbuilder({
		...
		buttons: [..., "helloworld", ...]
	});

	or

	var obj = $.contentbuilder({
		...
		buttonsMore: [..., "helloworld", ...]
	});

For more info about buttons or buttonsMore parameters, please check the ContentBuilder.js readme.txt.
