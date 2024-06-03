export default function SearchOptions({ setSearchBarIndex }) {
  return (
    <div>
      <div>
        <button onClick={() => setSearchBarIndex(0)}>Keyword Search</button>
      </div>
      <div>
        <button onClick={() => setSearchBarIndex(1)}>Advanced Search</button>
      </div>
    </div>
  );
}
