CREATE TABLE `spaces` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`space_url` varchar(300),
	CONSTRAINT `spaces_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_links` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` int,
	`is_public` boolean,
	`tagline` varchar(250),
	CONSTRAINT `user_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_role_pings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`role_id` varchar(20),
	`user_id` int,
	CONSTRAINT `user_role_pings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_xp` (
	`user_id` bigint NOT NULL,
	`last_applied_time` bigint,
	`current_xp` bigint,
	`multiplier` int,
	`pentalty_count` int,
	CONSTRAINT `user_xp_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint NOT NULL,
	`username` varchar(120),
	`tagline` varchar(250),
	`img_url` varchar(500),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
