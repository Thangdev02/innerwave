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
      <div className="text-center py-40 text-gray-500">Bài viết không tồn tại.</div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf9] py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <div
          className="rounded-[32px] p-10 shadow-lg border border-[#f3ead4]/70"
          style={{
            background:
              "linear-gradient(135deg, #fff8f0 0%, #fdf3d4 50%, #f7eedc 100%)",
          }}
        >
          <Link
            to="/blog"
            className="text-[#2f7041] font-medium hover:underline mb-6 inline-block"
          >
            ← Quay lại trang Blog
          </Link>

          <h1 className="text-3xl font-bold text-[#3b3426] mb-4">{post.title}</h1>
          <p className="text-sm text-[#9b8f75] mb-6">{post.date}</p>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-2xl mb-8"
          />

          <div className="text-[#4b4537] text-base leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
