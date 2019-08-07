import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import * as os from 'os';

let browserWindow: BrowserWindow;

type DevToolsExtensionPathOptions = {
  linuxChromiumName?: 'google-chrome' | 'google-chrome-beta' | 'google-chrome-canary' | 'chromium'
};

type DevToolsExtensions = Electron.DevToolsExtensions & {
  ['React Developer Tools']?: {
    name: string;
    version: string;
  };
  ['Redux DevTools']?: {
    name: string;
    version: string;
  };
};

function devToolsExtensionPath(id: string = '', version: string = '', options: DevToolsExtensionPathOptions = { linuxChromiumName: 'google-chrome' }) {
  const { linuxChromiumName } = options;
  let chromeDir: string;
  switch (os.platform()) {
    case 'win32':
      chromeDir = '/AppData/Local/Google/Chrome/User Data';
      break;
    case 'darwin':
      chromeDir = '/Library/Application Support/Google/Chrome';
      break;
    default:
      chromeDir = `/.config/${linuxChromiumName}`;
      break;
  }
  return path.join(os.homedir(), chromeDir, '/Default/Extensions', id, `${version}_0`);
}

function destroyBrowserWindow() {
  browserWindow.destroy();
}

function createBrowserWindow() {
  browserWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegration: true,
    },
  });

  browserWindow.loadURL(isDev
    ? `http://localhost:${3000}`
    : `file://${path.join(__dirname, '../build/index.html')}`
  );

  browserWindow.on('closed', destroyBrowserWindow);

  const extensions: DevToolsExtensions = BrowserWindow.getDevToolsExtensions();
  if (!extensions['React Developer Tools']) {
    BrowserWindow.addDevToolsExtension(devToolsExtensionPath('fmkadmapgofadopljbjfkapdkoienihi', '3.6.0'));
  }
  if (!extensions['Redux DevTools']) {
    BrowserWindow.addDevToolsExtension(devToolsExtensionPath('lmhkpmbekcpmknklioeibfkpmmfibljd', '2.17.0'));
  }
}

function quitApp() {
  if (process.platform === 'darwin') {
    return;
  }

  app.quit();
}

function startApp() {
  if (browserWindow !== null) {
    return;
  }

  createBrowserWindow();
}

app.on('ready', createBrowserWindow);
app.on('activate', startApp);
app.on('window-all-closed', quitApp);
