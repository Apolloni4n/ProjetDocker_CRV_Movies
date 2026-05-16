// CORRECTION VITE : React doit être importé séparément des hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopupModal.css';

export const PopupModal = ({ setShowPopup, dValue }) => {
    const [images, setimages] = useState([]);
    const [titleDetails, setTitleDetails] = useState({});
    const [reviews, setReviews] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [activeTab, setActiveTab] = useState('images');

    useEffect(() => {
        async function fetchImages() {
            await axios.get(`/api/Images/${dValue.id}/Short`)
                .then((response) => setimages(response.data.backdrops ? response.data.backdrops.slice(0, 8) : []));
        }
        fetchImages();
    }, [dValue])

    useEffect(() => {
        async function fetchData() {
            await axios.get(`/api/Title/${dValue.id}`)
                .then((response) => setTitleDetails(response.data));
        }
        fetchData();
    }, [dValue]); 

    useEffect(() => {
        async function fetchReviews() {
            await axios.get(`/api/Reviews/${dValue.id}`)
                .then((response) => setReviews(response.data.results || []));
        }
        fetchReviews();
    }, [dValue])

    useEffect(() => {
        async function fetchRecommendations() {
            await axios.get(`/api/Recommendations/${dValue.id}`)
                .then((response) => setRecommendations(response.data.results ? response.data.results.slice(0, 10) : []));
        }
        fetchRecommendations();
    }, [dValue])

    const posterSrc = titleDetails.poster_path 
        ? `https://image.tmdb.org/t/p/w500${titleDetails.poster_path}` 
        : dValue.image;

    return (
        <div className='new-question'>
            <div className="new-quesiton-form">
                <button id='cross' onClick={() => setShowPopup(false)}>X</button>
                
                <div className="popup-project_item">
                    <div className="popup-image_item">
                        <img src={posterSrc} height={250} alt="poster" /> 
                    </div>
                    
                    <div className="details">
                        <div className="detail-rating"> 
                            <img alt='star' height={20} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEoElEQVRoge2Z3W8UZRTGf2eWtlBEgtJu+dIQGhED8iEsCbAbqiYSolxqIglcGk0oiNyZGLjwjiuIfwAYb42JIaBeEGMw8YOYFjEkRAhSoFAt0m7blLLv48XutjPb2e7OMqOJ6bnYd949857nOXOeOfPOLszarM1aYqbLHRn92rElSQxLKrB60u2k7DoABa209XfvJYHjJRG0GNneA1oRraXjRCyRCuhqZwvj+RtI6eIXDJBveta29Y3FjZVMBcZH9vnIA7Qxf2JvElCxJyBhyB1ClMgLJEBHpPgrHn8FLnXsQrwAFImXE5FW09v2WtxwCUhIh4uDStPShwDH+3GjxVpS9aTXgnon4/rJQykpb4NtutcTF2a8FZA+AKwkGaaTB1Q4GCdkbBVQT7oddAMxN0AcKuU0jmylbf7zThy48VVA7sA08lLYvdACvBsXbCwV0PfL59E6/geweLpkJj/8iQ3S3PSMrb878rjYkROQMH5rS1PQMpRaClqO2I6013/SFOFqcrLPwF0A+nDuNl7zLbYM3DULnB09AV1qX0UqtQyxAqclYMtRYRnYUmAFUgfQFEpQPuwIPk35JhD9wE2k20K3PNSHszuYu4lL9Vn2wbWqCejy0mPIfRQA8Q01ZNGQT6o4N7RzTflMOmrZ/LHyN3P8CSB3DRDCgqX3B62YhxGs06fo6wTedT/lQBeytf2nkO0HTQQ7SRXy4V2mpk9SdfLV1xVMvGPZodMBzoSYetOvAp8jLQgE8g3/lmRKMUZN3puWGzpTybVqF9IvHVvw3BlE238oGYBBE3ssN3whjOeMbVSX2ldR0DlEZwAkDKi+LhNpHeKGFdhlXcNXqnGs+RzQj20dNHEWaUMAxDfUL5mZ1k1L7LIVCrusa6xvJn41txKWGeinmSzYN4ErVI28zxcqmarrAuS/tfGm7bXIQ4Qnsa52tjD09ymktwIEKgn6iYf46pDhFzYn/7Zto67350hbCQnj4uLjyB0OEPAPjUsGGZ94O/LdZrh6OTW0mdNPi04gOxBTlymSh5OpXL47Kpc5tU8JMZGPUTJlG26ESmMJYFvL4I8jGb/P0NZGmER+oZHwkDYXjxvuMmG+jI5G5xP9jeyHp56X9GQDe5kpn0J9C+h6YnXyCchlJslVfXGvQr7sK88rfU6ZqHQiJ+A8ZWKRTHnuO3blixPBIt/E5iwTucvUcRODMEeyFdB55oLWhUtmmpwGDbrN0Q0MVq8IU9UyXixiJJQALQs2IZqnk/DJSTiJTy3FGsvlT9rO/EnzUp2CE4hHNeTUTGHexuQSIJWZscug84bbmMoN77Pt+cl/ZCz74H5q58hBw1sHnA2XWmnuot0HkRJwlR1oUhZ203D7vWz+ZcuN9FZbb13DV7yu0d0m9iB+nyLPZDJOllwCBpmKqzciZ8fs0dBzlh05PeNif5xXRr+0hWNrTO4QMOSXk1m0Vlr/dvq7hYtk+gtkCCc45anwoeVGH+s3Tp1rXeJSjz422X7AQ8gmxp+217lfz/r6E/gqPV+toxeBfjPviO148HOjpEPjf920WfKOg9L28OFL9gajccaftVn7v9o/fzB7l3fCLDkAAAAASUVORK5CYII=" />
                            <p>{titleDetails.vote_average ? titleDetails.vote_average.toFixed(1) : "N/A"}/10</p>
                        </div>
                        <p>Title: {titleDetails.title}</p>
                        <p>Genre: {titleDetails.genres?.map(g => g.name).join(', ')} </p>
                        <p>Runtime: {titleDetails.runtime} min</p>
                        <p>Release: {titleDetails.release_date}</p>
                        <p style={{fontSize: '12px', marginTop: '10px'}}>{titleDetails.overview}</p>
                    </div>
                </div>

                <div className="footer" style={{display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0'}}>
                    <button className='btn btnFooter' onClick={() => setActiveTab('images')}>Images</button>
                    <button className='btn btnFooter' onClick={() => setActiveTab('reviews')}>Reviews</button>
                    <button className='btn btnFooter' onClick={() => setActiveTab('recommendations')}>Recommendations</button>
                </div>

                {activeTab === 'reviews' && (
                    <>
                        <div className="review-data">
                            {reviews.length > 0 ? reviews.map((val) => (
                                <div key={val.id} className="review-container">
                                    <div className="username-rating">
                                        <h5>Author: {val.author}</h5>
                                    </div>
                                    <p><span>Review: </span> {val.content.substring(0, 300)}...</p>
                                    <br/>
                                </div>
                            )) : <p>No reviews found.</p>}
                        </div>
                    </>
                )}

                {activeTab === 'images' && (
                    <>
                        <div className="images-data">
                            {images.length > 0 ? images.map((val, index) => (
                                <div key={index} className="imag-container">
                                    <img src={`https://image.tmdb.org/t/p/w500${val.file_path}`} height={200} alt="movie visual" />
                                </div>
                            )) : <p>No images found.</p>}
                        </div>
                    </>
                )}

                {activeTab === 'recommendations' && (
                    <>
                        <div className="images-data" style={{display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center'}}>
                            {recommendations.length > 0 ? recommendations.map((val) => (
                                <div key={val.id} className="imag-container" style={{textAlign: 'center', width: '130px'}}>
                                    <img 
                                        src={val.poster_path ? `https://image.tmdb.org/t/p/w200${val.poster_path}` : "https://via.placeholder.com/130x195?text=No+Image"} 
                                        height={195} 
                                        alt={val.title} 
                                        style={{borderRadius: '8px'}}
                                    />
                                    <p style={{fontSize: '11px', color: 'white', marginTop: '5px'}}>{val.title}</p>
                                </div>
                            )) : <p>No recommendations found.</p>}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}