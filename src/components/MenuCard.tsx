interface MenuCardProps {
  name: string;
  price: number; // in NGN
}

const MenuCard = ({ name, price }: MenuCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-700 font-medium mb-4">₦{price}</p>
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        Order Now
      </button>
    </div>
  );
};

export default MenuCard;