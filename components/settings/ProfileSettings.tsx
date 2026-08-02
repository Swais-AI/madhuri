"use client";


import { useEffect, useState } from "react";
import SettingsCard from "./SettingsCard";
import { getProfile } from "@/services/profileService";


interface Profile {

    name:string;
    username:string;
    email:string;
    role:string;

}



export default function ProfileSettings(){


const [profile,setProfile] =
useState<Profile | null>(null);


const [loading,setLoading] =
useState(true);



useEffect(()=>{

    fetchProfile();

},[]);



const fetchProfile = async()=>{

    try{

        const data = await getProfile();

        setProfile(data);

    }
    catch(error){

        console.log(
            "Profile loading failed",
            error
        );

    }
    finally{

        setLoading(false);

    }

};



if(loading){

return(

<div className="text-white">
Loading profile...
</div>

)

}




return(

<SettingsCard
title="Profile"
icon="👤"
>


<div className="space-y-5">


<div>
<p className="text-gray-400 text-sm">
Full Name
</p>

<p className="text-white text-lg">
{profile?.name || "No Data"}
</p>

</div>



<div>
<p className="text-gray-400 text-sm">
Username
</p>

<p className="text-white text-lg">
{profile?.username || "No Data"}
</p>

</div>




<div>
<p className="text-gray-400 text-sm">
Email
</p>

<p className="text-white text-lg">
{profile?.email || "No Data"}
</p>

</div>




<div>
<p className="text-gray-400 text-sm">
Role
</p>

<p className="text-white text-lg">
{profile?.role || "No Data"}
</p>

</div>



<button
className="
bg-indigo-600
hover:bg-indigo-700
text-white
px-5
py-2
rounded-lg
"
>
Edit Profile
</button>


</div>


</SettingsCard>

)

}