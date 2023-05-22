export async function getMeowArticle():Promise<string> {
 
    const res = await fetch("https://meowfacts.herokuapp.com", {
      cache: "no-store",
    });
    const data = await res.json();
    let text:string = data.data[0]; 

  return text;
}