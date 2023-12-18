import { useState, memo, useEffect, useRef, useContext } from "react";
import { contextWrapper } from "../../MainApp";
import NodesList from "../NodesList.json";
import { Player } from "@lottiefiles/react-lottie-player";

import "./search-node.scss";
const SearchNode = ({ setSearch }) => {
  const { globalState } = useContext(contextWrapper);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [selectNode, setSelectNode] = useState(0);
  const [deletedNodes, setDeletedNodes] = useState(
    JSON.parse(localStorage.getItem("user")).edit.deletedNodes
  );
  const inputRef = useRef(null);
  const handleInputOnchange = ({ value }) => {
    setInputValue(value);
    let { nodes } = JSON.parse(localStorage.getItem("createDetail"));
    let nodeListData = globalState.create ? nodes : NodesList;
    if (value.length >= 3)
      setResult(
        nodeListData.filter((node) => node.label && node.label.includes(value))
      );
    else setResult([]);
  };
  const handleInputOnKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectNode((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectNode((prevIndex) =>
        prevIndex < result.length - 1 ? prevIndex + 1 : result.length - 1
      );
    } else if (event.key === "Enter" && result.length > 0) {
      setSearch({
        nodeId: result[selectNode].id,
        position: { x: result[selectNode].x, y: result[selectNode].y },
      });
    }
  };
  const handleSelectNode = (event, index, nodeId) => {
    event.stopPropagation();
    let deletedList = JSON.parse(localStorage.getItem("user")).edit
      .deletedNodes;
    if (deletedList[nodeId]) return;
    setSelectNode(index);
    setSearch({
      nodeId: result[index].id,
      position: { x: result[index].x, y: result[index].y },
    });
  };
  const handleIsOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      setSearch(false);
      setInputValue("");
      setResult([]);
      setSelectNode(0);
    } else setIsOpen(true);
  };
  const handleDeleteList = () => {
    setDeletedNodes(JSON.parse(localStorage.getItem("user")).edit.deletedNodes);
  };
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        setIsOpen(!isOpen);
        inputRef.current.focus();
      }
    }
    // Add an event listener for the "keydown" event on the window object
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  useEffect(() => {
    setIsOpen(false);
    setSearch(false);
    setInputValue("");
    setResult([]);
    setSelectNode(0);
  }, [globalState, setSearch]);
  return (
    <div
      className={`search-container ${isOpen} d-flex align-items-center justify-content-center position-fixed bg-primary cursor-pointer`}
      onClick={handleIsOpen}
    >
      {/* this label for screen reader */}
      <label
        htmlFor="search-input"
        className="screen-reader overflow-hidden position-absolute"
      >
        Search
      </label>

      <div className="position-relative">
        <input
          id="search-input"
          ref={inputRef}
          className="position-relative transition"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteList();
          }}
          onChange={({ target }) => handleInputOnchange(target)}
          value={inputValue}
          onKeyDown={handleInputOnKeyDown}
          tabIndex={0}
          autoComplete="off"
        />
        <ul
          className={`result ${!!result.length} bg-primary position-absolute text-center overflow-hidden rounded-3-top text-nowrap`}
          style={{ height: `${result.length * 44.8}px` }}
          tabIndex={0}
        >
          {result.map((node, index) => (
            <li
              key={node.id}
              className={`overflow-hidden ${selectNode === index && "active"} ${
                deletedNodes[node.id] && "bg-danger cursor-none-drop"
              }`}
              onClick={(event) => handleSelectNode(event, index, node.id)}
            >
              {node.label}
            </li>
          ))}
        </ul>
      </div>
      <Player
        src={require("../../../assets/icons/search.json")}
        className="player"
        hover
        style={{
          width: "30px",
          height: "30px",
        }}
      />
    </div>
  );
};
export default memo(SearchNode);
