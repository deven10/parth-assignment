import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@mui/material";
import JoditEditor from "jodit-react";

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Load saved content from localStorage when the component mounts
  useEffect(() => {
    const savedContent = localStorage.getItem("richText");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to localStorage whenever it updates
  const handleSave = (newContent) => {
    setContent(newContent);
    localStorage.setItem("richText", newContent);
  };

  const config = useMemo(
    () => ({
      readonly: false, // Allows editing
      placeholder: "Start typing...",
    }),
    []
  );

  return (
    <>
      <h2>Text Editor</h2>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleSave} // Save content when editor loses focus
        onChange={() => {}} // Keeping this to avoid unnecessary updates
      />

      <Button
        onClick={() => alert("Saved Data!")}
        variant="contained"
        type="submit"
        style={{ margin: "12px 0px" }}
      >
        Save
      </Button>
    </>
  );
};

export default TextEditor;
