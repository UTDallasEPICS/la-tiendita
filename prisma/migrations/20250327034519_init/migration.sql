-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lastModified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "questionString" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    CONSTRAINT "Question_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "choiceString" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SurveyResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answersData" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "lastModified" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "SurveyResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SurveyResult_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
