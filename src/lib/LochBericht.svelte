<script lang="ts">
    export let bericht:any = {ts: "", descr: "", tags: [], user: "", duration: 0};
    let {ts, descr, tags, user, duration} = bericht;
    
</script>

<div class="lochbericht-box">
    <h4>{ts} {user}</h4>
    <div><h3>{`${duration/60}h ${duration%60}m`} {#each tags as tag}{` | ${tag}`}{/each}</h3></div>
    <p>{descr}</p>
</div>

<style>
    .lochbericht-box {
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 5px 2px #00000020;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0;
        width: 400px;
        height: fit-content;
    }
</style>