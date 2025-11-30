interface EmployeeProps{
	ID: string,
	SID: string,
	Name: string,
	Salary: number,
	Birthdate: Date,
	Occupation: string,
	HomeAddress: string,
	Phone: string,
	Gender: string,
	ManagerID: string,
	TheaterID: string
}

function Employee({
	ID,
	SID,
	Name,
	Salary,
	Birthdate,
	Occupation,
	HomeAddress,
	Phone,
	Gender,
	ManagerID,
	TheaterID
}: EmployeeProps){
	return (
		<>
			{ID} {SID} {Name} {Salary} {Birthdate}
		</>
	)

}

export default function EmployeeTable(employees){


			/*{employees.map(employee => () {
				<EmployeeView ID={employee.} SID={employee.SID} Name={employee.Name} Salary={employee.Salary} Birthdate={employee.Birthdate} Occupation={employee.Occupation}/>
			})}*/

	return (
		<>
		</>
	)

}
