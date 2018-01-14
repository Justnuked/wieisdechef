CREATE TABLE `students` (`id` int(255) NOT NULL AUTO_INCREMENT, `username` varchar(64) NOT NULL UNIQUE, `password` varchar(5000) NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `meals` (`id` int(255) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` double NOT NULL, `maxPeople` int(32) NOT NULL, `image` blob, `description` varchar(255), PRIMARY KEY (`id`));
CREATE TABLE `dinners` (`id` int(255) NOT NULL AUTO_INCREMENT, `chefId` int(255) NOT NULL, `mealId` int(255) NOT NULL, `date` datetime NOT NULL, PRIMARY KEY (`id`));
CREATE TABLE `participants` (`id` int(255) NOT NULL AUTO_INCREMENT, `dinnerId` int(255) NOT NULL, `studentId` int(255) NOT NULL, PRIMARY KEY (`id`));

--TRIGGERS

DELIMITER //

DROP TRIGGER IF EXISTS `bi_meals`//
CREATE TRIGGER `bi_meals`
BEFORE INSERT ON meals
FOR EACH ROW
BEGIN

	IF NEW.`description` = 'undefined' OR NEW.`description` = 'null' THEN
    SET NEW.`description` = '';
    END IF;
    
    IF NEW.`image` = 'undefined'OR NEW.`image` = 'null' THEN
    SET NEW.`image` = '';
    END IF;

    IF NEW.`name` = 'undefined' OR NEW.`name` = 'null' OR NEW.`name` = '' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Name can't be null";
    END IF;
	
END //


DROP TRIGGER IF EXISTS `bi_dinners` //
CREATE TRIGGER `bi_dinners`
BEFORE INSERT ON `dinners`
FOR EACH ROW
BEGIN

IF NEW.`date` = '0000-00-00 00:00:00'
THEN 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Date can't be 0000-00-00 00:00:00";
END IF;

END //

DELIMITER ;