// src/components/InvestmentCard.jsx
const InvestmentCard = ({ inv }) => (
    <div className=" ">
      <h4 className="text-xl font-semibold mb-2 p-6">{inv.type}</h4>
      <p className="mb-1"><strong>Monto:</strong> ${inv.amount.toLocaleString()}</p>
      <p className="mb-1"><strong>Fecha:</strong> {inv.date}</p>
      <p className="mb-1"><strong>Estado:</strong> {inv.status}</p>
    </div>
  );
  
  export default InvestmentCard;
  