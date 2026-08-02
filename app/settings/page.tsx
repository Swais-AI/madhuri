import ProfileSettings 
from "@/components/settings/ProfileSettings";


export default function SettingsPage(){

return(

<div className="p-6">


<h1 className="
text-3xl
font-bold
text-white
">
Settings
</h1>


<p className="
text-gray-400
mt-2
">
Manage your account and system settings
</p>



<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-6
">


<ProfileSettings />


</div>


</div>

)

}