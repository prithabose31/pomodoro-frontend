import { useEffect, useState } from 'react'

import CategoryCard from '../components/categories/CategoryCard'
import CategoryModal from '../components/categories/CategoryModal'

import useCategoryStore from '../store/categoryStore'

import { useNavigate } from 'react-router-dom'

function Categories() {
  const {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory
  } = useCategoryStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const navigate = useNavigate()

  // Load categories from API on mount
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleCardClick = (category) => {
    navigate(`/categories/${category.id}`)
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, formData)
    } else {
      await addCategory(formData)
    }

    setIsModalOpen(false)
  }

  const handleDelete = async (categoryId) => {
    await removeCategory(categoryId)
    setIsModalOpen(false)
  }

  return (
    <div className="
      min-h-screen
      bg-[#F7F1E8]
      px-4 sm:px-6
      py-8
      pb-32
    ">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="
          flex
          flex-col sm:flex-row
          sm:items-center
          justify-between
          gap-5
          mb-8
        ">

          <div>
            <p className="
              text-[#A09287]
              text-sm
              font-medium
              mb-2
            ">
              Keep your work organized
            </p>

            <h1 className="
              text-3xl sm:text-4xl
              font-bold
              text-[#3D3833]
              tracking-tight
            ">
              Categories
            </h1>

            <p className="
              text-[#81776D]
              mt-2
            ">
              Organize your tasks into categories
            </p>
          </div>

          <button
            onClick={handleAddNew}
            className="
              bg-[#D49A84]
              hover:bg-[#C88972]
              text-white
              font-semibold
              px-5 py-2.5
              rounded-xl
              transition-all
              duration-200
              hover:-translate-y-0.5
              shadow-sm
              flex
              items-center
              gap-2
              self-start sm:self-auto
            "
          >
            <span className="text-xl leading-none">
              +
            </span>

            New Category
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="
            bg-[#F4DFDC]
            border border-[#E4C4BE]
            text-[#A85E52]
            rounded-xl
            px-4 py-3
            mb-6
            text-sm
          ">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && categories.length === 0 && (
          <div className="
            flex
            items-center
            justify-center
            py-24
          ">
            <div className="
              text-[#8A8178]
              text-lg
              animate-pulse
            ">
              Loading categories...
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && categories.length === 0 && (
          <div className="
            bg-[#FFFDF8]
            border border-[#E8DED2]
            rounded-3xl
            flex
            flex-col
            items-center
            justify-center
            py-20
            px-6
            text-center
            shadow-sm
          ">

            <div className="
              w-20 h-20
              rounded-2xl
              bg-[#EEE6F2]
              flex
              items-center
              justify-center
              text-5xl
              mb-5
            ">
              📂
            </div>

            <h3 className="
              text-[#3D3833]
              text-xl
              font-semibold
              mb-2
            ">
              No categories yet
            </h3>

            <p className="
              text-[#81776D]
              mb-6
            ">
              Create your first category to get started
            </p>

            <button
              onClick={handleAddNew}
              className="
                bg-[#D49A84]
                hover:bg-[#C88972]
                text-white
                px-6 py-3
                rounded-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                font-semibold
              "
            >
              + Create Category
            </button>

          </div>
        )}

        {/* Grid */}
        {categories.length > 0 && (
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
          ">

            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleCardClick}
              />
            ))}

            {/* Add New Card */}
            <div
              onClick={handleAddNew}
              className="
                bg-[#FFFDF8]/60
                rounded-2xl
                p-5
                cursor-pointer

                border-2
                border-dashed
                border-[#DCCFC2]

                hover:border-[#C8A99D]
                hover:bg-[#FFFDF8]

                transition-all
                duration-200

                flex
                flex-col
                items-center
                justify-center
                gap-2

                min-h-[160px]
              "
            >
              <span className="
                text-4xl
                text-[#B8A99A]
                font-light
              ">
                +
              </span>

              <p className="
                text-[#81776D]
                text-sm
                font-medium
              ">
                Add Category
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Modal */}
      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          existingCategory={editingCategory}
          onDelete={handleDelete}
        />
      )}

    </div>
  )
}

export default Categories