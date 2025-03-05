export async function getAllGames(){
    const res = await fetch('https://games.gamepix.com/games?sid=', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


    if(!res.ok){
        throw new Error('Could not fetch the games');
    }
    const data = await res.json()

    return data;
}