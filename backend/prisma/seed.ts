import { PrismaClient, CommitteeRole, MeetingFrequency, QualiType, IntegrityCategory, IntegrityResult, Executive, EvaluationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 명시적으로 Executive 타입 배열로 선언
  const execs: Executive[] = [];

  // Dummy executives 3-20 (18 executives)
  for (let i = 31; i <= 50; i++) {
    const executive = await prisma.executive.create({
      data: {
        name: `임원${i}`,
        employeeNo: `E${String(i).padStart(3,'0')}`,
        positionLabel: i % 2 === 0 ? "이사" : "상무",
        titleLabel: `부서장${i}`,
        phone: `010-5555-${1000+i}`,
        email: `exec${i}@example.com`,
        termStartDate: new Date("2024-01-01"),
        termEndDate: new Date("2026-12-31"),
        orgReg: {
          create: {
            managingOrg: "재무본부",
            division: `Division${i}`,
            team: `Team${i}`,
            councilBody: "재무위원회",
            committeeRole: i % 2 === 0 ? CommitteeRole.CHAIR : CommitteeRole.MEMBER,
            meetingFreq: MeetingFrequency.QUARTERLY,
            majorAgenda: `Agenda ${i}`
          }
        },
        qualiItems: {
          create: [
            { type: QualiType.WORK, companyName: `회사${i}`, positionLabel: "과장", titleLabel: "담당자", periodStart: new Date("2020-01-01"), periodEnd: new Date("2024-12-31") },
            { type: QualiType.EDUCATION, content: `대학교${i} 졸업`, occurredAt: new Date("2011-02-01") },
            { type: QualiType.CERT, content: "자격증" }
          ]
        },
        integrity: {
          create: [
            { category: IntegrityCategory.DISCIPLINARY_LOOKUP, result: IntegrityResult.NONE, content: "없음" }
          ]
        },
        evaluation: { create: { evaluationResult: "적합", decisionReason: `사유${i}`, status: EvaluationStatus.STARTED } }
      }
    });
    
    execs.push(executive);
  }

  console.log("Executives seeded:", execs.map(e => e.name));
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
