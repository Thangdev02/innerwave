import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogPage() {
  // Dữ liệu mẫu (bạn có thể thay bằng dữ liệu thật từ API hoặc props)
  const posts = [
    {
      id: 1,
      title: "Khi Những Lá Thư Kể Câu Chuyện Của Chúng Ta",
      date: "22 tháng 10, 2025",
      author: "Lan",
      excerpt:
        "Có một điều mà Puzzles luôn biết ơn — đó là mỗi ngày, chiếc hộp thư nhỏ của tụi mình lại nhận thêm vài dòng tâm sự từ khắp nơi...",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    },
    {
      id: 2,
      title: "Puzzles Recap: Một Ngày Ở Mái Ấm Huynh Đệ Như Nghĩa",
      date: "22 tháng 10, 2025",
      author: "Puzzles Team",
      excerpt:
        "Có những chuyến đi không chỉ để trao tặng, mà còn để nhận lại – những nụ cười, những bài học về tình thương...",
      image:
        "https://images.unsplash.com/photo-1541692641319-1e2e46b8a96e?w=800",
    },
    {
      id: 3,
      title: "Lan và Hành Trình Cùng Puzzles: Khi Chữa Lành Bắt Đầu Từ Một Lá Thư",
      date: "22 tháng 10, 2025",
      author: "Lan",
      excerpt:
        "Nếu ai hỏi Puzzles bắt đầu từ đâu, Lan – người sáng lập dự án – sẽ nói rằng: từ một chiếc hộp thư nhỏ...",
      image:
        "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800",
    },
    {
      id: 4,
      title: "Opening Day Of Boating Season, Gaastra MA",
      date: "Aug 14, 2021",
      author: "James",
      excerpt:
        "Of Course The Biggest Benefit Is You Weren't Just Reading What There Are. Sound Amplifier App For...",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    {
      id: 5,
      title: "How To Choose The Right Laptop For Programming",
      date: "Jan 14, 2021",
      author: "Lydia Rodriguez",
      excerpt:
        "Choosing The Right Laptop For Programming Can Be A Tough Process. It All...",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    },
    {
      id: 6,
      title: "How We Built The First Real Self-Driving Car",
      date: "Mar 13, 2021",
      author: "Mary",
      excerpt:
        "Electric Self-Driving Cars Will Save Millions Of Lives And Significantly Accelerate The World's...",
      image:
        "https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=800",
    },
    {
      id: 7,
      title: "How To Build A Fast-Driving Car In One Month",
      date: "Feb 14, 2021",
      author: "Brandon",
      excerpt:
        "Man Fly Said There Isn't Some Nor We Be Seas Herb For Moveth Of A Driving Car In Just 30 Days...",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    },
    {
      id: 8,
      title: "Self Improvement: How Become An Extreme...",
      date: "Jul 13, 2021",
      author: "Jeffery",
      excerpt:
        "And We Bounded From Stars Make Light Good Make Divide Us Creature Set Of Divide...",
      image:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
    },
    {
      id: 9,
      title: "10 Cooking Lessons: In Use In Everyday Life",
      date: "Nov 11, 2021",
      author: "Ann Kopf",
      excerpt:
        "I Recently Graduated From This Course (The One Cooking Lesson) And I Must...",
      image:
        "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800",
    },
  ];

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
            <select className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5cd9aa]/50">
              <option className="bg-[#1a2332] text-white">Date</option>
              <option className="bg-[#1a2332] text-white">Newest first</option>
              <option className="bg-[#1a2332] text-white">Oldest first</option>
            </select>
          </div>
        </div>

        {/* Grid layout - 3 cards per row, centered */}
        <div className="flex justify-center">
          <div className="relative">
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
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-[#718096]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5cd9aa] to-[#4aaee0] flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="font-medium text-[#2d3748]">{post.author}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Bookmark icon */}
              <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md hover:bg-white transition">
                <svg className="w-4 h-4 text-[#4a5568]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </motion.article>
          ))}
            </div>
          </div>
        </div>
          </div>
        </div>

        {/* Pagination */}
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