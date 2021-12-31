import React from 'react';
import '../../../CSS Components/routes/post/Post.css';
import { useTranslation } from 'react-i18next';

export default function Post() {
  document.title = ' ✏️ Create - Memesfr';
  const { t, i18n } = useTranslation('common');

  return (
    <div className="create-post-container">
      <div className="create-post-container-title">
        <span className="create-post-title">{t('createPost')}</span>
        <span className="create-post-subtitle">{t('uploadDankMeme')}</span>
      </div>
    </div>
  );
}
