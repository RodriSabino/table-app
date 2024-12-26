"use client"; // Requerido para usar hooks en componentes de Next.js

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import BlurFade from "@/components/ui/blur-fade";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import RippleButton from "@/components/ui/ripple-button";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";

import { RainbowButton } from "@/components/ui/rainbow-button"; // Importa el botón personalizado
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { AddCardModal } from "@/components/AddCardModal"
import { KanbanCard } from "@/components/KanbanCard";

interface TaskItem {
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  members?: string[];
}

export default function Home() {
  const initialTodoItems: TaskItem[] = [
    {
      title: "Diseñar página de inicio",
      description: "Actualizar el diseño siguiendo las nuevas guías de UX",
      tags: ["Alta", "Diseño"],
      dueDate: "2024-12-28",
      members: ["https://i.pravatar.cc/150?u=1"]
    }
  ];

  const [todoItems, setTodoItems] = useState<TaskItem[]>(initialTodoItems);
  const [doneListItems, setDoneItems] = useState<TaskItem[]>([]);
  const [inProgressListItems, setInProgressItems] = useState<TaskItem[]>([]);

  // Actualizar los handlers de drag and drop
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, TaskItem>(
    todoItems,
    {
      group: "todoList",
      onChange: setTodoItems
    }
  );

  const [inProgressList, inprogress] = useDragAndDrop<HTMLUListElement, TaskItem>(
    inProgressListItems,
    {
      group: "todoList",
      onChange: setInProgressItems
    }
  );

  const [doneList, dones] = useDragAndDrop<HTMLUListElement, TaskItem>(
    doneListItems,
    {
      group: "todoList",
      onChange: setDoneItems
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<string>("");

  const handleAddCard = (cardData: TaskItem) => {
    switch(currentColumn) {
      case "todo":
        setTodoItems([...todoItems, cardData]);
        break;
      case "inProgress":
        setInProgressItems([...inProgressListItems, cardData]);
        break;
      case "done":
        setDoneItems([...doneListItems, cardData]);
        break;
    }
  };

  return (
    <>
      {/* Primera sección */}
      <section id="header">
        <div className="flex h-screen w-full flex-col text-white bg-slate-950 ">
          <BlurFade delay={0.25} inView>
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-4xl/none custom-margin">
                KanbanBoard
              </h2>
              <div className="z-15 flex custom-margin dark:bg-slate-900">
                <AnimatedGradientText>
                  🦊{" "}
                  <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                  <span
                    className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                    style={{
                      backgroundColor: "#ffffff", // Fondo oscuro
                      padding: "1px 2px", // Espaciado interno
                      borderRadius: "10px", // Bordes redondeados
                    }}
                  >
                    In Process
                  </span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
              </div>

            </div>

            {/* Botón para agregar ítems */}
            <div className="botonNew mb-4 text-center">
              <RainbowButton >Add New Column</RainbowButton>
            </div>

            <div className="container grid grid-cols-3 gap-4 p-4">
              {/* Lista de tareas pendientes */}
              <div className="column bg-gray-100 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">To Do</h2>
                  <RippleButton
                    onClick={() => {
                      setCurrentColumn("todo");
                      setIsModalOpen(true);
                    }}
                    style={{
                      backgroundColor: "#2E3A46",
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF",
                      transition: "all 0.3s ease",
                    }}
                    rippleColor="#ADD8E6"
                    className="hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
                  >
                    +
                  </RippleButton>
                </div>
                <ul ref={todoList} className="space-y-2 min-h-[50px]">
                  {todoItems.length === 0 ? (
                    <li className="kanban-item bg-gray-200 p-2 rounded text-gray-500">
                      Drag items here
                    </li>
                  ) : (
                    todoItems.map((todo) => (
                      <li key={todo.title}>
                        <KanbanCard
                          title={todo.title}
                          description={todo.description}
                          tags={todo.tags}
                          dueDate={todo.dueDate}
                          members={todo.members}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Lista de tareas en progreso */}
              <div className="column bg-gray-100 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">In Progress</h2>
                  <RippleButton
                    onClick={() => {
                      setCurrentColumn("inProgress");
                      setIsModalOpen(true);
                    }}
                    style={{
                      backgroundColor: "#2E3A46",
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF",
                      transition: "all 0.3s ease",
                    }}
                    rippleColor="#ADD8E6"
                    className="hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
                  >
                    +
                  </RippleButton>
                </div>
                <ul ref={inProgressList} className="space-y-2 min-h-[50px]">
                  {inProgressListItems.length === 0 ? (
                    <li className="kanban-item bg-gray-200 p-2 rounded text-gray-500">
                      Drag items here
                    </li>
                  ) : (
                    inProgressListItems.map((task) => (
                      <li key={task.title}>
                        <KanbanCard
                          title={task.title}
                          description={task.description}
                          tags={task.tags}
                          dueDate={task.dueDate}
                          members={task.members}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Lista de tareas completadas */}
              <div className="column bg-gray-100 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Done</h2>
                  <RippleButton
                    onClick={() => {
                      setCurrentColumn("done");
                      setIsModalOpen(true);
                    }}
                    style={{
                      backgroundColor: "#2E3A46",
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF",
                      transition: "all 0.3s ease",
                    }}
                    rippleColor="#ADD8E6"
                    className="hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
                  >
                    +
                  </RippleButton>
                </div>
                <ul ref={doneList} className="space-y-2 min-h-[50px]">
                  {doneListItems.length === 0 ? (
                    <li className="kanban-item bg-gray-200 p-2 rounded text-gray-500">
                      Drag items here
                    </li>
                  ) : (
                    doneListItems.map((done) => (
                      <li
                        className="kanban-item bg-white p-2 rounded shadow cursor-pointer"
                        key={done.title}
                      >
                        <KanbanCard
                          title={done.title}
                          description={done.description}
                          tags={done.tags}
                          dueDate={done.dueDate}
                          members={done.members}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
      {/* Modal */}
      <Modal backdrop="blur" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Add New Task</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to add a new task?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleAddCard}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <AddCardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCard}
      />
    </>
  );
}