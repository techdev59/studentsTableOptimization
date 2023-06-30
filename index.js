import Studentspicker from ../components/StudentsPicker';
import StudentsTable from ./components/tudentsTable';
import ( fetchStudentData, fetchSchoolData, fetchLegalguardianData } from
 '../utils';
import { useState,useCallback } from "react";

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = useCallback(async (studentIds) => {
    const studentData = await Promise.all(studentIds.map(fetchStudentData));
    setStudentsData(studentData);
    const schoolIds = studentData.map(student => student.schoolId);
    const legalguardianIds = studentData.map(student => student.legalguardianId);
    const schoolData = await Promise.all(schoolIds.map(fetchSchoolData));
    setSchoolsData(schoolData);
    const legalguardianData = await Promise.all(legalguardianIds.map(fetchLegalguardianData));
    setLegalguardiansData(legalguardianData);
  }, [studentsData, schoolsData, legalguardiansData]);

  return;
  <>
    <StudentsPicker onPickHandler={onStudentsPick} />
    <StudentsTable
      studentsData={studentsData}
      schoolsData={schoolsData}
      LegalguardiansData={legalguardiansData}
    />
  </>;
};

export default studentsDataComponent;
