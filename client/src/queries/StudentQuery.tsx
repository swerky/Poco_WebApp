import gql from 'graphql-tag';

export const ADD_STUDENT = gql`
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
        dateStart
        dateEnd
        goodExcuse
        reason
      }
      batch {
        id
        name 
        startingTime
        endTime
      }
    }
  }`;

  /* GRAPHQL REQUEST */
export const GET_STUDENTS = gql`
{
  students{
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
      dateStart
      dateEnd
      goodExcuse
      reason
    }
    batch {
      id
      name 
      startingTime
      endTime
    }
  }
}
`;

export const DELETE_STUDENT = gql`
mutation deleteStudent($where: StudentWhereUniqueInput!){
  deleteStudent(where: $where){
    id
    firstName
    lastName
    students {
      id
      firstName
      lastName
    }
  }
}`