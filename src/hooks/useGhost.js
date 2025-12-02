import { useState, useEffect } from 'react';
import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_URL,
  key: import.meta.env.VITE_GHOST_CONTENT_API_KEY,
  version: 'v5.0'
});

export const useGhostPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const ghostPosts = await api.posts.browse({
          limit: 10,
          include: 'tags,authors',
          formats: ['html']
        });
        
        const formattedPosts = ghostPosts.map(post => ({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: mapTagToCategory(post.tags?.[0]?.name),
          date: post.published_at,
          image: post.feature_image,
          html: post.html
        }));
        
        setPosts(formattedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

const mapTagToCategory = (tag) => {
  const categoryMap = {
    'aire': 'El poeta jardinero',
    'agua': 'Enredadera del sueño',
    'fuego': 'La fragua cósmica',
    'tierra': 'La casa del jardín',
    'eter': 'Éter'
  };
  return categoryMap[tag?.toLowerCase()] || 'El poeta jardinero';
};