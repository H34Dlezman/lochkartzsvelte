
<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  export let form: ActionData;
  export let data: PageData;

  let serverTags = data.post.tags || []

  console.log("HI", serverTags, form)
  
  onMount(() => {
    if (form?.success) {
      localStorage.setItem("username", (form?.username||"") as string)
      goto("/")
    } else if (form?.success === false) {
      alert("GIVE ME ALL INFO, PUNK!\n\n\n🐱‍🐉")
    }
    username = localStorage.getItem("username") || ""
  })

  let username = ""
  let tagsValue = ""
</script>

<form method="POST">
  <label>
    Wann
    <input name="date" type="date" value="{new Date().toISOString().slice(0, 10)}">
  </label>
  <label>
    Länge (Minuten)
    <input name="duration" type="number"> 
    <div style="display: inline; user-select: none; border-radius: 2px; border: 1px solid black; margin: 0 5px; padding: 0 1px;" on:click={(event)=>{
      event.target.parentNode.childNodes[1].value = 60 + parseInt(event.target.parentNode.childNodes[1].value||0)
    }}>+1h</div><div style="display: inline; user-select: none; border-radius: 2px; border: 1px solid black; margin: 0 5px; padding: 0 1px;" on:click={(event)=>{
      event.target.parentNode.childNodes[1].value = 30 + parseInt(event.target.parentNode.childNodes[1].value||0)
    }}>+30m</div><div style="display: inline; user-select: none; border-radius: 2px; border: 1px solid black; margin: 0 5px; padding: 0 1px;" on:click={(event)=>{
      event.target.parentNode.childNodes[1].value = parseInt(event.target.parentNode.childNodes[1].value||0) - 30
    }}>-30m</div><div style="display: inline; user-select: none; border-radius: 2px; border: 1px solid black; margin: 0 5px; padding: 0 1px;" on:click={(event)=>{
      event.target.parentNode.childNodes[1].value = parseInt(event.target.parentNode.childNodes[1].value||0) - 60
    }}>-1h</div>
  </label>
  <label>
    Tags (Mobile,Variantpicker,Bugs,Design...)
    <input value={tagsValue} name="tagsstr" type="text">
    {#if serverTags!=null}
    {#each serverTags as tag}
    <div style="display: inline; user-select: none; border-radius: 2px; border: 1px solid black; margin: 0 5px; padding: 0 1px;" on:click={(event)=>{
      event.target.parentNode.childNodes[1].value += (event.target.parentNode.childNodes[1].value==""?"":",") + tag
    }}>{tag}</div>
    {/each}
    {/if}
  </label>
  <label>
    Beschreibung (optional)
    <input name="descr" type="text">
  </label>
  <label>
    Wer
    <input name="username" type="text" value={username}>
  </label>
  <button on:click={(e)=>{console.log(e)}}>Loch Fertigen</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>