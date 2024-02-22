-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: alma
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `nome_completo` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `data_nacimento` varchar(255) DEFAULT NULL,
  `interesse` varchar(255) DEFAULT NULL,
  `signo` varchar(255) DEFAULT NULL,
  `token_recuperacao_senha` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT 'Create Time',
  `update_time` varchar(255) DEFAULT NULL,
  `retrato_preto` tinyint(1) DEFAULT '1',
  `retrato_colorido` tinyint(1) DEFAULT '0',
  `envio_imediato` tinyint(1) DEFAULT '0',
  `informacoes_alma` tinyint(1) DEFAULT '0',
  `nome` varchar(100) DEFAULT NULL,
  `estado_civil` varchar(100) DEFAULT NULL,
  `horario_nacimento` varchar(100) DEFAULT NULL,
  `sexo` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataVenda` datetime DEFAULT NULL,
  `url_img` varchar(100) DEFAULT NULL,
  `informacoes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (28,'andrealessi89@gmail.com','$2b$10$yskh9royfLR.g.IpA6la8.jz8I.oksmm6ODM4rGO2ttTKNUGga/pC','Mercedes Lucrecia gutmann d','573185067504','2024-02-15','mulher','gemeos',NULL,NULL,NULL,1,0,0,0,'teste','solteira',NULL,'masculino','2024-02-21 04:53:57','2024-02-21 01:53:57','1289mulherColorida.jpeg','{\"signo\":\"Tauro\",\"gradosDeEscolaridad\":\"Grado universitario\",\"religion\":\"Cristianismo\",\"rasgosPositivos\":\"Compasivo\",\"generosMusicales\":\"Country\",\"gustosCulinarios\":\"Comida griega\",\"deportesFavoritos\":\"Yoga\",\"percepcionRelacionIdeal\":\"Pienso que en un relación ideal, cada uno puede tener su propio espacio y tiempo para sí mismo cuando lo necesite.\"}');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_envio_imediato`
--

DROP TABLE IF EXISTS `venda_envio_imediato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_envio_imediato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `actived` tinyint DEFAULT '0',
  `info` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataVenda` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_envio_imediato`
--

LOCK TABLES `venda_envio_imediato` WRITE;
/*!40000 ALTER TABLE `venda_envio_imediato` DISABLE KEYS */;
INSERT INTO `venda_envio_imediato` VALUES (5,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-21 04:18:08','2024-02-21 01:18:08'),(6,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-21 04:54:46','2024-02-21 01:54:46');
/*!40000 ALTER TABLE `venda_envio_imediato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_informacoes_alma`
--

DROP TABLE IF EXISTS `venda_informacoes_alma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_informacoes_alma` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `actived` tinyint DEFAULT '0',
  `info` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataVenda` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_informacoes_alma`
--

LOCK TABLES `venda_informacoes_alma` WRITE;
/*!40000 ALTER TABLE `venda_informacoes_alma` DISABLE KEYS */;
INSERT INTO `venda_informacoes_alma` VALUES (12,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-21 04:18:04','2024-02-21 01:18:04'),(13,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-21 04:54:31','2024-02-21 01:54:31');
/*!40000 ALTER TABLE `venda_informacoes_alma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_retrato_colorido`
--

DROP TABLE IF EXISTS `venda_retrato_colorido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_retrato_colorido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `actived` tinyint DEFAULT '0',
  `info` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataVenda` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_retrato_colorido`
--

LOCK TABLES `venda_retrato_colorido` WRITE;
/*!40000 ALTER TABLE `venda_retrato_colorido` DISABLE KEYS */;
INSERT INTO `venda_retrato_colorido` VALUES (21,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-21 04:54:19','2024-02-21 01:54:19');
/*!40000 ALTER TABLE `venda_retrato_colorido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_retrato_preto`
--

DROP TABLE IF EXISTS `venda_retrato_preto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_retrato_preto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `actived` tinyint DEFAULT '0',
  `info` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dataVenda` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_retrato_preto`
--

LOCK TABLES `venda_retrato_preto` WRITE;
/*!40000 ALTER TABLE `venda_retrato_preto` DISABLE KEYS */;
INSERT INTO `venda_retrato_preto` VALUES (16,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-21 04:53:57','2024-02-21 01:53:57'),(17,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL,'2024-02-22 00:48:45','2024-02-21 21:48:45');
/*!40000 ALTER TABLE `venda_retrato_preto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'alma'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-21 22:41:51
