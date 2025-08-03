import { ipcMain } from "electron";
import { IndividualRepository } from "./IndividualRepository";
import { ImageRepository } from "./ImageRepository";
import { BattalionsRepository } from "./BattalionRepository";

// ========================= Initializing Repositories ==========================
const individualRepo = new IndividualRepository();
const imageRepo = new ImageRepository();
const battalionsRepo = new BattalionsRepository();

// ========================= Individual Method ==========================
ipcMain.handle("get-individuals", async () => {
  return individualRepo.getAll();
});

ipcMain.handle("get-individual", async (_, id: number) => {
  return individualRepo.getById(id);
});

ipcMain.handle(
  "get-individuals-by-battalion",
  async (_, battalionId: number) => {
    return individualRepo.getByBattalionId(battalionId);
  }
);

ipcMain.handle("add-individual", async (_, individualData) => {
  try {
    let imageId: string | null = null;

    if (individualData.image) {
      imageId = await imageRepo.create(individualData.image);
    }

    // Proper date conversion
    const birthDate = new Date(individualData.birthDate).getTime();

    const newIndividual = {
      name: individualData.name,
      nationalNumber: individualData.nationalNumber,
      birthDate: birthDate, // Use converted timestamp
      address: individualData.address,
      placeOfBirth: individualData.placeOfBirth,
      battalionId: individualData.battalionId,
      phoneNumber: individualData.phoneNumber,
      nationality: individualData.nationality,
      bloodType: individualData.bloodType,
      academicQualification: individualData.academicQualification,
      weaponType: individualData.weaponType,
      image: imageId,
      idNumber: individualData.idNumber || null,
      passportNumber: individualData.passportNumber || null,
    };

    const created = await individualRepo.create(newIndividual);
    return { success: true, individual: created };
  } catch (error: any) {
    console.log("add individual error: ", error);
    return {
      success: false,
      error: {
        code: error.code || "ERR_UNKNOWN",
        message: error.message || "unknown error",
      },
    };
  }
});

// ========================= Battalion Method ==========================
ipcMain.handle("get-battalions", async () => {
  return battalionsRepo.getAll();
});

ipcMain.handle("get-battalion", async (_, id: number) => {
  return battalionsRepo.getById(id);
});

ipcMain.handle("add-battalion", async (_, battalionsData) => {
  const newBattalion = {
    name: battalionsData.name,
    place: battalionsData.place,
    conductor: battalionsData.conductor,
    numberOfIndividuals: battalionsData.numberOfIndividuals,
    weaponsType: battalionsData.weaponsType,
    dateOfCreation: battalionsData.dateOfCreation,
  };

  try {
    const created = await battalionsRepo.create(newBattalion);
    return { success: true, battalion: created };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
});

// ========================= Image Method ==========================
ipcMain.handle("get-image", async (_, imageId: string) => {
  const image = await imageRepo.getById(imageId);
  return image?.data?.toString();
});
