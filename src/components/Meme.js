import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleClick() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous"; // Handle CORS issue
    image.src = meme.randomImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Define the styles for top and bottom text
      const textStyle = {
        position: "absolute",
        width: "80%",
        textAlign: "center",
        transform: "translateX(-50%)",
        margin: "15px 0",
        padding: "0 5px",
        left: "50%",
        fontFamily: "impact, sans-serif",
        fontSize: "2em",
        textTransform: "uppercase",
        color: "white",
        letterSpacing: "1px",
        textShadow:
          "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000",
      };

      // Draw the top text on the canvas
      context.font = textStyle.fontSize + " " + textStyle.fontFamily;
      context.fillStyle = textStyle.color;
      context.textAlign = "center";
      context.textTransform = textStyle.textTransform;
      context.letterSpacing = textStyle.letterSpacing;
      context.textShadow = textStyle.textShadow;
      context.fillText(meme.topText, canvas.width / 2, 50);

      // Draw the bottom text on the canvas
      context.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      // Create a new URL for the modified canvas and download it
      const dataURL = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "meme_with_text.jpg";
      a.click();
    };
  }

  return (
    <main>
      <div className="form">
        <input
          className="input-text"
          placeholder="Enter top text"
          type="text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="input-text"
          placeholder="Enter bottom text"
          type="text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>

      <div className="download">
        <button className="download-button" onClick={handleClick}>
          Download Meme
        </button>
      </div>
    </main>
  );
}
