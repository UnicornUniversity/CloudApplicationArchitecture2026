"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchForm() {

    const [isSearching, setIsSearching] = useState(false);
    const [dogSize, setDogSize] = useState(0);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        setIsSearching(true);

        await new Promise(resolve => setTimeout(resolve, 300));

        //TODO validation
        router.push("/search-results?dogSize=" + dogSize);
    }

    function dogSizeChanged(e){
        setDogSize(e.target.value);
    }

    return (
        <>
            <h3>Search parameters:</h3>
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="dogSize">Dog Size</label>
                    <select name="dogSize" className="form-control" onChange={dogSizeChanged}>
                        <option value="0">less then 5 kg</option>
                        <option value="1">6-14 kg</option>
                        <option value="2">more than 14 kg</option>
                    </select>
                    <button className="btn btn-primary">Search</button>

                    {isSearching && <div className="alert alert-primary">
                        <strong>Please wait...</strong>
                    </div>}

                </form>
            </div>
        </>

    )
}