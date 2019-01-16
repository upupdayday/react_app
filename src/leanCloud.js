import AV from "leancloud-storage";

let APP_ID = 'dhYg6BSLvBAIcEn7O9Dtu1Eh-gzGzoHsz';
let APP_KEY = '6XYtn3IGuw5Sx9MiQO4b61Px';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

function signUp(email, username, password, successFn, errorFn){
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.setEmail(email);

    user.signUp().then(function (loginedUser) {
        console.log(loginedUser);
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })

    return undefined
}

function signIn(username, password, successFn, errorFn){
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    });
}

function getUserFromAVUser(AVUser){
    return {
        id: AVUser.id,
        ...AVUser.attributes//把 AVUser.attributes 的属性拷贝到这个对象
    }
}

function getCurrentUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}

function signOut(){
    AV.User.logOut()
    return undefined
}

function sendPasswordResetEmail(email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call();
    }, function (error) {
        console.dir(error)
    });

}

export {AV, signUp, getCurrentUser, signOut, signIn, sendPasswordResetEmail};

