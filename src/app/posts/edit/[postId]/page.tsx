'use client';

import { useState, useEffect } from 'react';
import AddPost from '../../../components/AddPost';
import NotFound from './not-found';
// @ts-ignore
// import PureBlog from 'raw-loader!../../../../blogposts/pure.mdx';

type Props = {
  params: {
    postId: string;
  };
};

const defaultSnippetContent = '';

export default function EditPage({ params: { postId } }: Props) {
  const [content, setContent] = useState(defaultSnippetContent);
  const [post, setPost] = useState(null);
  const getPostData = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ postId }),
      });
      const json = await response.json();
      // @ts-ignore
      const { fileContents: markdown } = json.data || {};
      setContent(markdown);
      // @ts-ignore
      setPost(json.data);
    } catch (error) {}
  };
  useEffect(() => {
    getPostData(postId);
  }, [postId]);
  return <>{post ? <AddPost markdown={content} /> : <NotFound />}</>;
}
