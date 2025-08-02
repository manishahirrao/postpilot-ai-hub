import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Solutions index page that redirects to the first available solutions page
 */
const SolutionsIndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first solutions page
    navigate('/solutions/why-us', { replace: true });
  }, [navigate]);

  // Return null or a loading indicator while redirecting
  return null;
};

export default SolutionsIndexPage;
