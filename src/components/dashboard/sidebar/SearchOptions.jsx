export default function SearchOptions({ setSearchBarIndex }) {
  return (
    <div>
      <div>
        <button onClick={() => setSearchBarIndex([true, false])}>
          Keyword Search
        </button>
      </div>
      <div>
        <button onClick={() => setSearchBarIndex([false, true])}>
          Advanced Search
        </button>
      </div>
    </div>
  );
}
