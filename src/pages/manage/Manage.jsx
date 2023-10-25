import Loader from "../../components/loader/Loader"
import { Sidenav } from "../../components/sidenav/Sidenav"
import DashboardHead from "../../components/dashboard/header"
import { Input, Button } from "@material-tailwind/react"
import { useState, useEffect } from "react"
import DisplayDocs from "../user-dash/DisplayDocs"
import DisplayUsers from "./DisplayUsers"
import { useAuth } from "../context/AuthContext"
import endpoint from "../../assets/endpoint.json"

const url = endpoint.url
export default function Manage(){
    const {user} = useAuth()
    const [filter, setFilter] = useState('')
    const [reload, setReload] = useState(false)
    const [view, setView] = useState(false)
    const [name, setName] = useState('')
    const [categories, setAllCategories] = useState(null)

    const handleSearch = () => {
        let text = document.querySelector(".search-txt").value
        setFilter(text)
        console.log('The Text:', text)
        setView(true)
    }

    const handleChange = () => {
        let text = document.querySelector(".search-txt").value
        if (text.length == 0){
            setView(false)
        }
    }

    const handleCreate = async() =>{
        if (name == ''){
            alert("Category name cannot be empty!")
        }

        else if (/[^A-Za-z0-9\s]/.test(name)){
            alert("Category name can only contain numbers and letters!")
        }

        else{
            console.log(user)
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({name:name}),
                redirect: 'follow',
                headers: {
                    authorization: `Bearer ${user.accessToken} backend`,
                    'Content-Type': 'application/json'
                }
            }

            try{
                let response = await fetch(`${url}/category`, requestOptions)
                if (response.status == 200){
                    alert("Successfully created category!")
                    setReload(!reload)
                }

                else if (response.status == 400) alert('Category must have unique names')
            }
            catch(err){console.log("Error occured creating category:", err)}
        }
    }

    const getCategories = async () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }

        try{
            const response = await fetch(`${url}/category`, requestOptions)
            if (response.status === 200){
                let data = await response.json()
                setAllCategories(data.categories)
                console.log('Gotten Catrgories Successfully')
            }
        }
        catch(err){console.log("Error:", err)}
    }

    useEffect(() => {getCategories()}, [reload])
    return(
    <section className="w-full min-h-screen relative box-border">
        <div className="fixed top-0 left-0 w-max">
            <Sidenav />
        </div>

        <div className="board ml-auto flex-grow z-10">
            <DashboardHead/>

            <div className="available-docs mx-4 py-4 overflow-auto">
                <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Search documents</h2>

                <div className="mx-auto my-3 max-w-sm">
                    <Input onChange={handleChange} className="search-txt" type="text" size="lg" label="Search..."/>
                    <Button className="mt-6" fullWidth type="button" onClick={handleSearch}>
                        Start Search
                    </Button>
                </div>

                {view && <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5 max-w-7xl mx-auto">
                    <DisplayDocs reload={reload} filter={filter}/>
                </div>}
            </div>

            <div className="available-docs mx-4 py-4 overflow-auto">
                <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Create Category</h2>

                <div className="mx-auto my-3 max-w-sm">
                    <Input onChange={(e) => setName(e.target.value)} className="search-txt" type="text" size="lg" label="Category name..."/>
                    <Button className="mt-6" fullWidth type="button" onClick={handleCreate}>
                        Create
                    </Button>
                </div>

                <p className="text-xl my-2 text-blue-gray-800 font-bold">Available Categories:</p>
                <div className="text-lg columns-2 colum mx-auto max-w-5xl">
                    <ul>
                    {categories != null && categories.map(category => 
                    <li key={category.name} className="my-1 list-disc">{category.name}</li>
                    )}
                    </ul>
                </div>
            </div>

            <div className="available-docs mx-4 py-4 overflow-auto">
                <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Manage Users</h2>
                
                <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5 max-w-7xl mx-auto">
                    <DisplayUsers reload={reload}/>
                </div>
            </div>
        </div>

        <div className="fixed top-0 left-0 w-full h-screen bg-white opacity-80 hidden loading">
            <Loader />
        </div>
    </section>
    )
}