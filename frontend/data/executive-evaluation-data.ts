export interface ExecutiveEvaluationData {
  id: string;
  name: string;
  jobTitle: string;
  position: string;
  managedOrganization: string;
  evaluationStatus: 'completed' | 'in-progress' | 'not-evaluated';
  evaluationCompletionDate: string | null;
  notificationCount?: number;
}

export const executiveEvaluationSampleData: ExecutiveEvaluationData[] = [
  {
    id: '1',
    name: '이도현',
    jobTitle: '대표이사',
    position: '대표이사',
    managedOrganization: '대표이사',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-15'
  },
  {
    id: '2',
    name: '황준호',
    jobTitle: 'ETF투자부문장',
    position: '상무',
    managedOrganization: 'ETF투자부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-12'
  },
  {
    id: '3',
    name: '윤태섭',
    jobTitle: '감사실장',
    position: '실장',
    managedOrganization: '감사실',
    evaluationStatus: 'in-progress',
    evaluationCompletionDate: null,
    notificationCount: 8
  },
  {
    id: '4',
    name: '노지환',
    jobTitle: '경영관리부문장',
    position: '상무',
    managedOrganization: '경영관리부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-10'
  },
  {
    id: '5',
    name: '정유진',
    jobTitle: '글로벌투자부문장',
    position: '부문장',
    managedOrganization: '글로벌투자부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-08',
    notificationCount: 9
  },
  {
    id: '6',
    name: '임혜진',
    jobTitle: '금융소비자보호실장',
    position: '이사대우',
    managedOrganization: '금융소비자보호실',
    evaluationStatus: 'not-evaluated',
    evaluationCompletionDate: null
  },
  {
    id: '7',
    name: '김성철',
    jobTitle: '리스크관리부문장',
    position: '상무',
    managedOrganization: '리스크관리부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-05'
  },
  {
    id: '8',
    name: '박영수',
    jobTitle: 'IT시스템부문장',
    position: '부문장',
    managedOrganization: 'IT시스템부문',
    evaluationStatus: 'in-progress',
    evaluationCompletionDate: null
  },
  {
    id: '9',
    name: '최민지',
    jobTitle: '인사총무부문장',
    position: '상무',
    managedOrganization: '인사총무부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-01'
  },
  {
    id: '10',
    name: '강동훈',
    jobTitle: '법무실장',
    position: '실장',
    managedOrganization: '법무실',
    evaluationStatus: 'not-evaluated',
    evaluationCompletionDate: null
  },
  {
    id: '11',
    name: '윤서연',
    jobTitle: '홍보실장',
    position: '실장',
    managedOrganization: '홍보실',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-02-28'
  },
  {
    id: '12',
    name: '송태호',
    jobTitle: '기획전략부문장',
    position: '상무',
    managedOrganization: '기획전략부문',
    evaluationStatus: 'in-progress',
    evaluationCompletionDate: null
  },
  {
    id: '13',
    name: '한지은',
    jobTitle: '고객서비스부문장',
    position: '부문장',
    managedOrganization: '고객서비스부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-02-25'
  },
  {
    id: '14',
    name: '조현우',
    jobTitle: '연구개발부문장',
    position: '상무',
    managedOrganization: '연구개발부문',
    evaluationStatus: 'not-evaluated',
    evaluationCompletionDate: null
  },
  {
    id: '15',
    name: '이미라',
    jobTitle: '재무회계부문장',
    position: '부문장',
    managedOrganization: '재무회계부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-02-20'
  }
];

export const evaluationStatusOptions = [
  { value: 'completed', label: '완료', color: 'bg-blue-300' },
  { value: 'in-progress', label: '진행중', color: 'bg-yellow-300' },
  { value: 'not-evaluated', label: '미평가', color: 'bg-gray-300' }
];

export const getEvaluationStatusDisplay = (status: ExecutiveEvaluationData['evaluationStatus']) => {
  const option = evaluationStatusOptions.find(opt => opt.value === status);
  return option || evaluationStatusOptions[2];
};
