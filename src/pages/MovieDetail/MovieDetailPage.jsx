import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, Button, Modal, Spinner } from "react-bootstrap";
import YouTube from "react-youtube";
import "./MovieDetail.style.css";
import './RecCard.css';

const IMG_300 = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
const API = "https://api.themoviedb.org/3";
const KEY = process.env.REACT_APP_API_KEY;

function MovieDetailPage() {
  const { id } = useParams();
  const nav   = useNavigate();

  const [movie, setMovie]   = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recs, setRecs]       = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expIdx, setExpIdx] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const headers = { Authorization: `Bearer ${KEY}` };
      const [detail, rev, rec, vid] = await Promise.all([
        fetch(`${API}/movie/${id}?language=ko-KR`, { headers }).then(r=>r.json()),
        fetch(`${API}/movie/${id}/reviews`, { headers }).then(r=>r.json()),
        fetch(`${API}/movie/${id}/recommendations?language=ko-KR`, { headers }).then(r=>r.json()),
        fetch(`${API}/movie/${id}/videos?language=ko-KR`, { headers }).then(r=>r.json())
      ]);
      setMovie(detail);
      setReviews(rev.results ?? []);
      setRecs(rec.results ?? []);
      const t = vid.results?.find(v=>v.site==="YouTube" && v.type==="Trailer");
      setTrailer(t?.key ?? null);
    };
    fetchAll();
  }, [id]);

  if (!movie) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height:"70vh"}}>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <Container className="text-light py-4">
      <Row>
        <Col md={4} className="text-center mb-4">
          <img
            src={IMG_300 + movie.poster_path}
            alt={movie.title}
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        <Col md={8}>
          <div>
            {movie.genres.map(g=>(
              <Badge bg="danger" key={g.id} className="me-2 mb-2">{g.name}</Badge>
            ))}
          </div>
          <h1 className="mb-1">{movie.title}</h1>
          {movie.tagline && <h5 className="text-warning mb-3">{movie.tagline}</h5>}
          <p>
            ⭐ {movie.vote_average.toFixed(1)} &nbsp;|&nbsp;
            🍿 {Math.round(movie.popularity)} &nbsp;|&nbsp;
            {movie.adult ? "18+" : "ALL"}
          </p>
          <p className="mt-3">{movie.overview}</p>

          <hr className="border-secondary"/>

          <ul style={{listStyle:"none", paddingLeft:0, lineHeight:"2"}}>
            <li><Badge bg="danger" className="me-2">Budget</Badge>${movie.budget.toLocaleString()}</li>
            <li><Badge bg="danger" className="me-2">Revenue</Badge>${movie.revenue.toLocaleString()}</li>
            <li><Badge bg="danger" className="me-2">Release</Badge>{movie.release_date}</li>
            <li><Badge bg="danger" className="me-2">Runtime</Badge>{movie.runtime}분</li>
          </ul>

          {trailer && (
            <Button variant="danger" onClick={()=>setShowModal(true)}>
              예고편 보기
            </Button>
          )}
        </Col>
      </Row>

      <h3 className="mt-5 mb-3">리뷰</h3>
      {reviews.length === 0 && <p>리뷰가 없습니다.</p>}
      {reviews.map((rev, idx)=>(
        <div key={rev.id} className="mb-4">
          <p><strong>{rev.author}</strong></p>
          <p>
            {expIdx===idx ? rev.content : rev.content.slice(0,300)}
            {rev.content.length>300 && (
              <Button variant="link" className="p-0 ms-2 text-decoration-none text-danger"
                      onClick={()=>setExpIdx(expIdx===idx?null:idx)}>
                {expIdx===idx ? "접기" : "더보기"}
              </Button>
            )}
          </p>
          <hr className="border-secondary"/>
        </div>
      ))}

      {recs.length > 0 && (
        <>
          <h3 className="mt-5 mb-3">추천 영화</h3>
          <div className="d-flex flex-wrap">
            {recs.slice(0, 10).map((r) => (
              <div
                key={r.id}
                className="rec-card me-3 mb-3"
                style={{
                  backgroundImage: `url(https://www.themoviedb.org/t/p/w300${r.poster_path})`,
                }}
                onClick={() => nav(`/movies/${r.id}`)}
              >
                <div className="overlay">{r.title}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen="md-down"
        size="xl"
        contentClassName="bg-dark"
      >
        <Modal.Header closeButton closeVariant="white" className="border-0" />
        <Modal.Body className="p-0">
          {trailer ? (
            <div style={{ width: '100%', maxWidth: '1280px', height: '720px', margin: '0 auto' }}>
              <YouTube
                videoId={trailer}
                className="w-100 h-100"
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: { autoplay: 1 }
                }}
              />
            </div>
          ) : (
            <p className="text-center my-5">예고편이 없습니다.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default MovieDetailPage;
