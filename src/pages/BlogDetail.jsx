import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import postService from "../services/postService";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await postService.getPostById(id);
      setPost(data);
      
      // Tăng view count
      await postService.incrementViewCount(id);
    } catch (err) {
      console.error("Error loading post:", err);
      setError("Không thể tải bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
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

  if (error || !post) {
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
          <div className="text-center text-white">
            <p className="text-xl mb-4">{error || "Bài viết không tồn tại."}</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5cd9aa] text-white rounded-xl hover:bg-[#4aaee0] transition"
            >
              ← Quay lại trang Blog
            </Link>
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

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full z-[1]">
        <svg viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Content card with overlay */}
        <div className="relative">
          {/* Overlay background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/85 via-[#2a3f5f]/75 to-[#1a2332]/85 backdrop-blur-md rounded-2xl" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative p-8 md:p-12"
          >
            {/* Back button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#5cd9aa] font-medium hover:text-[#4aaee0] transition mb-8"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại trang Blog
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#5cd9aa] mb-3 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-white/60 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5cd9aa] to-[#4aaee0] flex items-center justify-center text-white text-xs font-bold">
                  {post.authorName ? post.authorName.charAt(0).toUpperCase() : "A"}
                </div>
                <span>{post.authorName || "Admin"}</span>
              </div>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.viewCount} lượt xem</span>
              </div>
            </div>

            {/* Main content card */}
            <div className="backdrop-blur-sm rounded-2xl p-8 md:p-10">
              {/* Image */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200";
                  }}
                />
              )}

              {/* Summary (nếu có) */}
              {post.summary && (
                <div className="text-white/80 text-lg italic mb-6 pb-6 border-b border-white/20">
                  {post.summary}
                </div>
              )}

              {/* Text content */}
              <div className="text-white text-base md:text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </div>

              {/* Post type badge */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <span className="inline-flex items-center px-4 py-2 bg-[#5cd9aa]/20 text-[#5cd9aa] rounded-full text-sm font-medium">
                  {post.type === 1 ? "📰 Tin tức" : post.type === 2 ? "📝 Blog" : "📄 Bài viết"}
                </span>
              </div>
            </div>

            {/* Share buttons (optional) */}
            <div className="mt-8 flex justify-center gap-4">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Chia sẻ
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}