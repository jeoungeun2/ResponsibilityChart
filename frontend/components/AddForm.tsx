interface AddFormProps {
  // 폼 데이터
  formData: {
    name: string;
    employeeNo: string;
    positionLabel: string;
    titleLabel: string;
    phone: string;
    email: string;
    termStartDate: string;
    termEndDate: string;
  };
  // 폼 데이터 변경 핸들러
  onFormDataChange: (field: string, value: string) => void;
  // 추가 버튼 클릭 핸들러
  onAdd: () => void;
  // 취소 버튼 클릭 핸들러
  onCancel: () => void;
  // 로딩 상태
  isLoading?: boolean;
  // 이름 유효성 검사
  isNameValid?: boolean;
}

export default function AddForm({
  formData,
  onFormDataChange,
  onAdd,
  onCancel,
  isLoading = false,
  isNameValid = true
}: AddFormProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">새 임원 추가</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={(e) => onFormDataChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
          <input
            type="text"
            placeholder="사번을 입력하세요"
            value={formData.employeeNo}
            onChange={(e) => onFormDataChange('employeeNo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">직위</label>
          <input
            type="text"
            placeholder="직위를 입력하세요"
            value={formData.positionLabel}
            onChange={(e) => onFormDataChange('positionLabel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">직책</label>
          <input
            type="text"
            placeholder="직책을 입력하세요"
            value={formData.titleLabel}
            onChange={(e) => onFormDataChange('titleLabel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
          <input
            type="tel"
            placeholder="연락처를 입력하세요"
            value={formData.phone}
            onChange={(e) => onFormDataChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={formData.email}
            onChange={(e) => onFormDataChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">재임시작일</label>
          <input
            type="date"
            value={formData.termStartDate}
            onChange={(e) => onFormDataChange('termStartDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">재임종료일</label>
          <input
            type="date"
            value={formData.termEndDate}
            onChange={(e) => onFormDataChange('termEndDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onAdd}
          disabled={isLoading || !isNameValid}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          title={isLoading ? '처리 중...' : !isNameValid ? '이름을 입력해주세요' : '임원 추가'}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              추가 중...
            </>
          ) : (
            '추가'
          )}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
}
