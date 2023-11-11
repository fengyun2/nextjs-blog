'use client';

import '@mdxeditor/editor/style.css';
import type { ForwardedRef } from 'react';
import {
  // headingsPlugin,
  // listsPlugin,
  // quotePlugin,
  // thematicBreakPlugin,
  // markdownShortcutPlugin,
  // MDXEditor,
  // type MDXEditorMethods,
  // type MDXEditorProps,

  Separator,
  // CodeToggle,
  // InsertCodeBlock,
  InsertSandpack,
  // ConditionalContents,
  // ShowSandpackInfo,
  // InsertFrontmatter,
  // ChangeCodeMirrorLanguage,
  // TooltipWrap,
  // Button,
  // BlockTypeSelect,
  // InsertThematicBreak,
  // InsertAdmonition,
  // CreateLink,
  // ListsToggle,
  // ChangeAdmonitionType,
  frontmatterPlugin,
  diffSourcePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  KitchenSinkToolbar,
  type SandpackConfig,
  type EditorInFocus,
  type AdmonitionKind,
} from '@mdxeditor/editor';

import { MDXEditor, type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor/MDXEditor';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { markdownShortcutPlugin } from '@mdxeditor/editor/plugins/markdown-shortcut';
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
// import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { imagePlugin } from '@mdxeditor/editor/plugins/image';
import { tablePlugin } from '@mdxeditor/editor/plugins/table';
// import { codeBlockPlugin } from '@mdxeditor/editor/plugins/codeblock';
// import { codeMirrorPlugin } from '@mdxeditor/editor/plugins/codemirror';
// import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
// import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
// import { InsertImage } from '@mdxeditor/editor/plugins/toolbar/components/InsertImage';
// import { InsertTable } from '@mdxeditor/editor/plugins/toolbar/components/InsertTable';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';

import dataCode from 'raw-loader!../assets/dataCode.ts';

type EditorProps = {
  editorRef?: ForwardedRef<MDXEditorMethods> | null;
} & MDXEditorProps;

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

export const virtuosoSampleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
    {
      label: 'Vanilla',
      name: 'vanilla',
      meta: 'live vanilla',
      sandpackTheme: 'auto',
      sandpackTemplate: 'vanilla',
      snippetFileName: '/index.js',
      snippetLanguage: 'js',
      initialSnippetContent: `console.log('Hello world')`,
    },
    {
      label: 'Virtuoso',
      name: 'virtuoso',
      meta: 'live virtuoso',
      sandpackTemplate: 'react-ts',
      sandpackTheme: 'light',
      snippetFileName: '/App.tsx',
      initialSnippetContent: defaultSnippetContent,
      dependencies: {
        'react-virtuoso': 'latest',
        '@ngneat/falso': 'latest',
      },
      files: {
        // @ts-ignore
        '/data.ts': dataCode,
      },
    },
  ],
};

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== 'directive') {
    return false;
  }
  return ['note', 'tip', 'danger', 'info', 'caution'].includes(node.getMdastNode().name as AdmonitionKind);
}

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
      contentEditableClassName='prose max-w-none'
      {...props}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        // linkDialogPlugin(),
        imagePlugin({
          imageUploadHandler,
          // imagePreviewHandler: () => {
          //   return Promise.resolve('https://picsum.photos/200/300');
          // },
          // imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
        }),
        tablePlugin(),
        frontmatterPlugin(),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
        sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <InsertSandpack />
              <Separator />

              <KitchenSinkToolbar />
            </>
          ),
          // toolbarContents: () => (
          //   <>
          //     <ConditionalContents
          //       options={[
          //         {
          //           when: (editor) => editor?.editorType === 'codeblock',
          //           contents: () => <ChangeCodeMirrorLanguage />,
          //         },
          //         { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
          //         {
          //           fallback: () => (
          //             <>
          //               <TooltipWrap title='Save to database'>
          //                 <div className='h-[32px] w-[29px]'>
          //                   <Button onClick={() => console.log('保存成功')}>💾</Button>
          //                 </div>
          //               </TooltipWrap>
          //               <UndoRedo />
          //               <Separator />
          //               <BoldItalicUnderlineToggles />
          //               <CodeToggle />
          //               <Separator />
          //               <ListsToggle />
          //               <Separator />

          //               <ConditionalContents
          //                 options={[
          //                   { when: whenInAdmonition, contents: () => <ChangeAdmonitionType /> },
          //                   { fallback: () => <BlockTypeSelect /> },
          //                 ]}
          //               />

          //               <Separator />

          //               <CreateLink />
          //               <InsertImage />

          //               <Separator />

          //               <InsertTable />
          //               <InsertThematicBreak />

          //               <Separator />
          //               <InsertCodeBlock />

          //               <Separator />
          //               <InsertSandpack />

          //               <ConditionalContents
          //                 options={[
          //                   {
          //                     when: (editorInFocus) => !whenInAdmonition(editorInFocus),
          //                     contents: () => (
          //                       <>
          //                         <Separator />
          //                         <InsertAdmonition />
          //                       </>
          //                     ),
          //                   },
          //                 ]}
          //               />

          //               <Separator />
          //               <InsertFrontmatter />
          //             </>
          //           ),
          //         },
          //       ]}
          //     />
          //   </>
          // ),
        }),
      ]}
      ref={editorRef}
    />
  );
}
