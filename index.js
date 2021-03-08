const gif_url =
  "https://api.giphy.com/v1/gifs/search?rating=G&api_key=jV2hmbSCIXBXfVaPTiPxLsCYSeUtWbC3&q=";
// const word_url = "https://random-words-api.vercel.app/word";
const word_url =
  "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7&minLength=2&maxLength=10&hasDictionaryDef=true";

function setup() {
  noCanvas();
  getdata()
    .then((results) => {
      createP(results.display_word);
      createImg(results.img);
    })
    .catch((err) => console.error(err));
}

async function getdata() {
  let response_word = await fetch(word_url);
  let data_word = await response_word.json();
  let word = data_word.word;
  let response_gif = await fetch(gif_url + word);
  let data_gif = await response_gif.json();
  let img_url = null;
  try {
    img_url = data_gif.data[0].images["fixed_height_small"].url;
  } catch (err) {
    console.log("no image found for " + word);
    console.error(err);
  }
  return {
    display_word: word,
    img: img_url,
  };
}
