//汉化杂项
var cnItems = {
    'Fists': '拳头',
    'None': '无',
    'If you can use them to punch trees (not in this game though), then why not use them to punch your enemies?': '如果你可以用它们来击打树(不是在这个游戏中)那为什么不用它们来打你的敌人呢?',
    'Scissors': '剪刀',
    'Knife': '小刀',
    'Hammer': '锤子',
    'Headphones': '耳机',
    'mouse': '老鼠',
    'A basic kitchen knife that has been specifically modified to suit all your killing needs.': '一种基本的菜刀，经过特别改装，以满足你所有的杀戮需要。',
    'This pair of headphones can absorb much more damage against camels.': '这对耳机可以吸收更多来自骆驼的伤害。。',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

};

function cnItem(text) {
    //数组里面有的，返回中文
    for (var i in cnItems) {
        if (text == i) {
            return cnItems[i];
        }
    }
    //数组里面没有的，原样返回
    for (var i in cnItems) {
        if (text != i) {
            console.log("需汉化的英文Item：" + text);
            return text;
        }
    }
}



//汉化标题
var cntit = {
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    

};

function cntitle(text) {
    //数组里面有的，返回中文
    for (var i in cntit) {
        if (text == i) {
            return cntit[i];
        }
    }
    //数组里面没有的，原样返回
    for (var i in cntit) {
        if (text != i) {
            console.log("需汉化的英文标题：" + text);
            return text;
        }
    }
}

