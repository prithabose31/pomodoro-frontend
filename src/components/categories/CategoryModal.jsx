import { useState } from 'react'
import ColorPicker from './ColorPicker'
import EmojiPicker from './EmojiPicker'

const getInitialCategoryForm = (category) => ({
  name: category?.name || '',
  description: category?.description || '',
  emoji: category?.emoji || '💼',
  color: category?.color || '#8b5cf6'
})

function CategoryModal({ isOpen, onClose, onSave, onDelete, existingCategory }) {
  const [form, setForm] = useState(() => getInitialCategoryForm(existingCategory))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave(form)
    onClose()
  }

  if (!isOpen) return null

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm
                 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md
                   border border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">
            {existingCategory ? 'Edit Category' : 'New Category'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Preview */}
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: form.color + '15' }}
          >
            <span className="text-3xl">{form.emoji}</span>
            <div>
              <p
                className="font-semibold"
                style={{ color: form.color }}
              >
                {form.name || 'Category Name'}
              </p>
              <p className="text-gray-400 text-xs">
                {form.description || 'Description'}
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Work, DSA, Learning..."
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3
                         border border-gray-600 focus:border-purple-500
                         focus:outline-none focus:ring-1 focus:ring-purple-500
                         placeholder-gray-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What is this category for?"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3
                         border border-gray-600 focus:border-purple-500
                         focus:outline-none focus:ring-1 focus:ring-purple-500
                         placeholder-gray-500 transition"
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Icon
            </label>
            <EmojiPicker
              selected={form.emoji}
              onSelect={(emoji) => setForm({ ...form, emoji })}
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Color
            </label>
            <ColorPicker
              selected={form.color}
              onSelect={(color) => setForm({ ...form, color })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white
                         rounded-lg py-3 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white
                         font-semibold rounded-lg py-3 transition"
            >
              {existingCategory ? 'Save Changes' : 'Create'}
            </button>
            {/* Delete button — only show when editing */}
            {existingCategory && (
            <button
                type="button"
                onClick={() => onDelete(existingCategory.id)}
                className="w-full bg-red-600/20 hover:bg-red-600/40 text-red-400
                        rounded-lg py-2.5 transition text-sm mt-1"
            >
                Delete Category
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryModal