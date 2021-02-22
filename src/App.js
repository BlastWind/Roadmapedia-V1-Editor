import logo from './logo.svg';
import './App.css';
import "./Tree.css"
import "./TreeSidebar.css"
import 'semantic-ui-css/semantic.min.css'
import RoadmapAdder from "./add_roadmap_components/RoadmapAdder.js"

function App() {
  return (
    <>
   <RoadmapAdder/>
   <div style={{padding: "2rem"}}/>
    </>
  );
}

export default App;
