import React from "react";
import { ArticleInView } from "@/components/article-in-view";
import { PostStatus } from "@/components/post-status";
import Image from "next/image";
import Link from "next/link";

interface Post {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    tag: string;
  };
  content: string;
}

interface ArticleProps {
  post: Post;
  firstPost?: boolean;
}

const Article: React.FC<ArticleProps> = ({ post, firstPost }) => {
  return (
    <ArticleInView slug={post.slug}>
         <PostStatus status={post.metadata.tag} />
        <Link className="mb-6 block" href={`/updates/${post.slug}`}>
          <h2 className="font-medium text-2xl mb-6">{post.metadata.title}</h2>
        </Link>
      <div className={`article ${firstPost ? "first-post" : ""} mb-6 p-4`}>
        <h2 className="text-lg font-bold">{post.metadata.title}</h2>
        <p className="text-black dark:text-white text-xs">{post.metadata.publishedAt}</p>
        <p className="text-black dark:text-white">{post.metadata.summary}</p>
    
        <div className="updates">
          {post.metadata.image && (
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={680}
              height={442}
              className="mb-12"
            />
          )}
          <div className="prose">{post.content}</div>
        </div>
      </div>
    </ArticleInView>
  );
};

export default Article;