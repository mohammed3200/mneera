CREATE TABLE `Image` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` blob,
	`type` text,
	`size` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);

PRAGMA foreign_keys=OFF;
CREATE TABLE `__new_individuals` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image_id` text,  -- Changed to nullable
	`national_number` text NOT NULL,
	`birth_date` integer NOT NULL,
	`id_number` text,
	`passport_number` text,
	`address` text NOT NULL,
	`place_of_birth` text NOT NULL,
	`battalion` text NOT NULL,
	`phone_number` text NOT NULL,
	`nationality` text NOT NULL,
	`blood_type` text NOT NULL,
	`academic_qualification` text NOT NULL,
	`weapon_type` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Select only columns that exist in original table
INSERT INTO `__new_individuals` (
	"id", "name", "national_number", "birth_date", "id_number", 
	"address", "place_of_birth", "battalion", "phone_number", 
	"nationality", "blood_type", "academic_qualification", 
	"weapon_type", "created_at"
)
SELECT 
	"id", "name", "national_number", "birth_date", "id_number", 
	"address", "place_of_birth", "battalion", "phone_number", 
	"nationality", "blood_type", "academic_qualification", 
	"weapon_type", "created_at"
FROM `individuals`;

DROP TABLE `individuals`;
ALTER TABLE `__new_individuals` RENAME TO `individuals`;
PRAGMA foreign_keys=ON;