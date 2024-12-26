'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Checkbox, Avatar } from "@nextui-org/react"
import { useState } from "react"
import { TaskItem } from "@/types/kanban"

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (cardData: TaskItem) => void
}

export function AddCardModal({ isOpen, onClose, onSubmit }: AddCardModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedTags: [] as string[],
    checklist: [
      { id: 1, text: "Crear wireframe", checked: false },
      { id: 2, text: "Obtener feedback", checked: false },
      { id: 3, text: "Finalizar diseño", checked: false },
    ],
    dueDate: "",
    attachments: "",
    comments: ""
  });

  const handleSubmit = () => {
    onSubmit(formData as TaskItem);
    setFormData({ // Reset form
      title: "",
      description: "",
      selectedTags: [],
      checklist: [
        { id: 1, text: "Crear wireframe", checked: false },
        { id: 2, text: "Obtener feedback", checked: false },
        { id: 3, text: "Finalizar diseño", checked: false },
      ],
      dueDate: "",
      attachments: "",
      comments: ""
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      className="dark"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Nueva Tarea</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Título"
              placeholder="Ingresa el título de la tarea"
              variant="bordered"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            
            <Textarea
              label="Descripción"
              placeholder="Describe la tarea"
              variant="bordered"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />

            <div className="flex flex-wrap gap-2">
              <span className="text-sm">Etiquetas:</span>
              {formData.selectedTags.map((tag: string) => (
                <Button
                  key={tag}
                  size="sm"
                  variant="flat"
                  className="px-2 py-1"
                >
                  {tag}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm">Checklist:</span>
              {formData.checklist.map((item) => (
                <Checkbox
                  key={item.id}
                  isSelected={item.checked}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      checklist: formData.checklist.map(i => 
                        i.id === item.id ? {...i, checked: !i.checked} : i
                      )
                    });
                  }}
                >
                  {item.text}
                </Checkbox>
              ))}
            </div>

            <Input
              type="date"
              label="Fecha límite"
              variant="bordered"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />

            <div className="flex flex-col gap-2">
              <span className="text-sm">Miembros:</span>
              <div className="flex gap-2">
                <Avatar src="https://i.pravatar.cc/150?u=1" />
                <Avatar src="https://i.pravatar.cc/150?u=2" />
                <Button isIconOnly size="sm">+</Button>
              </div>
            </div>

            <Input
              label="Adjuntos"
              placeholder="Añade enlaces a archivos"
              variant="bordered"
              value={formData.attachments}
              onChange={(e) => setFormData({...formData, attachments: e.target.value})}
            />

            <Textarea
              label="Comentarios"
              placeholder="Añade comentarios adicionales"
              variant="bordered"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 