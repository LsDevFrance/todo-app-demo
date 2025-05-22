"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Faire les courses", completed: false },
    { id: 2, text: "Préparer la présentation", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Ma Todo List</h1>

        <Card>
          <CardHeader>
            <CardTitle>Ajouter une tâche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Entrez votre tâche..."
                className="flex-1"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes tâches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm font-medium leading-none ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
