/**
 * Storage.js 替换微信云开发的云存储功能
 */
const data = {
    icons: {

    },
    images: {
        "围巾.png": "https://i.postimg.cc/k4L8L1sr/wei-jin.png",
        "地图.png": "https://i.postimg.cc/Y9vYnK1x/de-tu.png",
        "头像.png":"https://i.postimg.cc/V62M2GRh/tou-xiang.png",
        "头像 (2).png": "https://i.postimg.cc/KzCLCqN0/tou-xiang-(2).png",
        "头像 (3).png": "https://i.postimg.cc/vBC9Cqzq/tou-xiang-(3).png",
        "头像 (4).png": "https://i.postimg.cc/26gvgcwX/tou-xiang-(4).png",
        "头像 (5).png": "https://i.postimg.cc/1tb6bCHj/tou-xiang-(5).png",
        "手提包.png": "https://i.postimg.cc/gJ1R1SDt/shou-ti-bao.png",
        "老虎.png": "https://i.postimg.cc/MTgRgPDs/lao-hu.png",
        "胸花.png": "https://i.postimg.cc/3RzpzS1x/xiong-hua.png",
        "胸花 (2).png": "https://i.postimg.cc/G26Y67Kw/xiong-hua-(2).png",
        "胸花 (3).png": "https://i.postimg.cc/76j7js9k/xiong-hua-(3).png",
        "胸花 (4).png": "https://i.postimg.cc/FRwcwWph/xiong-hua-(4).png",
        "购物车围巾.png": "https://i.postimg.cc/nzXBRbv6/gou-wu-che-wei-jin.png",
        "购物车手提包.png": "https://i.postimg.cc/hjXTyWLF/gou-wu-che-shou-ti-bao.png",
        "购物车老虎.png": "https://i.postimg.cc/k42K13xH/gou-wu-che-lao-hu.png",
        "购物车胸花.png": "https://i.postimg.cc/j5DPg0z9/gou-wu-che-xiong-hua.png",
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
        "围巾1.png":"https://youke1.picui.cn/s1/2025/11/18/691b48c613a46.png"
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
    return current !== undefined ? current : undefined;
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