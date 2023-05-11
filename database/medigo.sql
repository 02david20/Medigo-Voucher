-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2023 at 11:28 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medigo`
--

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`state_id`, `value`) VALUES
(1, 'ACTIVE'),
(2, 'INACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `password`) VALUES
(1, 'david', '123456'),
(3, 'string', 'string'),
(4, 'david_test', '123'),
(6, 'david_test_1', '123'),
(7, 'david_test_2', 'haha123'),
(8, 'david_test_3', 'haha123'),
(10, 'david_test_4', '$2a$10$/7RN5NwHzH4NJ'),
(11, 'david_test_5', '$2a$10$qO0JFqMgehktmHeUDW2GO.eJG4sHEVWFsbWEeslL5YuSNs/QexxUO');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `voucher_id` int(11) NOT NULL,
  `kind` varchar(100) NOT NULL,
  `code` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `maxUse` int(11) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`voucher_id`, `kind`, `code`, `start_date`, `end_date`, `create_at`, `maxUse`, `state`) VALUES
(1005, 'Medicines', 'Product01', '2019-07-04 00:00:00', '2019-07-04 00:00:00', '2023-05-08 13:45:02', 22, 1),
(1006, 'Medicine', 'Product02', '2019-07-04 00:00:00', '2019-07-04 00:00:00', '2023-05-08 13:45:04', 1, 2),
(1009, 'Medicine', 'Product001', '2021-10-17 22:09:07', '2021-10-18 22:09:07', '2023-05-08 17:47:11', 1, 2),
(1010, 'Product', 'Product002', '2021-10-03 01:06:07', '2021-10-18 19:06:07', '2023-05-08 17:48:03', 3, 2),
(1011, 'Medicine', 'Product003', '2021-10-03 22:06:07', '2021-10-03 22:06:07', '2023-05-09 11:30:49', 22, 1),
(1012, 'haha123', 'hahahahahaha', '2021-10-19 22:09:07', '2021-10-18 22:10:07', '2023-05-11 14:53:50', 123, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`voucher_id`),
  ADD UNIQUE KEY `code` (`code`) USING HASH,
  ADD KEY `state_foreign_constraint` (`state`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `voucher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1013;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `voucher`
--
ALTER TABLE `voucher`
  ADD CONSTRAINT `state_foreign_constraint` FOREIGN KEY (`state`) REFERENCES `state` (`state_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
