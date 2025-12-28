import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = [
    { title: "Total Posts", value: 128 },
    { title: "Users", value: 42 },
    { title: "Orders", value: 19 },
    { title: "Revenue", value: "$2,450" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Welcome section */}
      <div className="mt-10 bg-gradient-to-r from-[#5cd9aa] to-[#4aaee0] rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, Admin 👋
        </h2>
        <p className="opacity-90">
          You can manage posts, users, and orders from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
