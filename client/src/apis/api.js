import axios from 'axios'

export const baseUrl = "http://localhost:3000/api";


const getHeader = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};


export const getMyTeams = async (token, currentPage) => {

    const response = await axios.get(`${baseUrl}/team/my-teams?page=${currentPage}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getAllTeams = async (token, currentPage) => {

    const response = await axios.get(`${baseUrl}/team/all-teams?page=${currentPage}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getMyReminders = async (token, currentPage) => {

    const response = await axios.get(`${baseUrl}/reminder?page=${currentPage}`, {
        headers: getHeader(token),
    });

    return response;
};


export const getSingleTeam = async (token, teamId) => {

    const response = await axios.get(`${baseUrl}/team/${teamId}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getPlayersBySearch = async (token, keyword) => {

    const response = await axios.get(`${baseUrl}/player/search-players?search=${keyword}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getAllTeamsBySearch = async (token, keyword) => {

    const response = await axios.get(`${baseUrl}/team/search-all-teams?search=${keyword}`, {
        headers: getHeader(token),
    });

    return response;
};

export const getMyTeamsBySearch = async (token, keyword) => {

    const response = await axios.get(`${baseUrl}/team/search-my-teams?search=${keyword}`, {
        headers: getHeader(token),
    });

    return response;
};

export const sendTeamInviteToPlayer = async (token, teamId, playerId) => {

    const response = await axios.post(`${baseUrl}/player/send-invite`, { teamId, playerId }, {
        headers: getHeader(token),
    });

    return response;
};

export const createTeam = async (token, data) => {

    const response = await axios.post(`${baseUrl}/team/create-team`, data, {
        headers: getHeader(token),
    });

    return response;
};

export const updateTeam = async (token, data, teamId) => {

    const response = await axios.put(`${baseUrl}/team/update-team/${teamId}`, data, {
        headers: getHeader(token),
    });

    return response;
};

export const newNotificationCount = async (token) => {

    const response = await axios.get(`${baseUrl}/notifications/new-notification-count`, {
        headers: getHeader(token),
    });

    return response;
};

export const getNotifications = async (token) => {

    const response = await axios.get(`${baseUrl}/notifications`, {
        headers: getHeader(token),
    });

    return response;
};

export const fetchTeamInvitations = async (token) => {

    const response = await axios.get(`${baseUrl}/player/team-invitations`, {
        headers: getHeader(token),
    });

    return response;
};

export const acceptTeamInvitation = async (token, teamId) => {

    const response = await axios.post(`${baseUrl}/player/accept-team-invite`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export const rejectTeamInvitation = async (token, teamId) => {

    const response = await axios.post(`${baseUrl}/player/reject-team-invite`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export const sendContractOffer = async (token, playerId, teamId, offerDetails) => {

    const response = await axios.post(`${baseUrl}/team/contract-offer-player`, { playerId, teamId, offerDetails }, {
        headers: getHeader(token),
    });

    return response;
};

export const rejectContractOffer = async (token, teamId) => {

    const response = await axios.post(`${baseUrl}/player/reject-contract-offer`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};
export const acceptContractOffer = async (token, offerDetails, teamId) => {

    const response = await axios.post(`${baseUrl}/player/accept-contract-offer`, { offerDetails, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export const myContractOffer = async (token) => {

    const response = await axios.get(`${baseUrl}/player/contract-offers`, {
        headers: getHeader(token),
    });

    return response;
};

export const checkManagerAndGetTeams = async (token) => {

    const response = await axios.get(`${baseUrl}/user/get-check-manager-teams`, {
        headers: getHeader(token),
    });

    return response;
};

export const myContracts = async (token) => {

    const response = await axios.get(`${baseUrl}/player/my-contracts`, {
        headers: getHeader(token),
    });

    return response;
};

export const getPlayerProfile = async (token) => {

    const response = await axios.get(`${baseUrl}/player/profile`, {
        headers: getHeader(token),
    });

    return response;
};

export const checkPlayerTeamStatus = async (token) => {

    const response = await axios.get(`${baseUrl}/player/check-player-team-status`, {
        headers: getHeader(token),
    });

    return response;
};

export const teamJoinReq = async (token, teamId) => {

    const response = await axios.post(`${baseUrl}/player/join-req-to-team`, { teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export const teamJoinReqReject = async (token, playerId, teamId) => {

    const response = await axios.post(`${baseUrl}/team/team-join-req-reject`, { playerId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export const teamJoinReqAccept = async (token, playerId, teamId) => {

    const response = await axios.post(`${baseUrl}/team/team-join-req-accept`, { playerId, teamId }, {
        headers: getHeader(token),
    });

    return response;
};

export const getTeamJoinReqs = async (token) => {

    const response = await axios.get(`${baseUrl}/team/get-join-requests`, {
        headers: getHeader(token),
    });

    return response;
};

export const markReadNotification = async (token, nId) => {

    const response = await axios.put(`${baseUrl}/notifications/mark-as-read/${nId}`, {}, {
        headers: getHeader(token),
    });

    return response;
};

export const markAllReadNotifications = async (token) => {

    const response = await axios.put(`${baseUrl}/notifications/mark-all-as-read`, {}, {
        headers: getHeader(token),
    });

    return response;
};

export const deleteAllNotifications = async (token) => {

    const response = await axios.delete(`${baseUrl}/notifications`, {
        headers: getHeader(token),
    });

    return response;
};

export const getUser = async (token) => {

    const response = await axios.get(`${baseUrl}/user`, {
        headers: getHeader(token),
    });

    return response;
};

export const getUserCreatedTeams = async (token) => {

    const response = await axios.get(`${baseUrl}/user/my-created-teams`, {
        headers: getHeader(token),
    });

    return response;
};


export const sendReminder = async (token, data) => {

    const response = await axios.post(`${baseUrl}/reminder/send-reminder`, { data }, {
        headers: getHeader(token),
    });

    return response;
};