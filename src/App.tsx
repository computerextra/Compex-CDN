import { useEffect, useState } from "react";
import axios from "axios";
import { TreeView } from "./components/TreeView";

type TreeViewProps = {
  id: string;
  name: string;
  children?: TreeViewProps[];
};

function App() {
  const [data, setData] = useState<TreeViewProps[] | undefined>(undefined);

  useEffect(() => {
    async function x() {
      const res = await axios.get("https://cdn.computer-extra.com/get.php");
      if (res.data) {
        setData(res.data);
      }
    }

    void x();
  }, []);

  return <main>{data != null && <TreeView elements={data} />}</main>;
}

export default App;
