CREATE TABLE IF NOT EXISTS "wl_Comment" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "user_id" TEXT,
  "comment" TEXT,
  "insertedAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  "ip" TEXT,
  "link" TEXT,
  "mail" TEXT,
  "nick" TEXT,
  "rid" TEXT,
  "pid" TEXT,
  "sticky" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'approved',
  "like" INTEGER DEFAULT 0,
  "ua" TEXT,
  "url" TEXT,
  "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "wl_comment_url" ON "wl_Comment" ("url");
CREATE INDEX IF NOT EXISTS "wl_comment_rid" ON "wl_Comment" ("rid");
CREATE INDEX IF NOT EXISTS "wl_comment_status" ON "wl_Comment" ("status");

CREATE TABLE IF NOT EXISTS "wl_Counter" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "time" INTEGER DEFAULT 0,
  "reaction0" INTEGER DEFAULT 0,
  "reaction1" INTEGER DEFAULT 0,
  "reaction2" INTEGER DEFAULT 0,
  "reaction3" INTEGER DEFAULT 0,
  "reaction4" INTEGER DEFAULT 0,
  "reaction5" INTEGER DEFAULT 0,
  "reaction6" INTEGER DEFAULT 0,
  "reaction7" INTEGER DEFAULT 0,
  "reaction8" INTEGER DEFAULT 0,
  "url" TEXT UNIQUE,
  "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "wl_Users" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "display_name" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "password" TEXT NOT NULL DEFAULT '',
  "type" TEXT NOT NULL DEFAULT '',
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
  "createdAt" TEXT DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "wl_users_email" ON "wl_Users" ("email");
