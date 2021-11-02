/*
 * @Description: 
 * @Author: 老纪
 * @Date: 2021-11-01 16:24:46
 * @LastEditTime: 2021-11-01 16:24:46
 */
import { HTTP } from '../util/http-p.js'
class BookModel extends HTTP {
    //  获取精选书籍数据
    getHotList() {
        // 返回的是一个promise
        return this.request({
            url: 'book/hot_list',
        })
    }
    getMyBookCount() {
            return this.request({
                url: 'book/favor/count',
            })
        }
        // 获取图书详情：
    getDetail(bid) {
            return this.request({
                // url: 'book/' + bid + '/detail'
                url: `book/${bid}/detail`
            })
        }
        // 获取图书详情内的点赞状态:
    getLikeStatus(bid) {
            return this.request({
                url: 'book/' + bid + '/favor'
            })
        }
        // 获取图书详情内的评论
    getComments(bid) {
            return this.request({
                url: 'book/' + bid + '/short_comment'
            })
        }
        // 提交用户评论
    postComment(bid, comment) {
        // 返回this.request的promise对象
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
}
export { BookModel }