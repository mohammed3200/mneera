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
CREATE UNIQUE INDEX `battalions_name_unique` ON `battalions` (`name`);