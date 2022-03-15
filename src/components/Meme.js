import './Meme.css'
import React from 'react';
export default function Meme() {


    // const [allMemeImages, setAllMemeImages] = React.useState();
    const [allMemeImages, setAllMemeImages] = React.useState([]);

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMemeImages(data.data.memes))
    }, [])

    function getMemeImage() {
        setMeme(prev => {
            return {
                ...prev,
                randomImage: allMemeImages[Math.floor(Math.random() * 100 + 1)].url
            }
        });

    }

    function changeHandler(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className='form'>
                <input
                    type="text"
                    placeholder='Top text'
                    className='form-input'
                    value={meme.topText}
                    name="topText"
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    placeholder='Bottom text'
                    className='form-input'
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={changeHandler}
                />
                <button className='form-button' onClick={() => getMemeImage()}>Get a new meme image  🖼</button>
            </div>


            <div className="meme">
                <img src={meme.randomImage} className="meme-image" alt='random meme' />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>

        </main>
    );
}

