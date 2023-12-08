import {
    createUser,
    getAllReviewsByUserId,
    getUserIdByEmail,
    getUserInfoByEmail,
    getUserInfoByUserId,
    loginUser,
    reserveDrink,
    updateUser

} from "../data/users.js"
import {getDrinkInfoByDrinkId, updateAllDrinkRating} from "../data/drinks.js";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

let user1 =null;
let user2 = null;
let user3 =null;

// try {
//     const currentFilePath = fileURLToPath(import.meta.url);
//     const currentDirPath = dirname(currentFilePath);
//     const absolutePath = join(currentDirPath, "Inunasha.jpg");
//
//     console.log(absolutePath);
//     const drink1 = await createUser("xin", "jin","jin@qq.com","9293428295","Abc123!@#",absolutePath,
//         "admin");
//     console.log(drink1)
// }catch (error){
//     console.log(error);
// }

// try {
//     const drink1 = await createUser("xin", "jin","xin@qq.com","9293428295","Abc123!@#","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\userProfilePictures\\636m209480uxu55xaw4cxj.jpg",
//         "admin");
//     console.log(drink1)
// }catch (error){
//     console.log(error);
// }
//
try {
    const drink1 = await createUser("xin", "jin","jinxin@qq.com","9293428295","Abc123!@#","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\userProfilePictures\\636m209480uxu55xaw4cxj.jpg",
        "admin");
    console.log(drink1)
}catch (error){
    console.log(error);
}



try {
    console.log(await loginUser("jin@qq.com", "Abc123!@#"));
}catch (error){
    console.log(error);
}
console.log("-------------------------------------------------------------");
try {
    console.log(await updateUser("xin", "xin","jin@qq.com","9293335817","Abc123!@#",[],"C:\\Users\\jinxi\\OneDrive\\Pictures\\Inunasha.jpg",
        [],"admin"));
}catch (error){
    console.log(error);
}



console.log("-------------------------------------------------------------");
try {
    console.log(await getAllReviewsByUserId("657031f01917e9b23d8c54b5"));
}catch (error){
    console.log(error);
}


console.log("-------------------------------------------------------------");
try {
    console.log(await getAllReviewsByUserId("657031f01917e9b23d8c54b5"));
}catch (error){
    console.log(error);
}


console.log("-------------------------------------------------------------");
try {
    console.log(await getUserInfoByUserId("657031f01917e9b23d8c54b5"));
}catch (error){
    console.log(error);
}
console.log("-------------------------------------------------------------");
try {
    console.log(await getUserInfoByEmail("jin@qq.com"));
}catch (error){
    console.log(error);
}

console.log("-------------------------------------------------------------");
try {
    console.log(await getUserIdByEmail("jin@qq.com"));
}catch (error){
    console.log(error);
}

console.log("-------------------------------------------------------------");
try {
    console.log(await reserveDrink("657031f01917e9b23d8c54b5", "65702dedd86a8a836f64ab66"));
}catch (error){
    console.log(error);
}


//
// try {
//     console.log(await deleteDrink("65702cca88ac720a3a01c134"));
// }catch (error){
//     console.log(error);
// }

// try {
//     console.log(await getDrinkInfoByDrinkId("65702cca88ac720a3a01c134"));
// }catch (error){
//     console.log(error);
// }

// try {
//     console.log(await getAllDrinks());
// }catch (error){
//     console.log(error);
// }
// console.log("-------------------------------------------------------------");
// try {
//     console.log(await getAllReviewsOnADrink("65702dedd86a8a836f64ab67"));
// }catch (error){
//     console.log(error);
// }
//
// console.log("-------------------------------------------------------------");
// try {
//     console.log(await updateAllDrinkRating());
// }catch (error){
//     console.log(error);
// }