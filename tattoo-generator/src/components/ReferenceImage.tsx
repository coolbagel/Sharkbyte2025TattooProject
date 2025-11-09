// src/components/ReferenceImageUpload.tsx
import React, { useState, useRef } from 'react'
import '../styles/tattoo.css'

type Props = {
  onFileSelect: (file: File | null) => void
}

const ReferenceImageUpload: React.FC<Props> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setPreview(URL.createObjectURL(f))
      onFileSelect(f)
      if (fileRef.current) fileRef.current.value = ''
    } else {
      setPreview(null)
      onFileSelect(null)
    }
  }

  const clearImage = () => {
    setPreview(null)
    onFileSelect(null)
  }

  return (
    <div className="form-group">
      <label htmlFor="reference_image">Reference Image (optional):</label>
      <input
        id="reference_image"
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="native-file-input-hidden"
      />
      <button
        type="button"
        className="generate-btn"
        onClick={() => fileRef.current?.click()}
      >
        Upload Reference
      </button>

      {preview && (
        <div className="image-display preview-chrome small-preview">
          <img src={preview} alt="Reference preview" />
          <button type="button" className="generate-btn reset-btn" onClick={clearImage}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default ReferenceImageUpload
