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