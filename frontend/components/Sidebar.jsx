import {
  Home,
  Users,
  GraduationCap,
  TrendingUp,
  CalendarDays,
  MapPinned,
  UserCheck,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {

const menuItems = [

{ id:"dashboard",label:"Dashboard",icon:Home },

{ id:"students",label:"Students",icon:Users },

{ id:"teachers",label:"Teachers",icon:GraduationCap },

{ id:"progress",label:"Progress",icon:TrendingUp },

{ id:"functions",label:"Functions",icon:CalendarDays },

{ id:"tours",label:"Tours",icon:MapPinned },

{ id:"classTeachers",label:"Class Teachers",icon:UserCheck }

];

return(

<div className="sidebar">

<div>

<div className="brand-box">

<div className="brand-circle">
SGS
</div>

<h2>SGS SCHOOL</h2>

<p>Headmaster Dashboard</p>

</div>

<div className="menu-list">

{menuItems.map((item)=>{

const Icon=item.icon;

return(

<button
key={item.id}
className={`menu-btn ${
activeTab===item.id ? "active":""
}`}
onClick={()=>setActiveTab(item.id)}
>

<Icon size={18}/>

{item.label}

</button>

)

})}

</div>

</div>

<button className="logout-btn">

<LogOut size={18}/>

Logout

</button>

</div>

)

}