import { useEffect } from 'react';

const useFetchProfileData = (key, isLoaded, isSignedIn, setData, setError, navigate) => {
  useEffect(() => {
    if (isLoaded) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/getprofiles/${key}`);
          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }
          const profileData = await response.json();
          setData(profileData); // Update state with fetched data
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    } else if (isLoaded && !isSignedIn) {
      navigate('/'); // Redirect if the user is not signed in
    }
  }, [isLoaded, isSignedIn, navigate, key, setData, setError]); // Include setData and setError in the dependency array
};

export default useFetchProfileData;
