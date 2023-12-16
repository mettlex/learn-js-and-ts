CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` enum('admin','moderator','member') NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
