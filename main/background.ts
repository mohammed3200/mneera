import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import "@/main/db/repositories/ipc-handlers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://-/home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

// ipcMain.handle('print-pdf-buffer', async (_, uint8: Uint8Array) => {
//   const win = new BrowserWindow({ show: false });
//   // You can either load a data URL:
//   const pdfDataUri = `data:application/pdf;base64,${Buffer.from(uint8).toString('base64')}`;
//   await win.loadURL(pdfDataUri);
//   return new Promise(resolve => {
//     win.webContents.print({ silent: true, printBackground: true }, ok => {
//       win.destroy();
//       resolve(ok);
//     });
//   });
// });

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
