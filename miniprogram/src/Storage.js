/**
 * Storage.js 替换微信云开发的云存储功能
 * 其实这是个模仿文件系统的类，但是这样确实有点多余了，暂时用不到
 * 使用方法：
 * 对象 -> 文件夹
 * 数据 -> 文件 
 * data 相当于根目录
 * data 的属性如果是一个对象，则代表是一个文件夹 举例:
 *   data = {
 *      icons: {},
 *      images: {
 *          "file1.txt": "123",
 *          "file2.txt": "hello world"
 *      }
 *   }
 * 上述结构代表根目录下有两个文件夹：icons 和 images, 其中 icons 为空文件夹，images 里有file1 和 file2两个文件
 * file1 的内容是 "123"
 * file2 的内容是 "hello world"
 * 然后就可以通过 storage.get 通过路径获取到“文件”, 比如:
 * storage.get("/images/file1.txt") 
 * 
 * 当然，这样的实质性作用并不大，只是文件系统更方便理解罢了
 * 
 */


const data = {
    icons: {

    },
    images: {
        "围巾.png": "https://youke1.picui.cn/s1/2025/11/18/691bf4a8578b1.png",
        "地图.png": "https://youke1.picui.cn/s1/2025/11/18/691bf433ec4ac.png",
        "头像.png":"https://youke1.picui.cn/s1/2025/11/18/691bf4a69f3ab.png",
        "头像 (2).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4673d306.png",
        "头像 (3).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4670dcb1.png",
        "头像 (4).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4a5dc71b.png",
        "头像 (5).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4a68ab93.png",
        "手提包.png": "https://youke1.picui.cn/s1/2025/11/18/691bf46861b96.png",
        "老虎.png": "https://youke1.picui.cn/s1/2025/11/18/691bf467b80b5.png",
        "胸花.png": "https://youke1.picui.cn/s1/2025/11/18/691bf4d2371ab.png",
        "胸花 (2).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4a966870.png",
        "胸花 (3).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4d23c228.png",
        "胸花 (4).png": "https://youke1.picui.cn/s1/2025/11/18/691bf4d0ce002.png",
        "购物车围巾.png": "https://youke1.picui.cn/s1/2025/11/18/691bf432d9fe2.png",
        "购物车手提包.png": "https://youke1.picui.cn/s1/2025/11/18/691bf432d7698.png",
        "购物车老虎.png": "https://youke1.picui.cn/s1/2025/11/18/691bf432c37bb.png",
        "购物车胸花.png": "https://youke1.picui.cn/s1/2025/11/18/691bf467404dc.png",
        "更多.png":"https://youke1.picui.cn/s1/2025/11/17/691b3c6e1bfc3.png",
        "加号.png":"https://youke1.picui.cn/s1/2025/11/17/691b3c6f5178c.png",
        "花1.png":"https://youke1.picui.cn/s1/2025/11/17/691b3c6fb5bcb.png",
        "花2.png":"https://youke1.picui.cn/s1/2025/11/17/691b3c6f90dc1.png",
        "布包.png":"https://youke1.picui.cn/s1/2025/11/17/691b3c6fa2d2c.png",
        "avatar1.png":"https://youke1.picui.cn/s1/2025/11/17/691b3f75881d8.png",
        "avatar2.png":"https://youke1.picui.cn/s1/2025/11/17/691b3f7681b49.png",
        "avatar3.png":"https://youke1.picui.cn/s1/2025/11/17/691b3f766c2d1.png",
        "avatar4.png":"https://youke1.picui.cn/s1/2025/11/17/691b3f767b455.png",
        "摄影.png":"https://youke1.picui.cn/s1/2025/11/17/691b40f2ddc37.png",
        "购物车.png":"https://youke1.picui.cn/s1/2025/11/17/691b40f325637.png",
        "购物车空(1).png":"https://youke1.picui.cn/s1/2025/11/17/691b40f329ed2.png",
        "挑战.png":"https://youke1.picui.cn/s1/2025/11/17/691b40f308db9.png",
        "待评价.png":"https://youke1.picui.cn/s1/2025/11/18/691b48b2951c2.png",
        "待收货.png":"https://youke1.picui.cn/s1/2025/11/18/691b48b332e44.png",
        "待付款.png":"https://youke1.picui.cn/s1/2025/11/18/691b48b32454d.png",
        "待发货.png":"https://youke1.picui.cn/s1/2025/11/18/691b48b33cb6a.png",
        "userimg.png":"https://youke1.picui.cn/s1/2025/11/18/691b48b33a373.png",
        "浏览记录.png":"https://youke1.picui.cn/s1/2025/11/18/691b48bdb4982.png",
        "设置.png":"https://youke1.picui.cn/s1/2025/11/18/691b48be22195.png",
        "收藏夹.png":"https://youke1.picui.cn/s1/2025/11/18/691b48beb3a55.png",
        "收货地址.png":"https://youke1.picui.cn/s1/2025/11/18/691b48beb4a37.png",
        "售后.png":"https://youke1.picui.cn/s1/2025/11/18/691b48bfdbe2a.png",
        "优惠券.png":"https://youke1.picui.cn/s1/2025/11/18/691b48c5c2ff1.png",
        "玩偶.png":"https://youke1.picui.cn/s1/2025/11/18/691b48c5c059a.png",
        "围巾1.png":"https://youke1.picui.cn/s1/2025/11/18/691b48c613a46.png",
        "编辑icon.png":"https://youke1.picui.cn/s1/2025/11/19/691d34967ad5d.png",
        "客服.png":"https://youke1.picui.cn/s1/2025/11/20/691f06e7624bf.png",
        "跳转.png":"https://youke1.picui.cn/s1/2025/11/20/691f33663c19b.png",
        "up.png":"https://youke1.picui.cn/s1/2025/11/21/691fdfe347486.png",
        "down.png":"https://youke1.picui.cn/s1/2025/11/21/691fdfe34a96d.png",
        "white-setting.png":"https://youke1.picui.cn/s1/2025/11/21/692011f1a8f8f.png"
    }

}


class Storage {
  constructor() {
    this.data = data
  }

  /**
   * 通过以 / 开头的路径读取值
   * @param {string} path - 路径字符串（必须以 / 开头，如 '/user/info/name'）
   * @param {any} defaultValue - 路径不存在时的默认返回值（默认 undefined）
   * @returns {any} 路径对应的值或默认值
   */
  get(path) {
    const defaultValue = ""

    // 分割路径为片段（去除开头的空字符串，过滤空片段）
    // 例如 '/user/info/name' → ['user', 'info', 'name']
    const segments = path.split('/').filter(segment => segment.trim() !== '');

    // 从数据源开始逐层查找
    let current = this.data;
    for (const segment of segments) {
      // 若当前层级不存在，返回默认值
      if (current === null || current === undefined) {
        return defaultValue;
      }
      // 进入下一层级（支持对象键名或数组索引）
      current = current[segment];
    }

    // 返回最终值（若为undefined则返回默认值）
    return current !== undefined ? current : "";
  }

  /**
   * 更新数据源
   * @param {object} newData - 新的数据源对象
   */
  updateData(newData) {
    this.data = newData;
  }
}


export const storage = new Storage();