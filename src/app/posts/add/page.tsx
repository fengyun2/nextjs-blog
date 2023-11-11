'use client';

import { useState } from 'react';
import AddPost from '../../components/AddPost';

const defaultSnippetContent = `
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

export default function Page() {
  const [content, setContent] = useState(defaultSnippetContent);
  const onContentChange = (text: string) => {
    console.warn('onContentChange: ', text);
    setContent(text);
  };
  return (
    <>
      <AddPost markdown={content} onChange={onContentChange} />
    </>
  );
}
