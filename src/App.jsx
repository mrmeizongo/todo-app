import React, { useState, useEffect } from "react";
import "./App.css";

function Todo({ children, setTodos }) {
	const [isChecked, _] = useState(false);

	function handleOnChange(e) {
		e.preventDefault();
		const _todos = JSON.parse(window.sessionStorage.getItem("todos"));
		window.sessionStorage.setItem(
			"todos",
			JSON.stringify(_todos.filter((el) => el != e.target.value))
		);
		setTodos((prev) => prev.filter((el) => el != e.target.value));
	}

	return (
		<div className="Todo">
			<input
				type="checkbox"
				name="completed"
				value={children}
				onChange={handleOnChange}
				checked={isChecked}
			/>
			<p>{children}</p>
		</div>
	);
}

function Input({ setTodos, current, setCurrent }) {
	function handleOnChange(e) {
		setCurrent(e.target.value);
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		if (current != "") {
			const _todos = JSON.parse(window.sessionStorage.getItem("todos"));
			if (_todos)
				window.sessionStorage.setItem(
					"todos",
					JSON.stringify([..._todos, current])
				);
			else window.sessionStorage.setItem("todos", JSON.stringify([current]));

			setTodos((prev) => [...prev, current]);
			setCurrent("");
		}
	}

	return (
		<form onSubmit={handleOnSubmit} className="Form">
			<input
				type="text"
				placeholder="Enter task"
				name="todo__input"
				onChange={handleOnChange}
				value={current}
				title="Enter Todo"
				autoComplete="off"
				id="todo__input"
			/>
			<button type="submit">Add</button>
		</form>
	);
}

function Todos({ todos, setTodos }) {
	return (
		<div className="Todos">
			{todos.map((element, index) => {
				return (
					<Todo key={index} setTodos={setTodos}>
						{element}
					</Todo>
				);
			})}
		</div>
	);
}

function App() {
	const [todos, setTodos] = useState([]);
	const [current, setCurrent] = useState("");

	useEffect(() => {
		const _todos = JSON.parse(window.sessionStorage.getItem("todos"));
		if (_todos) setTodos([..._todos]);
		else setTodos([]);
	}, []);

	function resetTodos(e) {
		e.preventDefault();
		setTodos([]);
		const _todos = JSON.parse(window.sessionStorage.getItem("todos"));
		if (_todos) window.sessionStorage.setItem("todos", JSON.stringify([]));
	}

	return (
		<div className="App">
			<header>
				<h2>Todo App</h2>
				<button type="button" onClick={resetTodos}>
					Reset
				</button>
			</header>
			<main>
				{todos.length > 0 ? (
					<Todos todos={todos} setTodos={setTodos} />
				) : (
					<div style={{ marginBottom: "auto" }}>
						<h3>Track your todo list here!</h3>
						<p>Add a task below.</p>
					</div>
				)}
				<Input current={current} setCurrent={setCurrent} setTodos={setTodos} />
			</main>
		</div>
	);
}

export default App;
