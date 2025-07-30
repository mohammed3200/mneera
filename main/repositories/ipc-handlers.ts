import { ipcMain } from 'electron';
import { IndividualRepository } from './IndividualRepository';
import { ImageRepository } from './ImageRepository';

const individualRepo = new IndividualRepository();
const imageRepo = new ImageRepository();

ipcMain.handle('get-individuals', async () => {
  return individualRepo.getAll();
});

ipcMain.handle('get-individual', async (_, id: number) => {
  return individualRepo.getById(id);
});

ipcMain.handle('add-individual', async (_, individualData) => {
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

    const created = await individualRepo.create(newIndividual);
    return { success: true, individual: created };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
});

ipcMain.handle('get-image', async (_, imageId: string) => {
  const image = await imageRepo.getById(imageId);
  return image?.data?.toString();
});