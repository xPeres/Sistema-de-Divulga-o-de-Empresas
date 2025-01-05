CREATE DATABASE IF NOT EXISTS `maze store`;
USE `maze store`;

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `senha` text DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `numero` varchar(25) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT 'usuario',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Empresas` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `endereco` text DEFAULT NULl,
  `estrelas` int(1) DEFAULT 5,
  `avaliacoes` int(20) DEFAULT 0,
  `foto` text DEFAULT NULL,
  `numero` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Produtos` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descP` text DEFAULT NULL,
  `valor` int(20) DEFAULT NULl,
  `lojaID` int(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1 COLLATE=utf8mb4_general_ci;