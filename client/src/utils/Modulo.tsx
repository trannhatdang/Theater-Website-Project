export default function modulo(a: number, b: number){
	if(a < 0 && b > 0){
		return ((a % b) + b) % b
	}
	else if(a > 0 && b < 0){
		return a % b;
	} //do i need more?
	else{
		return a % b;
	}
}
