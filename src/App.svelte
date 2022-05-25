<script async lang="ts">
  import "./app.scss";
  import Todo from "./lib/Todo.svelte";
  type Todo = {
    _id: string;
    completed: boolean;
    text: string;
    createdAt: string;
    updatedAt: string;
  };

  let todoInputValue: string;

  const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch("https://weak-dove-75.deno.dev/todos");
    return res.json();
  };

  let todosPromise = getTodos();

  const submitTodo = async () => {
    const copy = todoInputValue;
    todoInputValue = "";

    await fetch("https://weak-dove-75.deno.dev/todo", {
      method: "POST",
      body: JSON.stringify({
        text: copy,
      }),
    });
    todosPromise = getTodos();
  };
</script>

<main>
  <controls>
    <h2>Create Todo</h2>
    <todo-input>
      <label for="todo-text">Text: </label>
      <input
        bind:value={todoInputValue}
        id="todo-text"
        type="text"
        placeholder="What you need todo?"
      />
    </todo-input>
    <button on:click={submitTodo}> Submit </button>
  </controls>
  <todos>
    {#await todosPromise}
      <p>...loading todos</p>
    {:then todos}
      {#each todos as todo}
        <Todo id={todo._id} text={todo.text} completed={todo.completed} />
      {/each}
    {:catch error}
      <p style="color: red">Something went wrong</p>
    {/await}
  </todos>
</main>

<style>
  main {
    @apply flex flex-row gap-40 flex-nowrap p-4;
  }
  todos {
    @apply flex flex-col gap-4 w-1/2;
  }

  controls {
    @apply flex flex-col w-1/2 bg-slate-600 rounded-md p-4 drop-shadow-md gap-5 h-min;
  }

  controls > h2 {
    @apply text-2xl self-center drop-shadow-md;
  }

  controls > button {
    @apply border-2 border-green-700 p-1 px-6 rounded-md bg-green-800 self-end drop-shadow-md;
  }
  controls > button:hover {
    @apply border-green-600 bg-green-700 ease-in-out transition-colors text-slate-100;
  }
  controls > button:active {
    @apply border-green-500 bg-green-600 ease-in-out transition-colors text-slate-100;
  }

  controls > todo-input {
    @apply flex flex-row gap-2 items-center border-0 border-b-2 border-slate-400 drop-shadow-md;
  }
  controls > todo-input > input {
    @apply form-input flex-grow mt-0 px-0.5 ring-0 focus:ring-0 focus:border-0 bg-transparent border-0 placeholder-slate-400;
  }
</style>
