CREATE TABLE `users` (`id` int(255) NOT NULL AUTO_INCREMENT, `username` varchar(64) NOT NULL UNIQUE, `password` varchar(5000) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `meals` (`id` int(255) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` double NOT NULL, `maxPeople` int(32) NOT NULL, `image` blob, `description` varchar(255), PRIMARY KEY (`id`));
CREATE TABLE `dinners` (`id` int(255) NOT NULL AUTO_INCREMENT, `chefId` int(255) NOT NULL, `mealId` int(255) NOT NULL, `date` date NOT NULL UNIQUE, PRIMARY KEY (`id`));
CREATE TABLE `participants` (`id` int(255) NOT NULL AUTO_INCREMENT, `dinnerId` int(255) NOT NULL, `studentId` int(255) NOT NULL, PRIMARY KEY (`id`));
ALTER TABLE `dinners` ADD INDEX `FKdinners137286` (`chefId`), ADD CONSTRAINT `FKdinners137286` FOREIGN KEY (`chefId`) REFERENCES `users` (`id`);
ALTER TABLE `dinners` ADD INDEX `FKdinners735838` (`mealId`), ADD CONSTRAINT `FKdinners735838` FOREIGN KEY (`mealId`) REFERENCES `meals` (`id`);
ALTER TABLE `participants` ADD INDEX `FKparticipan868862` (`studentId`), ADD CONSTRAINT `FKparticipan868862` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`);
ALTER TABLE `participants` ADD INDEX `FKparticipan734595` (`dinnerId`), ADD CONSTRAINT `FKparticipan734595` FOREIGN KEY (`dinnerId`) REFERENCES `dinners` (`id`);
