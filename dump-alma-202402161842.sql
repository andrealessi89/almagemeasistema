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
  `retrato_colorido` tinyint(1) DEFAULT '0',
  `envio_imediato` tinyint(1) DEFAULT '0',
  `informacoes_alma` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'repolho','$2b$10$2dXCt4nT.Wa6IE76TIJcU.h/x.U1O8zuUXKKSkE65sX3ISFKjCmB2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0),(8,'andrealessi89@gmail.com','$2b$10$8MYXUn97eAq1E.n4R9ofuOKIexLO92EmZsY9VKUyGOdi01fVdLpG.','Mercedes Lucrecia gutmann d','573185067504',NULL,NULL,NULL,NULL,NULL,NULL,1,0,0);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_envio_imediato`
--

LOCK TABLES `venda_envio_imediato` WRITE;
/*!40000 ALTER TABLE `venda_envio_imediato` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_informacoes_alma`
--

LOCK TABLES `venda_informacoes_alma` WRITE;
/*!40000 ALTER TABLE `venda_informacoes_alma` DISABLE KEYS */;
/*!40000 ALTER TABLE `venda_informacoes_alma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_produto_principal`
--

DROP TABLE IF EXISTS `venda_produto_principal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_produto_principal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `actived` tinyint DEFAULT '0',
  `info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_produto_principal`
--

LOCK TABLES `venda_produto_principal` WRITE;
/*!40000 ALTER TABLE `venda_produto_principal` DISABLE KEYS */;
/*!40000 ALTER TABLE `venda_produto_principal` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_retrato_colorido`
--

LOCK TABLES `venda_retrato_colorido` WRITE;
/*!40000 ALTER TABLE `venda_retrato_colorido` DISABLE KEYS */;
INSERT INTO `venda_retrato_colorido` VALUES (1,NULL,'Mercedes Lucrecia gutmann d','mercedeslucreciagutmanndiaz@gmail.com',1,NULL),(2,NULL,'Mercedes Lucrecia gutmann d','mercedeslucreciagutmanndiaz@gmail.com',1,NULL),(5,NULL,'Mercedes Lucrecia gutmann d','andrealessi89@gmail.com',1,NULL);
/*!40000 ALTER TABLE `venda_retrato_colorido` ENABLE KEYS */;
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

-- Dump completed on 2024-02-16 18:42:53
