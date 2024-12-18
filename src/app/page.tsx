"use client"; // Requerido para usar hooks en componentes de Next.js

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

import BlurFade from "@/components/ui/blur-fade";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import RippleButton from "@/components/ui/ripple-button";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";

import { RainbowButton } from "@/components/ui/rainbow-button"; // Importa el botón personalizado
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";


const features = [
  { name: "Feature 1", description: "This is the first feature." },
  { name: "Feature 2", description: "This is the second feature." },
  { name: "Feature 3", description: "This is the third feature." },
];
export default function Home() {
  const initialTodoItems = [
    "Schedule perm",
    "Rewind VHS tapes",
    "Make change for the arcade",
    "Get disposable camera developed",
    "Learn C++",
    "Return Nintendo Power Glove",
  ];
  const doneItems = ["Pickup new mix-tape from Beth"];
  const inProgressItems = ["Debugging app issues", "Review PRs"]; // Nueva lista

  // Manejo de estado para ítems
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [doneListItems, setDoneListItems] = useState(doneItems);
  const [inProgressListItems, setInProgressListItems] = useState(inProgressItems);

  // Configuración de las listas con drag-and-drop
  const [todoList, todos] = useDragAndDrop<HTMLUListElement, string>(todoItems, {
    group: "todoList",
  });
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneListItems, {
    group: "todoList",
  });
  const [inProgressList, inProgress] = useDragAndDrop<HTMLUListElement, string>(
    inProgressListItems,
    {
      group: "todoList",
    }
  );

  // Función para agregar un nuevo ítem a la lista "To Do"
  const addNewItem = () => {
    const newItem = `New Task ${todoItems.length + 1}`;
    setTodoItems([...todoItems, newItem]);
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
              <RainbowButton onClick={addNewItem}>Add New Column</RainbowButton>
            </div>

            <div className="container grid grid-cols-3 gap-4 p-4">
              {/* Lista de tareas pendientes */}
              <div className="column bg-gray-100 p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">To Do</h2>
                  <RippleButton
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
                  {todos.length === 0 ? (
                    <li className="kanban-item bg-gray-200 p-2 rounded text-gray-500">
                      Drag items here
                    </li>
                  ) : (
                    todos.map((todo) => (
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
                    style={{
                      backgroundColor: "#2E3A46", // Fondo del botón
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF", // Texto del botón
                    }}
                    rippleColor="#ADD8E6" // Efecto ripple
                  >
                    +
                  </RippleButton>
                </div>
                <ul ref={inProgressList} className="space-y-2 min-h-[50px]">
                  {inProgress.length === 0 ? (
                    <li className="kanban-item bg-gray-200 p-2 rounded text-gray-500">
                      Drag items here
                    </li>
                  ) : (
                    inProgress.map((task) => (
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
                    style={{
                      backgroundColor: "#2E3A46", // Fondo del botón
                      border: "1px solid rgba(255, 255, 255, 0.125)",
                      color: "#FFFFFF", // Texto del botón
                    }}
                    rippleColor="#ADD8E6" // Efecto ripple
                  >
                    +
                  </RippleButton>
                </div>
                <ul ref={doneList} className="space-y-2 min-h-[50px]">
                  {dones.length === 0 ? (
                    <li className="kanban-item bg-gray-200 p-2 rounded text-gray-500">
                      Drag items here
                    </li>
                  ) : (
                    dones.map((done) => (
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
    </>
  );
}