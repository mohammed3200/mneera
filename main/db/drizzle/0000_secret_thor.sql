CREATE TABLE `battalions` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`place` text NOT NULL,
	`conductor` text NOT NULL,
	`number_of_individuals` integer DEFAULT 1 NOT NULL,
	`weapons_type` text NOT NULL,
	`date_of_creation` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `battalions_name_unique` ON `battalions` (`name`);--> statement-breakpoint
CREATE TABLE `images` (
	`id` text PRIMARY KEY NOT NULL,
	`data` blob,
	`type` text,
	`size` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `individuals` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image_id` text,
	`national_number` text NOT NULL,
	`birth_date` integer NOT NULL,
	`id_number` text,
	`passport_number` text,
	`address` text NOT NULL,
	`place_of_birth` text NOT NULL,
	`battalion_id` integer NOT NULL,
	`phone_number` text NOT NULL,
	`nationality` text NOT NULL,
	`blood_type` text NOT NULL,
	`academic_qualification` text NOT NULL,
	`weapon_type` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `individuals_national_number_unique` ON `individuals` (`national_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `individuals_id_number_unique` ON `individuals` (`id_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `individuals_passport_number_unique` ON `individuals` (`passport_number`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);