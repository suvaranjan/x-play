import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getSingleTeam } from "../../apis/api";
import { useEffect, useState } from "react";
import TeamHeader from "./TeamHeader";
import TeamMembers from "./TeamMembers";
import Loading2 from "../lottie/Loading2";

function TeamParent() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginUserManager, setIsLoginUserManager] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      const res = await getSingleTeam(token, id);
      console.log(res);
      setTeam(res.data.team);
      setIsLoginUserManager(res.data.isManager);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box minH="100vh" mb="4rem">
        {!isLoading && (
          <>
            <TeamHeader team={team} isLoginUserManager={isLoginUserManager} />
            <TeamMembers
              isLoginUserManager={isLoginUserManager}
              players={team.players}
              teamId={team._id}
            />
          </>
        )}
        {isLoading && <Loading2 />}
      </Box>
    </>
  );
}

export default TeamParent;
