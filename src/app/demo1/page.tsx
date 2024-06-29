import Tiptap from "@/components/tiptap";
import { Toolbar } from "@/components/toolbar";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-white">
      
      <div className="w-[50%] max-h-[60vh] border">
        <Tiptap />
      </div>
    </div>
  );
}
