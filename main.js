'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = require('menu');

var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Close',
				accelerator: 'Ctrl+W',
				role: 'close'
			}
		]
	}
];

app.on('ready', function() {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });
	mainWindow.loadURL('file://' + __dirname + '/windows/main/index.html');
	mainWindow.webContents.openDevTools();
	mainWindow.setMenu(Menu.buildFromTemplate(menuTemplate));
	mainWindow.maximize();

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});
