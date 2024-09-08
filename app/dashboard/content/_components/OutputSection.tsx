import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Copy } from "lucide-react";
import { useEffect, useRef } from "react";

export interface PROPS {
  aiOutputResult: string;
}

const OutputSection = ({ aiOutputResult }: PROPS) => {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutputResult);
  }, [aiOutputResult]);

  return (
    <div className="bg-white border shadow-lg rounded-md">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="shadow-lg gap-2 hover:bg-[#743dd4] transition-all duration-500">
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef} // Assign ref to the editor
        initialValue="Your result will appear here" // Initial content in the editor
        initialEditType="wysiwyg" // Set the editor type to WYSIWYG mode
        height="600px" // Set the height of the editor
        useCommandShortcut={true} // Enable keyboard shortcuts
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
};

export default OutputSection;
