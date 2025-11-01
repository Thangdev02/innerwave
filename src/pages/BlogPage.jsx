import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Khi Những Lá Thư Kể Câu Chuyện Của Chúng Ta",
      date: "22 tháng 10, 2025",
      excerpt:
        "Có một điều mà Puzzles luôn biết ơn — đó là mỗi ngày, chiếc hộp thư nhỏ của tụi mình lại nhận thêm vài dòng tâm sự từ khắp nơi. Mỗi lá thư là một câu chuyện nhỏ.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    },
    {
      id: 2,
      title: "Puzzles Recap: Một Ngày Ở Mái Ấm Huynh Đệ Như Nghĩa",
      date: "22 tháng 10, 2025",
      excerpt:
        "Có những chuyến đi không chỉ để trao tặng, mà còn để nhận lại – những nụ cười, những bài học về tình thương, và cả sự biết ơn giản dị.",
      image:
        "https://images.unsplash.com/photo-1541692641319-1e2e46b8a96e?w=800",
    },
    {
      id: 3,
      title: "Lan và Hành Trình Cùng Puzzles: Khi Chữa Lành Bắt Đầu Từ Một Lá Thư",
      date: "22 tháng 10, 2025",
      excerpt:
        "Nếu ai hỏi Puzzles bắt đầu từ đâu, Lan – người sáng lập dự án – sẽ nói rằng: từ một chiếc hộp thư nhỏ. Một nơi để mọi người viết ra điều mình chẳng thể nói.",
      image:
        "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800",
    },
  ];

  return (
<main className="min-h-screen bg-[linear-gradient(135deg,#fff8f0_0%,#fdf3d4_50%,#f7eedc_100%)] py-20 px-6">
<motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-[#2f7041] mt-12 mb-12 text-center">
          All Posts
        </h1>

        <div
          className="rounded-[32px] p-10 space-y-10 shadow-lg border border-[#f3ead4]/70"
          style={{
            background:
              "#fffdf9",
          }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-8 items-center bg-white/70 rounded-2xl p-6 hover:bg-white/90 transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-56 h-40 object-cover rounded-xl shadow-sm"
              />
              <div className="flex-1">
                <p className="text-sm text-[#9b8f75] mb-1">{post.date}</p>
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-semibold text-[#3b3426] hover:text-[#2f7041] transition">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-[#4b4537] text-sm mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
