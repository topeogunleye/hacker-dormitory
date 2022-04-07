import React, { useState } from 'react';
import { STUDENTS } from '../studentsList';
import ResidentsList from './ResidentsList';
import Error from './Error';
import { v4 as uuidv4 } from 'uuid';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split('-');
  const [yyyy, mm, dd] = validityDate.split('-');
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

function Search() {
  const [inputText, setInputText] = useState({
    studentName: '',
    joiningDate: '',
  });
  const [residents, setResidents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentName = inputText.studentName.toLowerCase();
    const joiningDate = inputText.joiningDate;
    console.log(studentName, joiningDate);
    const student = STUDENTS.find(
      (student) => student.name.toLowerCase() === studentName
    );
    if (student) {
      if (checkValidity(joiningDate, student.validityDate)) {
        // add the student to the Residents List
        const newResident = {
          id: uuidv4(),
          name: student.name,
        };
        setResidents([...residents, newResident]);
        console.log(residents);
        
        <ResidentsList residents={residents} key={uuidv4()} />;
        // clear the input text
        // setInputText({
        //   studentName: '',
        //   joiningDate: '',
        // });
        // - If the student's name is valid but the joining date is after the student's validity date, then show the following error message:
      } else if (joiningDate > student.validityDate) {
        // show an error message
        Error();
        <Error message={`Sorry, ${student}'s validity has Expired!`} />;
        // If the student  is not part of the college, then show the following error message:
      }
    } else {
      // show an error message
      <Error message={`Sorry, ${student} not a verified student!`} />;
    }
  };

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-50 layout-row align-items-end justify-content-end"
    >
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
            name="studentName"
            value={inputText.studentName}
            onChange={onChange}
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
            name="joiningDate"
            value={inputText.joiningDate}
            onChange={onChange}
          />
        </div>
      </label>
      <button type="submit" data-testid="addBtn" className="small mb-0">
        Add
      </button>
    </form>
  );
}

export default Search;
