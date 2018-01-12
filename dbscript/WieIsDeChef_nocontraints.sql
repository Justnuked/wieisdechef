CREATE TABLE `students` (`id` int(255) NOT NULL AUTO_INCREMENT, `username` varchar(64) NOT NULL UNIQUE, `password` varchar(5000) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `meals` (`id` int(255) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` double NOT NULL, `maxPeople` int(32) NOT NULL, `image` blob, `description` varchar(255), PRIMARY KEY (`id`));
CREATE TABLE `dinners` (`id` int(255) NOT NULL AUTO_INCREMENT, `chefId` int(255) NOT NULL, `mealId` int(255) NOT NULL, `date` timestamp NOT NULL UNIQUE, PRIMARY KEY (`id`));
CREATE TABLE `participants` (`id` int(255) NOT NULL AUTO_INCREMENT, `dinnerId` int(255) NOT NULL, `studentId` int(255) NOT NULL, PRIMARY KEY (`id`));
