import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import postService from "../../services/postService";
import orderService from "../../services/orderService";

// Import your API services

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    unpublishedPosts: 0,
    totalOrders: 0,
    totalViews: 0,
    ordersToday: 0,
    viewsToday: 0
  });

  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [postTypeData, setPostTypeData] = useState([]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch posts and orders in parallel
        const [postsData, ordersData] = await Promise.all([
          postService.getAllPosts(true), // Include unpublished posts
          orderService.getAllOrders()
        ]);

        setPosts(postsData);
        setOrders(ordersData);

        // Calculate statistics
        const publishedCount = postsData.filter(p => p.isPublished).length;
        const unpublishedCount = postsData.filter(p => !p.isPublished).length;
        const totalViews = postsData.reduce((sum, p) => sum + (p.viewCount || 0), 0);
        
        // Orders today
        const today = new Date().toDateString();
        const ordersToday = ordersData.filter(o => 
          new Date(o.createdAt).toDateString() === today
        ).length;

        // Views today (assuming createdAt or updatedAt can be used)
        const viewsToday = postsData.filter(p => 
          p.updatedAt && new Date(p.updatedAt).toDateString() === today
        ).reduce((sum, p) => sum + (p.viewCount || 0), 0);

        setStats({
          totalPosts: postsData.length,
          publishedPosts: publishedCount,
          unpublishedPosts: unpublishedCount,
          totalOrders: ordersData.length,
          totalViews,
          ordersToday,
          viewsToday
        });

        // Generate monthly data from orders
        generateMonthlyData(ordersData, postsData);
        
        // Generate post type distribution
        generatePostTypeData(postsData);
        
        // Generate recent activities
        generateRecentActivities(postsData, ordersData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate monthly data for charts
  const generateMonthlyData = (ordersData, postsData) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const monthlyStats = [];

    for (let i = 0; i < 6; i++) {
      const monthIndex = new Date().getMonth() - (5 - i);
      const month = monthIndex >= 0 ? monthIndex : 12 + monthIndex;
      const year = monthIndex >= 0 ? currentYear : currentYear - 1;

      const ordersInMonth = ordersData.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === month && orderDate.getFullYear() === year;
      }).length;

      const postsInMonth = postsData.filter(p => {
        const postDate = new Date(p.createdAt);
        return postDate.getMonth() === month && postDate.getFullYear() === year;
      }).length;

      const viewsInMonth = postsData.filter(p => {
        const postDate = new Date(p.createdAt);
        return postDate.getMonth() === month && postDate.getFullYear() === year;
      }).reduce((sum, p) => sum + (p.viewCount || 0), 0);

      monthlyStats.push({
        month: months[month],
        orders: ordersInMonth,
        posts: postsInMonth,
        views: viewsInMonth
      });
    }

    setMonthlyData(monthlyStats);
  };

  // Generate post type distribution
  const generatePostTypeData = (postsData) => {
    const typeMap = {
      0: 'News',
      1: 'Blog',
      2: 'Article',
      3: 'Guide',
      4: 'Other'
    };

    const typeCounts = {};
    postsData.forEach(post => {
      const typeName = typeMap[post.type] || 'Other';
      typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
    });

    const data = Object.entries(typeCounts).map(([name, value]) => ({
      name,
      value
    }));

    setPostTypeData(data);
  };

  // Generate recent activities from posts and orders
  const generateRecentActivities = (postsData, ordersData) => {
    const activities = [];

    // Add recent orders
    ordersData.slice(-5).reverse().forEach(order => {
      activities.push({
        id: `order-${order.id}`,
        type: 'order',
        message: `New order from ${order.firstName} ${order.lastName}`,
        time: formatTimeAgo(order.createdAt),
        icon: '🛍️',
        timestamp: new Date(order.createdAt)
      });
    });

    // Add recent posts
    postsData.slice(-5).reverse().forEach(post => {
      activities.push({
        id: `post-${post.id}`,
        type: 'post',
        message: `Post "${post.title.substring(0, 30)}..." ${post.isPublished ? 'published' : 'created'}`,
        time: formatTimeAgo(post.createdAt),
        icon: post.isPublished ? '✅' : '📝',
        timestamp: new Date(post.createdAt)
      });
    });

    // Sort by timestamp and take last 8
    activities.sort((a, b) => b.timestamp - a.timestamp);
    setRecentActivities(activities.slice(0, 8));
  };

  // Format time ago helper
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const COLORS = ['#5cd9aa', '#4aaee0', '#f59e0b', '#ef4444', '#8b5cf6'];

  const statsCards = [
    { 
      title: "Total Posts", 
      value: stats.totalPosts,
      subtitle: `${stats.publishedPosts} published`,
      icon: "📝",
      change: `+${stats.unpublishedPosts} drafts`,
      changeType: "info",
      color: "from-blue-500 to-blue-600",
      bgPattern: "bg-blue-50"
    },
    { 
      title: "Total Orders", 
      value: stats.totalOrders,
      subtitle: `${stats.ordersToday} today`,
      icon: "🛒",
      change: stats.ordersToday > 0 ? `+${stats.ordersToday} new` : 'No orders today',
      changeType: stats.ordersToday > 0 ? "increase" : "neutral",
      color: "from-green-500 to-green-600",
      bgPattern: "bg-green-50"
    },
    { 
      title: "Total Views", 
      value: stats.totalViews.toLocaleString(),
      subtitle: `${stats.viewsToday} today`,
      icon: "👁️",
      change: `${Math.round(stats.totalViews / Math.max(stats.totalPosts, 1))} avg/post`,
      changeType: "info",
      color: "from-purple-500 to-purple-600",
      bgPattern: "bg-purple-50"
    },
    { 
      title: "Published Rate", 
      value: `${Math.round((stats.publishedPosts / Math.max(stats.totalPosts, 1)) * 100)}%`,
      subtitle: `${stats.publishedPosts} of ${stats.totalPosts}`,
      icon: "✅",
      change: stats.unpublishedPosts > 0 ? `${stats.unpublishedPosts} pending` : 'All published',
      changeType: stats.unpublishedPosts > 0 ? "warning" : "increase",
      color: "from-yellow-500 to-orange-600",
      bgPattern: "bg-yellow-50"
    },
  ];

  // Top posts by views
  const topPosts = [...posts]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5cd9aa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header with Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#5cd9aa] via-[#4aaee0] to-[#5cd9aa] rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-white/90 text-lg">Welcome back! Here's your business insights.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition text-sm font-semibold border border-white/30">
              📊 Export Data
            </button>
            <button className="px-6 py-3 bg-white text-[#4aaee0] rounded-xl hover:shadow-lg transition text-sm font-semibold">
              📈 Generate Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statsCards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-40 h-40 ${item.bgPattern} rounded-full -mr-20 -mt-20 opacity-50 group-hover:scale-110 transition-transform`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  item.changeType === 'increase' ? 'bg-green-100 text-green-700' : 
                  item.changeType === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  item.changeType === 'info' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.change}
                </span>
              </div>
              
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{item.title}</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{item.value}</p>
              <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Orders & Posts Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Activity Trends</h2>
              <p className="text-gray-500 text-sm">Orders and posts over time</p>
            </div>
            <select className="text-sm border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5cd9aa] bg-white font-medium">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5cd9aa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#5cd9aa" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4aaee0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4aaee0" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" style={{ fontSize: '12px' }} />
              <YAxis stroke="#888" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '16px', 
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="orders" 
                stroke="#5cd9aa" 
                fillOpacity={1}
                fill="url(#colorOrders)"
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="posts" 
                stroke="#4aaee0" 
                fillOpacity={1}
                fill="url(#colorPosts)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Views Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Views Analytics</h2>
            <p className="text-gray-500 text-sm">Monthly post views</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" style={{ fontSize: '12px' }} />
              <YAxis stroke="#888" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '16px', 
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
              />
              <Bar dataKey="views" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Post Types Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Categories</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={postTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {postTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {postTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="xl:col-span-2 bg-white rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 rounded-xl transition group">
                <div className="text-3xl transform group-hover:scale-110 transition-transform">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{activity.message}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Posts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Performing Posts</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-bold text-gray-700">Title</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700">Author</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700">Views</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr key={post.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#5cd9aa] to-[#4aaee0] rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="max-w-md">
                        <p className="font-semibold text-gray-800 truncate">{post.title}</p>
                        <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600 font-medium">{post.authorName}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-gray-800">{post.viewCount || 0}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      post.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.isPublished ? '✓ Published' : '⏳ Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-[#5cd9aa] to-[#4aaee0] h-2.5 rounded-full transition-all"
                        style={{ width: `${Math.min((post.viewCount || 0) / Math.max(...topPosts.map(p => p.viewCount || 0)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-[#5cd9aa] via-[#4aaee0] to-[#5cd9aa] rounded-3xl p-8 text-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition rounded-2xl p-6 text-left group border border-white/30">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">📝</div>
            <p className="font-bold text-lg">Create Post</p>
            <p className="text-white/80 text-sm mt-1">Write new content</p>
          </button>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition rounded-2xl p-6 text-left group border border-white/30">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">🛒</div>
            <p className="font-bold text-lg">View Orders</p>
            <p className="text-white/80 text-sm mt-1">Manage orders</p>
          </button>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition rounded-2xl p-6 text-left group border border-white/30">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">📊</div>
            <p className="font-bold text-lg">Analytics</p>
            <p className="text-white/80 text-sm mt-1">Detailed reports</p>
          </button>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition rounded-2xl p-6 text-left group border border-white/30">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">⚙️</div>
            <p className="font-bold text-lg">Settings</p>
            <p className="text-white/80 text-sm mt-1">Configure app</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;