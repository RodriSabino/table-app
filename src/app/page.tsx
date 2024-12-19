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

export default function Home() {
  const initialTodoItems = ["Schedule perm", "Rewind VHS tapes"];
  const doneItems = ["Pickup new mix-tape from Beth"];
  const inProgressItems = ["Debugging app issues", "Review PRs"];

  const [todoItems, setTodoItems] = useState<string[]>(initialTodoItems);
  const [doneListItems, setDoneItems] = useState<string[]>(doneItems);
  const [inProgressListItems, setInProgressItems] = useState<string[]>(inProgressItems);

  // Declaración correcta de useDragAndDrop
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, {
    group: "todoList",
  });

  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneListItems, {
    group: "todoList",
  });

  const [inProgressList, inprogress] = useDragAndDrop<HTMLUListElement, string>(inProgressListItems, {
    group: "todoList",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeList, setActiveList] = useState<{
    items: string[];
    setter: React.Dispatch<React.SetStateAction<string[]>>;
  }>({ items: [], setter: () => {} });

  const handleAddItemModal = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setActiveList({ items: list, setter });
    onOpen();
  };

  const addItemToList = () => {
    const newItem = `New Task ${activeList.items.length + 1}`;
    activeList.setter([...activeList.items, newItem]);
    onClose();
  };
  
  return (
    <>
      {/* Primera sección */}
      <section id="header">
        <div className="flex h-screen w-full flex-col text-white bg-slate-950">
          <BlurFade delay={0.25} inView>
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-4xl/none custom-margin">
                KanbanBoard
              </h2>
              <div className="z-15 flex custom-margin">
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
                onClick={() => handleAddItemModal(todoItems, setTodoItems)}
                style={{
                      backgroundColor: "#2E3A46", // Fondo del botón
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF", // Texto del botón
                      transition: "all 0.3s ease", // Suaviza el efecto de hover
                    }}
                    rippleColor="#ADD8E6" // Efecto ripple
                    className="hover:bg-blue-500 hover:scale-105 hover:shadow-lg" // Tailwind para hover
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
                      <li
                        className="kanban-item bg-white p-2 rounded shadow cursor-pointer"
                        key={todo}
                      >
                        {todo}
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
                    onClick={() => handleAddItemModal(inProgressItems, setInProgressItems)}
                    style={{
                      backgroundColor: "#2E3A46", // Fondo del botón
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF", // Texto del botón
                      transition: "all 0.3s ease", // Suaviza el efecto de hover
                    }}
                    rippleColor="#ADD8E6" // Efecto ripple
                    className="hover:bg-blue-500 hover:scale-105 hover:shadow-lg" // Tailwind para hover
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
                      <li
                        className="kanban-item bg-white p-2 rounded shadow cursor-pointer"
                        key={task}
                      >
                        {task}
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
                onClick={() => handleAddItemModal(doneItems, setDoneItems)}
                  style={{
                      backgroundColor: "#2E3A46", // Fondo del botón
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF", // Texto del botón
                      transition: "all 0.3s ease", // Suaviza el efecto de hover
                    }}
                    rippleColor="#ADD8E6" // Efecto ripple
                    className="hover:bg-blue-500 hover:scale-105 hover:shadow-lg" // Tailwind para hover

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
                        key={done}
                      >
                        {done}
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
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Add New Task</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to add a new task?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={addItemToList}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}