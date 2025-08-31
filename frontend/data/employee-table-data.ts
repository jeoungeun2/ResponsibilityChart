export interface EmployeeData {
  id: string;
  employeeId: string;
  name: string;
  position: string;
  rank: string;
}

export const employeeTableData: EmployeeData[] = [
  {
    id: "1",
    employeeId: "123456",
    name: "김상현",
    position: "금사본 부장",
    rank: "이사"
  },
  {
    id: "2",
    employeeId: "234567",
    name: "박○○",
    position: "준법감시인",
    rank: "준법감시인"
  },
  {
    id: "3",
    employeeId: "345678",
    name: "최○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "4",
    employeeId: "456789",
    name: "김○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "5",
    employeeId: "567890",
    name: "이○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "6",
    employeeId: "678901",
    name: "표○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "7",
    employeeId: "789012",
    name: "송○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "8",
    employeeId: "890123",
    name: "조○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "9",
    employeeId: "901234",
    name: "김○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "10",
    employeeId: "012345",
    name: "박○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "11",
    employeeId: "123450",
    name: "정○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "12",
    employeeId: "234501",
    name: "홍○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "13",
    employeeId: "345012",
    name: "조○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "14",
    employeeId: "450123",
    name: "윤○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "15",
    employeeId: "501234",
    name: "박○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "16",
    employeeId: "601234",
    name: "한○○",
    position: "그룹장",
    rank: "부행장"
  },
  {
    id: "17",
    employeeId: "701234",
    name: "임○○",
    position: "그룹장",
    rank: "부행장"
  }
];

export const employeeTableColumns = [
  {
    key: "employeeId" as keyof EmployeeData,
    header: "사번",
    visible: true,
    width: "120px"
  },
  {
    key: "name" as keyof EmployeeData,
    header: "성명",
    visible: true,
    width: "120px"
  },
  {
    key: "position" as keyof EmployeeData,
    header: "직책",
    visible: true,
    width: "150px"
  },
  {
    key: "rank" as keyof EmployeeData,
    header: "직위",
    visible: true,
    width: "120px"
  }
];

export const employeeTableFilters = [
  {
    key: "name",
    label: "성명",
    type: "input" as const,
    placeholder: "성명을 입력하세요"
  },
  {
    key: "position",
    label: "직책",
    type: "dropdown" as const,
    placeholder: "직책을 선택하세요"
  },
  {
    key: "rank",
    label: "직위",
    type: "dropdown" as const,
    placeholder: "직위를 선택하세요"
  }
];

export const employeeTableFilterOptions = {
  position: [
    { value: "금사본 부장", label: "금사본 부장" },
    { value: "준법감시인", label: "준법감시인" },
    { value: "그룹장", label: "그룹장" }
  ],
  rank: [
    { value: "이사", label: "이사" },
    { value: "준법감시인", label: "준법감시인" },
    { value: "부행장", label: "부행장" }
  ]
};
