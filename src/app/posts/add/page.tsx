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

## Table

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | 600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


Image without dimensions:

![](https://images.unsplash.com/photo-1517935706615-2717063c2225)

Image with dimensions:

<img src="https://images.unsplash.com/photo-1517935706615-2717063c2225" width="500" height="auto" />
`;

export default function AddPost() {
  const ref = useRef<MDXEditorMethods>(null);
  return (
    <>
      <button
        type='button'
        className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        onClick={() => ref.current?.setMarkdown('new markdown')}
      >
        Set new markdown
      </button>
      <button
        type='button'
        className='inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        onClick={() => console.log(ref.current?.getMarkdown())}
      >
        Get markdown
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <MDXEditorComp editorRef={ref} markdown={markdown} />
      </Suspense>
    </>
  );
}
