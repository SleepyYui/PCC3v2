USE pc_creator;

CREATE TABLE IF NOT EXISTS `users` (
    userid INT NOT NULL,
    PRIMARY KEY (userid)
);

CREATE TABLE IF NOT EXISTS `messages` (
    userid INT NOT NULL,
    messages VARCHAR(255) NULL,
    last_message DATETIME NULL,
    FOREIGN KEY (userid) REFERENCES `users` (userid)
);

CREATE INDEX messages_userid_idx ON `messages` (userid);

CREATE TABLE IF NOT EXISTS `warns` (
    userid INT NOT NULL,
    warn VARCHAR(255) NULL,
    warnid INT AUTO_INCREMENT,
    PRIMARY KEY (warnid),
    FOREIGN KEY (userid) REFERENCES `users` (userid)
);

CREATE INDEX warns_userid_idx ON `warns` (userid);

CREATE TABLE IF NOT EXISTS `command_uses` (
    userid INT NOT NULL,
    command TEXT NOT NULL,
    commandid INT AUTO_INCREMENT,
    date DATETIME NOT NULL,
    PRIMARY KEY (commandid),
    FOREIGN KEY (userid) REFERENCES `users` (userid)
);

CREATE INDEX command_uses_userid_idx ON `command_uses` (userid);

CREATE TABLE IF NOT EXISTS `bans` (
    userid INT NOT NULL,
    reason MEDIUMTEXT NOT NULL,
    banid INT AUTO_INCREMENT,
    until DATETIME NOT NULL,
    PRIMARY KEY (banid),
    FOREIGN KEY (userid) REFERENCES `users` (userid)
);

CREATE TABLE IF NOT EXISTS `join_leave` (
    userid INT NOT NULL,
    joinleave BOOLEAN NOT NULL,
    date DATETIME NOT NULL,
    joinid INT AUTO_INCREMENT,
    PRIMARY KEY (joinid),
    FOREIGN KEY (userid) REFERENCES `users` (userid)
);
