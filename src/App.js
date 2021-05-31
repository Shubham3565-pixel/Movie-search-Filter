import { useState } from 'react'
import './App.css';
import StarRatings from 'react-star-ratings';
import { Multiselect } from "multiselect-react-dropdown";

function App() {
  const moviesList = [
    {
      "title": "The Matrix",
      "Rating": "7.5",
      "Category": "Action"
    },
    {
      "title": "Focus",
      "Rating": "6.9",
      "Category": "Comedy"
    },
    {
      "title": "The Lazarus Effect",
      "Rating": "6.4",
      "Category": "Thiller"
    },
    {
      "title": "Everly",
      "Rating": "5.0",
      "Category": "Action"
    },
    {
      "title": "Maps to the Stars",
      "Rating": "7.5",
      "Category": "Drama"
    }]
  const ratings = [...Array(10).keys()].map((index) => {
    return {
      'key': index + 1
    }
  })

  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState([])
  const [genre, setGenre] = useState([])

  function onSelectGenre(selectedList, selectedItem) {
    setGenre(selectedList.map((i) => i.Category))
  }

  function onSelectRating(selectedList, selectedItem) {
    setRating(selectedList.map((i) => i.key))
  }

  function onRemoveGenre(selectedList, removedItem) {
    setGenre(selectedList.map((i) => i.Category))
  }

  function onRemoveRating(selectedList, removedItem) {
    setRating(selectedList.map((i) => i.key))
  }

  return (
    <div className="App">
      <div className="container">
        <div style={{ display: "flex" }}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="search..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <div>
            <Multiselect
              options={ratings}
              displayValue="key"
              showCheckbox={true}
              placeholderButtonLabel='rating'
              onSelect={onSelectRating}
              onRemove={onRemoveRating}
            />
          </div>
          <div>
            <Multiselect
              options={moviesList}
              displayValue="Category"
              showCheckbox={true}
              onSelect={onSelectGenre}
              onRemove={onRemoveGenre}
            />
          </div>
        </div>
        {moviesList.filter((val) => {
          if (!rating.length && !genre.length && searchTerm) {
            if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val;
            }
          }
          else if (searchTerm === "") {
            return val
          }
          else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            if (rating.some((index) => index === parseFloat(val.Rating)) && genre.some((index) => index.toLowerCase() === val.Category.toLowerCase())) {
              return val;
            }
            else if (rating.some((index) => index === parseFloat(val.Rating)) || genre.some((index) => index.toLowerCase() === val.Category.toLowerCase())) {
              return val;
            }
          }
        }).map((val) => {
          return (
            <div style={{ border: "1px solid black", margin: "1px" }}>
              <div style={{ display: "flex" }}>
                <div>
                  <p>{val.title}</p>
                  <StarRatings
                    rating={parseFloat(val.Rating)}
                    starRatedColor="red"
                    numberOfStars={10}
                    starDimension="15px"
                  />
                </div>
                <div style={{ marginLeft: "40px", marginTop: "10px" }}>
                  {val.Category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
