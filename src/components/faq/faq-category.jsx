export default function FaqCategory({ category, IconComponent }) {
  return (
    <div className="flex items-center gap-3 mb-6" >
      {/* <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div> */}
      <h2 className="text-3xl font-bold text-secondary">{category.title}</h2>
    </div>
  )
}