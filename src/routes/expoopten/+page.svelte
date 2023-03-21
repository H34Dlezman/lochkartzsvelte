<script lang="ts">
    interface BerichteByUserObject {
        firstName: string;
        lastName: string;
        accountBalance: number;
    }
    
    
    export let data
    console.log("ALO EXPOOP", data)
    var berichte: any[] = []
    var byUser: {[id: string] : any} = {}
    if (data) {
        berichte = JSON.parse(data.berichte)
        console.log("expooptieren", JSON.stringify(berichte[0]));
        
        for (let index = 0; index < berichte.length; index++) {
            const bericht = berichte[index];
            
            if (!byUser[bericht.user as string]) {
                byUser[bericht.user as string] = {
                    summe: parseInt(bericht.duration),
                    tags: bericht.tags
                }
            } else {
                console.log("exists", byUser[bericht.user as string]);
                console.log(bericht);
                
                byUser[bericht.user as string] = {
                    ...byUser[bericht.user as string],
                    summe: parseInt(bericht.duration) + parseInt(byUser[bericht.user as string].summe)
                }
                bericht.tags.forEach(function(value: any){
                    if (byUser[bericht.user as string].tags.indexOf(value)==-1) byUser[bericht.user as string] = {
                    ...byUser[bericht.user as string],
                    tags: [...byUser[bericht.user as string].tags, value]
                };
                });
                
                console.log(parseInt(bericht.duration));
                console.log("+");
                
                console.log(parseInt(byUser[bericht.user as string].summe));
                
                
                
                console.log("existsend");
            }
        }
    }
</script>

<h2>raw</h2>
<p>
    {#each berichte as bericht}
    {bericht.ts} {bericht.user} {bericht.duration} {bericht.tags} {bericht.descr}<br/>
    {/each}
</p>

<h2>by user</h2>
<p>
    {#each Object.keys(byUser) as userKey}
    <h4>{userKey}</h4>
    <h4>{byUser[userKey].summe}min - {byUser[userKey].tags}</h4>
    {/each}
</p>
