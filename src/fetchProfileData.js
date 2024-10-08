import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const useFetchProfileData = ( key, isSignedIn, tryedFetch, setTryedFetch, inputData, setData, setError, navigate) => {
  const { user, isLoaded } = useUser();
  
    useEffect(() => {
      console.log("tryed ",tryedFetch==undefined)
      if (isLoaded){
        if (!key) {
          key = user.username
          console.log("key is",key)
        }
      if (key && !tryedFetch && tryedFetch!=undefined) {
        console.log("inside fetch");
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/getprofiles/${key}`);
            if (!response.ok) {
              console.log("Error");
              throw new Error('Failed to fetch profile data');
            }
            const profileData = await response.json();
            setData(profileData);
            setTryedFetch(true);  // Correct way to update inputData state
            console.log("fetched. data is ", profileData);
            
          } catch (err) {
            // Only update the error if it's different
            setError((prevError) => prevError !== err.message ? err.message : prevError);
            console.log("Error fetching data", err);
            setTryedFetch(true)
          }
        };

        console.log("fetching");
        fetchData();
        console.log("after fetch");
      } 
      console.log("in useEffect still");
      console.log("leaving fetch",tryedFetch,"data is (set in fetch)", inputData,"key",key);

      }
    }, [ key, isSignedIn, navigate, tryedFetch, setTryedFetch, setData]); // Removed inputData and setError from the dependency array
 
};
  export default useFetchProfileData;
