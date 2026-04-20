import DogCard from "@/components/DogCard";

const dml = require("../data/dataManagementLayer");

export default async function SearchResults({searchParams}) {

    // In Next.js 15+, searchParams became a Promise that needs to be awaited.
    const params = await searchParams;
    const dogSize = parseInt(params["dogSize"] ?? "0");
    console.log("dogSize SearchResults = " + dogSize);

    const allDogs = await dml.readUsers();
    const results = allDogs.filter(d => parseInt(d.dogSize) === dogSize);

    return (
        <div className="row">
            {results.length === 0
                ? (
                    <div className="alert alert-primary">
                        <strong>No items found</strong>
                    </div>) :
                (results.map((d) => <DogCard key={d.id}
                                             name={d.dogName}
                                             imageUrl={dml.getImageUrl(d.dogUrl)}/>))
            }
        </div>
    )
}