import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const posts = [
  {
    id: "1",
    title: "Khi Những Lá Thư Kể Câu Chuyện Của Chúng Ta",
    date: "22 tháng 10, 2025",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200",
    content: `
Có một điều mà Puzzles luôn biết ơn — đó là mỗi ngày, chiếc hộp thư nhỏ của tụi mình lại nhận thêm vài dòng tâm sự từ khắp nơi. Mỗi lá thư là một câu chuyện nhỏ, và mỗi câu chuyện là một mảnh ghép thật đẹp của tuổi trẻ.

"Em không biết có nên tiếp tục cố gắng nữa không. Mọi người nói em mạnh mẽ, nhưng đôi khi em chỉ muốn có ai đó bảo rằng em có quyền yếu đuối một chút."

Những dòng chia sẻ như thế khiến Lan và mọi người trong đội ngũ Puzzles tin rằng, chữa lành không phải điều to tát — đôi khi, nó bắt đầu chỉ từ việc viết ra điều mình đang cảm thấy.

Puzzles sẽ không thể đăng tải hết tất cả những lá thư tuyệt vời ấy, nhưng tụi mình muốn một phần của mỗi câu chuyện vẫn được lan tỏa – để ai đó, ở một góc nhỏ khác của thế giới, cũng có thể tìm thấy sự đồng cảm.`,
  },
  {
    id: "2",
    title: "Puzzles Recap: Một Ngày Ở Mái Ấm Huynh Đệ Như Nghĩa",
    date: "22 tháng 10, 2025",
    image:
      "https://images.unsplash.com/photo-1541692641319-1e2e46b8a96e?w=1200",
    content: `
Có những chuyến đi không chỉ để trao tặng, mà còn để nhận lại – những nụ cười, những bài học về tình thương, và cả sự biết ơn giản dị.

Ngày hôm ấy, tụi mình đã có dịp trò chuyện cùng các em nhỏ ở Mái Ấm Huynh Đệ Như Nghĩa. Những ánh mắt sáng rực, những tiếng cười trong trẻo khiến ai nấy đều cảm thấy được tiếp thêm năng lượng.`,
  },
  {
    id: "3",
    title: "Lan và Hành Trình Cùng Puzzles: Khi Chữa Lành Bắt Đầu Từ Một Lá Thư",
    date: "22 tháng 10, 2025",
    image:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=1200",
    content: `
Nếu ai hỏi Puzzles bắt đầu từ đâu, Lan – người sáng lập dự án – sẽ nói rằng: từ một chiếc hộp thư nhỏ. Một nơi để mọi người viết ra điều mình chẳng thể nói.

Câu chuyện ấy đã truyền cảm hứng để Puzzles trở thành cầu nối của hàng trăm bức thư và hàng ngàn trái tim.`,
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center text-white">
          <p className="text-xl mb-4">Bài viết không tồn tại.</p>
          <Link to="/blog" className="text-[#5cd9aa] hover:underline">
            ← Quay lại trang Blog
          </Link>
        </div>
      </div>
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
            <p className="text-sm text-white/60 mb-8">{post.date}</p>

            {/* Main content card (white box in the design) */}
            <div className=" backdrop-blur-sm rounded-2xl p-8 md:p-10 ">
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
              />

              {/* Text content */}
              <div className="text-white text-base md:text-lg leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Optional: Share or action buttons */}
            {/* <div className="mt-8 flex justify-center gap-4">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition">
                Chia sẻ câu chuyện
              </button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </main>
  );
}