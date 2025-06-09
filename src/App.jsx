import { useEffect } from "react";
import Board from "./Board";
import Note from "./Note";
import Quizes from "./Quizes";

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
    <section className="w-full h-screen grid grid-cols-1 lg:grid-cols-[0.2fr_1fr] bg-black/90 overflow-hidden">
      <div className="border-r border-gray-500 max-lg:hidden"></div>
      {/* <Note /> */}
      {/* <Board /> */}
      <Quizes />
    </section>
  );
}

export default App;
