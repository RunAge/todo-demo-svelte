<script lang="ts">
  export let visibility:
    | "visible"
    | "hidden"
    | "collapse"
    | "initial"
    | "inherit" = "hidden";
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {visibility}
>
  <path
    d="M5 13L9 17L19 7"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
