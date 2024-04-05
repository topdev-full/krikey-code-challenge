import "./App.css";
import TeamMembers from "./components/TeamMembers";
import Navbar from "./components/Navbar";

const membersData = [
  { name: "Jenny Appleseed", email: "jenny.appleseed@example.com" },
];

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex-1 items-center justify-center flex">
        <TeamMembers members={membersData} />
      </div>
    </div>
  );
}

export default App;
