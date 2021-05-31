import { useState } from 'react'
import './App.css';
import StarRatings from 'react-star-ratings';
import MultiSelect from "react-multi-select-component";


function App() {
  const genreList = [
    {
      label: "Action",
      value: "action"
    },
    {
      label: "Comedy",
      value: "comedy"
    },
    {
      label: "Thiller",
      value: "thiller"
    },
    {
      label: "Drama",
      value: "drama"
    }
  ]


  const ratingList = [...Array(10).keys()].map((index) => {
    return ({
      "label":
        <StarRatings
          rating={index + 1}
          starRatedColor="red"
          numberOfStars={10}
          starDimension="15px"
        />,
      "value": index + 1
    })
  });

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

  const [searchTerm, setSearchTerm] = useState("");
  const [ratings, setRatings] = useState([])
  const [genres, setGenres] = useState([])

  const myRatings = ratings.map((rating) => rating.value)
  const myGenres = genres.map((genre) => genre.value)

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
          <div className="ratingfilter">
            <MultiSelect
              options={ratingList}
              value={ratings}
              disableSearch={true}
              onChange={setRatings}
              valueRenderer = {(selected, _options) => {
                return selected.length
                  ? selected.map(({ value }) => value).join(", ")
                  : "😶 No Items Selected";
              }}
            />
          </div>
          <div>
            <MultiSelect
              options={genreList}
              value={genres}
              onChange={setGenres}
            />
          </div>
        </div>
        {moviesList.filter((val) => {
          if (searchTerm) {
            if (!val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
              return false;
            }
          }
          if (myRatings.length > 0) {
            if (!myRatings.some((index) => index === parseFloat(val.Rating))) {
              return false
            }
          }
          if (myGenres.length > 0) {
            if (!myGenres.some((index) => index.toLowerCase() === val.Category.toLowerCase())) {
              return false
            }
          }
          return true;
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
