ALTER TABLE `Image` RENAME TO `images`;

PRAGMA foreign_keys=OFF;
CREATE TABLE `__new_images` (
	`id` text PRIMARY KEY NOT NULL,
	`data` blob,
	`type` text,
	`size` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `__new_images`("id", "data", "type", "size", "created_at", "updated_at") 
SELECT "id", "data", "type", "size", "created_at", "updated_at" 
FROM `images`;

DROP TABLE `images`;
ALTER TABLE `__new_images` RENAME TO `images`;
PRAGMA foreign_keys=ON;

-- Remove individuals table modification (already done in 0001)
-- Only images table needs modification in this migration