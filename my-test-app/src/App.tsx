import * as React from "react";
import TodoProvider from "./contexts/todoContext";
import Todos from "./containers/toDo/Todos";
import AddTodo from "./components/todo/AddTodo";
import { ThemeProvider} from "./contexts/ThemeContext";
import PageContent from "./components/themes/PageContent";
import ThemeWrapper from "./components/themes/ThemeWrapper";
import HomePage from "./components/chrome/HomePage";

export default function App() {
 
  return (
    <>
      {/* <TodoProvider>
        <main className="App">
          <h1>My Todos</h1>
          <AddTodo />
          <Todos />
        </main>
      </TodoProvider>
       */}
      {/* <ThemeProvider>
        <PageContent/>
        <ThemeWrapper/>
      </ThemeProvider> */}
      <HomePage/>
    </>
  );
}
