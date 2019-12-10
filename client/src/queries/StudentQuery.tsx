import gql from 'graphql-tag';

/* GRAPHQL REQUEST */
/** GET **/
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

export const GET_STUDENT = gql`
query getStudent($where:StudentWhereUniqueInput!)
{
  student(
    where: $where
  ) {
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

/** ADD **/
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

/** DELETE **/
export const DELETE_STUDENT = gql`
mutation deleteStudent($where: StudentWhereUniqueInput!){
  deleteStudent(where: $where){
    id
    firstName
    lastName
  }
}`

/** UPDATE **/
export const UDPATE_STUDENT = gql`
  mutation updateStudent($data: StudentUpdateInput!, $where: StudentWhereUniqueInput!) {
    updateStudent(
      data: $data
      where: $where
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