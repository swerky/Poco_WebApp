import gql from 'graphql-tag';

export const GET_BATCHES = gql`
  {
  	batches{
      id
      name
      startingTime
      endTime
    }
  }
`;