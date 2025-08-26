import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1) 카테고리(책무구분)
  const category = await prisma.dutyCategory.upsert({
    where: { name: '경영관리' },
    update: {},
    create: { name: '경영관리' },
  });

  // 2) 책무 + 세부 (열병합 해제: 부모값을 모두 채운 상태로 입력)
  const duties = [
    {
      code: 'AM-경영관리-C11',
      name: '경영지원업무와 관련된 책무',
      details: [
        { code: 'AM-경영관리-C11-A', content: '경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임' },
      ],
    },
    {
      code: 'AM-경영관리-C2',
      name: '인사업무와 관련된 책무',
      details: [
        { code: 'AM-경영관리-C2-A', content: '인사업무 기준 수립 및 운영을 관리·감독할 책임' },
      ],
    },
    {
      code: 'AM-경영관리-C3',
      name: '보수업무와 관련된 책무',
      details: [
        { code: 'AM-경영관리-C3-A', content: '성과보상 체계 구축 및 운영을 관리·감독할 책임' },
      ],
    },
    {
      code: 'AM-경영관리-C4',
      name: '고유자산 운용업무와 관련된 책무',
      details: [
        { code: 'AM-경영관리-C4-A', content: '고유자산 관련 투자 수립 및 운영을 관리·감독할 책임' },
      ],
    },
    {
      code: 'CN-경영관리-C7',
      name: '건전성 및 재무관리 업무와 관련된 책무',
      details: [
        { code: 'CN-경영관리-C7-A', content: '건전성 및 재무관리 기준 수립 및 절차를 관리·감독할 책임' },
      ],
    },
    {
      code: 'AM-경영관리-C8',
      name: '전략기획업무와 관련된 책무',
      details: [
        { code: 'AM-경영관리-C8-A', content: '경영전략 수립 및 운영을 관리·감독할 책임' },
      ],
    },
    {
      code: 'AM-경영관리-C1',
      name: '회계·세무와 관련된 책무',
      details: [
        { code: 'AM-경영관리-C1-A', content: '회계·세무 정책 수립 및 운영을 관리·감독할 책임' },
      ],
    },
    {
      code: 'BD-경영관리-C1',
      name: '이사회 운영업무와 관련된 책무',
      details: [
        { code: 'BD-경영관리-C1-A', content: '이사회 및 이사회 내 위원회 운영을 관리할 책임' },
        { code: 'BD-경영관리-C1-B', content: '회사 주요 경영 관련 사안에 대해 이사회의 의결할 책임' },
        { code: 'BD-경영관리-C1-C', content: '감독기능 강화를 위한 내부통제에 관한 사항을 관할·관리할 책임' },
      ],
    },
    {
      code: 'DI-경영관리-C10',
      name: '전산시스템 운영·관리 업무와 관련된 책무',
      details: [
        { code: 'DI-경영관리-C10-A', content: '전산 전산화 전략 수립 및 운영을 관리·감독할 책임' },
        { code: 'DI-경영관리-C10-B', content: '전산시스템 통합 관리체계 구축 및 운영을 관리·감독할 책임' },
        { code: 'DI-경영관리-C10-C', content: '전산 관련 보안 및 장애 대응을 관리·감독할 책임' },
      ],
    },
    {
      code: 'MK-경영관리-C6',
      name: '마케팅 업무와 관련된 책무',
      details: [
        { code: 'MK-경영관리-C6-A', content: '기관·고객 대상 마케팅 전략 수립 및 운영을 관리·감독할 책임' },
        { code: 'MK-경영관리-C6-B', content: 'WM 대상 마케팅 및 영업 지원 운영을 관리·감독할 책임' },
        { code: 'MK-경영관리-C6-C', content: '디지털 마케팅, 홍보 및 자료 관리·감독할 책임' },
      ],
    },
    {
      code: 'MK-경영관리-C7',
      name: '집합투자지원 업무와 관련된 책무',
      details: [
        { code: 'MK-경영관리-C7-A', content: '운용보조 및 성과 정산을 관리·감독할 책임' },
      ],
    },
  ];

  for (const d of duties) {
    const duty = await prisma.duty.upsert({
      where: { code: d.code },
      update: {
        name: d.name,
        categoryId: category.id,
      },
      create: {
        code: d.code,
        name: d.name,
        categoryId: category.id,
      },
    });

    for (const detail of d.details) {
      await prisma.dutyDetail.upsert({
        where: { code: detail.code },
        update: { content: detail.content, dutyId: duty.id },
        create: {
          code: detail.code,
          content: detail.content,
          dutyId: duty.id,
        },
      });
    }
  }

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });