// import { db } from "@/db";
// import { images, individuals } from "@/db/schema";
// import { NewIndividual } from "@/db/schema-types";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { v4 as uuidv4 } from "uuid";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("Received data: ", req.body);
//   if (req.method === "POST") {
//     const {
//       name,
//       nationalNumber,
//       birthDate,
//       idNumber,
//       address,
//       placeOfBirth,
//       battalion,
//       phoneNumber,
//       nationality,
//       bloodType,
//       academicQualification,
//       weaponType,
//     } = req.body as NewIndividual;

//     let imageId = uuidv4();
//     db.insert(images).values({
//       id: imageId,
//       data: req.body.image.data,
//       type: req.body.image.size,
//       size: req.body.image.type,
//     });

//     db.insert(individuals)
//       .values({
//         name,
//         image: imageId,
//         nationalNumber,
//         birthDate,
//         idNumber,
//         address,
//         placeOfBirth,
//         battalion,
//         phoneNumber,
//         nationality,
//         bloodType,
//         academicQualification,
//         weaponType,
//       })
//       .then(() => {
//         res.redirect(307, "/individuals");
//       })
//       .catch((error) => {
//         console.error("Error registering individual:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//       });
//   } else {
//     // Handle any other HTTP method
//   }
// }
