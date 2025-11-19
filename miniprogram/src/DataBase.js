/***************************************************************************************************************************
 * DataBase.js 替换微信云开发的云数据库功能
 * 使用方式：
 * 1. DB 类
 *   直接 new 就好，初始时 DB 内部有一个 collections 对象，这就是数据库的所有数据存放的位置。
 *   但是本文件已经 new 一个作为全局数据库了，所以可以直接使用本文件 export 出去的 
 * 2. collections 对象
 *   collections 对象的每一个属性都是一个列表(数组)，这个概念类似于数据库里的*表*
 *   属性名表示表的名称（唯一），属性值就是一个列表，列表内存放若干个对象，对象内有各个字段。
 * 3. 如何使用 
 *   可以参考下面的 goodsList, 该变量预先定义，在这里写好需要存放的数据，然后再 DB 类的 initDataBase 里将其添加到数据库中
 *      goodsList.forEach(i => {
 *          this.collection("goods").add(i)
 *      })
 *   比如，这里我将 goodsList 中的每一条数据依次添加到名为 goods 的 collection 中
 *   collection 需要传入一个名称， 若该名称对应的 collection 不存在，则新建并添加数据，否则直接添加数据
 * 
 *   除此之外，DB 拥有完备的增删改查的功能，支持limit限制和条件搜索，使用方法和微信小程序的云数据库相对一致（好啊）
 */
import { storage } from "Storage";
var asset = (url) => storage.get(url)



/**************************************************************************************************************************
 *  商品列表数据开始
 *  商品数据有如下字段:
 *    - name: 商品名称
 *    - image: 商品图片（通过Storage.js索引）
 *    - price: 商品价格
 *    - desc: 商品描述
 *    - reviews: 一个数组，存放所有评论(以后可能会单独放在一个数据库内)
 *      - user: 用户名
 *      - avatar: 头像
 *      - star: 评分(n星好评)
 *      - content: 评论内容
 *    - attrs: 一个数组，存放所有规格（属性）
 *      - name: 规格的一个分类的名称(e.g. 颜色)
 *      - options: 该分类下所有的规格
 *        - name: 单个规格的名称(e.g. 红色)
 * 
 */
let goodsList = [
    {
        name: "夏布老虎玩偶",
        image: asset("/images/老虎.png"),
        price: 80.0,
        inventory: 112,
        desc: "大师手作 传世收藏",
        attrs: [
            {
                name: "颜色",
                options: [
                    { name: '蓝色' },
                    { name: '灰色' },
                    { name: '棕色' }
                ]
            },
            {
                name: "测试",
                options: [
                    { name: "1" },
                    { name: "2" }
                ]
            }
        ],
        // 轮播图
        swiperImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        // 详情图
        detailImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        reviews: [
            { user: '老虎', avatar: asset("/images/头像.png"), star: 5, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '老虎', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '老虎', avatar: asset("/images/头像.png"), star: 3, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '老虎', avatar: asset("/images/头像.png"), star: 2, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '老虎', avatar: asset("/images/头像.png"), star: 1, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' }
        ],
    },
    {
        name: "夏布围巾",
        desc: "传统工艺 手绘青花",
        image: asset("/images/围巾.png"),
        price: 158.0,
        inventory: 112,
        attrs: [
            {
                name: "颜色",
                options: [
                    { name: '蓝色' },
                    { name: '灰色' },
                    { name: '棕色' }
                ]
            },
            {
                name: "测试",
                options: [
                    { name: "1" },
                    { name: "2" }
                ]
            }
        ],
        // 轮播图
        swiperImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        // 详情图
        detailImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        reviews: [
            { user: '围巾', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '围巾', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' }
        ],
    },
    {
        name: "夏布手提包",
        desc: "百年工艺 夏日清凉",
        image: asset("/images/手提包.png"),
        price: 67.0,
        inventory: 112,
        attrs: [
            {
                name: "颜色",
                options: [
                    { name: '蓝色' },
                    { name: '灰色' },
                    { name: '棕色' }
                ]
            },
            {
                name: "测试",
                options: [
                    { name: "1" },
                    { name: "2" }
                ]
            }
        ],
        // 轮播图
        swiperImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        // 详情图
        detailImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        reviews: [
            { user: '手提包', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '手提包', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' }
        ],
    },
    {
        name: "夏布胸花",
        desc: "天然植物染色 手工制作",
        image: asset("/images/胸花.png"),
        price: 59.0,
        inventory: 112,
        attrs: [
            {
                name: "颜色",
                options: [
                    { name: '蓝色' },
                    { name: '灰色' },
                    { name: '棕色' }
                ]
            },
            {
                name: "测试",
                options: [
                    { name: "1" },
                    { name: "2" }
                ]
            }
        ],
        // 轮播图
        swiperImages: [
            asset("/images/胸花.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        // 详情图
        detailImages: [
            asset("/images/老虎.png"),
            asset("/images/老虎.png"),
            asset("/images/老虎.png")
        ],
        reviews: [
            { user: '胸花', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: '胸花', avatar: asset("/images/头像.png"), star: 4, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' }
        ],

    },
    {
        name: "测试商品",
        desc: "测试描述",
        image: asset("/images/地图.png"),
        price: 999.99,
        inventory: 999999999,
        attrs: [
            {
                name: "颜色",
                options: [
                    { name: '蓝色' },
                    { name: '灰色' },
                    { name: '棕色' }
                ]
            },
            {
                name: "测试",
                options: [
                    { name: "test1" },
                    { name: "test2" }
                ]
            }
        ],
        // 轮播图
        swiperImages: [
            asset("/images/地图.png"),
            asset("/images/老虎.png"),
            asset("/images/围巾.png")
        ],
        // 详情图
        detailImages: [
            asset("/images/地图.png"),
            asset("/images/手提包.png"),
            asset("/images/头像.png")
        ],
        reviews: [
            { user: 'User1', avatar: asset("/images/头像.png"), star: 5, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' },
            { user: 'User2', avatar: asset("/images/头像.png"), star: 1, content: '入手很多，活动力度大，长短合适，颜色好看，质量好，不愧是非遗工艺。第一次看到这样的质量' }
        ],
    },
]
/*************************************************************************************************************************
 * 商品列表数据结束
 */


/*************************************************************************************************************************
 * 用户数据开始 
 * 由于 DB 会自动添加 id 所以不需要单独添加 id
 * 字段:
 *   - username: 用户名
 *   - password: 密码
 *   - phone_number: 电话号码
 *   - address: 地址对象
 *     - pos: 地址的值
 *     - default: 是否为默认地址
 *   - cart: 购物车清单
 *     - id: 商品的 id
 *     - selectedAttr: 一个数组，包含已选的规格
 *     - num: 已选的数量
 *     - selected: 是否被选中(购物车页面需要计算被选中的所有商品的总价格)
 * 
 */
let userData = [
    {
        username: "User1",
        password: "123456",
        phone_number: "12345678910",
        address: [
            { pos: "中国重庆市北碚区天生路101", default: true }
        ],
        cart: [
        ]
    },
    {
        username: "User2",
        password: "666666",
        phone_number: "12345678911",
        address: [
            { pos: "中国重庆市北碚区天生路102", default: false },
            { pos: "中国重庆市北碚区天生路103", default: true }
        ],
        cart: [
        ]
    }

]

/*************************************************************************************************************************
 * 用户数据结束
 * 
 */




class DB {
    constructor() {
        this.collections = {};
    }
    initDataBase() {
        goodsList.forEach(i => {
            this.collection("goods")
                .add(i)
        })
        userData.forEach(i => {
            this.collection("users")
                .add(i)
        })



        // 添加测试用购物车商品
        let cartList = [];
        (async () => {
            let getGoodsId = name => this.collection("goods")
                .where({ name })
                .get()
                .then(res => res.data[0]._id)
            cartList.push({
                id: await getGoodsId("夏布老虎玩偶"),
                selectedAttr: ["红色", "大"],
                num: 1,
                selected: true

            })
            cartList.push({
                id: await getGoodsId("夏布胸花"),
                selectedAttr: ["白色", "中"],
                num: 2,
                selected: false

            })
            cartList.push({
                id: await getGoodsId("夏布围巾"),
                selectedAttr: ["蓝色", "小"],
                num: 3,
                selected: true
            })


            this.collection("users")
                .update({
                    username: "User1",
                }, {
                    cart: cartList
                }).then(e => {
                    this.collection("users").get().then(e => {
                        console.log(e)
                        console.log(this.collections)
                    })
                })
        })()


        /**
         * 在这里添加数据库数据，可以参考上面的 goodsList 和 cartList 的添加方式
         * 由于购物车与商品id挂钩，商品 id 不能提前预知，所以在此处模拟添加购物车的过程，而不是直接写入数据
         */


    }

    /**
     * @returns 随机字符串 id
     */
    generateId() {
        return Math.random().toString(36).substr(2, 10) + Date.now().toString(36);
    }

    collection(name) {
        if (!this.collections[name]) {
            this.collections[name] = [];
        }
        const queryChain = {
            condition: {}, // 查询条件
            limitCount: null, // 限制数量
            collectionName: name // 所属集合名
        };
        return {
            where(condition) {
                queryChain.condition = condition;
                return this;
            },

            // 设置限制数量
            limit(count) {
                queryChain.limitCount = count;
                return this;
            },
            add: (data) => {
                const _id = this.generateId();
                const newData = { _id, ...data };
                this.collections[name].push(newData);
                return Promise.resolve({ _id, data: newData });
            },
            get: () => {
                let result = [...this.collections[queryChain.collectionName]];
                // 应用查询条件
                if (Object.keys(queryChain.condition).length > 0) {
                    result = result.filter(item => {
                        return Object.keys(queryChain.condition).every(key => {
                            return item[key] === queryChain.condition[key];
                        });
                    });
                }
                // 应用limit限制
                if (queryChain.limitCount !== null && queryChain.limitCount > 0) {
                    result = result.slice(0, queryChain.limitCount);
                }
                return Promise.resolve({ data: result });
            },

            update: (condition, data) => {
                let updatedCount = 0;
                this.collections[name] = this.collections[name].map(item => {
                    const isMatch = Object.keys(condition).every(key => item[key] === condition[key]);
                    if (isMatch) {
                        updatedCount++;
                        return { ...item, ...data };
                    }
                    return item;
                });
                return Promise.resolve({ updated: updatedCount });
            },

            remove: (condition) => {
                const originalLength = this.collections[name].length;
                this.collections[name] = this.collections[name].filter(item => {
                    return !Object.keys(condition).every(key => item[key] === condition[key]);
                });
                const deletedCount = originalLength - this.collections[name].length;
                return Promise.resolve({ deleted: deletedCount });
            }
        };
    }
}

export const db = new DB();