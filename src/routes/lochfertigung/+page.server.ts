import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import db from "$lib/db"

export const load = (async () => {
  const berichte = await db.collection('arbeitsberichte').find().sort("ts", "desc").toArray()
  var tags:string[] = []
  
  berichte.forEach((bericht)=>{
    bericht.tags.forEach((tag:string) => {
      if (tags.indexOf(tag)<0) {
        tags.push(tag)
      }
    })
  })
  
  
  console.log("tags", tags)
  return {    
    post: {
      tags
    }
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({cookies, request}) => {
    console.log(request)
    const data = await request.formData();
    const date = data.get("date")
    const duration = data.get("duration")
    const tagsstr: String = data.get("tagsstr") as String
    const descr = data.get("descr")
    const user = data.get("username")
    
    if (!(date&&duration&&user)) return {success: false}
    
    console.log(await db.collection('arbeitsberichte').insertOne({
      ts: date,
      duration,
      descr,
      user,
      tags: tagsstr.split(","),
      checked: false
    }))
    //throw redirect(303, "/");
    
    return {success: true, username: user}
  }
} satisfies Actions;