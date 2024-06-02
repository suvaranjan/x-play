import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { getPlayerProfile, getUser } from "../../apis/api";
import MyHeading from "../others/MyHeading";
import useStore from "../../zustand/store";
import Loading2 from "../lottie/Loading2";
import PlayerProfile from "./PlayerProfile";
import ManagerProfile from "./ManagerProfile";

function Profile() {
  const token = localStorage.getItem("token");
  const { user, setUser } = useStore((state) => state);
  const [playerData, setPlayerData] = useState({});
  const [userData, setUserData] = useState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(playerData).length === 0) {
      fetchPlayerdata();
    } else {
      setIsLoading(false);
    }

    // if (!user) {
    fetchUser();
    // }
  }, []);

  const fetchPlayerdata = async () => {
    try {
      setIsLoading(true);
      const res = await getPlayerProfile(token);
      console.log(res.data);
      setPlayerData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setIsUserLoading(true);
      const res = await getUser(token);
      setUserData(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  };

  return (
    <Box mb="3rem">
      <MyHeading title="Profile" description="Personalized user information" />

      {isLoading && <Loading2 />}

      {!isLoading && user.userType === "Player" && (
        <PlayerProfile userData={playerData} />
      )}
      {!isUserLoading && user.userType !== "Player" && (
        <ManagerProfile user={userData} />
      )}
    </Box>
  );
}

export default Profile;
