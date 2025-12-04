import { eventService } from "../services/event.service.js"
import { handleError } from '../helpers/handleError.js'

const EventControllerMap = {
	getEvent: eventService.getEvent,
	postEvent: eventService.postEvent,
	patchEvent: eventService.patchEvent,
	deleteEvent: eventService.deleteEvent,

	getOrganisationParty: eventService.getOrganisationParty,
	postOrganisationParty: eventService.postOrganisationParty,
	patchOrganisationParty: eventService.patchOrganisationParty,
	deleteOrganisationParty: eventService.deleteOrganisationParty,

	getOrganisation: eventService.getOrganisation,
	postOrganisation: eventService.postOrganisation,
	patchOrganisation: eventService.patchOrganisation,
	deleteOrganisation: eventService.deleteOrganisation,

	getIndividual: eventService.getIndividual,
	postIndividual: eventService.postIndividual,
	patchIndividual: eventService.patchIndividual,
	deleteIndividual: eventService.deleteIndividual,

	getRelationOrganize: eventService.getRelationOrganize,
	postRelationOrganize: eventService.postRelationOrganize,
	patchRelationOrganize: eventService.patchRelationOrganize,
	deleteRelationOrganize: eventService.deleteRelationOrganize,
}

export default async function EventController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "event";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await EventControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
