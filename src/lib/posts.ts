import fs from 'fs';
import path from 'path';
import { sync } from 'glob';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
// @ts-ignore
import { rehypeExtendedTable } from 'rehype-extended-table';
// import remarkGfm from 'remark-gfm';
import CustomImage from '@/app/components/CustomImage';
import Video from '@/app/components/Video';
// import repoFiletreeOrigin from './files.json'

// type Tree = {
//   path: string;
//   mode: string;
//   type: string;
//   sha: string;
//   size?: number;
//   url: string;
// };

// type Filetree = {
//   sha: string;
//   url: string;
//   truncated: boolean;
//   tree: Tree[];
// };

const postsDirectory = path.join(process.cwd(), 'src/blogposts');

/**
 * 根据文件名获取文件内容
 * @param {string} fileName 文件名，带后缀
 * @returns {object|undefined}
 */
export async function getPostByName(fileName: string) {
  try {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, content } = await compileMDX<{ title: string; date: string; tags: string[] }>({
      source: fileContents,
      components: {
        CustomImage,
        Video,
      },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          // remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeExtendedTable,
            [
              //@ts-ignore
              rehypeHighlight,
              {
                behavior: 'wrap',
                // theme: 'github',
              },
            ],
          ],
        },
      },
    });
    const id = fileName.replace(/\.mdx$/, '');
    const blogPostObj: BlogPost = {
      meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags },
      content,
      fileContents,
    };
    return blogPostObj;
  } catch (error) {
    console.error(`getPostByName [${fileName}]: `, error);
    return undefined;
  }
}

/**
 * 获取所有博客文章文件名
 * @returns {Array} 文件名数组
 */
export async function getAllPostsFileName() {
  const paths = sync(`${postsDirectory}/**/*.mdx`);
  return paths?.map((path) => {
    const pathContent = path.split('/');
    const fileName = pathContent[pathContent.length - 1];
    // const [slug, _extension] = fileName?.split('.') || []
    return fileName;
  });
}
/**
 * 获取所有博客文章的元数据
 * @returns {Meta[]}
 */
export async function getPostsMeta() {
  // console.warn('getPostsMeta start ======>')
  // const repoFiletree: Filetree = repoFiletreeOrigin
  // const repoFiletree: Filetree = repoFiletreeOrigin
  // const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))
  const filesArray = (await getAllPostsFileName()) || [];
  // console.warn(filesArray, ' getPostsMeta filesArray ====>')
  const posts: Meta[] = [];
  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }
  // console.log(posts, ' getPostsMeta result======>')
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
