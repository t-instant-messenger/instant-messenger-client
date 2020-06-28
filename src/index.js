const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Unccomment once found connection

let mainWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    //resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./public/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Message",
      },
      {
        label: "Close Window",
      },
      {
        label: "Refresh",
        accelerator: "CmdOrCtrl+R",
        click() {
          mainWindow.reload();
        },
      },
    ],
  },
];

// If mac, add empty object to menu
if (process.platform === "darwin")
  mainMenuTemplate.unshift({
    label: "Electron",
    submenu: [
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  });

// Add developer tools items if not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: "CmdOrCtrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
