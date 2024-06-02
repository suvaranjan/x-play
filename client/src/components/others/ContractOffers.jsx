import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MyHeading from "./MyHeading";
import {
  myContractOffer,
  rejectContractOffer,
  acceptContractOffer,
  myContracts,
} from "../../apis/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ContractOffers() {
  const token = localStorage.getItem("token");
  const [offers, setOffers] = useState([]);
  const [contract, setContract] = useState(null);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  useEffect(() => {
    fetchContractOffers();
    getMyContracts();
  }, []);

  const fetchContractOffers = async () => {
    setIsLoadingOffers(true);
    try {
      const res = await myContractOffer(token);
      setOffers(res.data.contractOffers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingOffers(false);
    }
  };

  const getMyContracts = async () => {
    setIsLoadingContract(true);
    try {
      const res = await myContracts(token);
      setContract(res.data.teamContract || null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingContract(false);
    }
  };

  const handleAccept = async (offer, teamId) => {
    try {
      await acceptContractOffer(token, offer, teamId);
      toast.success("Contract Accepted Successfully");
      setOffers((prev) => prev.filter((o) => o.team !== teamId));
      getMyContracts();
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  const handleReject = async (teamId) => {
    try {
      await rejectContractOffer(token, teamId);
      toast.success("Contract Rejected Successfully");
      setOffers((prev) => prev.filter((o) => o.team !== teamId));
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  const OfferCard = ({ offer, showButtons, heading, view }) => {
    const navigate = useNavigate();
    return (
      <Card maxW="sm">
        <CardBody>
          <Text textAlign="center" fontSize="1.2rem" fontWeight="500" mb={3}>
            {heading}
          </Text>
          <Divider borderColor="#A0AEC0" />
          <Box
            mt="4"
            fontSize=".9rem"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {[
              ["Team Role", offer.teamRole],
              ["Team Role Name", offer.teamRoleName],
              ["Start Date", new Date(offer.startDate).toLocaleDateString()],
              ["Period", offer.period],
              ["Borrow Fee", offer.borrowFee],
              ["Selling Fee", offer.sellingFee],
              ["Commission on Renting Per Match", offer.commissionOnRenting],
              ["Commission on Winning a Title", offer.commissionOnWinning],
              ["Jersey Number", offer.jerseyNumber],
            ].map(([label, value]) => (
              <Box display="flex" gap={2} key={label}>
                <Text fontWeight="500">{label}:</Text>
                <Text>{value}</Text>
              </Box>
            ))}
            {showButtons && (
              <Box display="flex" justifyContent="space-between" mt="1rem">
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="purple"
                  onClick={() => navigate(`/team/${offer.team}`)}
                >
                  View Team
                </Button>
                <Box display="flex" gap={2}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleReject(offer.team)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    onClick={() => handleAccept(offer, offer.team)}
                  >
                    Accept
                  </Button>
                </Box>
              </Box>
            )}
            {view && (
              <Button
                onClick={() => navigate(`/team/${offer.team}`)}
                mt={2}
                colorScheme="purple"
              >
                View Team
              </Button>
            )}
          </Box>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box mb="3rem">
      <MyHeading
        title="Team Contracts"
        description="Your current team contracts and contract offers appear here"
      />
      <Box className="container" mt="2rem">
        <Heading fontWeight="600" fontSize="1.2rem" mb="1rem">
          Contract Offers
        </Heading>
        {!isLoadingOffers && offers.length === 0 && (
          <Text fontSize="1rem">You have no new contract offer.</Text>
        )}
        {offers.length > 0 &&
          offers.map((offer, index) => (
            <OfferCard
              offer={offer}
              key={index}
              showButtons={true}
              heading="New Team Contract"
              view={false}
            />
          ))}
        {isLoadingOffers && (
          <Center minH="50vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          </Center>
        )}
      </Box>

      <Box className="container" mt="2rem">
        <Heading fontWeight="600" fontSize="1.2rem" mb="1rem">
          Current Team Contract
        </Heading>
        {!isLoadingContract && !contract && (
          <Text fontSize="1rem">You have no signed contract</Text>
        )}
        {contract && (
          <OfferCard
            offer={contract}
            key={contract.team}
            showButtons={false}
            heading="My Contract"
            view={true}
          />
        )}
        {isLoadingContract && (
          <Center minH="50vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default ContractOffers;
