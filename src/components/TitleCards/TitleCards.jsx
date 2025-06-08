import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {

  const [apiData, setApiData]=useState([]);
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDYzZDEyNGUzYWI5M2U5ZDNmZTM5Zjg1OTlmY2FlYiIsIm5iZiI6MTc0OTIwNzQwNy4xNCwic3ViIjoiNjg0MmM5NmY0MTk5NDdmMDE3NTM5YTRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CbHR0qa5YxCSqH9nwhMchXrmfurOPDED8fejxX-9bWc'
  }
};


useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

const handleWheel = (event)=>{
  event.preventdefault();
  cardsRef.current.scrollLeft += event.deltaY

}
  cardsRef.current.addEventListener('wheel', handleWheel)
},[])
  return (
    <div className='title_cards' >
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>

        }
        )}
      </div>
    </div>
  )
}

export default TitleCards