CREATE TABLE `notes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`text` text NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
