-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: mysql.cm1q4b6bmdpr.ap-south-1.rds.amazonaws.com    Database: instinct_database
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `userData`
--

DROP TABLE IF EXISTS `userData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userData` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email_id` varchar(45) NOT NULL,
  `contact` bigint NOT NULL,
  `password` varchar(225) NOT NULL,
  `profile_image` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_id_UNIQUE` (`email_id`),
  UNIQUE KEY `contact_UNIQUE` (`contact`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userData`
--

LOCK TABLES `userData` WRITE;
/*!40000 ALTER TABLE `userData` DISABLE KEYS */;
INSERT INTO `userData` VALUES (1,'Anshu','Sinha','anshusinha872@gmail.com',8292009925,'anshu123',NULL),(2,'sonam','kumari','sonam25ranchi@gmail.com',7070674720,'$2b$10$uuy5szkem6OI9FRJAs2BNeJGvhDx.aKBIGgqBEFQXf7J9gEXlAjve','./uploads/profileImg/2_20230124060431_Birla_Institute_of_Technology_Mesra (1).png'),(3,'harsh','chittora','harshchittora2001@gmail.com',7878542480,'$2b$10$8T/KgYCUQODpur0SS4r4D.kELl.49s/1Hm3W/g1B4jVyy2X412L1m','./uploads/profileImg/3_20230124020700_IMG_20230101_113726_492.jpg'),(5,'harsh2',NULL,'chittoxtech@gmail.com',7878542481,'harsh','./uploads/profileImg/7_20230124043110_IMG-03331.jpg'),(6,'Anshu','Sinha','anshu',8292009935,'$2b$10$T4fWM.YwahE0NDHjQInzi.WUNsc1CPXs1R/xqTlAB2qoTPAKeWTfG','./uploads/profileImg/6_20230129050150_IMG-03331.jpg'),(7,'Anshu','Sinha','anshusinha8721@gmail.com',8292009035,'anshu123',NULL),(8,'Anshu','Sinha','anshusinha800@gmail.com',8292009933,'anshu123',NULL),(9,'Abhishek','','abhishek@gmail.com',8292009999,'anshu123',NULL),(10,'','','',0,'',NULL),(11,'Anshu','','anshusinha@gmail.com',1234123412,'anshu1234',NULL),(12,'Anshu','','anshusinha87288@gmail.com',8292009000,'anshu123',NULL),(13,'Shivam','Jha','shivam@gmail.com',8292009955,'anshu123',NULL),(14,'Anshu','','anshusinha99@gmail.com',1111111111,'anshu123',NULL),(15,'Anshu','Sinha','anshu121',8292009938,'anshu123',NULL),(16,'harsh','Chittora','harsh@gmail.com',7878542486,'harshhagsis68',NULL),(17,'Anshika ','','anshikaanshika103@gmail.com',8340148772,'$2b$10$MiWgsQegf99tCL//Dk59CeEph31zh1/iDYzXKGBvcs/1hdnkYPjyi','./uploads/profileImg/17_20230124022114_HD-wallpaper-cute-anime-girl-loli-raining-curious-expression-hoodie-anime.jpg'),(18,'Ravi','Verma','rkvermamec@gmail.com',7870388187,'Testing@1',NULL),(19,'Nikita ','Anand ','itsnikita0917@gmail.com',7079507683,'$2b$10$hrZRqMnu/LoMa.rfR1V.zuPSid.w8LpRkZnjQRp3Tl8VsAtGz93bS','./uploads/profileImg/19_20230124054324_IMG_20230119_195648_184.jpg'),(20,'Ansh','Magotra','anshmagotra@gmail.com',9988922669,'Ansh@2023',NULL),(21,'Anshu','Sinha','anshusi@gmail.com',7777777777,'$2b$10$TyIuZqTG/c/HL4kPU05aGObE.KK.yt4gHYmp4G',NULL),(22,'Anshu','Sinha','anshusi22@gmail.com',7777777776,'$2b$10$QR2Knk4Shv1rzN0nBxGcXOgk4ESygalDMhyg/3XUJIhjmLTp1v7Ry',NULL),(23,'Anshu','Sinha','anshusi212@gmail.com',7777777676,'$2b$10$d4vUwL.VJMg3O34rDac74.804w5EOor7mNBvtRomLyhtYQ825NCsy',NULL),(24,'harsh','','harsh',7878542483,'harsh1234',NULL),(25,'harsh','','chittox@gmail.com',1234567890,'$2b$10$TKsnd2YXrZ0tYuf/XvmltuINoF0mF5Q9SiWmjsf01LPFP/.dF6zdm',NULL),(26,'Shubham','Kumar','shubhamkrsinha3@gmail.com',9430411086,'$2b$10$0oIxonHaZKuI7u0dopWvd.f.FA5OpUVcn9vpDJeC29Bd.31AKg.B.',NULL),(27,'harsh','2','-1',1239876540,'harsh123456',NULL),(28,'harsh','2','lmn',9638527410,'$2b$10$uXAEqa8uzsQJD6zvpGKsLOnhGU3VFggV/ZfZqc2dF1TmSzqozVnde',NULL),(29,'harsh','2','asd',7854123690,'$2b$10$LzwJNKclOuG1JiMSWIH5YeSnwENqb.iAInefGkBg301o1i24xF0SC',NULL),(31,'Shivam','Jha','smartshivam1919@gmail.com',8102901497,'$2b$10$uDzAr46Y8.rHJPgn5soCeOKfeBmPb4JRl4c3.Fz75YOh7DaZfEvUi','./uploads/profileImg/31_20230124014914_20230124_130207.jpg'),(32,'Vikesh','Kumar','vikeshraut952@gmail.com',9060294021,'$2b$10$8geZqffpaJjBNi2Zr8j1B.ZizAkDG7Llz79VjIYrvZZCq1pBuDA/W','./uploads/profileImg/32_20230129111929_png-transparent-desktop-computers-personal-computer-computer-icons-computer-monitors-computer-rectangle-computer-computer-monitor-accessory.png');
/*!40000 ALTER TABLE `userData` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-30 11:45:05
