import { memo, useEffect, useContext, useCallback } from "react";
import NodesList from "../../Network/NodesList.json";
import LanguageMessage from "../../LanguageMessage/LanguageMessage";
import { contextWrapper } from "../../MainApp";
import { Player } from "@lottiefiles/react-lottie-player";

const semesterRating = {
  semester1: 1,
  semester2: 2,
  summer1: 3,
  semester3: 4,
  semester4: 5,
  summer2: 6,
  semester5: 7,
  semester6: 8,
  summer3: 9,
  semester7: 10,
  semester8: 11,
  summer4: 12,
};
function JsonToTable() {
  const { globalState } = useContext(contextWrapper);
  const generateTable = useCallback(() => {
    let selections = JSON.parse(localStorage.getItem("selections"));
    let mark = JSON.parse(localStorage.getItem("user")).mark;
    let failedLessons = JSON.parse(localStorage.getItem("failedLessons")) || {};
    let createDetail = JSON.parse(localStorage.getItem("createDetail"));
    let list = {},
      failedList = {},
      NodesListData = globalState.create ? createDetail.nodes : NodesList;
    !mark.state &&
      NodesListData.map((node) => {
        if (selections[node.id])
          list[selections[node.id]] = {
            ...list[selections[node.id]],
            Lessons: [
              ...(list[selections[node.id]]?.Lessons || []),
              node.label,
            ],
            units: list[selections[node.id]]?.units
              ? Number(list[selections[node.id]]?.units) + Number(node.unit)
              : node.unit, // add the units property with a value of 24
          };
        if (failedLessons[node.id]) {
          failedLessons[node.id].map(
            (semester) =>
              (failedList[semester] = {
                Lessons: [
                  ...((failedList[semester] && failedList[semester].Lessons) ||
                    []),
                  node.label,
                ],
                units: failedList[semester]?.units
                  ? Number(failedList[semester].units) + Number(node.unit)
                  : node.unit,
              })
          );
        }
        return "";
      });

    if (Object.keys(failedList).length) {
      for (const semester in failedList) {
        if (list.hasOwnProperty(semester)) {
          Object.assign(list[semester], {
            Lessons: [
              ...list[semester].Lessons,
              ...failedList[semester].Lessons,
            ],
            units:
              Number(list[semester].units) + Number(failedList[semester].units),
          });
        } else {
          list[semester] = failedList[semester];
        }
      }
    }
    list = Object.fromEntries(
      Object.entries(list).sort(
        ([a], [b]) => Number(semesterRating[a]) - Number(semesterRating[b])
      )
    );
    const html =
      !mark.state &&
      `<table>
        <caption>@jozveiau</caption>
        <thead>
        <th>ترم</th>
        <th>واحد</th>
        </thead>
        <tbody>
        ${Object.keys(list)
          .map(
            (obj) =>
              `<tr><th>${obj}</th><th>${list[obj].units}</th>${list[
                obj
              ].Lessons.map((e) => `<td>${e.replace(/\n\n/g, " ")}</td>`).join(
                " "
              )} </tr>`
          )
          .join(" ")}
        </tbody>
      </table>`;
    let markUnit = 0;
    let markList = NodesListData.map((node) => {
      if (mark.selections[node.id]) {
        markUnit += node?.unit;
        return `<div style='padding:10px;flex-grow:1;text-align:center'>${node.label}</div>`;
      }
      return "";
    });
    const htmlMark = `<div style='width:80%'>
    <div style='text-align:center;'>@jozveiau</div>
    <section style='border:1px solid black;'>
    <div style='border-bottom:1px solid black; padding:5px;text-align:right'>واحد : ${markUnit}</div>
    <div class='mark-section' style='display:flex;flex-wrap:wrap;'>${markList.join(
      " "
    )}
    </div>
    </section>
    </div>`;
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Table</title>");
    printWindow.document.write(
      "<style>body{display:flex;align-items:center;justify-content:center;font-size:10px}tr:nth-child(even) {background-color: #D6EEEE;}table { border-collapse: collapse; }"
    );
    printWindow.document.write(
      "table th, table td { font-size:10px;border: 1px solid black; padding: 5px; }"
    );
    printWindow.document.write(
      "table caption { font-size: 20px; font-weight: bold; margin-bottom: 10px; }"
    );
    printWindow.document.write(
      ".mark-section div:nth-child(even){ font-weight: bold;background-color: #D6EEEE; }</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(mark.state ? htmlMark : html);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  }, [globalState]);
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        generateTable();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [generateTable]);

  return (
    <li
      className="d-flex align-items-center cursor-pointer"
      onClick={generateTable}
      id="printReport"
    >
      <div className="d-flex">
        <Player
          src={require("../../../assets/icons/print-report.json")}
          className="player"
          hover
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </div>
      <span>
        <LanguageMessage message="printReport" />
      </span>
    </li>
  );
}

export default memo(JsonToTable);
