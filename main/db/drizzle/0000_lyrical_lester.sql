CREATE TABLE `individuals` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`national_number` text NOT NULL,
	`birth_date` integer NOT NULL,
	`id_number` text NOT NULL,
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

CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`created_at` integer NOT NULL
);

CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);