import db from "$lib/db"
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const berichte = await JSON.stringify(await db.collection('arbeitsberichte').find().sort("ts", "desc").toArray())
  
  console.log("HIHIHIHI", berichte)
  return {
    berichte
  };
}