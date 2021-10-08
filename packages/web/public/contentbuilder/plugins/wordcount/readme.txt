Word Count Plugin

To install the plugin, modify config file (contentbuilder\config.js) as follow:

	_cb.settings.plugins = ['wordcount'];

This plugin will add a 'Word Count' button on the 'More' popup on toolbar (click the 'More' button).

You can also add the "showgrid" button on the buttons or buttonsMore parameters: 

	var obj = $.contentbuilder({
		...
		buttons: [..., "wordcount", ...]
	});

	or

	var obj = $.contentbuilder({
		...
		buttonsMore: [..., "wordcount", ...]
	});

For more info about buttons or buttonsMore parameters, please check the ContentBuilder.js readme.txt.
