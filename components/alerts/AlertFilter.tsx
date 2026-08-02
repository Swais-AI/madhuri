"use client";


interface Props {
 selected:string;
 setSelected:(value:string)=>void;
}


export default function AlertFilter({
 selected,
 setSelected
}:Props){


const filters=[
 "All",
 "Critical",
 "High",
 "Medium",
 "Low"
];


return (

<div className="flex justify-between items-center mb-6">


<div className="flex gap-3">

{
filters.map(item=>(

<button
key={item}
onClick={()=>setSelected(item)}
className={`
px-4 py-2
rounded-full
text-sm
transition

${
selected===item
?
"bg-purple-600 text-white"
:
"bg-[#1f2937] text-gray-400"
}

`}
>

{item}

</button>

))
}

</div>


<button
className="
text-purple-400
text-sm
hover:text-purple-300
"
>
Mark All Read
</button>


</div>

)

}