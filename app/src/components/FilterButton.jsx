export default function FilterButton(props) {
    const { name, isPressed, setFilter } = props;
    return (
        <>
            <button
                type="button"
                className="btn toggle-btn"
                aria-pressed={isPressed}
                onClick={() => setFilter(name)}
            >
                <span>{name}</span>
            </button>
        </>
    );
}
