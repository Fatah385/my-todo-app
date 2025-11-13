import { Menu, Plus, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /* stores the date the user selects */
  const [dueDate, setDueDate] = useState("");
  /* date input appears after typing something */
  const [pickingDate, setPickingDate] = useState(false);
  /* remembers which item needs a due date */
  const [tempId, setTempId] = useState(null);

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  function handleAddItem() {
    if (inputValue.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: inputValue,
      checked: false,
      due: "",
    };
    setItems([...items, newItem]);
    setInputValue("");
    setPickingDate(true);
    setTempId(newItem.id);
  }

  function handleToggleChecked(id) {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  }

  function handleSaveDate() {
    if (!dueDate) return;
    const updatedItems = items.map((item) =>
      item.id === tempId ? { ...item, due: dueDate } : item
    );
    setItems(updatedItems);
    setDueDate("");
    setPickingDate(false);
    setTempId(null);
  }

  function handleCancelDate() {
    setItems(items.filter((item) => item.id !== tempId));
    setPickingDate(false);
    setDueDate("");
    setTempId(null);
  }

  return (
    <div className="container-layout w-full h-screen flex justify-center items-start pt-12">
      <div className="container max-w-96 h-[90%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll scrollbar-hide">
        <Navbar />
        <InputBar
          input={inputValue}
          onAddItem={handleAddItem}
          setInputValue={setInputValue}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />

        <PickingDate
          dueDate={dueDate}
          setDueDate={setDueDate}
          pickingDate={pickingDate}
          setPickingDate={setPickingDate}
          handleSaveDate={handleSaveDate}
          handleCancelDate={handleCancelDate}
        />

        <hr className="my-4 border-t border-gray-300 w-full" />

        <BoxDisplay title="to do">
          <TodoList items={items} onToggleChecked={handleToggleChecked} />
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

function InputBar({ input, onAddItem, setInputValue }) {
  function onSubmit(e) {
    e.preventDefault();
    onAddItem();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="Input-container bg-neutral-200 flex justify-between rounded-full py-2 px-3 items-center gap-2"
    >
      <input
        value={input}
        type="text"
        className="text-md border-none outline-none w-4/5"
        placeholder="Add a new chore..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-full p-1  hover:bg-blue-600 transition-colors"
      >
        <Plus />
      </button>
    </form>
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

function TodoList({ items, onToggleChecked }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          text={item.text}
          checked={item.checked}
          due={item.due}
          onToggleChecked={onToggleChecked}
        />
      ))}
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

function Item({ id, text, checked, due, onToggleChecked }) {
  return (
    <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
      <input
        key={id}
        checked={!!checked}
        onChange={() => onToggleChecked(id)}
        type="checkbox"
        className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
      />{" "}
      <span className={`${checked ? "line-through text-gray-400" : ""}`}>
        {text}
      </span>
      <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
        <CalendarDays /> Due: {due || "No due date"}
      </span>
    </li>
  );
}

function PickingDate({
  pickingDate,
  dueDate,
  setDueDate,
  handleSaveDate,
  handleCancelDate,
}) {
  return (
    <>
      {pickingDate && (
        <div className="w-full h-screen fixed top-0 left-0 bg-black/30 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg flex flex-col gap-4">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="text-md px-4 py-2 shadow-md rounded-lg border border-gray-300"
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={handleSaveDate}
                className="bg-sky-600 text-white w-1/2 py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                OK
              </button>
              <button
                onClick={handleCancelDate}
                className="bg-red-600 text-white w-1/2   py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
