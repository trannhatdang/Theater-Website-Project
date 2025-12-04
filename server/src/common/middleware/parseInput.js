import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat.js"

dayjs.extend(customParseFormat);
const parseInput = () => {
	return (req, res, next) => {
		if(req.body)
		{
			for(const [key, value] of Object.entries(req.body)){
				if(Number.isInteger(req.body[key]))
				{
					req.body[key] = parseInt(req.body[key]);

					const min_index = req.body[key].search("min");
					const max_index = req.body[key].search("max");

					/*if(min_index !== -1 || max_index !== -1){

					}*/
				}
			}
		}

		if(req.query)
		{
			for(const [key, value] of Object.entries(req.query)){
				/*if(dayjs(value, "hh:mm:ss").isValid()){
					req.query[key] = new Date(value);
				}
				else if(parseInt(value)){
					req.query[key] = parseInt(req.query[key]);

					const min_index = req.query[key].search("min");
					const max_index = req.query[key].search("max");
				}*/
				req.query[key] = 'something else'; 
				console.log(req.query[key])
			}
		}

		next();
	}
}

export default parseInput;
