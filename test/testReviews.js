import validation from "../publicMethods.js"
console.log(validation.validatePhoneNumber("19293428295"));


console.log(await validation.validateIfFileExist("C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\userProfilePictures\\636m209480uxu55xaw4cxj.jpg"));


// // Test Case 1: createReview
// try {
//     const result = await createReview(
//         "6570d5425adfaacae3e405ec", // drinkId
//         "userTestId", // userId
//         "Great drink! Highly recommended.", // reviewText
//         5, // rating
//         "C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\reviewPictures\\1.jpg" // reviewPictureLocation
//     );
//     console.log(result); // Log the result
// } catch (error) {
//     console.error(error); // Log any errors
// }

// // Test Case 2: updateReview
// try {
//     const result = await updateReview(
//         "6570d5425adfaacae3e405ec", // reviewId
//         "2023-11-30T12:30:00", // timeStamp
//         "6570d5425adfaacae3e405ec", // drinkId
//         "userTestId", // userId
//         "Updated review text.", // reviewText
//         4, // rating
//         "C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\reviewPictures\\2.jpg" // reviewPictureLocation
//     );
//     console.log(result); // Log the result
// } catch (error) {
//     console.error(error); // Log any errors
// }

// // Test Case 3: deleteReview
// try {
//     const result = await deleteReview("6570d5425adfaacae3e405ec"); // reviewId
//     console.log(result); // Log the result
// } catch (error) {
//     console.error(error); // Log any errors
// }

// // Test Case 4: getReviewInfoByReviewId
// try {
//     const result = await getReviewInfoByReviewId("6570d5425adfaacae3e405ec"); // reviewId
//     console.log(result); // Log the result
// } catch (error) {
//     console.error(error); // Log any errors
// }