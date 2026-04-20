export default function DogCard({name, imageUrl}) {
    return (
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={imageUrl} alt="Dog picture"/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
        </div>
    );
}