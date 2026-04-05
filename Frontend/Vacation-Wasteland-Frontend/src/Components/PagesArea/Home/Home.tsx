import "./Home.css";

var vacations = [
  { id: 1, name: "lol" },
  { id: 2, name: "lol2" },
  { id: 3, name: "lol3" },
  { id: 4, name: "lol4" },
]; // Get from backend, which gets from MySQL database.

export function Home() {
  return (
    <div className="Home">
      <h1>Vacations</h1>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: "32px", }}>
        {vacations.map((vacation) => (
          <div style={{ backgroundColor: "papayawhip", minWidth: "200px", minHeight: "100px", }}>
            {vacation.name}
            <img src={undefined} />
          </div>
        ))}
      </div>
    </div>
  );
}
