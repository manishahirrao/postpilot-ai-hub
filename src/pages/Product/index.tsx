import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Product index page that redirects to the first available product page
 */
const ProductIndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first product page
    navigate('/product/post-generation', { replace: true });
  }, [navigate]);

  // Return null or a loading indicator while redirecting
  return null;
};

export default ProductIndexPage;
