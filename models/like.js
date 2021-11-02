/*
 * @Description: 
 * @Author: 老纪
 * @Date: 2021-10-29 16:44:14
 * @LastEditTime: 2021-10-29 17:02:32
 */
import {
    HTTP
} from "../util/http.js";
class LikeModel extends HTTP {
    likePost(behavior, artID, category) {
            let url = behavior == 'like' ? 'like' : 'like/cancel'
            this.request({
                url: url,
                method: "POST",
                data: {
                    art_id: artID,
                    type: category
                }
            })
        }
        //获取 期刊的期刊号
    getClassicLikeStatus(artID, category, sCallback) {
        this.request({
            url: 'classic/' + category + '/' + artID + '/favor',
            success: sCallback
        })
    }
}
export { LikeModel }