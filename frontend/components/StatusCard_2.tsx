// 상태 카드 컴포넌트 2
const StatusCard_2 = ({ cards }: { 
  cards: Array<{ title: string; value: string }>;
}) => (
  <div className="border border-gray-200  p-4">
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white px-4 border-r-2 border-gray-100">
          <div className="text-left flex justify-between items-center ">
            <h3 className="text-lg font-medium text-black">{card.title}</h3>
            <p className="text-2xl font-semibold text-black">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StatusCard_2;
