'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
export function AddPost() {
  const [title, setTitle] = useState('');
  return (
    <div className='detail'>
      <div className='detail-header'>
        <div className='detail-header-title'>
          <h1>Add Post</h1>
        </div>
      </div>
    </div>
  );
}
