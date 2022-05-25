<script lang="ts">
  import CheckIcon from "../icons/CheckIcon.svelte";
  import { useDebounce } from "../utils/debounce";
  export let completed = false;
  export let text = "No text";
  export let id: string;

  const debounce = useDebounce(async () => {
    const res = await fetch(`https://weak-dove-75.deno.dev/todo/${id}`, {
      method: "PATCH",
    });
    console.log(res);
  }, 1000);

  const onCheckboxClick = () => {
    debounce();
    completed = !completed;
  };
</script>

<todo>
  <todo-checkbox on:click={onCheckboxClick}>
    <CheckIcon visibility={completed ? "visible" : "hidden"} />
  </todo-checkbox>
  <todo-text> {text} </todo-text>
</todo>

<style lang="scss">
  todo {
    @apply flex flex-row p-4 items-center gap-2 rounded-md bg-slate-600 drop-shadow-md;
  }

  todo-checkbox {
    @apply flex border-2 border-slate-400 rounded-md text-green-400;
  }

  todo-text {
    @apply text-base;
  }
</style>
