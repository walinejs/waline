BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "wl_Comment" (
  "id" INTEGER,
  "user_id" INTEGER,
  "comment" TEXT,
  "insertedAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  "ip" TEXT,
  "link" TEXT,
  "mail" TEXT,
  "nick" TEXT,
  "rid" INTEGER,
  "pid" INTEGER,
  "sticky" NUMERIC,
  "status" TEXT NOT NULL,
  "like" INTEGER,
  "ua" TEXT,
  "url" TEXT,
  "site_id" TEXT,
  "createdAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  "updatedAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "wl_Counter" (
  "id" INTEGER,
  "time" INTEGER,
  "reaction0" INTEGER,
  "reaction1" INTEGER,
  "reaction2" INTEGER,
  "reaction3" INTEGER,
  "reaction4" INTEGER,
  "reaction5" INTEGER,
  "reaction6" INTEGER,
  "reaction7" INTEGER,
  "reaction8" INTEGER,
  "url" TEXT,
  "site_id" TEXT,
  "createdAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  "updatedAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "wl_Users" (
  "id" INTEGER,
  "display_name" TEXT NOT NULL DEFAULT "",
  "email" TEXT NOT NULL DEFAULT "",
  "password" TEXT NOT NULL DEFAULT "",
  "type" TEXT NOT NULL DEFAULT "",
  "label" TEXT,
  "github" TEXT,
  "twitter" TEXT,
  "facebook" TEXT,
  "google" TEXT,
  "weibo" TEXT,
  "qq" TEXT,
  "oidc" TEXT,
  "huawei" TEXT,
  "2fa" TEXT,
  "avatar" TEXT,
  "url" TEXT,
  "createdAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  "updatedAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "wl_Site" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT "active",
  "default" NUMERIC NOT NULL DEFAULT 0,
  "config" TEXT,
  "createdAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  "updatedAt" DATETIME DEFAULT (datetime('now', 'localtime'))
);
CREATE TABLE IF NOT EXISTS "wl_SiteAdmin" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "site_id" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL,
  "createdAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  "updatedAt" DATETIME DEFAULT (datetime('now', 'localtime')),
  UNIQUE("site_id", "user_id")
);
CREATE INDEX IF NOT EXISTS "idx_comment_site_url" ON "wl_Comment" ("site_id", "url");
CREATE INDEX IF NOT EXISTS "idx_counter_site_url" ON "wl_Counter" ("site_id", "url");
COMMIT;
