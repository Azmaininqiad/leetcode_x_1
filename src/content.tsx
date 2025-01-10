import './index.css'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ContentPage from '@/content/content'

if (window.location.href.startsWith('https://aws.amazon.com/')) {
  console.log('aws extension working');

  const root = document.createElement('div');
  root.id = '__leetcode_ai_whisper_container';
  document.body.append(root);

  createRoot(root).render(
    <StrictMode>
      <ContentPage />
    </StrictMode>
  );
}
