Insert Symbols Plugin

To install the plugin, modify config file (contentbuilder\config.js) as follow:

	_cb.settings.plugins = ['symbols'];

This plugin will add an 'Insert Symbols' button on the 'More' popup on toolbar (click the 'More' button).

You can also add the "symbols" button on the buttons or buttonsMore parameters: 

	var obj = $.contentbuilder({
		...
		buttons: [..., "symbols", ...]
	});

	or

	var obj = $.contentbuilder({
		...
		buttonsMore: [..., "symbols", ...]
	});

For more info about buttons or buttonsMore parameters, please check the ContentBuilder.js readme.txt.
