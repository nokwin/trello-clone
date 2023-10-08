"use client";

import {
  BlockTypeSelect,
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { forwardRef } from "react";

interface MdxEditorProps {
  value?: string | null;
}

export const MdxEditor = forwardRef<MDXEditorMethods, MdxEditorProps>(
  function MdxEditor({ value }, ref) {
    return (
      <MDXEditor
        className="dark-theme dark-editor"
        ref={ref}
        markdown={value || ""}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BlockTypeSelect />
              </>
            ),
          }),
          headingsPlugin(),
        ]}
      />
    );
  }
);
