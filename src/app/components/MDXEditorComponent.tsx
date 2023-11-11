'use client';

import '@mdxeditor/editor/style.css';
import type { ForwardedRef } from 'react';
// import {
//   headingsPlugin,
//   listsPlugin,
//   quotePlugin,
//   thematicBreakPlugin,
//   markdownShortcutPlugin,
//   MDXEditor,
//   type MDXEditorMethods,
//   type MDXEditorProps,
// } from '@mdxeditor/editor';

import { MDXEditor, type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor/MDXEditor';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { markdownShortcutPlugin } from '@mdxeditor/editor/plugins/markdown-shortcut';
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { imagePlugin } from '@mdxeditor/editor/plugins/image';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { InsertImage } from '@mdxeditor/editor/plugins/toolbar/components/InsertImage';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';

type EditorProps = {
  editorRef?: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps;

async function imageUploadHandler(image: File) {
  const formData = new FormData();
  formData.append('file', image);
  const response = await fetch('/api/uploads/new', {
    method: 'POST',
    body: formData,
  });
  try {
    const json = (await response.json()) as { data: { url: string } };
    return json?.data?.url;
  } catch (error) {
    return '/images/404.png';
  }
}

export default function MDXEditorComponent({ editorRef, ...props }: EditorProps) {
  return (
    <MDXEditor
      {...props}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler,
          // imagePreviewHandler: () => {
          //   return Promise.resolve('https://picsum.photos/200/300');
          // },
          // imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertImage />
            </>
          ),
        }),
      ]}
      ref={editorRef}
    />
  );
}
