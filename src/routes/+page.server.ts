import type { Actions } from './$types';
import db from "$lib/db"

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const berichte = await JSON.stringify(await db.collection('arbeitsberichte').find().sort("ts", "desc").toArray())
  
  console.log("HIHIHIHI", berichte)
  return {
    berichte
  };
}
 
export const actions = {
  dropDB: async (event) => {
    await await db.collection('arbeitsberichte').drop()
    return {}
  }
} satisfies Actions;