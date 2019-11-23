import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

type FormElement = React.FormEvent<HTMLFormElement>

/**
 * interfaces are custom types
 * you can extend interfaces, like you can types
 * @interface iTodo
 */
interface iTodo {
	text: string,
	complete: boolean,
}

export default function App(): JSX.Element {
	const [value, setValue] = useState<string>('');
	const [todos, setTodos] = useState<iTodo[]>([]);

	/**
	 * @function handleSubmit
	 * @description takes user input and adds it to todos array
	 * addTodo(value) is taking the value we destructured from useState above
	 * then it sets that value to an empty string
	 * @param {FormElement} e
	 * @returns void
	 */
	const handleSubmit = (e:FormElement):void => {
		e.preventDefault();
		addTodo(value)
		setValue('');
	}

	/**
	 * @function addTodo
	 * @description adds string to todos array
	 * uses setTodos from hook to change value of todos
	 * @param {string} text
	 * @returns void
	 */
	const addTodo = (text:string):void => {
		const newTodos:iTodo[] = [...todos, {text, complete: false}]
		setTodos(newTodos);
	}

	/**
	 * @function completeTodo
	 * @description toggles complete attribute of a todo item
	 * @param {number} index
	 * @returns void
	 */
	const completeTodo = (index:number):void => {
		const newTodos:iTodo[] = [...todos];
		newTodos[index].complete = !newTodos[index].complete;
		setTodos(newTodos);
	};

	const removeTodo = (index:number):void => {
		const newTodos:iTodo[] = [...todos];
		setTodos(newTodos.filter((todo, i) => index !== i));
	}

	return (
		<>
			<h1>TS HOOKS TODO</h1>
			<form onSubmit={handleSubmit}>
				<input type='text' value={value} onChange={e => setValue(e.target.value)} required/>
				<button type='submit'>Add Todo</button>
			</form>
			<section>
				{todos.map((todo:iTodo, index:number) => {
					return (
						<Fragment key={`${todo.text}${index}`}>
							<div style={{ textDecoration: todo.complete ? 'line-through' : ''}}>{todo.text}</div>
							<button type='button' onClick={() => completeTodo(index)}>
								{todo.complete ? 'Incomplete' : 'Complete'}
							</button>
							<button type='button' onClick={() => removeTodo(index)}>X</button>
						</Fragment>
					)})}
			</section>
		</>
	)
}

const root = document.getElementById('app-root');
ReactDOM.render(<App />, root);