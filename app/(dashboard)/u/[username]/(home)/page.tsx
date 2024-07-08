
import { StreamPlayer } from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";
interface CreatorPageProps{
    params:{
        username:string;
    }

}

const CreatorPage=async({params}:CreatorPageProps)=>{

   const externalUser=await currentUser();
   const user=await getUserByUsername(params.username);

   if(!user || user.externalUserId!==externalUser?.id || !user.stream)
    {
       
         throw  new Error("Unauthorized");
    }
    return (
        <div className="h-full">
            <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
        </div>
    )
}

export default CreatorPage;