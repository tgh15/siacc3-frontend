import { feedsURL }                             from "..";
import { Post, Delete, Put }                    from "../../../core/request";

//Post
const checkLike                                 = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsLike}/${feedsURL.feedsUserLikeCheck}`, data);
const createLike                                = (data) => Post(`${feedsURL.feedsPrefix}/${feedsURL.feedsLike}/${feedsURL.create}`, data);

//Put
const updateLike                                = (data) => Put(`${feedsURL.feedsPrefix}/${feedsURL.feedsLike}/${feedsURL.update}`, data);

//Delete
const deleteLike                                = (data) => Delete(`${feedsURL.feedsPrefix}/${feedsURL.feedsLike}/${feedsURL.feedsDeleteByUser}`, data);

const LikeAPI = {
    
    //Post
    checkLike,
    createLike, 

    //Put
    updateLike,

    //Delete
    deleteLike, 
}

export default LikeAPI;