// 상태 카드 컴포넌트
const StatusCard = ({ 
  title, 
  value, 
  subValue,
  image, 
  titleColor, 
  valueColor,
  subValueColor
}: { 
  title: string; 
  value: string; 
  subValue?: string;
  image?: string;
  titleColor?: string;
  valueColor?: string;
  subValueColor?: string;
}) => (
<div className="bg-white border border-gray-200 pl-4 pr-2 py-2 min-h-[140px]">
  <div className="flex justify-between items-stretch h-full">
    
    {/* 왼쪽 아래 정렬: 텍스트 그룹 */}
    <div className="flex flex-col justify-end text-left">
      <h3 className={`text-lg font-semibold mb-1 ${titleColor || 'text-gray-600'}`}>
        {title.includes(':') ? (
          <div className="grid">
            <div className="text-base font-medium text-gray-600">{title.split(':')[0]}:</div>
            <div className="text-lg font-semibold">{title.split(':')[1]}</div>
            
            
          </div>
        ) : (
          title
        )}
      </h3>
      <div className="flex items-end justify-start">
        <p className={`text-2xl font-bold ${valueColor || 'bg-gradient-to-r from-brand-200 to-brand-500 bg-clip-text text-transparent'}`}>
          {value}
        </p>
        {subValue && (
          <span className={`ml-1 text-sm ${subValueColor || 'text-gray-500'}`}>
            {subValue}
          </span>
        )}
      </div>
    </div>

    {/* 오른쪽 위 정렬: 이미지 */}
    {image && (
      <div className="flex items-start justify-end">
        <img
          src={image}
          alt={title}
          className="w-19 h-19 object-contain"
        />
      </div>
    )}
  </div>
</div>
);

export default StatusCard;
