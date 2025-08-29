// 책무 데이터 타입 정의
export interface DutyData {
  id: string;
  category: string;        // 책무구분
  code: string;            // 책무코드
  name: string;            // 책무
  detailCode: string;      // 책무 세부코드
  detailContent: string;   // 책무 세부내용
  position: string;        // 직책
  executive: string;       // 임원
}

// 샘플 데이터 (15개)
export const sampleData: DutyData[] = [
  {
    id: "1",
    category: "지정책임자",
    code: "AM-지정책임자-C11",
    name: "경영지원업무와 관련된 책무",
    detailCode: "AM-지정책임자-C11-A",
    detailContent: "경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "대표이사",
    executive: "김철수"
  },
  {
    id: "2",
    category: "경영관리",
    code: "AM-경영관리-C12",
    name: "인사관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C12-A",
    detailContent: "인사관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "인사팀장",
    executive: "이영희"
  },
  {
    id: "3",
    category: "금융",
    code: "AM-금융-C13",
    name: "재무관리업무와 관련된 책무",
    detailCode: "AM-금융-C13-A",
    detailContent: "재무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "재무팀장",
    executive: "박민수"
  },
  {
    id: "4",
    category: "지정책임자",
    code: "AM-지정책임자-C14",
    name: "정보관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C14-A",
    detailContent: "정보관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "IT팀장",
    executive: "최지영"
  },
  {
    id: "5",
    category: "경영관리",
    code: "AM-경영관리-C15",
    name: "법무관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C15-A",
    detailContent: "법무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "법무팀장",
    executive: "정수진"
  },
  {
    id: "6",
    category: "금융",
    code: "AM-금융-C16",
    name: "보안관리업무와 관련된 책무",
    detailCode: "AM-금융-C16-A",
    detailContent: "보안관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "보안팀장",
    executive: "한동욱"
  },
  {
    id: "7",
    category: "지정책임자",
    code: "AM-지정책임자-C17",
    name: "품질관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C17-A",
    detailContent: "품질관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "품질팀장",
    executive: "송미라"
  },
  {
    id: "8",
    category: "경영관리",
    code: "AM-경영관리-C18",
    name: "환경관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C18-A",
    detailContent: "환경관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "환경팀장",
    executive: "강태호"
  },
  {
    id: "9",
    category: "금융",
    code: "AM-금융-C19",
    name: "시설관리업무와 관련된 책무",
    detailCode: "AM-금융-C19-A",
    detailContent: "시설관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "시설팀장",
    executive: "윤서연"
  },
  {
    id: "10",
    category: "지정책임자",
    code: "AM-지정책임자-C20",
    name: "구매관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C20-A",
    detailContent: "구매관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "구매팀장",
    executive: "임재현"
  },
  {
    id: "11",
    category: "경영관리",
    code: "AM-경영관리-C21",
    name: "물류관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C21-A",
    detailContent: "물류관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "물류팀장",
    executive: "오세영"
  },
  {
    id: "12",
    category: "금융",
    code: "AM-금융-C22",
    name: "고객관리업무와 관련된 책무",
    detailCode: "AM-금융-C22-A",
    detailContent: "고객관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "고객팀장",
    executive: "백지원"
  },
  {
    id: "13",
    category: "지정책임자",
    code: "AM-지정책임자-C23",
    name: "마케팅관리업무와 관련된 책무",
    detailCode: "AM-지정책임자-C23-A",
    detailContent: "마케팅관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "마케팅팀장",
    executive: "차현우"
  },
  {
    id: "14",
    category: "경영관리",
    code: "AM-경영관리-C24",
    name: "연구개발관리업무와 관련된 책무",
    detailCode: "AM-경영관리-C24-A",
    detailContent: "연구개발관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "연구개발팀장",
    executive: "신동민"
  },
  {
    id: "15",
    category: "금융",
    code: "AM-금융-C25",
    name: "지식관리업무와 관련된 책무",
    detailCode: "AM-금융-C25-A",
    detailContent: "지식관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임",
    position: "지식관리팀장",
    executive: "고은지"
  }
];

