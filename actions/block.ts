"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
import { unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService=new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
)

export const onBlock=async(id:string)=>{
  const self=await getSelf();
   let blockedUser;
   try {
    blockedUser=await blockUser(id);
   } catch {
    
   }

   try{
      await roomService.removeParticipant(self.id,id)
    }
   catch{
    
   }
    
     revalidatePath(`/u/${self.username}/community`)
  

      return blockedUser;
   

}

export const onUnblock=async(id:string)=>{
  try {
    const unblockedUser=await unblockUser(id);

    revalidatePath("/")
     if(unblockedUser)
       {
           revalidatePath(`${unblockedUser.blocked.username}`)
       }

       return unblockedUser;
    
 } catch (error) {
  throw new Error("Internal Error")
 }

}