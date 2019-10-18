import gql from 'graphql-tag';

const ADD_STUDENT = gql`
  mutation addStudent($data: StudentCreateInput!) {
    createStudent(
      data: $data
    ) 
    {
      id
      firstName
      lastName
      sexe
      privateEmail
      pocoEmail
      residencePermit
      birthday
      nationality
      addressStreet
      addressCity
      addressNPA
      addressCanton
      organisation
      socialAssistant {
        id
        firstName
        lastName
        phone
        email
      }
      financialParticipation
      financialParticipationComment
      borrowLaptops
      foodCost
      presences {
        id
        date
        timeMissed
        goodExcuse
        reason
      }
    }
  }`;

export default ADD_STUDENT;