export interface ExecutiveResponsibilityData {
  id: number;
  executive: string;
  responsibilityCount: number;
  managementActionCount: number;
  completedActions: number;
  completionRate: number;
  uncompletedActions: number;
  nonCompletionRate: number;
}

export const executiveResponsibilityData: ExecutiveResponsibilityData[] = [
  {
    id: 1,
    executive: "전사공통책무",
    responsibilityCount: 3,
    managementActionCount: 34,
    completedActions: 7,
    completionRate: 20.59,
    uncompletedActions: 27,
    nonCompletionRate: 79.41
  },
  {
    id: 2,
    executive: "대표이사",
    responsibilityCount: 2,
    managementActionCount: 26,
    completedActions: 19,
    completionRate: 73.08,
    uncompletedActions: 7,
    nonCompletionRate: 26.92
  },
  {
    id: 3,
    executive: "이사회의장",
    responsibilityCount: 4,
    managementActionCount: 9,
    completedActions: 9,
    completionRate: 100,
    uncompletedActions: 0,
    nonCompletionRate: 0
  },
  {
    id: 4,
    executive: "대체투자부문장",
    responsibilityCount: 6,
    managementActionCount: 33,
    completedActions: 15,
    completionRate: 45.45,
    uncompletedActions: 18,
    nonCompletionRate: 54.55
  },
  {
    id: 5,
    executive: "경영관리부문장",
    responsibilityCount: 9,
    managementActionCount: 57,
    completedActions: 29,
    completionRate: 50.88,
    uncompletedActions: 28,
    nonCompletionRate: 49.12
  },
  {
    id: 6,
    executive: "금융소비자보호책임자",
    responsibilityCount: 2,
    managementActionCount: 15,
    completedActions: 3,
    completionRate: 20,
    uncompletedActions: 12,
    nonCompletionRate: 80
  },
  {
    id: 7,
    executive: "준법감시인",
    responsibilityCount: 7,
    managementActionCount: 94,
    completedActions: 52,
    completionRate: 55.32,
    uncompletedActions: 42,
    nonCompletionRate: 44.68
  },
  {
    id: 8,
    executive: "리스크관리책임자",
    responsibilityCount: 5,
    managementActionCount: 28,
    completedActions: 18,
    completionRate: 64.29,
    uncompletedActions: 10,
    nonCompletionRate: 35.71
  },
  {
    id: 9,
    executive: "내부통제책임자",
    responsibilityCount: 4,
    managementActionCount: 22,
    completedActions: 15,
    completionRate: 68.18,
    uncompletedActions: 7,
    nonCompletionRate: 31.82
  },
  {
    id: 10,
    executive: "정보보호책임자",
    responsibilityCount: 3,
    managementActionCount: 19,
    completedActions: 12,
    completionRate: 63.16,
    uncompletedActions: 7,
    nonCompletionRate: 36.84
  },
  {
    id: 11,
    executive: "개인정보보호책임자",
    responsibilityCount: 2,
    managementActionCount: 16,
    completedActions: 11,
    completionRate: 68.75,
    uncompletedActions: 5,
    nonCompletionRate: 31.25
  },
  {
    id: 12,
    executive: "자본시장전문금융업책임자",
    responsibilityCount: 6,
    managementActionCount: 31,
    completedActions: 20,
    completionRate: 64.52,
    uncompletedActions: 11,
    nonCompletionRate: 35.48
  },
  {
    id: 13,
    executive: "투자자문업책임자",
    responsibilityCount: 4,
    managementActionCount: 25,
    completedActions: 16,
    completionRate: 64.00,
    uncompletedActions: 9,
    nonCompletionRate: 36.00
  },
  {
    id: 14,
    executive: "투자일임업책임자",
    responsibilityCount: 5,
    managementActionCount: 29,
    completedActions: 19,
    completionRate: 65.52,
    uncompletedActions: 10,
    nonCompletionRate: 34.48
  },
  {
    id: 15,
    executive: "기타책임자",
    responsibilityCount: 3,
    managementActionCount: 18,
    completedActions: 10,
    completionRate: 55.56,
    uncompletedActions: 8,
    nonCompletionRate: 44.44
  }
];
