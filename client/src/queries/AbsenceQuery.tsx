import gql from 'graphql-tag';

export const ADD_ABSENCE = gql`
mutation addPresence($data: PresenceCreateInput!) {
  createPresence(
    data: $data
  ) 
  {
    id
    dateStart
    dateEnd
    goodExcuse
    reason
    student {
      id
      firstName
      lastName
    }
  }
}`;

export const DELETE_ABSENCE = gql`
mutation deletePresence($where: PresenceWhereUniqueInput!){
  deletePresence(where: $where){
    id
    dateStart
    dateEnd
  }
}`;