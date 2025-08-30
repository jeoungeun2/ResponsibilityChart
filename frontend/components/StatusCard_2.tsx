// 상태 카드 컴포넌트 2
const StatusCard_2 = ({ 
  cards 
}: { 
  cards: Array<{ 
    title: string; 
    value: string; 
    image?: string; 
    status?: string;
    titleColor?: string;
    valueColor?: string;
  }>;
}) => (
  <div className="border border-gray-200 px-4 py-4">
    <div className="grid grid-cols-4 gap-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white px-4 border-r-2 border-gray-100">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <h3 className={`text-lg font-medium ${card.titleColor || 'text-black'}`}>{card.title}</h3>
              <p className={`text-2xl font-semibold ${card.valueColor || 'text-black'}`}>{card.value}</p>
            </div>
            <div className="flex items-center space-x-4">
              {card.image && (
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-16 h-16 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StatusCard_2;
