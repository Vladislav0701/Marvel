import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

import './singleChar.scss';

const SingleChar = () => {
    const {charId} = useParams();
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [charId])

    const onRequest = () => {
        clearError();
        getCharacter(charId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>    
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;
    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to='/' className="single-char__back">Back to all</Link>
        </div>
    )
}

export default SingleChar;