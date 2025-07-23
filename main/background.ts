import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { db } from "@/db";
import { individuals } from "@/db/schema";
import { saveImage,getImage } from "@/db/image-service";

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
    await mainWindow.loadURL(`file://${path.join(__dirname, 'home.html')}`);
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle("get-image", async (event, imageId: string) => {
  try {
    const imageData = await getImage(imageId);
    return imageData?.toString("base64");
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
});


ipcMain.handle("get-individuals", async () => {
  const data = await db.select().from(individuals);
  return data;
});


ipcMain.handle("add-individual", async (event, individualData) => {
  try {
    // Handle image upload
    let imageId: string | null = null;
    if (individualData.image) {
      imageId = await saveImage(individualData.image);
    }

    // Prepare individual data
    const individual = {
      ...individualData,
      image: imageId,
      birthDate: new Date(individualData.birthDate).getTime(),
    };

    await db.insert(individuals).values(individual);
    return { success: true };
  } catch (error) {
    console.error("Error adding individual:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
