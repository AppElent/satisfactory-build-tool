import { useLocation, useNavigate } from 'react-router-dom';

const useQueryParam = (param) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Get the current query parameters
  const queryParams = new URLSearchParams(search);

  // Getter: Return the value of the requested query param
  const getParam = () => queryParams.get(param);

  // Setter: Update the query param in the URL
  const setParam = (value) => {
    if (value) {
      queryParams.set(param, value); // Add or update the parameter
    } else {
      queryParams.delete(param); // Remove the parameter if the value is null/undefined
    }
    // Update the URL without reloading the page
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  return [getParam(), setParam];
};

export default useQueryParam;
