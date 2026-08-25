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
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Categories</h1>
            <p className="text-gray-400 mt-1">
              Organize your tasks into categories
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-purple-600 hover:bg-purple-700 text-white
                       font-semibold px-5 py-2.5 rounded-xl transition
                       flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Category
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400
                          rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && categories.length === 0 && (
          <div className="flex items-center justify-center py-24">
            <div className="text-gray-400 text-lg animate-pulse">
              Loading categories...
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center
                          py-24 text-center">
            <span className="text-6xl mb-4">📂</span>
            <h3 className="text-white text-xl font-semibold mb-2">
              No categories yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first category to get started
            </p>
            <button
              onClick={handleAddNew}
              className="bg-purple-600 hover:bg-purple-700 text-white
                         px-6 py-3 rounded-xl transition font-semibold"
            >
              + Create Category
            </button>
          </div>
        )}

        {/* Grid */}
        {categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2
                          md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              className="bg-gray-800/50 rounded-2xl p-5 cursor-pointer
                         border-2 border-dashed border-gray-700
                         hover:border-purple-500 transition duration-200
                         flex flex-col items-center justify-center gap-2
                         min-h-[160px] hover:bg-gray-800"
            >
              <span className="text-4xl text-gray-600">+</span>
              <p className="text-gray-500 text-sm font-medium">
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
      <div className="min-h-screen bg-gray-900 px-6 py-8 pb-24"></div>
    </div>
  )
}

export default Categories