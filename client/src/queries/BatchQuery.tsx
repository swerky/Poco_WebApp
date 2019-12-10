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

export const ADD_BATCH = gql`
  mutation addBatch($data: BatchCreateInput!) {
    createBatch(data: $data){
      id
      name
      startingTime
      endTime
    }
  }
`;

export const DELETE_BATCH = gql`
  mutation removeBatch($where:BatchWhereUniqueInput!) {
    deleteBatch(where: $where){
      id
      name
      startingTime
      endTime
    }
  }
`;

export const UPDATE_BATCH = gql`
  mutation updateBatch($data: BatchUpdateInput, $where: BatchWhereUniqueInput!) {
    updateBatch(data: $data, where: $where) {
      id
      name
      startingTime
      endTime
    }
  }
`;