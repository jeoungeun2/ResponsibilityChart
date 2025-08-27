import { PrismaClient, CommitteeRole, MeetingFrequency, QualiType, IntegrityCategory, IntegrityResult } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ================================
  // Executive 1
  // ================================
  const exec1 = await prisma.executive.create({
    data: {
      name: "김철수",
      employeeNo: "E001",
      positionLabel: "전무",
      titleLabel: "경영지원본부장",
      phone: "010-1111-2222",
      email: "kimcs@example.com",
      termStartDate: new Date("2024-01-01"),
      termEndDate: new Date("2026-12-31"),

      orgReg: {
        create: {
          managingOrg: "경영지원본부",
          division: "재무부서",
          team: "회계팀",
          councilBody: "리스크관리위원회",
          committeeRole: CommitteeRole.CHAIR,
          meetingFreq: MeetingFrequency.QUARTERLY,
          majorAgenda: "리스크 검토 및 보고"
        }
      },

      qualiItems: {
        create: [
          {
            type: QualiType.WORK,
            companyName: "삼성전자",
            positionLabel: "부장",
            titleLabel: "재무담당",
            periodStart: new Date("2018-01-01"),
            periodEnd: new Date("2022-12-31")
          },
          {
            type: QualiType.EDUCATION,
            content: "서울대학교 경영학과 졸업",
            occurredAt: new Date("2000-02-01")
          },
          {
            type: QualiType.CERT,
            content: "공인회계사"
          }
        ]
      },

      integrity: {
        create: [
          {
            category: IntegrityCategory.DISCIPLINARY_LOOKUP,
            result: IntegrityResult.NONE,
            content: "해당 없음"
          },
          {
            category: IntegrityCategory.LAW_TRAINING_ISSUE,
            result: IntegrityResult.PASSED,
            content: "연간 법령 준수 교육 이수"
          }
        ]
      },

      evaluation: {
        create: {
          evaluationResult: "적합",
          decisionReason: "경영성과 및 리스크 관리 경험 풍부"
        }
      }
    }
  });

  // ================================
  // Executive 2
  // ================================
  const exec2 = await prisma.executive.create({
    data: {
      name: "이영희",
      employeeNo: "E002",
      positionLabel: "상무",
      titleLabel: "전략기획팀장",
      phone: "010-3333-4444",
      email: "leeyh@example.com",
      termStartDate: new Date("2023-03-01"),
      termEndDate: new Date("2025-02-28"),

      orgReg: {
        create: {
          managingOrg: "전략기획실",
          division: "신사업부",
          team: "기획팀",
          councilBody: "투자심의위원회",
          committeeRole: CommitteeRole.MEMBER,
          meetingFreq: MeetingFrequency.MONTHLY,
          majorAgenda: "투자안건 검토 및 승인"
        }
      },

      qualiItems: {
        create: [
          {
            type: QualiType.WORK,
            companyName: "LG화학",
            positionLabel: "차장",
            titleLabel: "전략기획담당",
            periodStart: new Date("2015-01-01"),
            periodEnd: new Date("2020-12-31")
          },
          {
            type: QualiType.AWARD,
            content: "우수사원상",
            occurredAt: new Date("2019-12-01")
          },
          {
            type: QualiType.OTHER,
            content: "국제학술대회 발표 경험"
          }
        ]
      },

      integrity: {
        create: [
          {
            category: IntegrityCategory.CRIMINAL_RECORD_LOOKUP,
            result: IntegrityResult.NONE,
            content: "조회결과 이상 없음"
          }
        ]
      },

      evaluation: {
        create: {
          evaluationResult: "적합",
          decisionReason: "신사업 전략 수립 및 투자 경험"
        }
      }
    }
  });

  console.log("Executives seeded:", exec1.name, exec2.name);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });