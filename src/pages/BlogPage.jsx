import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import postService from "../services/postService";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await postService.getAllPosts(true); // false = chỉ lấy published posts
      setPosts(data);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("Không thể tải bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    
    const sorted = [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setPosts(sorted);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen relative overflow-hidden py-16 px-6 md:px-10 pt-48">
        <div className="absolute inset-0 z-0">
          <img
            src="/backgroundBlog.png"
            alt="Healing background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#5cd9aa] border-t-transparent"></div>
            <p className="text-white mt-4">Đang tải bài viết...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen relative overflow-hidden py-16 px-6 md:px-10 pt-48">
        <div className="absolute inset-0 z-0">
          <img
            src="/backgroundBlog.png"
            alt="Healing background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={fetchPosts}
              className="px-6 py-3 bg-[#5cd9aa] text-white rounded-xl hover:bg-[#4aaee0] transition"
            >
              Thử lại
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden py-16 px-6 md:px-10 pt-48">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/backgroundBlog.png"
          alt="Healing background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Overlay layer phủ cả header và grid */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/80 via-[#2a3f5f]/70 to-[#1a2332]/80 backdrop-blur-sm rounded-3xl" />
          
          <div className="relative p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-4xl font-bold text-[#5cd9aa] tracking-tight uppercase"
              >
                Healing Stories
              </motion.h1>

              <div className="mt-6 md:mt-0">
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5cd9aa]/50"
                >
                  <option className="bg-[#1a2332] text-white" value="newest">
                    Mới nhất
                  </option>
                  <option className="bg-[#1a2332] text-white" value="oldest">
                    Cũ nhất
                  </option>
                </select>
              </div>
            </div>

            {/* Grid layout - 3 cards per row, centered */}
            <div className="flex justify-center">
              <div className="relative">
                {posts.length === 0 ? (
                  <div className="text-center text-white py-12">
                    <p className="text-xl">Chưa có bài viết nào.</p>
                  </div>
                ) : (
                  <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    {posts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.imageUrl || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800";
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <Link to={`/blog/${post.id}`}>
                            <h2 className="text-lg font-semibold text-[#1a2332] group-hover:text-[#5cd9aa] transition-colors line-clamp-2 mb-2 leading-snug">
                              {post.title}
                            </h2>
                          </Link>

                          <p className="text-[#4a5568] text-sm leading-relaxed line-clamp-2 mb-4">
                            {post.summary || post.content.substring(0, 100) + "..."}
                          </p>

                          <div className="flex items-center justify-between text-xs text-[#718096]">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5cd9aa] to-[#4aaee0] flex items-center justify-center text-white text-xs font-bold">
                                {post.authorName ? post.authorName.charAt(0).toUpperCase() : "A"}
                              </div>
                              <span className="font-medium text-[#2d3748]">
                                {post.authorName || "Admin"}
                              </span>
                            </div>
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>

                        {/* View count badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-1 shadow-md">
                          <svg className="w-3 h-3 text-[#4a5568]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-xs font-medium text-[#4a5568]">{post.viewCount}</span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination - Optional, có thể thêm sau nếu API có pagination */}
         <div className="mt-12 flex justify-center items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition flex items-center justify-center">
            ←
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium ${
                  page === 1
                    ? "bg-[#5cd9aa] text-white"
                    : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                } transition`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition flex items-center justify-center">
            →
          </button>
        </div> 
      </div>
    </main>
  );
}