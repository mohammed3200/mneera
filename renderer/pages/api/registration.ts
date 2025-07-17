import { db } from "@/db";
import { individuals } from "@/db/schema";
import { NewIndividual } from "@/db/schema-types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      name,
      nationalNumber,
      birthDate,
      idNumber,
      address,
      placeOfBirth,
      battalion,
      phoneNumber,
      nationality,
      bloodType,
      academicQualification,
      weaponType,
    } = req.body as NewIndividual;

    db.insert(individuals)
      .values({
        name,
        nationalNumber,
        birthDate,
        idNumber,
        address,
        placeOfBirth,
        battalion,
        phoneNumber,
        nationality,
        bloodType,
        academicQualification,
        weaponType,
      })
      .then(() => {
        res.redirect(307, "/individuals");
      })
      .catch((error) => {
        console.error("Error registering individual:", error);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } else {
    // Handle any other HTTP method
  }
}
