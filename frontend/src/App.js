import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import TeamMembers from "./components/TeamMembers";
import Navbar from "./components/Navbar";
import { SERVER_URL } from "./utils/config";

function App() {
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/api/authors?author_name=`).then((res) => {
      if(res.status === 200) {
        setMembersData(res.data);
      } else {
        setMembersData([]);
      }
    });
  }, []);

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
