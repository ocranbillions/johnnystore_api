DROP TABLE IF EXISTS `JohnnyOrderLog`; 
DROP TABLE IF EXISTS `JohnnyPaymentLog`;
DROP TABLE IF EXISTS `JohnnySku`; 
DROP TABLE IF EXISTS `JohnnyEmployee`; 

CREATE TABLE `JohnnyEmployee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL, 
  `isAdmin` BOOLEAN NOT NULL DEFAULT 0, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JohnnySku` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JohnnyOrderLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_created` datetime NOT NULL,
  `employeeId` int(11) NOT NULL, /* JohnnyEmployee */
  `skuId` int(11) NOT NULL, /* JohnnySku */
  `quantity` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `paidInBox`  int(11) NULL, /* JohnnyPaymentLog */
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JohnnyPaymentLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_created` datetime NOT NULL, 
  `employeeId` int(11) NOT NULL, /* JohnnyEmployee */
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `JohnnyOrderLog`
  ADD CONSTRAINT `JohnnyOrderLog_employeeId_JohnnyEmployee_id` FOREIGN KEY (`employeeId`) REFERENCES `JohnnyEmployee` (`id`) ON DELETE CASCADE on UPDATE CASCADE,
  ADD CONSTRAINT `JohnnyOrderLog_skuId_JohnnySku_id` FOREIGN KEY (`skuId`) REFERENCES `JohnnySku` (`id`) ON DELETE CASCADE on UPDATE CASCADE,
  ADD CONSTRAINT `JohnnyOrderLog_paidInBox_JohnnyPaymentLog_id` FOREIGN KEY (`paidInBox`) REFERENCES `JohnnyPaymentLog` (`id`) ON DELETE CASCADE on UPDATE CASCADE;

ALTER TABLE `JohnnyPaymentLog`
  ADD CONSTRAINT `JohnnyPaymentLog_employeeId_JohnnyEmployee_id` FOREIGN KEY (`employeeId`) REFERENCES `JohnnyEmployee` (`id`) ON DELETE CASCADE on UPDATE CASCADE;

/* SEEDED USERS' PASSWORD = pass123 */
INSERT INTO `JohnnyEmployee` (`id`, `name`, `email`, `password`, `isAdmin`) VALUES
(77, "AdminUser", "admin@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", true),
(1, "Adrien", "adrien@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(2, "Alexis", "alexis@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(3, "Alicia", "alicia@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(4, "Anaïs", "anais@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(5, "Andréane", "andreane@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(6, "Annabelle", "annabelle@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(7, "Anthony", "anthony@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(8, "Anthony", "tony@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(9, "Aurore", "aurore@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(10,	"Benoît", "ben@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(11,	"Benoit", "benoit@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(12,	"Brice", "brice@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(13,	"Caroline", "caroline@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(14,	"Chantal", "chantal@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(15,	"Claire", "claire@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(16,	"Claudine", "claudine@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(17,	"Diane", "diane@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(18,	"Dickson", "dickson@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(19,	"Dorine", "dorine@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(20,	"Edern", "edern@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(21,	"Eduard", "eduard@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(22,	"Enrica", "enrica@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(23,	"Étienne", "etienne@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(24,	"Fabien", "fabien@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(25,	"Félix", "felix@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(26,	"Gaëlle", "gaelle@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(27,	"Geneviève", "genny@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(28,	"Guillaume", "guill@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(29,	"Guillaume", "guillaume@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(30,	"Hugo", "hugo@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(31,	"Jérémy", "jeremy@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(32,	"Judith", "judith@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(33,	"Kaitlyn", "kaitlyn@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(34,	"Kimberley", "kimberly@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(35,	"Kim", "kim@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(36,	"Kym", "kym@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(37,	"Lili-Rose", "lili@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(38,	"Lucia", "lucia@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(39,	"Lucie", "lucie@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(40,	"Lucile", "lucile@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(41,	"Mabel", "mabel@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(42,	"Maïté", "maite@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(43,	"Marc", "marc@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(44,	"Marc", "mc@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(45,	"Marie-Pier", "marie@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(46,	"Marlène", "marlene@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(47,	"Martin", "martin@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(48,	"Martin", "mart@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(49,	"Mathieu", "math@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(50,	"Mathilde", "mathilde@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(51,	"Michel", "michel@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(52,	"Mounir", "mounir@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(53,	"Nicolas", "nicolas@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(54,	"Nicolas", "nicol@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(55,	"PABirtz", "pabirtz@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(56,	"Paige", "paige@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(57,	"Patrice", "patrice@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(58,	"Phil", "phil@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(59,	"Pierre", "pierre@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(60,	"Roger", "roger@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(61,	"Romain", "romain@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(62,	"Samuel", "samuel@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(63,	"Samuel", "sam@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(64,	"Saira", "saira@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(65,	"Sara", "sara@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(66,	"Sébastien", "sebastien@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(67,	"Sevan", "sevan@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(68,	"Simon", "simon@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(69,	"Simon", "ceemon@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(70,	"Simon", "smon@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(71,	"Soufana", "soufana@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(72,	"Stéphanie", "stephanie@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(73,	"Valentin", "valentin@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(74,	"Valérie", "valerie@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(75,	"Victor", "victor@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false),
(76,	"Xavier", "xavier@gmail.com", "$2a$10$crAXT./bH/.a2L70HaHJ5.E/g2Tnkf/UwcnHVP5d35JwedeX3bogy", false);

INSERT INTO `JohnnySku` (`id`, `name`, `price`, `stock`) VALUES
(1,	"Fromage",	50, 30),
(2,	"Yogourt",	100, 30),
(3,	"Granola",	75, 30),
(4,	"Jus Oasis",	75, 30),
(5,	"Natura",	75, 30),
(6,	"Perrier",	100, 30),
(7,	"Liqueur (coke..)",	100, 30),
(8,	"7up",	100, 30),
(9,	"Coke",	100, 30),
(10,	"Aero",	125, 30),
(11,	"San Pellegrino",	100, 30),
(12,	"San Pellegrino - Citron",	100, 30),
(13,	"San Pellegrino - Pomegranate",	100, 30),
(14,	"Arizona",	150, 30),
(15,	"Vita Coconut",	175, 30),
(16,	"Gatorade",	100, 30),
(17,	"Chips",	50, 30),
(18,	"Chips - Lays",	50, 30),
(19,	"Chips - Ruffles",	50, 30),
(20,	"Chips - Doritos",	50, 30),
(21,	"Ritz snacks",	50, 30),
(22,	"Garder Veggie Snacks",	75, 30),
(23,	"Snapea peas",	75, 30),
(24,	"PopCorners",	75, 30),
(25,	"Amandes Blue Diamond",	125, 30),
(26,	"Ramen Noodles",	150, 30),
(27,	"Barre Quaker Chewy",	50, 30),
(28,	"True to nature",	75, 30),
(29,	"Barres chocolat",	125, 30),
(30,	"KitKat",	125, 30),
(31,	"Coffee Crisp",	125, 30),
(32,	"Smarties",	125, 30),
(33,	"Oh Henry!",	125, 30),
(34,	"Clif Bar",	125, 30),
(35,	"Clif Organic Trail Mix Bar",	150, 30),
(36,	"Clif Builder's",	150, 30),
(37,	"Smart for life",	150, 30),
(38,	"Bio Protein",	200, 30),
(39,	"Barre Glutino",	100, 30),
(40,	"Dad's Biscuits",	50, 30),
(41,	"Pattes d'Ours",	50, 30),
(42,	"Quaker Gruau",	50, 30),
(43,	"Fig Bar / Barre aux figues",	75, 30),
(44,	"Mott's Fruitsations",	100, 30),
(45,	"Applesnax",	50, 30),
(46,	"Sachet jujubes Maynards",	125, 30),
(47,	"Kinder Suprise",	100, 30),
(48,	"Nutella&GO",	200, 30),
(49,	"Sesame Snaps",	50, 30),
(50,	"Thinsations",	50, 30),
(51,	"Welch Ice (congélateur)",	50, 30),
(52,	"Gommes Excel/Dentyne",	100, 30),
(53,	"Excel Menthes",	200, 30),
(54,	"Compote",	50, 30),
(55,	"Babybel",	50, 30),
(56,	"Smarties",	125, 30),
(57,	"Jus rougemont",	50, 30),
(58,	"pop tarts",	125, 30),
(59,	"Mini Chips Ahoy",	75, 0),
(60,	"Pop Corn",	100, 30);

INSERT INTO `JohnnyOrderLog` (`id`, `time_created`, `employeeId`, `skuId`, `quantity`, `totalPrice`) VALUES
(100,	'2019-09-01 10:30:00',	2,	30,	1,	125),
(101,	'2019-09-01 10:30:00',	51,	17,	1,	50),
(102,	'2019-09-01 10:30:00',	6,	17,	1,	50),
(103,	'2019-09-01 10:30:00',	29,	16,	1,	100),
(104,	'2019-09-01 10:30:00',	28,	17,	1,	50),
(105,	'2019-09-01 10:30:00',	22,	43,	1,	75),
(106,	'2019-09-01 10:30:00',	75,	11,	1,	100),
(107,	'2019-09-01 10:30:00',	33,	43,	1,	75),
(108,	'2019-09-01 10:30:00',	48,	20,	1,	50),
(109,	'2019-09-01 10:30:00',	61,	8,	1,	100),
(110,	'2019-09-01 10:30:00',	29,	6,	1,	100),
(111,	'2019-09-01 10:30:00',	73,	11,	1,	100),
(112,	'2019-09-01 10:30:00',	31,	8,	1,	100),
(113,	'2019-09-01 10:30:00',	2,	32,	1,	125),
(114,	'2019-09-02 10:30:00',	7,	29,	1,	125),
(115,	'2019-09-02 10:30:00',	61,	3,	1,	75),
(116,	'2019-09-02 10:30:00',	64,	3,	1,	75),
(117,	'2019-09-02 10:30:00',	29,	3,	1,	75),
(118,	'2019-09-02 10:30:00',	44,	14,	1,	0),
(119,	'2019-09-02 10:30:00',	47,	41,	2,	50),
(120,	'2019-09-02 10:30:00',	47,	31,	1,	125),
(121,	'2019-09-02 10:30:00',	24,	31,	1,	125),
(122,	'2019-09-02 10:30:00',	40,	31,	1,	125),
(123,	'2019-09-02 10:30:00',	22,	42,	1,	50),
(124,	'2019-09-02 10:30:00',	29,	3,	1,	75),
(125,	'2019-09-02 10:30:00',	39,	59,	1,	75),
(126,	'2019-09-03 10:30:00',	5,	31,	1,	125),
(127,	'2019-09-03 10:30:00',	54,	14,	1,	150),
(128,	'2019-09-03 10:30:00',	2,	30,	1,	125),
(129,	'2019-09-03 10:30:00',	50,	6,	1,	100),
(130,	'2019-09-03 10:30:00',	44,	17,	6,	50),
(131,	'2019-09-03 10:30:00',	5,	49,	1,	50),
(132,	'2019-09-03 10:30:00',	47,	41,	2,	50),
(133,	'2019-09-03 10:30:00',	29,	16,	1,	100),
(134,	'2019-09-03 10:30:00',	15,	40,	1,	0),
(135,	'2019-09-03 10:30:00',	8,	30,	1,	125),
(136,	'2019-09-04 10:30:00',	8,	3,	1,	75),
(137,	'2019-09-04 10:30:00',	2,	30,	1,	125),
(138,	'2019-09-04 10:30:00',	73,	30,	1,	125),
(139,	'2019-09-04 10:30:00',	29,	3,	1,	75),
(140,	'2019-09-04 10:30:00',	2,	30,	1,	125),
(141,	'2019-09-04 10:30:00',	15,	17,	1,	50),
(142,	'2019-09-04 10:30:00',	31,	41,	2,	50),
(143,	'2019-09-04 10:30:00',	12,	41,	4,	100),
(144,	'2019-09-04 10:30:00',	39,	54,	1,	50),
(145,	'2019-09-04 10:30:00',	48,	31,	1,	125),
(146,	'2019-09-04 10:30:00',	50,	6,	2,	100),
(147,	'2019-09-04 10:30:00',	17,	10,	1,	125),
(148,	'2019-09-05 10:30:00',	17,	32,	1,	125),
(149,	'2019-09-05 10:30:00',	5,	31,	1,	125),
(150,	'2019-09-05 10:30:00',	51,	16,	1,	100),
(151,	'2019-09-05 10:30:00',	29,	6,	1,	100),
(152,	'2019-09-05 10:30:00',	5,	10,	1,	125),
(153,	'2019-09-05 10:30:00',	2,	3,	2,	75),
(154,	'2019-09-05 10:30:00',	19,	20,	1,	50),
(155,	'2019-09-05 10:30:00',	51,	17,	1,	50),
(156,	'2019-09-06 10:30:00',	2,	3,	2,	75),
(157,	'2019-09-07 10:30:00',	33,	35,	1,	150),
(158,	'2019-09-07 10:30:00',	73,	60,	1,	100),
(159,	'2019-09-07 10:30:00',	39,	10,	2,	125),
(160,	'2019-09-07 10:30:00',	73,	60,	1,	100),
(161,	'2019-09-07 10:30:00',	8,	29,	1,	125),
(162,	'2019-09-07 10:30:00',	9,	29,	1,	125),
(163,	'2019-09-07 10:30:00',	64,	3,	1,	75),
(164,	'2019-09-07 10:30:00',	48,	31,	1,	125),
(165,	'2019-09-07 10:30:00',	29,	3,	1,	75),
(166,	'2019-09-07 10:30:00',	17,	17,	1,	50),
(167,	'2019-09-08 10:30:00',	8,	9,	1,	100),
(168,	'2019-09-08 10:30:00',	47,	9,	1,	100),
(169,	'2019-09-08 10:30:00',	31,	9,	1,	100),
(170,	'2019-09-08 10:30:00',	48,	20,	4,	50),
(171,	'2019-09-08 10:30:00',	9,	29,	1,	125),
(172,	'2019-09-08 10:30:00',	2,	30,	1,	125),
(173,	'2019-09-08 10:30:00',	19,	30,	1,	125),
(174,	'2019-09-08 10:30:00',	39,	32,	1,	125),
(175,	'2019-09-08 10:30:00',	22,	30,	1,	125),
(176,	'2019-09-08 10:30:00',	44,	17,	6,	50),
(177,	'2019-09-09 10:30:00',	35,	43,	1,	75),
(178,	'2019-09-09 10:30:00',	71,	17,	1,	50),
(179,	'2019-09-09 10:30:00',	17,	30,	2,	125),
(180,	'2019-09-09 10:30:00',	24,	31,	1,	125),
(181,	'2019-09-09 10:30:00',	51,	17,	1,	50),
(182,	'2019-09-09 10:30:00',	2,	43,	2,	75),
(183,	'2019-09-09 10:30:00',	29,	16,	1,	100),
(184,	'2019-09-09 10:30:00',	50,	44,	1,	100),
(185,	'2019-09-09 10:30:00',	19,	32,	1,	125),
(186,	'2019-09-09 10:30:00',	19,	9,	1,	100),
(187,	'2019-09-09 10:30:00',	68,	29,	1,	125),
(188,	'2019-09-10 10:30:00',	6,	17,	2,	50),
(189,	'2019-09-10 10:30:00',	62,	29,	2,	125),
(190,	'2019-09-10 10:30:00',	9,	29,	1,	125),
(191,	'2019-09-10 10:30:00',	17,	32,	1,	125),
(192,	'2019-09-10 10:30:00',	50,	6,	1,	100),
(193,	'2019-09-10 10:30:00',	2,	30,	1,	125),
(194,	'2019-09-10 10:30:00',	40,	30,	1,	125),
(195,	'2019-09-10 10:30:00',	33,	60,	1,	100),
(196,	'2019-09-10 10:30:00',	2,	30,	1,	125),
(197,	'2019-09-11 10:30:00',	7,	29,	1,	125),
(198,	'2019-09-11 10:30:00',	21,	20,	1,	50),
(199,	'2019-09-11 10:30:00',	51,	17,	1,	50),
(200,	'2019-09-11 10:30:00',	51,	58,	1,	125),
(201,	'2019-09-11 10:30:00',	39,	54,	1,	50),
(202,	'2019-09-11 10:30:00',	62,	30,	1,	125),
(203,	'2019-09-11 10:30:00',	48,	31,	1,	125),
(204,	'2019-09-11 10:30:00',	50,	17,	1,	50),
(205,	'2019-09-11 10:30:00',	40,	60,	1,	100),
(206,	'2019-09-11 10:30:00',	2,	60,	1,	100),
(207,	'2019-09-12 10:30:00',	6,	43,	1,	75),
(208,	'2019-09-12 10:30:00',	29,	60,	1,	100),
(209,	'2019-09-12 10:30:00',	21,	29,	1,	125),
(210,	'2019-09-12 10:30:00',	39,	54,	1,	50),
(211,	'2019-09-12 10:30:00',	39,	30,	1,	125),
(212,	'2019-09-12 10:30:00',	40,	30,	1,	125),
(213,	'2019-09-12 10:30:00',	2,	30,	1,	125),
(214,	'2019-09-12 10:30:00',	50,	43,	1,	75),
(215,	'2019-09-12 10:30:00',	68,	29,	1,	125),
(216,	'2019-09-12 10:30:00',	4,	30,	1,	125),
(217,	'2019-09-12 10:30:00',	19,	43,	1,	75),
(218,	'2019-09-12 10:30:00',	21,	43,	1,	75),
(219,	'2019-09-13 10:30:00',	39,	54,	1,	50),
(220,	'2019-09-13 10:30:00',	21,	9,	1,	100),
(221,	'2019-09-13 10:30:00',	31,	9,	1,	100),
(222,	'2019-09-13 10:30:00',	20,	6,	1,	100),
(223,	'2019-09-13 10:30:00',	68,	9,	1,	100),
(224,	'2019-09-13 10:30:00',	22,	30,	1,	125),
(225,	'2019-09-13 10:30:00',	47,	31,	1,	125),
(226,	'2019-09-13 10:30:00',	73,	30,	1,	125),
(227,	'2019-09-13 10:30:00',	47,	41,	2,	50),
(228,	'2019-09-13 10:30:00',	32,	11,	1,	100),
(229,	'2019-09-13 10:30:00',	5,	31,	1,	125),
(230,	'2019-09-14 10:30:00',	44,	17,	4,	50),
(231,	'2019-09-14 10:30:00',	24,	31,	1,	125),
(232,	'2019-09-14 10:30:00',	17,	30,	1,	125),
(233,	'2019-09-14 10:30:00',	48,	31,	1,	125),
(234,	'2019-09-14 10:30:00',	29,	43,	1,	75),
(235,	'2019-09-14 10:30:00',	2,	30,	2,	125),
(236,	'2019-09-14 10:30:00',	14,	30,	1,	125),
(237,	'2019-09-14 10:30:00',	50,	8,	1,	100),
(238,	'2019-09-14 10:30:00',	73,	11,	1,	100),
(239,	'2019-09-14 10:30:00',	21,	29,	1,	125),
(240,	'2019-09-14 10:30:00',	17,	30,	1,	125),
(241,	'2019-09-14 10:30:00',	32,	32,	1,	125),
(242,	'2019-09-14 10:30:00',	40,	32,	1,	125),
(243,	'2019-09-14 10:30:00',	22,	36,	1,	0),
(244,	'2019-09-14 10:30:00',	47,	9,	1,	100),
(245,	'2019-09-15 10:30:00',	47,	41,	2,	50),
(246,	'2019-09-15 10:30:00',	2,	29,	1,	125),
(247,	'2019-09-15 10:30:00',	62,	29,	1,	125),
(248,	'2019-09-15 10:30:00',	62,	43,	1,	75),
(249,	'2019-09-15 10:30:00',	30,	29,	1,	125),
(250,	'2019-09-15 10:30:00',	2,	29,	1,	125),
(251,	'2019-09-15 10:30:00',	28,	32,	1,	125),
(252,	'2019-09-15 10:30:00',	32,	30,	1,	125),
(253,	'2019-09-15 10:30:00',	7,	29,	1,	125),
(254,	'2019-09-15 10:30:00',	15,	2,	1,	0),
(255,	'2019-09-15 10:30:00',	31,	30,	1,	125),
(256,	'2019-09-15 10:30:00',	31,	9,	1,	100),
(257,	'2019-09-15 10:30:00',	2,	11,	1,	100),
(258,	'2019-09-15 10:30:00',	48,	43,	1,	75),
(259,	'2019-09-15 10:30:00',	62,	1,	2,	50),
(260,	'2019-09-16 10:30:00',	29,	43,	1,	75),
(261,	'2019-09-16 10:30:00',	50,	43,	1,	75),
(262,	'2019-09-16 10:30:00',	22,	11,	1,	100),
(263,	'2019-09-16 10:30:00',	73,	11,	1,	100),
(264,	'2019-09-16 10:30:00',	61,	12,	2,	100),
(265,	'2019-09-16 10:30:00',	30,	6,	1,	100),
(266,	'2019-09-17 10:30:00',	28,	6,	1,	0),
(267,	'2019-09-17 10:30:00',	22,	9,	1,	100),
(268,	'2019-09-17 10:30:00',	40,	30,	1,	125),
(269,	'2019-09-17 10:30:00',	74,	30,	1,	125),
(270,	'2019-09-17 10:30:00',	47,	41,	2,	50),
(271,	'2019-09-18 10:30:00',	31,	31,	1,	125),
(272,	'2019-09-18 10:30:00',	15,	5,	1,	0),
(273,	'2019-09-18 10:30:00',	24,	30,	1,	125),
(274,	'2019-09-18 10:30:00',	19,	32,	1,	125),
(275,	'2019-09-18 10:30:00',	51,	17,	1,	50),
(276,	'2019-09-18 10:30:00',	51,	58,	1,	125),
(277,	'2019-09-18 10:30:00',	31,	41,	2,	50),
(278,	'2019-09-18 10:30:00',	21,	29,	1,	125),
(279,	'2019-09-18 10:30:00',	47,	29,	1,	125),
(280,	'2019-09-18 10:30:00',	47,	9,	1,	100),
(281,	'2019-09-18 10:30:00',	5,	31,	1,	125),
(282,	'2019-09-18 10:30:00',	40,	54,	1,	50),
(283,	'2019-09-18 10:30:00',	51,	6,	1,	100),
(284,	'2019-09-18 10:30:00',	19,	32,	1,	125),
(285,	'2019-09-19 10:30:00',	31,	41,	1,	50),
(286,	'2019-09-19 10:30:00',	48,	31,	1,	125),
(287,	'2019-09-19 10:30:00',	17,	43,	2,	75),
(288,	'2019-09-19 10:30:00',	21,	11,	1,	100),
(289,	'2019-09-19 10:30:00',	50,	6,	1,	100),
(290,	'2019-09-19 10:30:00',	22,	5,	1,	125),
(291,	'2019-09-19 10:30:00',	22,	41,	2,	50),
(292,	'2019-09-19 10:30:00',	31,	9,	1,	100),
(293,	'2019-09-19 10:30:00',	31,	29,	1,	125),
(294,	'2019-09-19 10:30:00',	47,	31,	1,	125),
(295,	'2019-09-19 10:30:00',	40,	31,	1,	125),
(296,	'2019-09-20 10:30:00',	7,	29,	1,	125),
(297,	'2019-09-20 10:30:00',	24,	10,	1,	125),
(298,	'2019-09-20 10:30:00',	31,	29,	1,	125),
(299,	'2019-09-20 10:30:00',	21,	43,	1,	75),
(300,	'2019-09-20 10:30:00',	21,	9,	1,	100),
(301,	'2019-09-20 10:30:00',	31,	9,	1,	100),
(302,	'2019-09-20 10:30:00',	68,	29,	1,	125),
(303,	'2019-09-20 10:30:00',	30,	4,	1,	50),
(304,	'2019-09-20 10:30:00',	7,	29,	1,	125),
(305,	'2019-09-20 10:30:00',	44,	17,	4,	50),
(306,	'2019-09-20 10:30:00',	51,	58,	1,	125),
(307,	'2019-09-21 10:30:00',	50,	22,	1,	75),
(308,	'2019-09-21 10:30:00',	61,	9,	1,	100),
(309,	'2019-09-21 10:30:00',	29,	16,	1,	100),
(310,	'2019-09-21 10:30:00',	48,	31,	1,	125),
(311,	'2019-09-21 10:30:00',	14,	30,	1,	125),
(312,	'2019-09-21 10:30:00',	21,	11,	1,	100),
(313,	'2019-09-21 10:30:00',	21,	60,	1,	100),
(314,	'2019-09-21 10:30:00',	40,	60,	1,	100),
(315,	'2019-09-21 10:30:00',	50,	6,	1,	100),
(316,	'2019-09-21 10:30:00',	73,	60,	2,	100),
(317,	'2019-09-22 10:30:00',	2,	60,	1,	100),
(318,	'2019-09-23 10:30:00',	32,	60,	1,	100),
(319,	'2019-09-24 10:30:00',	30,	29,	1,	125),
(320,	'2019-09-24 10:30:00',	48,	31,	1,	125),
(321,	'2019-09-24 10:30:00',	61,	12,	1,	100),
(322,	'2019-09-24 10:30:00',	17,	60,	1,	100),
(323,	'2019-09-24 10:30:00',	76,	30,	1,	125),
(324,	'2019-09-24 10:30:00',	44,	17,	1,	50),
(325,	'2019-09-25 10:30:00',	19,	4,	1,	75),
(326,	'2019-09-25 10:30:00',	22,	4,	1,	75),
(327,	'2019-09-25 10:30:00',	9,	29,	1,	125),
(328,	'2019-09-25 10:30:00',	48,	31,	1,	125),
(329,	'2019-09-25 10:30:00',	21,	11,	1,	100),
(330,	'2019-09-25 10:30:00',	61,	12,	1,	100),
(331,	'2019-09-25 10:30:00',	20,	6,	7,	100),
(332,	'2019-09-25 10:30:00',	20,	29,	4,	125),
(333,	'2019-09-26 10:30:00',	50,	6,	1,	100),
(334,	'2019-09-26 10:30:00',	21,	9,	1,	100),
(335,	'2019-09-27 10:30:00',	24,	29,	1,	125),
(336,	'2019-09-27 10:30:00',	21,	11,	1,	100),
(337,	'2019-09-27 10:30:00',	19,	31,	1,	125),
(338,	'2019-09-27 10:30:00',	21,	11,	1,	100),
(339,	'2019-09-27 10:30:00',	44,	17,	4,	50),
(340,	'2019-09-27 10:30:00',	47,	16,	1,	100),
(341,	'2019-09-27 10:30:00',	47,	1,	1,	50),
(342,	'2019-09-28 10:30:00',	31,	29,	1,	125),
(343,	'2019-09-28 10:30:00',	50,	17,	2,	50),
(344,	'2019-09-28 10:30:00',	6,	17,	1,	50),
(345,	'2019-09-28 10:30:00',	3,	42,	1,	50),
(346,	'2019-09-28 10:30:00',	21,	29,	1,	125),
(347,	'2019-09-28 10:30:00',	29,	31,	1,	125),
(348,	'2019-09-28 10:30:00',	15,	2,	1,	100),
(349,	'2019-09-28 10:30:00',	16,	43,	1,	75),
(350,	'2019-09-29 10:30:00',	44,	58,	2,	125),
(351,	'2019-09-29 10:30:00',	2,	54,	2,	50),
(352,	'2019-09-29 10:30:00',	31,	9,	1,	100),
(353,	'2019-09-29 10:30:00',	31,	29,	1,	125),
(354,	'2019-09-30 10:30:00',	24,	31,	1,	125),
(355,	'2019-09-30 10:30:00',	22,	41,	2,	50),
(356,	'2019-09-30 10:30:00',	39,	20,	1,	50),
(357,	'2019-09-30 10:30:00',	30,	6,	1,	100),
(358,	'2019-09-30 10:30:00',	22,	4,	1,	75);

INSERT INTO JohnnyPaymentLog  (`id`, `time_created`, `employeeId`,  `amount` )
SELECT id, time_created, employeeId, totalPrice as amount FROM JohnnyOrderLog
ORDER BY RAND()
LIMIT 50;

UPDATE JohnnyOrderLog as Log, JohnnyPaymentLog as Pay set Log.`paidInBox` = Pay.id WHERE Log.id = Pay.id;