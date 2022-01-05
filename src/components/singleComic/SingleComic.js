import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComic.scss';

const SingleComic = (props) => {
    const [comic, setComic] = useState([]);
    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        getComics(props.id)
            .then(onComicLoaded)
    }

    const onComicLoaded = (newComic) => {
        setComic(newComic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
            <a href='#' className="single-comic__back">Back to all</a>
        </div>
    )
}

const View = ({comic}) => {
    const {title, description, price, thumbnail, pageCount, language} = comic;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{`Language: ${language}`}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComic;