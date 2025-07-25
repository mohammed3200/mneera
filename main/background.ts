import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { getImage, saveImage } from "./db/image-service";
import { db } from "./db";
import { individuals } from "./db/schema";


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
    await mainWindow.loadURL(`file://${path.join(__dirname, "../app/renderer/home.html")}`);
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
    return imageData?.toString();
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
  console.log("Received individual data:", individualData);
  try {
    let imageId: string | null = null;
    if (individualData.image) {
      imageId = await saveImage(individualData.image);
    }

    // Prepare individual data with correct field names
    const individual = {
      name: individualData.name,
      nationalNumber: individualData.nationalNumber,
      birthDate: new Date(individualData.birthDate).getTime(),
      address: individualData.address,
      placeOfBirth: individualData.placeOfBirth,
      battalion: individualData.battalion,
      phoneNumber: individualData.phoneNumber,
      nationality: individualData.nationality,
      bloodType: individualData.bloodType,
      academicQualification: individualData.academicQualification,
      weaponType: individualData.weaponType,
      image: imageId,
      idNumber: individualData.idNumber || null,
      passportNumber: individualData.passportNumber || null,
    };

    await db.insert(individuals).values(individual);
    return { success: true };
  } catch (error) {
    console.error("Error adding individual:", error);
    // Fix: Safe error message access
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
