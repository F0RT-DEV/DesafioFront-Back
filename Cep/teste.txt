-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inet
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema inet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inet` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `inet` ;

-- -----------------------------------------------------
-- Table `inet`.`fotos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inet`.`fotos` (
  `id_fotos` INT(11) NOT NULL AUTO_INCREMENT,
  `caminho` VARCHAR(255) NOT NULL,
  `alternativo` VARCHAR(255) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_fotos`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inet`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inet`.`login` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `cpf` INT(11) NOT NULL,
  `email` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `senha` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  `cep` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `inet`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inet`.`pessoa` (
  `id_pessoa` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_pessoa`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `inet`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inet`.`produtos` (
  `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `inet`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inet`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  `usuario` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo` CHAR(30) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
