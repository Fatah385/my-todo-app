import { Menu, Plus, CalendarDays } from "lucide-react";

function App() {
  return (
    <div className="container-layout w-full h-screen flex justify-center items-start pt-12">
      <div className="container max-w-96 h-[90%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll  scrollbar-hide ">
        <Navbar />
        <InputBar />

        <hr className="my-4 border-t border-gray-300 w-full" />

        <BoxDisplay title="to do">
          <TodoList />
        </BoxDisplay>

        <BoxDisplay title="completed">
          <CompletedList />
        </BoxDisplay>
      </div>
    </div>
  );
}

export default App;

function Navbar() {
  return (
    <nav className="flex items-center justify-between mb-4">
      <Menu />
      <h1 className="text-xl font-bold  text-neutral-800">Daily activities</h1>
    </nav>
  );
}

function InputBar() {
  return (
    <div className="Input-container bg-neutral-200 flex justify-between rounded-full py-2 px-3 items-center gap-2">
      <input
        type="text"
        className="text-md border-none outline-none w-4/5"
        placeholder="Add a new chore..."
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-full p-1  hover:bg-blue-600 transition-colors"
      >
        <Plus />
      </button>
    </div>
  );
}

function BoxDisplay({ title, children }) {
  return (
    <div className="todo-display text-md mb-4">
      <h2 className="uppercase font-semibold py-2">{title}</h2>
      {children}
    </div>
  );
}

function TodoList() {
  return (
    <ul className="flex flex-col gap-3">
      <Item text="Pick up mail" due="Today" />
      <Item text="Go to the store" due="11/12/2025" />
      <Item text="Get gift for her" due="11/25/2025" />
      <Item text="Clean the house" due="12/01/2025" />
    </ul>
  );
}

function CompletedList() {
  return (
    <ul className="flex flex-col gap-3">
      <Item checked={true} text="Buy cat food" due="Today" />
      <Item checked={true} text="Water the plants" due="11/10/2025" />
    </ul>
  );
}

function Item({ checked, text, due }) {
  return (
    <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
      <input
        checked={checked}
        onChange={() => {}}
        type="checkbox"
        className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
      />{" "}
      <span className={`${checked ? "line-through text-gray-400" : ""}`}>
        {text}
      </span>
      <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
        <CalendarDays /> Due: {due}
      </span>
    </li>
  );
}
