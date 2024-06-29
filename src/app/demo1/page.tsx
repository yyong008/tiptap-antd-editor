"use client"

import Tiptap from "@/components/tiptap";
import { useState } from "react";

export default function Page() {
  const [value, setValue] = useState("");
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-white">
      <div className="w-[50%] max-h-[60vh] border">
        <Tiptap value={value} onChange={setValue} />
      </div>
    </div>
  );
}
