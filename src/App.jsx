import { useEffect } from "react";
import Board from "./Board";
import Note from "./Note";

function App() {
  `  // useEffect(() => {
  //   fetch("https://api.pexels.com/v1/search?query=cat", {
  //     headers: {
  //       Authorization:
  //         "gz8rjS47EELDnyhiVGJ7zprnPMyZIdSdEMAiRgZFfrthBOUWb21qGp7A",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => console.log(result.photos[1].src.medium));
  // }, []);`;
  return (
    <>
      {/* <MathAnimation /> */}
      {/* <Note /> */}
      <Board />
    </>
  );
}

export default App;
