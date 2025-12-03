import { filmService } from "../services/film.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";

const filmControllerMap = {
	getFilm: filmService.getFilm,
	postFilm: filmService.postFilm,
	patchFilm: filmService.patchFilm,
	deleteFilm: filmService.deleteFilm,

	getGenre: filmService.getGenre,
	postGenre: filmService.postGenre,
	patchGenre: filmService.patchGenre,
	deleteGenre: filmService.deleteGenre,

	getActor: filmService.getActor,
	postActor: filmService.postActor,
	patchActor: filmService.patchActor,
	deleteActor: filmService.deleteActor,

	getScreening: filmService.getScreening,
	postScreening: filmService.postScreening,
	patchScreening: filmService.patchScreening,
	deleteScreening: filmService.deleteScreening,
}

export default async function filmController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "film";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await filmControllerMap[fn](req);
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
