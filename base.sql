CREATE DATABASE  IF NOT EXISTS `hospitales` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hospitales`;
-- MySQL dump 10.13  Distrib 8.0.24, for macos11 (x86_64)
--
-- Host: localhost    Database: hospitales
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idAdministrador` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(10) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `nombres` varchar(65) NOT NULL,
  `apellidos` varchar(65) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  `estado` tinyint DEFAULT '0',
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `idRegistro` int NOT NULL,
  `idActualizo` int DEFAULT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `direccion` varchar(45) NOT NULL,
  PRIMARY KEY (`idAdministrador`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'ricardo','430c2d2500741545d23adf3dbab843ea','Ricardo','Jumbo','df','0978667949','1104671738','hasdue.png',0,_binary '\0',1,NULL,'2022-04-04 00:29:11','2022-11-10 03:42:39',''),(2,'doctor 1','157337618af5c7e4b393eefabac3432a','Nombre','Apellido','correo','09876465781','110635476238','img.png',0,_binary '\0',1,NULL,'2022-04-14 01:06:10','2022-11-10 03:42:46',''),(3,'manolo','a8c4df245ee378c3a58e2591689e517e','Manuel','Armijos','manuel@gmail.com','09876465781','1105593233','img.png',0,_binary '',1,NULL,'2022-04-14 01:06:30','2022-11-10 03:43:21','Loja'),(4,'paciente1','2a660afdda0e8a30199787b33f5edc1f','Juan','Perez','paciente@gmail.com','09876465781','1106354762','img.png',0,_binary '\0',1,NULL,'2022-04-14 01:06:35','2022-11-10 03:42:31','centro de loja'),(5,'fdsg','afddas','dsf432','asdf','adsf','0990789','12123213',NULL,0,_binary '',1,NULL,'2022-04-19 01:07:28','2022-04-19 01:07:28',''),(6,'doctor','f55da9f7eb9326c6c899cc933ff2546b','aaaaaaa','aaaaaaa','doctor@gmail.com','aaaaaaaaaa','1111111111',NULL,0,_binary '\0',1,NULL,'2022-11-10 03:22:47','2022-11-10 03:42:35','aaaaaaa'),(7,'juan12','43db18b4a3bcbb6041f9142a9ca0ac62','Juan','Perez','juan@gmail.com','1212121212','1212121212',NULL,0,_binary '',1,NULL,'2022-11-10 03:44:33','2022-11-10 03:44:33','Loja');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrador_rol`
--

DROP TABLE IF EXISTS `administrador_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador_rol` (
  `idAdministrador` int NOT NULL,
  `idRol` int NOT NULL,
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `idRegistro` int NOT NULL,
  `idActualizo` int DEFAULT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idAdministrador`,`idRol`),
  KEY `fk_rol_idx` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador_rol`
--

LOCK TABLES `administrador_rol` WRITE;
/*!40000 ALTER TABLE `administrador_rol` DISABLE KEYS */;
INSERT INTO `administrador_rol` VALUES (1,1,_binary '',1,NULL,'2022-04-09 18:07:02','2022-04-11 01:26:51'),(1,2,_binary '',1,NULL,'2022-04-09 18:09:08','2022-04-09 23:34:02'),(1,3,_binary '\0',1,NULL,'2022-04-09 22:36:48','2022-04-09 23:21:07'),(2,2,_binary '',1,NULL,'2022-04-14 01:07:24','2022-04-14 01:07:24'),(3,1,_binary '',1,NULL,'2022-04-14 01:07:24','2022-11-10 03:43:21'),(4,3,_binary '',1,NULL,'2022-04-14 01:07:24','2022-11-09 02:00:59'),(6,2,_binary '',1,NULL,'2022-11-10 03:22:47','2022-11-10 03:22:47'),(7,2,_binary '',1,NULL,'2022-11-10 03:44:33','2022-11-10 03:44:33');
/*!40000 ALTER TABLE `administrador_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `idCita` bigint unsigned NOT NULL AUTO_INCREMENT,
  `idEspecialidad` int NOT NULL,
  `idPaciente` int NOT NULL,
  `idAdministrador` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `fraccion` time DEFAULT '00:30:00',
  `detalle` varchar(5000) DEFAULT NULL,
  `fecha` date NOT NULL,
  `anio` year DEFAULT NULL,
  `mes` tinyint(1) DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `id_cita_estado` int NOT NULL DEFAULT '1' COMMENT '1: registrado\n2: en proceso\n3: finalizado\n4: cancelado',
  `costo` double(10,2) DEFAULT '0.00',
  `receta` varchar(450) DEFAULT NULL,
  `lt` double(10,6) DEFAULT NULL,
  `lg` double(10,6) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_pago` datetime DEFAULT NULL COMMENT 'Fecha que se entrego la cita es la fecha que pago.',
  `fecha_cancelo` datetime DEFAULT NULL,
  `meta` json DEFAULT NULL,
  `habilitado` bit(1) DEFAULT b'1',
  PRIMARY KEY (`idCita`),
  KEY `fk_idEspecialidad_idx` (`idEspecialidad`),
  KEY `fk_idPaciente_idx` (`idPaciente`),
  KEY `fk_idAdministrador_idx` (`idAdministrador`),
  CONSTRAINT `fk_idAdministrador` FOREIGN KEY (`idAdministrador`) REFERENCES `administrador` (`idAdministrador`),
  CONSTRAINT `fk_idEspecialidad` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`idEspecialidad`),
  CONSTRAINT `fk_idPaciente` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`idPaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (10,1,1,1,'cita 2','01:00:00',NULL,'2022-11-09',NULL,NULL,'21:55:13',1,0.00,NULL,NULL,NULL,'2022-11-10 02:55:26',NULL,NULL,NULL,_binary ''),(11,4,6,1,'aaaa','01:00:00',NULL,'2022-11-10',NULL,NULL,'22:39:11',1,0.00,NULL,NULL,NULL,'2022-11-10 03:39:24',NULL,NULL,NULL,_binary ''),(12,1,6,3,'Cita Pedro','01:00:00',NULL,'2022-11-02',NULL,NULL,'22:17:52',1,0.00,NULL,NULL,NULL,'2022-11-11 03:18:14',NULL,NULL,NULL,_binary ''),(13,2,7,3,'cita Andrea','01:00:00',NULL,'2022-11-06',NULL,NULL,'22:17:52',1,0.00,NULL,NULL,NULL,'2022-11-11 03:18:46',NULL,NULL,NULL,_binary '');
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `id_ciudad` int NOT NULL AUTO_INCREMENT,
  `id_pais` int NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `codigo_area` varchar(5) NOT NULL,
  `lt` double(10,6) NOT NULL,
  `lg` double(10,6) NOT NULL,
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `id_registro` int NOT NULL,
  `id_actualizo` int DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_actualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_ciudad`),
  KEY `fk_ciudad__pais_idx` (`id_pais`),
  KEY `fk_ciudad__administradorRegistro_idx` (`id_registro`),
  KEY `fk_ciudad__administradorActualizo_idx` (`id_actualizo`),
  CONSTRAINT `fk_ciudad__administradorActualizo` FOREIGN KEY (`id_actualizo`) REFERENCES `administrador` (`idAdministrador`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_ciudad__administradorRegistro` FOREIGN KEY (`id_registro`) REFERENCES `administrador` (`idAdministrador`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_ciudad__pais` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,1,'Loja','1314',0.000000,0.000000,_binary '',1,NULL,'2022-04-09 23:29:35','2022-04-09 23:29:35');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `idEspecialidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(225) NOT NULL,
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `idRegistro` int DEFAULT NULL,
  `idActualizo` int DEFAULT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `color` varchar(45) NOT NULL DEFAULT 'indigo',
  PRIMARY KEY (`idEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'Medicina General','Medicina General',_binary '',1,NULL,'2022-04-09 23:18:28','2022-11-10 03:38:53','green'),(2,'Ginécologia','Ginécologia',_binary '',1,NULL,'2022-04-09 23:20:18','2022-04-09 23:20:18','indigo'),(3,'Pediatria','Pediatria',_binary '',1,NULL,'2022-04-09 23:21:25','2022-11-10 03:38:56','deep-purple'),(4,'Odontología','Odontología',_binary '',1,NULL,'2022-04-09 23:21:25','2022-11-10 03:39:02','orange');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo`
--

DROP TABLE IF EXISTS `modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulo` (
  `idModulo` int NOT NULL AUTO_INCREMENT,
  `modulo` varchar(45) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `vista` varchar(45) NOT NULL,
  `orden` tinyint(1) NOT NULL COMMENT 'orden en la que se muestra en el sistema web al cargar los modulo',
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `idAdministradorRegistro` int NOT NULL,
  `idAdministradorActualizo` int DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizo` datetime DEFAULT NULL,
  `icono` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idModulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COMMENT='modulos para admnistradores';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo`
--

LOCK TABLES `modulo` WRITE;
/*!40000 ALTER TABLE `modulo` DISABLE KEYS */;
INSERT INTO `modulo` VALUES (1,'Administrador','Gestion de Administradores','administrador',1,_binary '',1,NULL,'2022-04-09 22:08:41',NULL,'mdi-account'),(2,'Citas','Gestion de citas para doctores y pacientes','citas',5,_binary '',1,NULL,'2022-04-09 22:09:34',NULL,'mdi-calendar'),(3,'Especialidades','Gestion de especialiedades','especialidad',2,_binary '',1,NULL,'2022-04-09 22:19:58',NULL,'mdi-clipboard-check'),(4,'Pacientes','Gestion de pacientes','pacientes',3,_binary '',1,NULL,'2022-04-09 22:20:14',NULL,'mdi-account-check'),(5,'Doctores','Gestion de doctores','doctores',4,_binary '',1,NULL,'2022-04-09 22:20:39',NULL,'mdi-account-multiple');
/*!40000 ALTER TABLE `modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo_rol`
--

DROP TABLE IF EXISTS `modulo_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulo_rol` (
  `idModulo` int NOT NULL,
  `idRol` int NOT NULL,
  PRIMARY KEY (`idModulo`,`idRol`),
  KEY `fk_rol_idx` (`idRol`),
  CONSTRAINT `fk_modulo` FOREIGN KEY (`idModulo`) REFERENCES `modulo` (`idModulo`),
  CONSTRAINT `fk_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo_rol`
--

LOCK TABLES `modulo_rol` WRITE;
/*!40000 ALTER TABLE `modulo_rol` DISABLE KEYS */;
INSERT INTO `modulo_rol` VALUES (1,1),(2,1),(4,1),(1,2),(2,2),(4,2),(4,3),(4,4);
/*!40000 ALTER TABLE `modulo_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `idPaciente` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(10) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `nombres` varchar(65) NOT NULL,
  `apellidos` varchar(65) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  `estado` tinyint DEFAULT '0',
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `idRegistro` int NOT NULL,
  `idActualizo` int DEFAULT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `direccion` varchar(45) NOT NULL,
  PRIMARY KEY (`idPaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1,'pedro','pedro','Pedro pedriot','Armijos','pedro@gmail.com','09911817181','1109121212',NULL,1,_binary '\0',1,NULL,'2022-11-10 02:52:57','2022-11-10 03:36:22','centro de loja'),(6,'manuel','98170298b0b5a89f718f896d9de71da1','MANUEL','arijos','manuel@gmail.com','0912121212','1103121212',NULL,0,_binary '',1,NULL,'2022-11-10 03:21:01','2022-11-10 03:21:01','loja'),(7,'celena3','48aaf02a7002b6b533dd450e65a29978','celena es','armijos ma','cele3@gmail.com','0912121213','1212111113',NULL,0,_binary '',1,NULL,'2022-11-10 03:21:56','2022-11-10 03:31:10','carigan 3');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id_pais` int NOT NULL AUTO_INCREMENT,
  `pais` varchar(45) NOT NULL,
  `codigo` varchar(5) NOT NULL,
  `acronimo` varchar(5) NOT NULL,
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `id_registro` int NOT NULL,
  `id_actualizo` int DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_actualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pais`),
  KEY `fk_pais__administradorRegistro_idx` (`id_registro`),
  KEY `fk_pais__administradorActualizo_idx` (`id_actualizo`),
  CONSTRAINT `fk_pais__administradorActualizo` FOREIGN KEY (`id_actualizo`) REFERENCES `administrador` (`idAdministrador`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_pais__administradorRegistro` FOREIGN KEY (`id_registro`) REFERENCES `administrador` (`idAdministrador`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Ecuador','+593','EC',_binary '',1,NULL,'2022-04-09 23:29:07','2022-04-09 23:29:07');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(45) NOT NULL,
  `descripcion` varchar(450) DEFAULT NULL,
  `habilitado` bit(1) NOT NULL DEFAULT b'1',
  `idRegistro` int NOT NULL DEFAULT '1',
  `idActualizo` int DEFAULT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fechaActualizo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRol`),
  KEY `fk_rol__administradorRegistro_idx` (`idRegistro`),
  KEY `fk_rol__administradorActualizo_idx` (`idActualizo`),
  CONSTRAINT `fk_rol__administradorActualizo` FOREIGN KEY (`idActualizo`) REFERENCES `administrador` (`idAdministrador`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_rol__administradorRegistro` FOREIGN KEY (`idRegistro`) REFERENCES `administrador` (`idAdministrador`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador',NULL,_binary '',1,NULL,'2022-04-09 18:06:10','2022-04-09 18:06:10'),(2,'Doctor',NULL,_binary '',1,NULL,'2022-04-09 18:12:16','2022-04-09 18:12:16'),(3,'Enfermero',NULL,_binary '',1,NULL,'2022-11-09 02:03:35','2022-11-09 02:03:35'),(4,'Auditor',NULL,_binary '',1,NULL,'2022-04-09 22:21:58','2022-04-09 22:21:58');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-10 23:40:17
