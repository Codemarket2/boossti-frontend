Preview Plugin

To install the plugin, modify config file (contentbuilder\config.js) as follow:

	_cb.settings.plugins = ['preview'];

This plugin will add a 'Preview' button on the 'More' popup on the toolbar (click the 'More' button).

You can also add the "preview" button on the toolbar as follow: 

	var obj = $.contentbuilder({
		...
		buttons: [..., "preview", ...]
	});

	or

	var obj = $.contentbuilder({
		...
		buttonsMore: [..., "preview", ...]
	});

(For more info about buttons or buttonsMore parameters, please check the ContentBuilder.js readme.txt)
