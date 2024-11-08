/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CollapseButton,
  File,
  Folder,
  Tree,
  TreeViewElement,
} from "./components/tree-view-api";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

const DOMAIN = "https://cdn.computer-extra.com/";

type TOCProps = {
  toc: TreeViewElement[];
};

type TreeItemProps = {
  elements: TreeViewElement[];
};

const copyToClipboard = (path: string, filename: string) => {
  const Textarea = document.createElement("textarea");
  console.log(path + filename);
  Textarea.value = path + filename;
  document.body.appendChild(Textarea);
  Textarea.focus();
  Textarea.select();
  try {
    document.execCommand("copy");
    alert(`${filename} copied to Clipboard`);
  } catch (err) {
    console.log("Unable to copy to clipboard", err);
  }
  document.body.removeChild(Textarea);
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  const getExtension = (elem: TreeViewElement): React.ReactNode => {
    const split = elem.name.split(".");
    const ext = split[split.length - 1];

    switch (ext) {
      case "bmp":
      case "jpg":
      case "jpeg":
      case "gif":
      case "png":
      case "webp": {
        return (
          <>
            <span>{elem.name}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Avatar>
                  <AvatarImage src={DOMAIN + elem.fullPath} />
                  <AvatarFallback>NI</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{elem.name}</DialogTitle>
                <DialogDescription>
                  <img src={DOMAIN + elem.fullPath} />
                  <Button
                    onClick={() => copyToClipboard(DOMAIN, elem.fullPath ?? "")}
                  >
                    Copy URL
                  </Button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </>
        );
      }
      case "mp4":
      case "wmv":
      case "mov":
      case "avi":
      case "mkv": {
        return (
          <>
            <span>{elem.name}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Avatar>
                  <AvatarImage src={DOMAIN + elem.fullPath} />
                  <AvatarFallback>NI</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{elem.name}</DialogTitle>
                <DialogDescription>
                  <video controls>
                    <source src={DOMAIN + elem.fullPath} />
                  </video>
                  <Button
                    onClick={() => copyToClipboard(DOMAIN, elem.fullPath ?? "")}
                  >
                    Copy URL
                  </Button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </>
        );
      }
      default: {
        return (
          <>
            <span>{elem.name}</span>
            <Button
              onClick={() => copyToClipboard(DOMAIN, elem.fullPath ?? "")}
            >
              Copy URL
            </Button>
          </>
        );
      }
    }

    return "";
  };
  return (
    <React.Fragment>
      {elements.map((element) => (
        <React.Fragment key={element.id}>
          {element.children && element.children?.length > 0 ? (
            <Folder
              element={element.name}
              value={element.id}
              isSelectable={element.isSelectable}
              key={element.id}
            >
              <TreeItem
                key={element.id}
                aria-label={`folder ${element.name}`}
                elements={element.children}
              />
            </Folder>
          ) : (
            <File
              key={element.id}
              value={element.id}
              isSelectable={element.isSelectable}
            >
              {getExtension(element)}
              {/* <span>{element?.name}</span> */}
            </File>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const TOC = ({ toc }: TOCProps) => {
  return (
    <Tree
      className="h-full p-2 overflow-hidden rounded-md bg-background"
      indicator={true}
    >
      {toc.map((element, _) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
      <CollapseButton elements={toc} expandAll={false} />
    </Tree>
  );
};

const TOCWrapper = () => {
  const [data, setData] = useState<TreeViewElement[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function x() {
      setLoading(true);
      const res = await axios.get("https://cdn.computer-extra.com/get.php");
      if (res.data) {
        setData(res.data);
        setLoading(false);
      }
    }

    void x();
  }, []);

  if (loading) return <>Loading...</>;

  return <>{data != null && <TOC toc={data} />}</>;
};

function App() {
  return (
    <main className="container mt-12 border rounded-md ms-12">
      <TOCWrapper />
    </main>
  );
}

export default App;
