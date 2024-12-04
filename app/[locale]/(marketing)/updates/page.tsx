import { getBlogPosts } from "@/lib/blog";
import { Article } from "@/components/article";
import { UpdatesToolbar } from "@/components/updates-toolbar";

export default async function Page() {
  const posts = getBlogPosts(); // Llama a getBlogPosts para obtener los posts

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <div className="container max-w-[1140px] mx-auto py-10">
      <UpdatesToolbar />
      <h1 className="text-3xl font-bold mb-6">Actualizaciones</h1>
      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <Article key={post.slug} post={post} /> // Asegúrate de que el componente Article esté recibiendo el post correctamente
        ))}
      </div>
    </div>
  );
}