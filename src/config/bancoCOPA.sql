-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para chaveamentocopa
DROP DATABASE IF EXISTS `chaveamentocopa`;
CREATE DATABASE IF NOT EXISTS `chaveamentocopa` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `chaveamentocopa`;

-- Copiando estrutura para tabela chaveamentocopa.grupos
DROP TABLE IF EXISTS `grupos`;
CREATE TABLE IF NOT EXISTS `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela chaveamentocopa.grupos: ~0 rows (aproximadamente)
DELETE FROM `grupos`;
INSERT INTO `grupos` (`id`, `descricao`) VALUES
	(1, 'Grupo A'),
	(2, 'Grupo B'),
	(3, 'Grupo C'),
	(4, 'Grupo D'),
	(5, 'Grupo E'),
	(6, 'Grupo F'),
	(7, 'teste');

-- Copiando estrutura para tabela chaveamentocopa.grupos_selecoes
DROP TABLE IF EXISTS `grupos_selecoes`;
CREATE TABLE IF NOT EXISTS `grupos_selecoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `id_selecao` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `grupo` (`id_grupo`),
  KEY `selecao` (`id_selecao`),
  CONSTRAINT `grupo` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `selecao` FOREIGN KEY (`id_selecao`) REFERENCES `selecoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela chaveamentocopa.grupos_selecoes: ~0 rows (aproximadamente)
DELETE FROM `grupos_selecoes`;
INSERT INTO `grupos_selecoes` (`id`, `id_grupo`, `id_selecao`) VALUES
	(14, 1, 1),
	(15, 1, 2),
	(16, 1, 3),
	(17, 1, 4),
	(18, 2, 5),
	(19, 2, 6),
	(20, 2, 7),
	(21, 2, 8),
	(22, 3, 9),
	(23, 3, 10),
	(24, 3, 11),
	(25, 3, 12),
	(26, 4, 13),
	(27, 4, 14),
	(28, 4, 15),
	(29, 4, 16),
	(30, 5, 17),
	(31, 5, 18),
	(32, 5, 19),
	(33, 5, 20),
	(34, 6, 21),
	(35, 6, 22),
	(36, 6, 23),
	(37, 6, 24),
	(38, 7, 25);

-- Copiando estrutura para tabela chaveamentocopa.jogos
DROP TABLE IF EXISTS `jogos`;
CREATE TABLE IF NOT EXISTS `jogos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `selecao_A` int(11) NOT NULL DEFAULT 0,
  `selecao_B` int(11) NOT NULL DEFAULT 0,
  `data_hora` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `A` (`selecao_A`),
  KEY `B` (`selecao_B`),
  CONSTRAINT `A` FOREIGN KEY (`selecao_A`) REFERENCES `selecoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `B` FOREIGN KEY (`selecao_B`) REFERENCES `selecoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela chaveamentocopa.jogos: ~0 rows (aproximadamente)
DELETE FROM `jogos`;
INSERT INTO `jogos` (`id`, `selecao_A`, `selecao_B`, `data_hora`) VALUES
	(1, 1, 2, '2026-06-11 16:00:00'),
	(2, 3, 4, '2026-06-11 20:00:00'),
	(3, 1, 3, '2026-06-15 16:00:00'),
	(4, 2, 4, '2026-06-15 20:00:00'),
	(5, 5, 6, '2026-06-12 16:00:00'),
	(6, 7, 8, '2026-06-12 20:00:00'),
	(7, 5, 7, '2026-06-16 16:00:00'),
	(8, 6, 8, '2026-06-16 20:00:00'),
	(9, 9, 10, '2026-06-13 16:00:00'),
	(10, 11, 12, '2026-06-13 20:00:00'),
	(11, 13, 14, '2026-06-14 16:00:00'),
	(12, 15, 16, '2026-06-14 20:00:00'),
	(13, 17, 18, '2026-06-17 16:00:00'),
	(14, 19, 20, '2026-06-17 20:00:00'),
	(15, 21, 22, '2026-06-18 16:00:00'),
	(16, 23, 24, '2026-06-18 20:00:00'),
	(17, 25, 1, '2026-05-21 17:20:00');

-- Copiando estrutura para tabela chaveamentocopa.selecoes
DROP TABLE IF EXISTS `selecoes`;
CREATE TABLE IF NOT EXISTS `selecoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela chaveamentocopa.selecoes: ~0 rows (aproximadamente)
DELETE FROM `selecoes`;
INSERT INTO `selecoes` (`id`, `nome`) VALUES
	(1, 'Brasil'),
	(2, 'Argentina'),
	(3, 'França'),
	(4, 'Alemanha'),
	(5, 'Espanha'),
	(6, 'Portugal'),
	(7, 'Inglaterra'),
	(8, 'Uruguai'),
	(9, 'Croácia'),
	(10, 'Bélgica'),
	(11, 'Holanda'),
	(12, 'México'),
	(13, 'Estados Unidos'),
	(14, 'Canadá'),
	(15, 'Japão'),
	(16, 'Coreia do Sul'),
	(17, 'Marrocos'),
	(18, 'Senegal'),
	(19, 'Nigéria'),
	(20, 'Camarões'),
	(21, 'Austrália'),
	(22, 'Irã'),
	(23, 'Arábia Saudita'),
	(24, 'Sérvia'),
	(25, 'Testando');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
