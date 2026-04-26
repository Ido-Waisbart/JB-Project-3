-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: vacation_wasteland
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `vacation_fk_idx` (`vacation_id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `vacation_fk` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (6,3),(5,12),(5,19);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Tim','Bergberg','timberg@gmail.com','05c5a1de541593b2a3250fc79031e570d47a5854b1241b1c2dd27debd5bac9355b987c60c93e32243038c1737e8d5df28e51fe7112ddfd0ec00b1339712cb48f','user'),(5,'edmon','admin','edmonAdmin@gmail.com','973b5359b2c9d96daced99e0c64b168c6f0a4a01a58bb77d6b9ccb3617e9e3e207df5e1aa72d90027ef24fe6bcd74bf6d56ab36819e121c836070722f057eb00','admin'),(6,'test1','test2','test3@gmail.com','4acf06fa87dbb335120c81dfeec191b0424c0601bfa3d5f054986c9a6d35c71e876ef7801481c8dc3c366886d4f248576e1d97af93b77c60faf00813344055bb','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` text,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price_in_usd` decimal(10,2) NOT NULL,
  `image_uri` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (3,'Lahaina, Hawaii','It\'s time to take a break and relax by the ocean on a Lahaina vacation.','2025-11-14','2025-11-29',1049.00,'lahaina.jpg'),(4,'Athens, Greece','A popular tourism location among many middle-eastern residents, loved for its comfortably sunny weather and affordability.','2026-05-03','2026-06-03',450.00,'athens.webp'),(5,'Väckelsång, Sweden','A locality in Sweden, and the proud host of the Game Collective, a group of tight-knit craftsmen.','2026-07-01','2026-07-13',200.00,'väckelsång.avif'),(7,'Hope Harbor, Norway','A secluded harbor in a small island on Norway\'s borders. This quiet place is filled with a plethora of wildlife and seaside houses and shops.','2025-11-29','2025-12-20',329.00,'hope_harbor.webp'),(8,'Mission Bay, New Zealand','A beach laying next to a dense forest and a popular marketplace.','2026-08-29','2026-09-02',799.00,'mission_bay.jpg'),(9,'Aulani, Hawaii','A very tropical and well established hotel, vivid with bright blue and green sceneries, and impressively grand hotel buildings.','2026-06-14','2026-07-14',999.00,'aulani.png'),(12,'Vienna, Austria','A ticket to the lofty, urban and very popular Vienna. Tickets include a trip to and from Vienna, including a trip group touring through the city\'s most prominent landmarks.','2025-12-26','2026-01-01',849.00,'vienna.jpg'),(13,'Kyoto, Japan','Experience the historic temples, traditional streets, and seasonal cherry blossoms of Kyoto.','2026-03-15','2026-03-25',1200.00,'kyoto.jpg'),(14,'Reykjavik, Iceland','A northern getaway filled with geothermal pools, volcanic landscapes, and northern lights.','2026-01-10','2026-01-18',1350.00,'reykjavik.jpg'),(15,'Barcelona, Spain','A vibrant coastal city known for its architecture, beaches, and rich cultural life.','2026-06-05','2026-06-15',980.00,'barcelona.jpg'),(16,'Banff, Canada','A mountain escape in the Canadian Rockies featuring lakes, hiking trails, and wildlife.','2026-07-20','2026-07-28',1100.00,'banff.jpg'),(17,'Cape Town, South Africa','A dramatic coastal city beneath Table Mountain, offering beaches, nature, and urban exploration.','2026-09-10','2026-09-20',1150.00,'cape_town.png'),(19,'Nevada\'s Great Basin National Park, USA','A remote Nevada park known for ancient bristlecone pines, striking mountain landscapes, and the Lehman Caves system.','2026-04-24','2026-04-30',829.00,'7bb33c99-b617-481a-b2b2-22240711f14c.jpg'),(21,'aa','bb','1111-11-11','2222-02-22',3.00,'58041b9c-efe2-4585-8025-6fcfc37de5f1.png'),(22,'cc','dd','2031-03-03','2222-02-22',1.00,'057a0433-dd0a-4ed9-bfb8-994dde5a4b6d.png'),(23,'531531','53151353','3333-03-31','2222-02-22',5.00,'1d66848a-e853-43a2-b623-f8ad1f09d315.png'),(24,'sdfsdfsdf','sdfsfsdfsdf','2026-04-09','2026-04-01',4545.00,'0b0d772c-41ef-4735-8f5c-99d768ec67dc.png'),(25,'4545','4545','2026-04-16','2026-05-01',45.00,'d0747073-dec9-47fb-91b7-3a7a3f2694a7.png');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 11:40:10
