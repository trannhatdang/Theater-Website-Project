import dayjs from 'dayjs'
import customParseFormat from "dayjs/plugin/customParseFormat.js"

dayjs.extend(customParseFormat);
export const parseInput = (req, res, next) => {
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
		next();
	}

	if(req.query)
	{
		for(let [key, value] of Object.entries(req.query)){
			/*if(dayjs(value, "hh:mm:ss").isValid()){
				req.query[key] = new Date(value);
			}
			else if(parseInt(value)){
				req.query[key] = parseInt(req.query[key]);

				const min_index = req.query[key].search("min");
				const max_index = req.query[key].search("max");
			}*/
		}
		req.query.min_thoi_luong = new Date(dayjs(req.query.min_thoi_luong, 'hh:mm:ss')).toISOString(); 
		console.log(req.query.min_thoi_luong)
		next();
	}
}

export default parseInput;
