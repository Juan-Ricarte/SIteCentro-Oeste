

export default function Carousel({
  url,
  keyResponse = "results",
  isMovie = true,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  const getValues = () => {
    fetch(url)
      .then((Response) => Response.json())
      .then((Response) => {
        setData(Response[keyResponse]);
      });
  }

  useEffect(() => {
    getValues();
  });

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
      {data.length > 0 ? (
        <>
          <button
            className="slider-arrow first-arrow"
            onClick={handleLeftClick}
          >
            <img src={sliderArrow} alt="Scroll Left"></img>
          </button>
          <div className="carousel" ref={carousel}>
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
              return (
                <div
                  className="show"
                  key={id}
                  onClick={() =>
                    navigate("/Details", {
                      state: {
                        id,
                        title,
                        poster: poster_path,
                        overview: overview,
                        date: release_date,
                        vote: vote_average,
                        isMovie,
                        show,
                      },
                    })
                  }
                >
                  <img
                    alt=""
                    src={
                      "https://image.tmdb.org/t/p/w220_and_h330_face" +
                      poster_path
                    }
                    className="image"
                  ></img>
                  <div className="tittle-wrapper">
                    {/*<span className="tittle">{title}</span>*/}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="slider-arrow second-arrow "
            onClick={handleRightClick}
          >
            <img src={sliderArrow} alt="Scroll Right"></img>
          </button>
        </>
      ) : (
        <div className="no-data">
          <p>Você ainda não possui nenhum show adicionado.</p>
          <MdOutlineScreenSearchDesktop className="discover-icon"></MdOutlineScreenSearchDesktop>
          <Link to='/Home' className="link-discover"> Explorar </Link>
        </div>
      )}
    </div>
  );
}