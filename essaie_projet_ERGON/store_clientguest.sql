-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 25 sep. 2023 à 16:44
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_ergon1`
--

-- --------------------------------------------------------

--
-- Structure de la table `store_clientguest`
--

DROP TABLE IF EXISTS `store_clientguest`;
CREATE TABLE IF NOT EXISTS `store_clientguest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `contact` int UNSIGNED NOT NULL,
  `rdv` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- Déchargement des données de la table `store_clientguest`
--

INSERT INTO `store_clientguest` (`id`, `nom`, `prenom`, `contact`, `rdv`) VALUES
(4, 'zd', 'dd', 32, '2023-09-23 00:00:00.000000'),
(2, 'Client 2', 'prenom 2', 34, '2023-09-30 00:00:00.000000'),
(3, 'Client 3', 'prenom 3', 32, '2023-09-16 00:00:00.000000'),
(5, 'Diams', 'Ny Aina', 32, '2023-04-21 00:00:00.000000'),
(6, 'Diams', 'Ny Aina', 32, '2023-04-21 00:00:00.000000'),
(7, 'Dylan', 'Mickael', 33, '2023-04-25 00:00:00.000000'),
(8, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(9, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(10, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(11, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(12, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(13, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(14, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(15, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(16, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(17, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(18, 'Nom 1', 'Prenom 1', 32, '2023-02-14 00:00:00.000000'),
(19, 'Diamondra', 'Ny', 34, '2023-11-14 00:00:00.000000'),
(20, 'Nom 2', 'Prenom 2', 33, '2023-02-14 00:00:00.000000'),
(21, 'Nom 3', 'Prenom 3', 32, '2023-05-05 00:00:00.000000'),
(22, 'Nom 4', 'Prenom 4', 32, '2023-02-17 00:00:00.000000'),
(23, 'd', 'p', 33, '2023-01-21 00:00:00.000000'),
(24, 'Nom 4', 'prenom 4', 33, '2023-07-10 00:00:00.000000'),
(25, 'd', 'p', 31, '2023-12-02 00:00:00.000000'),
(26, 'e', 's', 2, '2023-12-14 00:00:00.000000'),
(27, 'b', 'p', 42, '2023-12-02 00:00:00.000000'),
(28, 'Diamondra', 'Ny Aina', 38, '2023-07-10 00:00:00.000000'),
(29, 'Di', 'Ny', 38, '2023-11-14 00:00:00.000000'),
(30, 'Fy', 'Ny', 38, '2023-08-21 00:00:00.000000'),
(31, 'Fy', 'ta', 32, '2023-10-04 00:00:00.000000'),
(32, 'f', 'e', 54, '2023-01-14 00:00:00.000000'),
(33, 'hey', 'hey', 2222, '2023-10-08 00:00:00.000000'),
(34, 'hey', 'hey', 2222, '2023-10-08 00:00:00.000000'),
(35, 'John', 'Doe', 222, '2023-09-30 00:00:00.000000'),
(36, 'dd', 'dd', 4444, NULL),
(37, 'dd', 'ee', 55, NULL),
(38, 'hello', 'hi', 4444, NULL),
(39, 'd', 'ee', 5555, NULL),
(40, 'ttt', 'rrr', 7777, '2022-02-02 00:00:00.000000'),
(41, 'tyy', 'yy', 4566, '2020-02-02 00:00:00.000000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
