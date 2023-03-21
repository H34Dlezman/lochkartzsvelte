<script lang="ts">
	import LochBericht from "$lib/LochBericht.svelte";

    export let data
    let berichte = JSON.parse(data.berichte)
    //console.log("AI", berichte)
    console.log("AIA");
    
</script>
<a href="/lochfertigung">neulochung</a>
<a href="/expoopten">expoopten</a>
<form method="POST" action="?/dropDB">
  <button>entlochen</button>
</form>
<ul>
    {#each berichte as bericht}
    <LochBericht bericht={bericht}/>
    {/each}
</ul>
