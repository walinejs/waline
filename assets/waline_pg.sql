
CREATE SEQUENCE wl_comment_seq;

CREATE TABLE "wl_Comment" (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('wl_comment_seq'),
  user_id int DEFAULT NULL,
  comment text,
  "insertedAt" varchar(255) DEFAULT NULL,
  ip varchar(100) DEFAULT '',
  link varchar(255) DEFAULT NULL,
  mail varchar(255) DEFAULT NULL,
  nick varchar(255) DEFAULT NULL,
  pid int DEFAULT NULL,
  rid int DEFAULT NULL,
  sticky boolean DEFAULT NULL,
  status varchar(50) NOT NULL DEFAULT '',
  "like" int DEFAULT NULL,
  ua text,
  url varchar(255) DEFAULT NULL,
  "createdAt" varchar(255) DEFAULT NULL,
  "updatedAt" varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ;


CREATE SEQUENCE wl_counter_seq;

CREATE TABLE "wl_Counter" (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('wl_counter_seq'),
  time int DEFAULT NULL,
  url varchar(255) NOT NULL DEFAULT '',
  "createdAt" varchar(255) DEFAULT NULL,
  "updatedAt" varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ;


CREATE SEQUENCE wl_users_seq;

CREATE TABLE "wl_Users" (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('wl_users_seq'),
  display_name varchar(255) NOT NULL DEFAULT '',
  email varchar(255) NOT NULL DEFAULT '',
  password varchar(255) NOT NULL DEFAULT '',
  type varchar(50) NOT NULL DEFAULT '',
  label varchar(255) DEFAULT NULL,
  url varchar(255) DEFAULT NULL,
  avatar varchar(255) DEFAULT NULL,
  github varchar(255) DEFAULT NULL,
  twitter varchar(255) DEFAULT NULL,
  facebook varchar(255) DEFAULT NULL,
  google varchar(255) DEFAULT NULL,
  weibo varchar(255) DEFAULT NULL,
  qq varchar(255) DEFAULT NULL,
  "2fa" varchar(32) DEFAULT NULL,
  "createdAt" varchar(255) DEFAULT NULL,
  "updatedAt" varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ;
