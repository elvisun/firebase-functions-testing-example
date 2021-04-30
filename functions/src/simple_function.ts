import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";

export const db = firestore();
export const simpleFunction = functions.firestore
  .document("user/{userId}")
  .onWrite(async (docChange, context) => {
    const after = docChange.after.data();

    if (!after) return;

    await db.doc(`messages/${context.params.userId}`).set(
      {
        greeting: `hello ${after.name}`,
      },
      { merge: true }
    );
  });
