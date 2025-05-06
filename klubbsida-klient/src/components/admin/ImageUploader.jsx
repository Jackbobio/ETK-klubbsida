import React from 'react';

/**
 * Reusable component for image uploading with validation
 */
export default function ImageUploader({ 
  label, 
  name, 
  accept, 
  value, 
  onChange, 
  validationOptions, 
  setError 
}) {
  // Validate image dimensions and format
  const validateImage = (file, options) => {
    return new Promise((resolve, reject) => {
      // Check file type
      if (options.requiredFormat && !file.type.includes(options.requiredFormat)) {
        reject(`Image must be in ${options.requiredFormat} format`);
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        
        // Check dimensions
        if (options.minWidth && img.width < options.minWidth) {
          reject(`Image width must be at least ${options.minWidth}px`);
          return;
        }
        
        if (options.minHeight && img.height < options.minHeight) {
          reject(`Image height must be at least ${options.minHeight}px`);
          return;
        }
        
        // Check aspect ratio if required
        if (options.aspectRatio) {
          const ratio = img.width / img.height;
          const expectedRatio = options.aspectRatio;
          
          // Allow small tolerance for rounding errors
          if (Math.abs(ratio - expectedRatio) > 0.01) {
            reject(`Image must have ${options.aspectRatioDescription} aspect ratio`);
            return;
          }
        }
        
        resolve(true);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject('Invalid image file');
      };
      
      img.src = objectUrl;
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Validate image with provided options
      await validateImage(file, validationOptions);
      
      // If validation passes, read the file
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(name, reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(`${name} error: ${err}`);
      e.target.value = ''; // Reset the input
    }
  };

  return (
    <div className='mb-4'>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
        type="file"
        name={name}
        accept={accept}
        onChange={handleImageUpload}
      />
      {value && (
        <div className="mt-2">
          <p className="text-green-600 text-sm">{name.charAt(0).toUpperCase() + name.slice(1)} uploaded successfully</p>
          <img 
            src={value} 
            alt={`${name} preview`} 
            className="mt-2 max-h-40 object-contain"
          />
        </div>
      )}
    </div>
  );
}