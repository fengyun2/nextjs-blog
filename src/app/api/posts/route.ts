import { NextResponse } from 'next/server';
import { getPostByName } from '@/lib/posts';

// type ResponseData = {
//   code: number;
//   data: any;
//   message: string;
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
export async function POST(request: Request, res: any) {
  // const postId = request.nextUrl.searchParams.get('postId'); GET 方式获取参数
  const { postId } = await request.json(); // POST 方式获取参数
  // console.warn(postId, request.method, 'posts edit ======>');
  if (!postId) {
    return NextResponse.json(
      {
        code: 404,
        data: null,
        message: 'postId is required',
      },
      { status: 404 }
    );
  }
  if (postId) {
    const post = await getPostByName(`${postId}.mdx`);
    return NextResponse.json(
      {
        code: 0,
        data: post,
      },
      { status: 200 }
    );
  }
}
