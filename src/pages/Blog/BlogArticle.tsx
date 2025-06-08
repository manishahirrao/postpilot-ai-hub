import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../Blog/BlogData';

const BlogArticle: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div className="p-10 text-center text-xl">Article not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <Link to="/" className="text-blue-600 underline mb-6 inline-block">← Back to Blog</Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 text-sm mb-6">
        {post.author} • {post.date} • {post.readTime}
      </div>
      <div className="prose prose-lg max-w-none">
        {post.content.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogArticle;
