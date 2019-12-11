-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: store
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'drill','Dewalt Drill 18V 1',20),(2,'drill','Dewalt Drill 18V 1',18),(3,'laminate','Natural Oak Laminate',33.03),(4,'sanders','Mac Allister Corded 160W',20),(5,'wallpaper','GoodHome Ornata Midnight Wallpaper',16);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products_in_stock`
--

LOCK TABLES `products_in_stock` WRITE;
/*!40000 ALTER TABLE `products_in_stock` DISABLE KEYS */;
INSERT INTO `products_in_stock` VALUES (1,1,1,'December 17, 2019','December 18, 2019'),(2,1,2,'December 15, 2019','December 20, 2019'),(3,2,3,'December 5, 2019','December 5, 2019'),(4,3,4,'December 6, 2019','December 8, 2019'),(5,3,5,'December 8, 2019','December 10, 2019'),(6,4,5,'December 10, 2019','December 20, 2019'),(7,5,2,'December 1, 2019','December 3, 2019');
/*!40000 ALTER TABLE `products_in_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `warehouses`
--

LOCK TABLES `warehouses` WRITE;
/*!40000 ALTER TABLE `warehouses` DISABLE KEYS */;
INSERT INTO `warehouses` VALUES (1,'WAREHOUSE ADDRESS 1'),(2,'WAREHOUSE ADDRESS 2'),(3,'WAREHOUSE ADDRESS 3'),(4,'WAREHOUSE ADDRESS 4'),(5,'WAREHOUSE ADDRESS 5');
/*!40000 ALTER TABLE `warehouses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-14 20:52:09
