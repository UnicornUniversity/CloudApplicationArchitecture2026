export default function Character({imageUrl}) {
    return (
        <img
            src={imageUrl}
            alt={"no image"}
            width={60}
            height={80}
        />
    );
}