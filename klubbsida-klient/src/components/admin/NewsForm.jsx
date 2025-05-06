import React from 'react';
import ImageUploader from './ImageUploader';

/**
 * Component for creating news posts
 */
export default function NewsForm({ 
  newsForm, 
  setNewsForm, 
  handleSubmitNews, 
  loading, 
  setError 
}) {
  // Handle news form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle image change from ImageUploader
  const handleImageChange = (name, value) => {
    setNewsForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Create News Post</h2>
      
      <form onSubmit={handleSubmitNews}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={newsForm.title}
            onChange={handleInputChange}
            placeholder="News Title"
          />
        </div>

        <ImageUploader
          label="Cover Image (Required: .webp format, 1:1 aspect ratio, min 600x600px)"
          name="coverpage"
          accept="image/webp"
          value={newsForm.coverpage}
          onChange={handleImageChange}
          validationOptions={{
            requiredFormat: 'webp',
            minWidth: 600,
            minHeight: 600,
            aspectRatio: 1,
            aspectRatioDescription: '1:1'
          }}
          setError={setError}
        />

        <ImageUploader
          label="Content Image (Optional: 16:9 aspect ratio)"
          name="contentImage"
          accept="image/*"
          value={newsForm.contentImage}
          onChange={handleImageChange}
          validationOptions={{
            aspectRatio: 16/9,
            aspectRatioDescription: '16:9'
          }}
          setError={setError}
        />
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            id="content"
            name="content"
            value={newsForm.content}
            onChange={handleInputChange}
            placeholder="News Content"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create News Post'}
          </button>
        </div>
      </form>
    </div>
  );
}