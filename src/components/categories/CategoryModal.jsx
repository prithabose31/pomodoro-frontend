import { useState } from 'react'

import ColorPicker from './ColorPicker'
import EmojiPicker from './EmojiPicker'

const getInitialCategoryForm = (category) => ({
  name: category?.name || '',
  description: category?.description || '',
  emoji: category?.emoji || '💼',
  color: category?.color || '#C97862'
})

function CategoryModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  existingCategory
}) {
  const [form, setForm] = useState(() =>
    getInitialCategoryForm(existingCategory)
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) return

    onSave(form)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0
        bg-[#3D3833]/30
        backdrop-blur-sm
        flex items-center justify-center
        z-50
        px-4
        py-6
      "
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="
          bg-[#FFFDF8]
          rounded-3xl
          p-6
          sm:p-7
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto

          border border-[#E8DED2]
          shadow-2xl
          shadow-[#3D3833]/10
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="
              text-[#A09287]
              text-xs
              font-medium
              uppercase
              tracking-wide
              mb-1
            ">
              Categories
            </p>

            <h2 className="
              text-[#3D3833]
              text-xl
              font-bold
            ">
              {existingCategory
                ? 'Edit Category'
                : 'New Category'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9 h-9
              rounded-xl
              flex items-center justify-center
              text-[#8A8178]
              hover:text-[#5F574F]
              hover:bg-[#F7F1E8]
              transition-colors
              text-2xl
            "
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Preview */}
          <div
            className="
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              border
              border-[#E8DED2]
            "
            style={{
              backgroundColor: form.color + '12'
            }}
          >
            <div
              className="
                w-12 h-12
                rounded-xl
                flex items-center justify-center
                text-3xl
              "
              style={{
                backgroundColor: form.color + '20'
              }}
            >
              {form.emoji}
            </div>

            <div className="min-w-0">
              <p
                className="font-semibold truncate"
                style={{ color: form.color }}
              >
                {form.name || 'Category Name'}
              </p>

              <p className="
                text-[#8A8178]
                text-xs
                truncate
                mt-0.5
              ">
                {form.description || 'Description'}
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              placeholder="e.g. Work, DSA, Learning..."
              className="
                w-full
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                px-4
                py-3

                border border-[#DCCFC2]

                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15

                placeholder-[#B0A59A]

                transition
              "
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Description
            </label>

            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              placeholder="What is this category for?"
              className="
                w-full
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                px-4
                py-3

                border border-[#DCCFC2]

                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15

                placeholder-[#B0A59A]

                transition
              "
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Icon
            </label>

            <EmojiPicker
              selected={form.emoji}
              onSelect={(emoji) =>
                setForm({
                  ...form,
                  emoji
                })
              }
            />
          </div>

          {/* Color */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Color
            </label>

            <ColorPicker
              selected={form.color}
              onSelect={(color) =>
                setForm({
                  ...form,
                  color
                })
              }
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 space-y-3">

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  bg-[#F3EDE5]
                  hover:bg-[#EAE0D5]
                  text-[#625A52]
                  rounded-xl
                  py-3
                  font-medium
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  flex-1
                  bg-[#D49A84]
                  hover:bg-[#C88972]
                  text-white
                  font-semibold
                  rounded-xl
                  py-3
                  transition-all
                  hover:-translate-y-0.5
                "
              >
                {existingCategory
                  ? 'Save Changes'
                  : 'Create'}
              </button>
            </div>

            {/* Delete */}
            {existingCategory && (
              <button
                type="button"
                onClick={() =>
                  onDelete(existingCategory.id)
                }
                className="
                  w-full
                  bg-[#F8E4DF]
                  hover:bg-[#F2D6D0]
                  text-[#A85E52]
                  rounded-xl
                  py-2.5
                  transition
                  text-sm
                  font-medium
                "
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