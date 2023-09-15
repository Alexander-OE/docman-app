import { useState } from "react"

export default function Dropdown({label, choices, setChoice}){
    const [selected, setSelected] = useState(label)

    const set = (choice) => {
        setChoice(choice)
        setSelected(choice)
        document.querySelector(".dropdown-content").classList.add("hidden")
        document.querySelector(".label").classList.remove("hidden")
        let choicename = document.querySelector(".choice-name")
        choicename.classList.toggle("bg-chevron-down")
        choicename.classList.toggle("bg-chevron-up")
    }

    const openDropdown = () => {
        let dropdown = document.querySelector(".dropdown-content")
        let choice = document.querySelector(".choice-name")
        choice.classList.remove("bg-chevron-down")
        choice.classList.toggle("bg-chevron-up")
        dropdown.classList.toggle("hidden")
    }
    return(
        <>
        <div className="drop-disp relative hover:cursor-pointer">
            <p onClick={openDropdown} className="p-3 border-[1px] border-blue-gray-200 rounded-md text-blue-gray-700 choice-name bg-chevron-down bg-sm bg-no-repeat bg-[95%]">{selected}</p>

            <label className="label hidden text-[11px] absolute -top-1.5 left-3 px-1 bg-white">{label}</label>

            <ul className="absolute hidden w-full mt-1 border-[1px] border-blue-gray-200 rounded-md bg-white z-40 dropdown-content">
                {choices.map(choice => 
                    <li className="p-3 hover:bg-blue-gray-600 hover:text-white rounded-md" onClick={() => {set(choice.name)}}>{choice.name}</li>    
                )}
            </ul>
        </div>
        </>
    )
}