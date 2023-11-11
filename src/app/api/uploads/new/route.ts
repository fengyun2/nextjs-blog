import { extname, join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';

const PORT = process.env.PORT || 3000;

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, '_');
}
export async function GET(request: Request) {
  return new Response('Hello, Upload image');
}

export async function POST(request: NextRequest, res: any) {
  const formData = await request.formData();
  const file = formData.get('file') as Blob | null;
  if (!file) {
    return NextResponse.json(
      {
        code: -1,
        message: 'File blob is required.',
      },
      {
        status: 400,
      }
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const pathDist: string = join(process.cwd(), 'public', 'images');
  const relativeUploadDir = join(`${dayjs().format('YYYY-MM-DD')}`);
  const uploadDir = join(pathDist, relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error('Error while trying to create directory when uploading a file\n', e);
      return NextResponse.json(
        {
          code: -1,
          message: 'Error while trying to create directory when uploading a file',
        },
        {
          status: 500,
        }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    // @ts-ignore
    const fileExtension = extname(file.name);
    // @ts-ignore
    const originalFilename = file.name?.replace(/\.[^/.]+$/, '');
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    console.log('filename : ' + filename);
    await writeFile(join(uploadDir, filename), buffer);
    const finalFilePath = `http://localhost:${PORT}/images/${relativeUploadDir}/${filename}`;
    return NextResponse.json(
      {
        code: 0,
        message: 'File uploaded successfully',
        data: {
          filename: filename,
          httpfilepath: finalFilePath,
          url: finalFilePath,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error('Error while trying to upload a file\n', e);
    return NextResponse.json(
      {
        code: -1,
        message: 'Error while trying to upload a file',
      },
      {
        status: 500,
      }
    );
  }
}
