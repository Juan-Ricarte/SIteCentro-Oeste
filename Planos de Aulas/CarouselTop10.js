import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";
import sliderArrow from "../../assets/image/sliderArrow.png";

export default function Carousel(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const carousel = useRef(null);
  useEffect(() => {
    fetch(props.url)
      .then((Response) => Response.json())
      .then((Response) => {
        setData(Response.results);
      });
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  return (
    <div className="container">
      <button className="slider-arrow first-arrow" onClick={handleLeftClick}>
        <img src={sliderArrow} alt="Scroll Left"></img>
      </button>
      <div className="top10-carousel" ref={carousel}>
        {data.map((show) => {
          const {
            id,
            title,
            poster_path,
            overview,
            release_date,
            vote_average,
          } = show;
          if (!poster_path) {
            return '';
          }
          if (id == 919689){
            return '';
          }
          return (
            <div
              className="top10-show"
              key={id}
              onClick={() =>
                navigate("/Details", {
                  state: {
                    id,
                    title,
                    poster: poster_path,
                    overview,
                    date: release_date,
                    vote: vote_average,
                    isMovie: true,
                    show,
                  },
                })
              }
            >
              <img alt=""></img>
              <img
                alt=""
                src={
                  "https://image.tmdb.org/t/p/w220_and_h330_face" + poster_path
                }
                className="image"
              ></img>
            </div>
          );
        })}
      </div>
      <button
        className="slider-arrow top10-arrow second-arrow "
        onClick={handleRightClick}
      >
        <img src={sliderArrow} alt="Scroll Right"></img>
      </button>
    </div>
  );
}