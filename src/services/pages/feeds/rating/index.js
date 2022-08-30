import { feedsURL }                           from "..";
import { Put, Post, Delete }                  from "../../../core/request";


//POST
const submitRating             = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.ratingPrefix}/${feedsURL.create}`,data);
const getRatingByAgentReport   = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.ratingPrefix}/${feedsURL.feedsByAgentReport}`, data);

//PUT
const updateRating             = (data) => Put(`${feedsURL.feedsPrefix}/${feedsURL.ratingPrefix}/${feedsURL.update}`,data);

//DELETE
const deleteRating             = (data) => Delete(`${feedsURL.feedsPrefix}/${feedsURL.ratingPrefix}/${feedsURL.feedsDeleteByUser}`, data);

const feedsRatingAPI = {
    submitRating,
    getRatingByAgentReport,

    updateRating,

    deleteRating
};

export default feedsRatingAPI;