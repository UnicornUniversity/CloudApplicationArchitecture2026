export default async function SearchResults({searchParams}) {

    // In Next.js 15+, searchParams became a Promise that needs to be awaited.
    const params = await searchParams;
    const dogSize = parseInt(params["dogSize"] ?? "0");
    console.log("dogSize SearchResults = " + dogSize);

    return (


        <>
        </>
    )
}