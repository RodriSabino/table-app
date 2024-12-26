'use client'

import { Avatar } from "@nextui-org/react"

interface KanbanCardProps {
  title: string
  description?: string
  tags?: string[]
  dueDate?: string
  members?: string[]
}

export function KanbanCard({ title, description, tags, dueDate, members }: KanbanCardProps) {
  return (
    <div className="kanban-item bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-all">
      {/* Título */}
      <h3 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      
      {/* Descripción truncada */}
      {description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {description}
        </p>
      )}
      
      {/* Etiquetas */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Footer con fecha y avatares */}
      <div className="flex justify-between items-center mt-2">
        {dueDate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(dueDate).toLocaleDateString()}
          </span>
        )}
        
        {members && members.length > 0 && (
          <div className="flex -space-x-2">
            {members.map((member, index) => (
              <Avatar
                key={index}
                src={member}
                className="w-6 h-6 border-2 border-white dark:border-gray-800"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 