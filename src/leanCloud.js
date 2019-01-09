import AV from "leancloud-storage";

let APP_ID = 'dhYg6BSLvBAIcEn7O9Dtu1Eh-gzGzoHsz';
let APP_KEY = '6XYtn3IGuw5Sx9MiQO4b61Px';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV;