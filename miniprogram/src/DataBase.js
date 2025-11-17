/**
 * DataBase.js 替换微信云开发的云数据库功能
 */
import { storage } from "Storage";
var asset = (url) => storage.get(url) 

let goodsList = [
    {
        name: "夏布老虎玩偶",
        image: asset("/images/老虎.png"),
        price: 80.0,
        desc: "大师手作 传世收藏"
    },
    {
        name: "夏布围巾",
        desc: "传统工艺 手绘青花",
        image: asset("/images/围巾.png"),
        price: 158.0
    },
    {
        name: "夏布手提包",
        desc: "百年工艺 夏日清凉",
        image: asset("/images/手提包.png"),
        price: 67.0
    },
    {
        name: "夏布胸花",
        desc: "天然植物染色 手工制作",
        image: asset("/images/胸花.png"),
        price: 59.0

    }
]

class DB {
    constructor() {
        this.collections = {};
    }
    initDataBase() {
        goodsList.forEach(i => {
            this.collection("goods").add(i)
        })



    }

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