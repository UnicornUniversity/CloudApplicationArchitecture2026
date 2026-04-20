export default function SomeCustomLayout({children}) {
    return (
        <>
            <small>This is a profile layout</small>
            <div className="row">
                {children}
            </div>
        </>
    );
}