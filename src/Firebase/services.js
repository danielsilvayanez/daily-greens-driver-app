import { deliveryRef } from "./index";

export async function fetchDeliveries(userID) {
  const dbResult = await deliveryRef
    .where("driverId", "==", userID)
    .get()
    .then((data) => {
      const deliveryData = [];
      data.forEach((doc) => {
        deliveryData.push({ document: doc.data(), documentId: doc.id });
      });
      return deliveryData;
    });
  return dbResult;
}

export function patchDelivery(documentId, data) {
  return deliveryRef
    .doc(documentId)
    .update(data)
    .then(() => {
      return deliveryRef
        .doc(documentId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data();
          }
        });
    });
}

// export function postDelivery(data) {
//   return db
//     .add(data)
//     .then((docRef) => {
//       const documentId = docRef.id;

//       db.doc(documentId).update({
//         _id: documentId,
//         needsPractice: false,
//         isBookmarked: false,
//       });

//       return documentId;
//     })
//     .then((documentId) => {
//       return db
//         .doc(documentId)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             return doc.data();
//           }
//         });
//     });
// }

// export function fetchDeliveries() {
//   return db.get().then((querySnapshot) => {
//     let deliveriesData = [];
//     querySnapshot.forEach((doc) => {
//       deliveriesData.push(doc.data());
//     });

//     return deliveriesData;
//   });
// }
