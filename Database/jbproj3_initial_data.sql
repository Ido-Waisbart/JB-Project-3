-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacation_wasteland
-- ------------------------------------------------------
-- Server version	8.0.44

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
INSERT INTO `likes` VALUES (6,3),(9,3),(4,4),(5,12),(5,19),(4,26),(6,26),(8,26),(6,27),(8,27),(9,27),(4,28),(8,28),(9,28),(6,29),(9,29);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Tim','Bergberg','timberg@gmail.com','05c5a1de541593b2a3250fc79031e570d47a5854b1241b1c2dd27debd5bac9355b987c60c93e32243038c1737e8d5df28e51fe7112ddfd0ec00b1339712cb48f','user'),(5,'edmon','admin','edmonAdmin@gmail.com','973b5359b2c9d96daced99e0c64b168c6f0a4a01a58bb77d6b9ccb3617e9e3e207df5e1aa72d90027ef24fe6bcd74bf6d56ab36819e121c836070722f057eb00','admin'),(6,'test1','test2','test3@gmail.com','4acf06fa87dbb335120c81dfeec191b0424c0601bfa3d5f054986c9a6d35c71e876ef7801481c8dc3c366886d4f248576e1d97af93b77c60faf00813344055bb','user'),(7,'mitest','matest','motest@gmail.com','6bfc88e046c1f6ddc25c4ecdfe62a1eae987d83effb9d2ef0aa424089f83cd4642901647c8ee66921e8b75b7516402b7921c98ae8e744a3831191169b13c9604','user'),(8,'Sarah','Miller','sarah@gmail.com','4acf06fa87dbb335120c81dfeec191b0424c0601bfa3d5f054986c9a6d35c71e876ef7801481c8dc3c366886d4f248576e1d97af93b77c60faf00813344055bb','user'),(9,'David','Cohen','david@gmail.com','4acf06fa87dbb335120c81dfeec191b0424c0601bfa3d5f054986c9a6d35c71e876ef7801481c8dc3c366886d4f248576e1d97af93b77c60faf00813344055bb','user');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (3,'Lahaina, Hawaii','It\'s time to take a break and relax by the ocean on a Lahaina vacation.','2025-11-14','2025-11-29',1049.00,'lahaina.jpg'),(4,'Athens, Greece','A popular tourism location among many middle-eastern residents, loved for its comfortably sunny weather and affordability.','2026-05-03','2026-06-03',450.00,'athens.webp'),(5,'Väckelsång, Sweden','A locality in Sweden, and the proud host of the Game Collective, a group of tight-knit craftsmen.','2026-07-01','2026-07-13',200.00,'väckelsång.avif'),(7,'Hope Harbor, Norway','A secluded harbor in a small island on Norway\'s borders. This quiet place is filled with a plethora of wildlife and seaside houses and shops.','2025-11-29','2025-12-20',329.00,'hope_harbor.webp'),(8,'Mission Bay, New Zealand','A beach laying next to a dense forest and a popular marketplace.','2026-08-29','2026-09-02',799.00,'mission_bay.jpg'),(9,'Aulani, Hawaii','A very tropical and well established hotel, vivid with bright blue and green sceneries, and impressively grand hotel buildings.','2026-06-14','2026-07-14',999.00,'aulani.png'),(12,'Vienna, Austria','A ticket to the lofty, urban and very popular Vienna. Tickets include a trip to and from Vienna, including a trip group touring through the city\'s most prominent landmarks.','2025-12-26','2026-01-01',849.00,'vienna.jpg'),(13,'Kyoto, Japan','Experience the historic temples, traditional streets, and seasonal cherry blossoms of Kyoto.','2026-03-15','2026-03-25',1200.00,'kyoto.jpg'),(14,'Reykjavik, Iceland','A northern getaway filled with geothermal pools, volcanic landscapes, and northern lights.','2026-01-10','2026-01-18',1350.00,'reykjavik.jpg'),(15,'Barcelona, Spain','A vibrant coastal city known for its architecture, beaches, and rich cultural life.','2026-06-05','2026-06-15',980.00,'barcelona.jpg'),(16,'Banff, Canada','A mountain escape in the Canadian Rockies featuring lakes, hiking trails, and wildlife.','2026-07-20','2026-07-28',1100.00,'banff.jpg'),(17,'Cape Town, South Africa','A dramatic coastal city beneath Table Mountain, offering beaches, nature, and urban exploration.','2026-09-10','2026-09-20',1150.00,'cape_town.png'),(19,'Nevada\'s Great Basin National Park, USA','A remote Nevada park known for ancient bristlecone pines, striking mountain landscapes, and the Lehman Caves system.','2026-04-24','2026-04-30',829.00,'7bb33c99-b617-481a-b2b2-22240711f14c.jpg'),(26,'Zion National Park, USA','Hike the breathtaking red canyons, traverse the Angels Landing, and explore the gorgeous Narrows river canyons.','2026-05-05','2026-05-28',650.00,'ZionNationalPark.jpg'),(27,'Rome, Italy','Discover the Colosseum, walk through history at the Roman Forum, and throw a coin into the Trevi Fountain for good luck.','2026-05-10','2026-06-04',1350.00,'rome.jpg'),(28,'Paris, France','Stroll through the romantic streets, view the masterpiece collections at the Louvre, and enjoy fresh pastries near the Eiffel Tower.','2026-06-10','2026-06-25',1500.00,'paris.jpg'),(29,'Tokyo, Japan','Experience the perfect blend of hyper-modern technology, traditional shrines, vibrant districts like Shibuya, and amazing cuisine.','2026-07-15','2026-07-30',1850.00,'tokyo.jpg');
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

-- Dump completed on 2026-05-17 12:29:02
