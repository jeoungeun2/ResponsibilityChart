-- CreateEnum
CREATE TYPE "public"."CommitteeRole" AS ENUM ('CHAIR', 'MEMBER');

-- CreateEnum
CREATE TYPE "public"."MeetingFrequency" AS ENUM ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL', 'AD_HOC');

-- CreateEnum
CREATE TYPE "public"."QualiType" AS ENUM ('WORK', 'EDUCATION', 'AWARD', 'CERT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EvaluationStatus" AS ENUM ('NOT_STARTED', 'STARTED', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "public"."IntegrityCategory" AS ENUM ('DISCIPLINARY_LOOKUP', 'CRIMINAL_RECORD_LOOKUP', 'DISQUALIFICATION_LOOKUP', 'LAW_TRAINING_ISSUE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."IntegrityResult" AS ENUM ('NONE', 'ISSUE', 'PASSED', 'FAILED');

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "hashed_password" TEXT,
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."duty_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duty_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."duties" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."duty_details" (
    "id" TEXT NOT NULL,
    "dutyId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duty_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."executives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "employee_no" TEXT,
    "positionLabel" TEXT,
    "titleLabel" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "term_start_date" TIMESTAMP(3),
    "term_end_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."executive_org_registrations" (
    "id" TEXT NOT NULL,
    "executiveId" TEXT NOT NULL,
    "managingOrg" TEXT,
    "division" TEXT,
    "team" TEXT,
    "councilBody" TEXT,
    "committeeRole" "public"."CommitteeRole",
    "meetingFreq" "public"."MeetingFrequency",
    "majorAgenda" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executive_org_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."executive_quali_items" (
    "id" TEXT NOT NULL,
    "executiveId" TEXT NOT NULL,
    "type" "public"."QualiType" NOT NULL,
    "companyName" TEXT,
    "positionLabel" TEXT,
    "titleLabel" TEXT,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "content" TEXT,
    "occurredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executive_quali_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."executive_integrity_items" (
    "id" TEXT NOT NULL,
    "executiveId" TEXT NOT NULL,
    "category" "public"."IntegrityCategory" NOT NULL,
    "result" "public"."IntegrityResult",
    "content" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executive_integrity_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."executive_evaluations" (
    "id" TEXT NOT NULL,
    "executiveId" TEXT NOT NULL,
    "evaluationResult" TEXT,
    "decisionReason" TEXT,
    "status" "public"."EvaluationStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executive_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "public"."accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "public"."verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "duty_categories_name_key" ON "public"."duty_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "duties_code_key" ON "public"."duties"("code");

-- CreateIndex
CREATE UNIQUE INDEX "duty_details_code_key" ON "public"."duty_details"("code");

-- CreateIndex
CREATE INDEX "executives_name_idx" ON "public"."executives"("name");

-- CreateIndex
CREATE UNIQUE INDEX "executive_org_registrations_executiveId_key" ON "public"."executive_org_registrations"("executiveId");

-- CreateIndex
CREATE INDEX "executive_quali_items_executiveId_type_idx" ON "public"."executive_quali_items"("executiveId", "type");

-- CreateIndex
CREATE INDEX "executive_integrity_items_executiveId_category_idx" ON "public"."executive_integrity_items"("executiveId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "executive_evaluations_executiveId_key" ON "public"."executive_evaluations"("executiveId");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."duties" ADD CONSTRAINT "duties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."duty_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."duty_details" ADD CONSTRAINT "duty_details_dutyId_fkey" FOREIGN KEY ("dutyId") REFERENCES "public"."duties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."executive_org_registrations" ADD CONSTRAINT "executive_org_registrations_executiveId_fkey" FOREIGN KEY ("executiveId") REFERENCES "public"."executives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."executive_quali_items" ADD CONSTRAINT "executive_quali_items_executiveId_fkey" FOREIGN KEY ("executiveId") REFERENCES "public"."executives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."executive_integrity_items" ADD CONSTRAINT "executive_integrity_items_executiveId_fkey" FOREIGN KEY ("executiveId") REFERENCES "public"."executives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."executive_evaluations" ADD CONSTRAINT "executive_evaluations_executiveId_fkey" FOREIGN KEY ("executiveId") REFERENCES "public"."executives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
