'use client';

import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import type { MDXEditorMethods } from '@mdxeditor/editor';

const MDXEditorComp = dynamic(() => import('../../components/MDXEditorComponent'), {
  ssr: false,
});

const markdown = `
# Hello world!
Check the EditorComponent.tsx file for the code .
Hello [world](https://virtuoso.dev/)
`;

export default function AddPost() {
  const ref = useRef<MDXEditorMethods>(null);
  return (
    <>
      <button onClick={() => ref.current?.setMarkdown('new markdown')}>Set new markdown</button>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
      <Suspense fallback={<div>Loading...</div>}>
        <MDXEditorComp editorRef={ref} markdown={markdown} />
      </Suspense>
    </>
  );
}
