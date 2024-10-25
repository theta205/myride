import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const useFetchProfileData = ( key, setKey, isSignedIn, tryedFetch, setTryedFetch, inputData, setData, setError, navigate, username) => {
  const { user, isLoaded } = useUser();
  
    useEffect(() => {
      console.log("tryed ",tryedFetch)
      if (isLoaded && !tryedFetch ){
        console.log("inside fetch");
        const fetchData = async () => {
          if (!key && isSignedIn && !username) {
            await setKey(user.username)
            console.log("key is",key)
          }
          else if (!key && username){
            await setKey(username)
          }
          else { try {
            const response = await fetch(`/api/getprofiles/${key}`);
            if (!response.ok) {
              console.log("Error");
              throw new Error('Failed to fetch profile data');
            }
            const profileData = await response.json();
            setData(profileData);
            setTryedFetch(true);
            console.log("fetched. data is ", profileData);
            
          } catch (err) {
            // Only update the error if it's different
            setError((prevError) => prevError !== err.message ? err.message : prevError);
            console.log("Error fetching data", err);
            setTryedFetch(true)
            const def = {
              year: "1995",
              make: "Mazda", 
              model: "MX-5 Miata",
              power: "0",
              torque: "0",
              drivetrain: "RWD",
              hashtags: "#hashtag",
              lightColor: "bisque",
              mainColor: "lightsalmon",
              darkColor: "darksalmon",
              mods: []}
              setData(def)
          }}
        };
        console.log("fetching");
        fetchData();
        console.log("after fetch");
      console.log("in useEffect still");
      console.log("leaving fetch",tryedFetch,"data is (set in fetch)", inputData,"key",key);
      }
    }, [ key, isSignedIn, navigate, tryedFetch, setTryedFetch, setData]); // Removed inputData and setError from the dependency array
 
};
  export default useFetchProfileData;