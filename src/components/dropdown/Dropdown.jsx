import { useState } from "react"

export default function Dropdown({label, choices, setChoice}){
    const [selected, setSelected] = useState(label)
    const [isOpen, setOpen] = useState(false)

    // const chooseAction = (event) => {
    //     if (document.querySelector(".dropdown-content").classList.contains("hidden")){
    //         setParent(event.target.parentElement)
    //         openDropdown()
    //     }
    //     else{
    //         closeDropdown()
    //     }
    // }

    const set = (choice) => {
        setChoice(choice)
        setSelected(choice)
        closeDropdown()
    }

    const closeDropdown = () => {
        setOpen(false)
    }
    
    const openDropdown = (event) => {
        isOpen? setOpen(false) : setOpen(true)
    }

    return(
        <>
        <div className="drop-disp relative hover:cursor-pointer">
            <p onClick={openDropdown} className="p-3 border-[1px] border-blue-gray-200 rounded-md text-blue-gray-700 choice-name bg-chevron-down bg-sm bg-no-repeat bg-[95%] opacity-90 text-sm">{selected}</p>

            <label className="label hidden text-[11px] absolute -top-1.5 left-3 px-1 bg-white">{label}</label>

            {isOpen && <ul className="absolute w-full mt-1 border-[1px] border-blue-gray-200 rounded-md bg-white z-40 dropdown-content shadow-lg">
                {choices.map(choice => 
                    <li key={choice._id} className="p-3 hover:bg-blue-gray-600 hover:text-white rounded-md" onClick={() => {set(choice.name)}}>{choice.name}</li>    
                )}
            </ul>}
        </div>
        </>
    )
}