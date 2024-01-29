import React from "react";

function Typing({ fontFamily, fontSize }) {
  return (
    <div class="flex items-center justify-center ">
      <div className="w-max">
        <h1
          style={{ fontFamily: `${fontFamily}`, fontSize: `${fontSize}px` }}
          className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-black"
        >
          isxy, wmf.a ujq NdIdj hs'
        </h1>
      </div>
    </div>
  );
}

export default Typing;
