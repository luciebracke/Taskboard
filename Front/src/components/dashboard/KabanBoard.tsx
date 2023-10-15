/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import PlusIcon from "../icons/PlusIcon";
import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "../../types";
import { getBoards } from '../../api';
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import io,{ Socket } from 'socket.io-client';

const socket = io('http://localhost:3001');

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks: Task[] = [
 
  
];

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const[boardID, setBoardID] = useState<string>(); //array of boards [
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { isLoading, isError, data, error ,refetch} = useQuery(['boards'], getBoards);
  console.log({ isLoading, isError, data, error ,});
 const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
 
    // For example:
    socket.emit('message', 'Hello, server!');

    
useEffect(() => {
  if (!isLoading && !isError && data) {
    
    const extractedTasks: Task[] = data.flatMap((boardItem: any) =>
      boardItem.task.map((taskItem: any) => ({
        id: taskItem._id,
        boardId: data[0]._id,
        columnId: taskItem.state,
        content: taskItem.description,
        priority: taskItem.priority,
      
      }))
    );
    setBoardID(data[0]._id);
    setTasks(extractedTasks);
  }
}, [isLoading, isError, data]);
useEffect(() => {
  // Des actions vont être effectuées lorsqu'un événement sera reçu par socket du server
  socket.on('taskCreated', (newTask) => {
    //Refect la liste des taches
    refetch();
  });
  socket.on('taskDeleted', (newTask) => {
   //Refect la liste des taches
    refetch();
  });

  return () => {
    // Clean up the socket event listener when the component unmounts
    socket.off('taskCreated');
  };
}, [refetch]);

if (isLoading) {
  return <div>Loading...</div>
}
if (isError) {
  return <div>Error: {(error as Error).message}</div>
}

  console.log({tasks });
  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
               
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(description:string,columnId: Id,) {
    
    //Faire une requete post pour ajouter une tache
    socket.emit('createTask', boardID,description,columnId,'low');
 }

  function deleteTask(taskid: Id,boardid: Id) {
   //make a delete request to the server with socket
    socket.emit('deleteTask', boardid,taskid);
    console.log("taskid : ",taskid ,"boardid : ",boardid);
    const newTasks = tasks.filter((task) => task.id !== taskid);
    return {...newTasks, tasks};
  }

  function updateTask(id: Id, content: string) {
    console.log("boardID",boardID,"id : ",id ,"content : ",content);
    socket.emit('updateTask', boardID,id,content);
  }

  function createNewColumn() {
    /* const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]); */
  }

  function deleteColumn(id: Id) {
    /* const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks); */
  }

  function updateColumn(id: Id, title: string) {
   /*  const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns); */
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((tache) => tache.id === activeId);
        const overIndex = tasks.findIndex((tache) => tache.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
        
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((tache) => tache.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}


export default KanbanBoard;
