// 책무 데이터 타입 정의
export interface DutyData {
  id: string;
  dutyAssignmentStatus: string;  // 책무배부여부
  executive: string;             // 임원
  position: string;              // 직책
  dutyAssignmentDate: string;    // 책무배분일
  category: string;              // 책무구분
  code: string;                  // 책무코드
  name: string;                  // 책무
  detailCode: string;            // 책무 세부코드
  detailContent: string;         // 책무 세부내용
  dutyRegistrationDate: string;  // 책무등록일
  relatedLaws: string;           // 관련 법령/내규
}

// 샘플 데이터 (15개)
export const sampleData: DutyData[] = [
  {
    id: "1",
    dutyAssignmentStatus: "배부완료",
    executive: "김철수",
    position: "대표이사",
    dutyAssignmentDate: "2024-01-15",
    category: "지정책임자",
    code: "AM-지정책임자-C11",
    name: "경영지원업무와 관련된 책무",
    detailCode: "AM-지정책임자-C11-A",
    detailContent: "경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-01-10",
    relatedLaws: "자본시장법 제22조, 금융투자업법 제42조"
  },
  {
    id: "2",
    dutyAssignmentStatus: "배부완료",
    executive: "이영희",
    position: "인사팀장",
    dutyAssignmentDate: "2024-01-20",
    category: "경영관리",
    code: "AM-경영관리-C12",
    name: "인사관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C12-A",
    detailContent: "인사관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-01-18",
    relatedLaws: "근로기준법 제14조, 노동조합법 제2조"
  },
  {
    id: "3",
    dutyAssignmentStatus: "배부완료",
    executive: "박민수",
    position: "재무팀장",
    dutyAssignmentDate: "2024-01-25",
    category: "금융",
    code: "AM-금융-C13",
    name: "재무관리업무와 관련된 책무",
    detailCode: "AM-금융-C13-A",
    detailContent: "재무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-01-22",
    relatedLaws: "자본시장법 제25조, 금융투자업법 제45조"
  },
  {
    id: "4",
    dutyAssignmentStatus: "배부완료",
    executive: "최지영",
    position: "IT팀장",
    dutyAssignmentDate: "2024-02-01",
    category: "지정책임자",
    code: "AM-지정책임자-C14",
    name: "정보관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C14-A",
    detailContent: "정보관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-01-28",
    relatedLaws: "개인정보보호법 제3조, 정보통신망법 제23조"
  },
  {
    id: "5",
    dutyAssignmentStatus: "배부완료",
    executive: "정수진",
    position: "법무팀장",
    dutyAssignmentDate: "2024-02-05",
    category: "경영관리",
    code: "AM-경영관리-C15",
    name: "법무관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C15-A",
    detailContent: "법무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-02-02",
    relatedLaws: "상법 제209조, 민법 제681조"
  },
  {
    id: "6",
    dutyAssignmentStatus: "배부완료",
    executive: "한동욱",
    position: "보안팀장",
    dutyAssignmentDate: "2024-02-10",
    category: "금융",
    code: "AM-금융-C16",
    name: "보안관리업무와 관련된 책무",
    detailCode: "AM-금융-C16-A",
    detailContent: "보안관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-02-07",
    relatedLaws: "정보통신망법 제48조, 개인정보보호법 제29조"
  },
  {
    id: "7",
    dutyAssignmentStatus: "배부완료",
    executive: "송미라",
    position: "품질팀장",
    dutyAssignmentDate: "2024-02-15",
    category: "지정책임자",
    code: "AM-지정책임자-C17",
    name: "품질관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C17-A",
    detailContent: "품질관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-02-12",
    relatedLaws: "품질경영촉진법 제2조, 산업표준화법 제3조"
  },
  {
    id: "8",
    dutyAssignmentStatus: "배부완료",
    executive: "강태호",
    position: "환경팀장",
    dutyAssignmentDate: "2024-02-20",
    category: "경영관리",
    code: "AM-경영관리-C18",
    name: "환경관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C18-A",
    detailContent: "환경관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-02-17",
    relatedLaws: "환경정책기본법 제2조, 대기환경보전법 제3조"
  },
  {
    id: "9",
    dutyAssignmentStatus: "배부완료",
    executive: "윤서연",
    position: "시설팀장",
    dutyAssignmentDate: "2024-02-25",
    category: "금융",
    code: "AM-금융-C19",
    name: "시설관리업무와 관련된 책무",
    detailCode: "AM-금융-C19-A",
    detailContent: "시설관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-02-22",
    relatedLaws: "건축법 제2조, 소방기본법 제3조"
  },
  {
    id: "10",
    dutyAssignmentStatus: "배부완료",
    executive: "임재현",
    position: "구매팀장",
    dutyAssignmentDate: "2024-03-01",
    category: "지정책임자",
    code: "AM-지정책임자-C20",
    name: "구매관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C20-A",
    detailContent: "구매관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-02-28",
    relatedLaws: "국가를당사자로하는계약에관한법률 제2조, 조달사업에관한법률 제3조"
  },
  {
    id: "11",
    dutyAssignmentStatus: "배부완료",
    executive: "오세영",
    position: "물류팀장",
    dutyAssignmentDate: "2024-03-05",
    category: "경영관리",
    code: "AM-경영관리-C21",
    name: "물류관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C21-A",
    detailContent: "물류관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-03-02",
    relatedLaws: "물류정책기본법 제2조, 화물자동차운수사업법 제3조"
  },
  {
    id: "12",
    dutyAssignmentStatus: "배부완료",
    executive: "백지원",
    position: "고객팀장",
    dutyAssignmentDate: "2024-03-10",
    category: "금융",
    code: "AM-금융-C22",
    name: "고객관리업무와 관련된 책무",
    detailCode: "AM-금융-C22-A",
    detailContent: "고객관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-03-07",
    relatedLaws: "금융소비자보호법 제2조, 전자금융거래법 제3조"
  },
  {
    id: "13",
    dutyAssignmentStatus: "배부완료",
    executive: "차현우",
    position: "마케팅팀장",
    dutyAssignmentDate: "2024-03-15",
    category: "지정책임자",
    code: "AM-지정책임자-C23",
    name: "마케팅관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C23-A",
    detailContent: "마케팅관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-03-12",
    relatedLaws: "표시·광고의공정화에관한법률 제2조, 전자상거래등에서의소비자보호에관한법률 제3조"
  },
  {
    id: "14",
    dutyAssignmentStatus: "배부완료",
    executive: "신동민",
    position: "연구개발팀장",
    dutyAssignmentDate: "2024-03-20",
    category: "경영관리",
    code: "AM-경영관리-C24",
    name: "연구개발관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C24-A",
    detailContent: "연구개발관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-03-17",
    relatedLaws: "과학기술기본법 제2조, 산업기술혁신촉진법 제3조"
  },
  {
    id: "15",
    dutyAssignmentStatus: "배부완료",
    executive: "고은지",
    position: "지식관리팀장",
    dutyAssignmentDate: "2024-03-25",
    category: "금융",
    code: "AM-금융-C25",
    name: "지식관리업무와 관련된 책무",
    detailCode: "AM-금융-C25-A",
    detailContent: "지식관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    dutyRegistrationDate: "2024-03-22",
    relatedLaws: "지식재산기본법 제2조, 저작권법 제3조"
  }
];

