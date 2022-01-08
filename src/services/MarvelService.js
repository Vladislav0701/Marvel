import { useHttp } from "../hook/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=5069a5f6ed51c18db1a5975218b3638f';
    const _baseOffset = 310;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 300) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {

        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {

        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description : "There is no description for this comics",
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            url: comics.urls[0].url,
            pageCount: comics.pageCount,
            language: comics.language ? comics.language : 'en-us'
        }
    }

    return {
        request, 
        clearError,
        process,
        setProcess,
        getAllCharacters, 
        getCharacter, 
        getCharacterByName,
        getAllComics,
        getComic
    }
}

export default useMarvelService;