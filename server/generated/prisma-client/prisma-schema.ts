// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateBatch {
  count: Int!
}

type AggregatePresence {
  count: Int!
}

type AggregateSocialAssistant {
  count: Int!
}

type AggregateStudent {
  count: Int!
}

type Batch {
  id: ID!
  name: String!
  startingTime: DateTime!
  endTime: DateTime!
}

type BatchConnection {
  pageInfo: PageInfo!
  edges: [BatchEdge]!
  aggregate: AggregateBatch!
}

input BatchCreateInput {
  id: ID
  name: String!
  startingTime: DateTime!
  endTime: DateTime!
}

input BatchCreateOneInput {
  create: BatchCreateInput
  connect: BatchWhereUniqueInput
}

type BatchEdge {
  node: Batch!
  cursor: String!
}

enum BatchOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  startingTime_ASC
  startingTime_DESC
  endTime_ASC
  endTime_DESC
}

type BatchPayload {
  count: Long!
}

type BatchPreviousValues {
  id: ID!
  name: String!
  startingTime: DateTime!
  endTime: DateTime!
}

type BatchSubscriptionPayload {
  mutation: MutationType!
  node: Batch
  updatedFields: [String!]
  previousValues: BatchPreviousValues
}

input BatchSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BatchWhereInput
  AND: [BatchSubscriptionWhereInput!]
  OR: [BatchSubscriptionWhereInput!]
  NOT: [BatchSubscriptionWhereInput!]
}

input BatchUpdateDataInput {
  name: String
  startingTime: DateTime
  endTime: DateTime
}

input BatchUpdateInput {
  name: String
  startingTime: DateTime
  endTime: DateTime
}

input BatchUpdateManyMutationInput {
  name: String
  startingTime: DateTime
  endTime: DateTime
}

input BatchUpdateOneRequiredInput {
  create: BatchCreateInput
  update: BatchUpdateDataInput
  upsert: BatchUpsertNestedInput
  connect: BatchWhereUniqueInput
}

input BatchUpsertNestedInput {
  update: BatchUpdateDataInput!
  create: BatchCreateInput!
}

input BatchWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  startingTime: DateTime
  startingTime_not: DateTime
  startingTime_in: [DateTime!]
  startingTime_not_in: [DateTime!]
  startingTime_lt: DateTime
  startingTime_lte: DateTime
  startingTime_gt: DateTime
  startingTime_gte: DateTime
  endTime: DateTime
  endTime_not: DateTime
  endTime_in: [DateTime!]
  endTime_not_in: [DateTime!]
  endTime_lt: DateTime
  endTime_lte: DateTime
  endTime_gt: DateTime
  endTime_gte: DateTime
  AND: [BatchWhereInput!]
  OR: [BatchWhereInput!]
  NOT: [BatchWhereInput!]
}

input BatchWhereUniqueInput {
  id: ID
  name: String
}

scalar DateTime

enum FinancialParticipation {
  YES
  NO
  EXTERN
  OTHER
}

scalar Long

type Mutation {
  createBatch(data: BatchCreateInput!): Batch!
  updateBatch(data: BatchUpdateInput!, where: BatchWhereUniqueInput!): Batch
  updateManyBatches(data: BatchUpdateManyMutationInput!, where: BatchWhereInput): BatchPayload!
  upsertBatch(where: BatchWhereUniqueInput!, create: BatchCreateInput!, update: BatchUpdateInput!): Batch!
  deleteBatch(where: BatchWhereUniqueInput!): Batch
  deleteManyBatches(where: BatchWhereInput): BatchPayload!
  createPresence(data: PresenceCreateInput!): Presence!
  updatePresence(data: PresenceUpdateInput!, where: PresenceWhereUniqueInput!): Presence
  updateManyPresences(data: PresenceUpdateManyMutationInput!, where: PresenceWhereInput): BatchPayload!
  upsertPresence(where: PresenceWhereUniqueInput!, create: PresenceCreateInput!, update: PresenceUpdateInput!): Presence!
  deletePresence(where: PresenceWhereUniqueInput!): Presence
  deleteManyPresences(where: PresenceWhereInput): BatchPayload!
  createSocialAssistant(data: SocialAssistantCreateInput!): SocialAssistant!
  updateSocialAssistant(data: SocialAssistantUpdateInput!, where: SocialAssistantWhereUniqueInput!): SocialAssistant
  updateManySocialAssistants(data: SocialAssistantUpdateManyMutationInput!, where: SocialAssistantWhereInput): BatchPayload!
  upsertSocialAssistant(where: SocialAssistantWhereUniqueInput!, create: SocialAssistantCreateInput!, update: SocialAssistantUpdateInput!): SocialAssistant!
  deleteSocialAssistant(where: SocialAssistantWhereUniqueInput!): SocialAssistant
  deleteManySocialAssistants(where: SocialAssistantWhereInput): BatchPayload!
  createStudent(data: StudentCreateInput!): Student!
  updateStudent(data: StudentUpdateInput!, where: StudentWhereUniqueInput!): Student
  updateManyStudents(data: StudentUpdateManyMutationInput!, where: StudentWhereInput): BatchPayload!
  upsertStudent(where: StudentWhereUniqueInput!, create: StudentCreateInput!, update: StudentUpdateInput!): Student!
  deleteStudent(where: StudentWhereUniqueInput!): Student
  deleteManyStudents(where: StudentWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Presence {
  id: ID!
  dateStart: DateTime!
  dateEnd: DateTime!
  goodExcuse: Boolean
  reason: String
  student: Student!
}

type PresenceConnection {
  pageInfo: PageInfo!
  edges: [PresenceEdge]!
  aggregate: AggregatePresence!
}

input PresenceCreateInput {
  id: ID
  dateStart: DateTime!
  dateEnd: DateTime!
  goodExcuse: Boolean
  reason: String
  student: StudentCreateOneWithoutPresencesInput!
}

input PresenceCreateManyWithoutStudentInput {
  create: [PresenceCreateWithoutStudentInput!]
  connect: [PresenceWhereUniqueInput!]
}

input PresenceCreateWithoutStudentInput {
  id: ID
  dateStart: DateTime!
  dateEnd: DateTime!
  goodExcuse: Boolean
  reason: String
}

type PresenceEdge {
  node: Presence!
  cursor: String!
}

enum PresenceOrderByInput {
  id_ASC
  id_DESC
  dateStart_ASC
  dateStart_DESC
  dateEnd_ASC
  dateEnd_DESC
  goodExcuse_ASC
  goodExcuse_DESC
  reason_ASC
  reason_DESC
}

type PresencePreviousValues {
  id: ID!
  dateStart: DateTime!
  dateEnd: DateTime!
  goodExcuse: Boolean
  reason: String
}

input PresenceScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  dateStart: DateTime
  dateStart_not: DateTime
  dateStart_in: [DateTime!]
  dateStart_not_in: [DateTime!]
  dateStart_lt: DateTime
  dateStart_lte: DateTime
  dateStart_gt: DateTime
  dateStart_gte: DateTime
  dateEnd: DateTime
  dateEnd_not: DateTime
  dateEnd_in: [DateTime!]
  dateEnd_not_in: [DateTime!]
  dateEnd_lt: DateTime
  dateEnd_lte: DateTime
  dateEnd_gt: DateTime
  dateEnd_gte: DateTime
  goodExcuse: Boolean
  goodExcuse_not: Boolean
  reason: String
  reason_not: String
  reason_in: [String!]
  reason_not_in: [String!]
  reason_lt: String
  reason_lte: String
  reason_gt: String
  reason_gte: String
  reason_contains: String
  reason_not_contains: String
  reason_starts_with: String
  reason_not_starts_with: String
  reason_ends_with: String
  reason_not_ends_with: String
  AND: [PresenceScalarWhereInput!]
  OR: [PresenceScalarWhereInput!]
  NOT: [PresenceScalarWhereInput!]
}

type PresenceSubscriptionPayload {
  mutation: MutationType!
  node: Presence
  updatedFields: [String!]
  previousValues: PresencePreviousValues
}

input PresenceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PresenceWhereInput
  AND: [PresenceSubscriptionWhereInput!]
  OR: [PresenceSubscriptionWhereInput!]
  NOT: [PresenceSubscriptionWhereInput!]
}

input PresenceUpdateInput {
  dateStart: DateTime
  dateEnd: DateTime
  goodExcuse: Boolean
  reason: String
  student: StudentUpdateOneRequiredWithoutPresencesInput
}

input PresenceUpdateManyDataInput {
  dateStart: DateTime
  dateEnd: DateTime
  goodExcuse: Boolean
  reason: String
}

input PresenceUpdateManyMutationInput {
  dateStart: DateTime
  dateEnd: DateTime
  goodExcuse: Boolean
  reason: String
}

input PresenceUpdateManyWithoutStudentInput {
  create: [PresenceCreateWithoutStudentInput!]
  delete: [PresenceWhereUniqueInput!]
  connect: [PresenceWhereUniqueInput!]
  set: [PresenceWhereUniqueInput!]
  disconnect: [PresenceWhereUniqueInput!]
  update: [PresenceUpdateWithWhereUniqueWithoutStudentInput!]
  upsert: [PresenceUpsertWithWhereUniqueWithoutStudentInput!]
  deleteMany: [PresenceScalarWhereInput!]
  updateMany: [PresenceUpdateManyWithWhereNestedInput!]
}

input PresenceUpdateManyWithWhereNestedInput {
  where: PresenceScalarWhereInput!
  data: PresenceUpdateManyDataInput!
}

input PresenceUpdateWithoutStudentDataInput {
  dateStart: DateTime
  dateEnd: DateTime
  goodExcuse: Boolean
  reason: String
}

input PresenceUpdateWithWhereUniqueWithoutStudentInput {
  where: PresenceWhereUniqueInput!
  data: PresenceUpdateWithoutStudentDataInput!
}

input PresenceUpsertWithWhereUniqueWithoutStudentInput {
  where: PresenceWhereUniqueInput!
  update: PresenceUpdateWithoutStudentDataInput!
  create: PresenceCreateWithoutStudentInput!
}

input PresenceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  dateStart: DateTime
  dateStart_not: DateTime
  dateStart_in: [DateTime!]
  dateStart_not_in: [DateTime!]
  dateStart_lt: DateTime
  dateStart_lte: DateTime
  dateStart_gt: DateTime
  dateStart_gte: DateTime
  dateEnd: DateTime
  dateEnd_not: DateTime
  dateEnd_in: [DateTime!]
  dateEnd_not_in: [DateTime!]
  dateEnd_lt: DateTime
  dateEnd_lte: DateTime
  dateEnd_gt: DateTime
  dateEnd_gte: DateTime
  goodExcuse: Boolean
  goodExcuse_not: Boolean
  reason: String
  reason_not: String
  reason_in: [String!]
  reason_not_in: [String!]
  reason_lt: String
  reason_lte: String
  reason_gt: String
  reason_gte: String
  reason_contains: String
  reason_not_contains: String
  reason_starts_with: String
  reason_not_starts_with: String
  reason_ends_with: String
  reason_not_ends_with: String
  student: StudentWhereInput
  AND: [PresenceWhereInput!]
  OR: [PresenceWhereInput!]
  NOT: [PresenceWhereInput!]
}

input PresenceWhereUniqueInput {
  id: ID
}

type Query {
  batch(where: BatchWhereUniqueInput!): Batch
  batches(where: BatchWhereInput, orderBy: BatchOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Batch]!
  batchesConnection(where: BatchWhereInput, orderBy: BatchOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BatchConnection!
  presence(where: PresenceWhereUniqueInput!): Presence
  presences(where: PresenceWhereInput, orderBy: PresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Presence]!
  presencesConnection(where: PresenceWhereInput, orderBy: PresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PresenceConnection!
  socialAssistant(where: SocialAssistantWhereUniqueInput!): SocialAssistant
  socialAssistants(where: SocialAssistantWhereInput, orderBy: SocialAssistantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SocialAssistant]!
  socialAssistantsConnection(where: SocialAssistantWhereInput, orderBy: SocialAssistantOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SocialAssistantConnection!
  student(where: StudentWhereUniqueInput!): Student
  students(where: StudentWhereInput, orderBy: StudentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Student]!
  studentsConnection(where: StudentWhereInput, orderBy: StudentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StudentConnection!
  node(id: ID!): Node
}

enum Sexe {
  MALE
  FEMALE
  OTHER
}

type SocialAssistant {
  id: ID!
  firstName: String!
  lastName: String!
  phone: String
  email: String
}

type SocialAssistantConnection {
  pageInfo: PageInfo!
  edges: [SocialAssistantEdge]!
  aggregate: AggregateSocialAssistant!
}

input SocialAssistantCreateInput {
  id: ID
  firstName: String!
  lastName: String!
  phone: String
  email: String
}

input SocialAssistantCreateOneInput {
  create: SocialAssistantCreateInput
  connect: SocialAssistantWhereUniqueInput
}

type SocialAssistantEdge {
  node: SocialAssistant!
  cursor: String!
}

enum SocialAssistantOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  phone_ASC
  phone_DESC
  email_ASC
  email_DESC
}

type SocialAssistantPreviousValues {
  id: ID!
  firstName: String!
  lastName: String!
  phone: String
  email: String
}

type SocialAssistantSubscriptionPayload {
  mutation: MutationType!
  node: SocialAssistant
  updatedFields: [String!]
  previousValues: SocialAssistantPreviousValues
}

input SocialAssistantSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SocialAssistantWhereInput
  AND: [SocialAssistantSubscriptionWhereInput!]
  OR: [SocialAssistantSubscriptionWhereInput!]
  NOT: [SocialAssistantSubscriptionWhereInput!]
}

input SocialAssistantUpdateDataInput {
  firstName: String
  lastName: String
  phone: String
  email: String
}

input SocialAssistantUpdateInput {
  firstName: String
  lastName: String
  phone: String
  email: String
}

input SocialAssistantUpdateManyMutationInput {
  firstName: String
  lastName: String
  phone: String
  email: String
}

input SocialAssistantUpdateOneInput {
  create: SocialAssistantCreateInput
  update: SocialAssistantUpdateDataInput
  upsert: SocialAssistantUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: SocialAssistantWhereUniqueInput
}

input SocialAssistantUpsertNestedInput {
  update: SocialAssistantUpdateDataInput!
  create: SocialAssistantCreateInput!
}

input SocialAssistantWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  AND: [SocialAssistantWhereInput!]
  OR: [SocialAssistantWhereInput!]
  NOT: [SocialAssistantWhereInput!]
}

input SocialAssistantWhereUniqueInput {
  id: ID
}

type Student {
  id: ID!
  firstName: String!
  lastName: String!
  sexe: Sexe!
  privateEmail: String
  pocoEmail: String
  residencePermit: String!
  birthday: DateTime!
  nationality: String!
  addressStreet: String!
  addressCity: String!
  addressNPA: Int!
  addressCanton: String!
  organisation: String
  socialAssistant: SocialAssistant
  financialParticipation: FinancialParticipation!
  financialParticipationComment: String
  borrowLaptops: Boolean!
  foodCost: String
  presences(where: PresenceWhereInput, orderBy: PresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Presence!]
  batch: Batch!
}

type StudentConnection {
  pageInfo: PageInfo!
  edges: [StudentEdge]!
  aggregate: AggregateStudent!
}

input StudentCreateInput {
  id: ID
  firstName: String!
  lastName: String!
  sexe: Sexe!
  privateEmail: String
  pocoEmail: String
  residencePermit: String!
  birthday: DateTime!
  nationality: String!
  addressStreet: String!
  addressCity: String!
  addressNPA: Int!
  addressCanton: String!
  organisation: String
  socialAssistant: SocialAssistantCreateOneInput
  financialParticipation: FinancialParticipation!
  financialParticipationComment: String
  borrowLaptops: Boolean!
  foodCost: String
  presences: PresenceCreateManyWithoutStudentInput
  batch: BatchCreateOneInput!
}

input StudentCreateOneWithoutPresencesInput {
  create: StudentCreateWithoutPresencesInput
  connect: StudentWhereUniqueInput
}

input StudentCreateWithoutPresencesInput {
  id: ID
  firstName: String!
  lastName: String!
  sexe: Sexe!
  privateEmail: String
  pocoEmail: String
  residencePermit: String!
  birthday: DateTime!
  nationality: String!
  addressStreet: String!
  addressCity: String!
  addressNPA: Int!
  addressCanton: String!
  organisation: String
  socialAssistant: SocialAssistantCreateOneInput
  financialParticipation: FinancialParticipation!
  financialParticipationComment: String
  borrowLaptops: Boolean!
  foodCost: String
  batch: BatchCreateOneInput!
}

type StudentEdge {
  node: Student!
  cursor: String!
}

enum StudentOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  sexe_ASC
  sexe_DESC
  privateEmail_ASC
  privateEmail_DESC
  pocoEmail_ASC
  pocoEmail_DESC
  residencePermit_ASC
  residencePermit_DESC
  birthday_ASC
  birthday_DESC
  nationality_ASC
  nationality_DESC
  addressStreet_ASC
  addressStreet_DESC
  addressCity_ASC
  addressCity_DESC
  addressNPA_ASC
  addressNPA_DESC
  addressCanton_ASC
  addressCanton_DESC
  organisation_ASC
  organisation_DESC
  financialParticipation_ASC
  financialParticipation_DESC
  financialParticipationComment_ASC
  financialParticipationComment_DESC
  borrowLaptops_ASC
  borrowLaptops_DESC
  foodCost_ASC
  foodCost_DESC
}

type StudentPreviousValues {
  id: ID!
  firstName: String!
  lastName: String!
  sexe: Sexe!
  privateEmail: String
  pocoEmail: String
  residencePermit: String!
  birthday: DateTime!
  nationality: String!
  addressStreet: String!
  addressCity: String!
  addressNPA: Int!
  addressCanton: String!
  organisation: String
  financialParticipation: FinancialParticipation!
  financialParticipationComment: String
  borrowLaptops: Boolean!
  foodCost: String
}

type StudentSubscriptionPayload {
  mutation: MutationType!
  node: Student
  updatedFields: [String!]
  previousValues: StudentPreviousValues
}

input StudentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StudentWhereInput
  AND: [StudentSubscriptionWhereInput!]
  OR: [StudentSubscriptionWhereInput!]
  NOT: [StudentSubscriptionWhereInput!]
}

input StudentUpdateInput {
  firstName: String
  lastName: String
  sexe: Sexe
  privateEmail: String
  pocoEmail: String
  residencePermit: String
  birthday: DateTime
  nationality: String
  addressStreet: String
  addressCity: String
  addressNPA: Int
  addressCanton: String
  organisation: String
  socialAssistant: SocialAssistantUpdateOneInput
  financialParticipation: FinancialParticipation
  financialParticipationComment: String
  borrowLaptops: Boolean
  foodCost: String
  presences: PresenceUpdateManyWithoutStudentInput
  batch: BatchUpdateOneRequiredInput
}

input StudentUpdateManyMutationInput {
  firstName: String
  lastName: String
  sexe: Sexe
  privateEmail: String
  pocoEmail: String
  residencePermit: String
  birthday: DateTime
  nationality: String
  addressStreet: String
  addressCity: String
  addressNPA: Int
  addressCanton: String
  organisation: String
  financialParticipation: FinancialParticipation
  financialParticipationComment: String
  borrowLaptops: Boolean
  foodCost: String
}

input StudentUpdateOneRequiredWithoutPresencesInput {
  create: StudentCreateWithoutPresencesInput
  update: StudentUpdateWithoutPresencesDataInput
  upsert: StudentUpsertWithoutPresencesInput
  connect: StudentWhereUniqueInput
}

input StudentUpdateWithoutPresencesDataInput {
  firstName: String
  lastName: String
  sexe: Sexe
  privateEmail: String
  pocoEmail: String
  residencePermit: String
  birthday: DateTime
  nationality: String
  addressStreet: String
  addressCity: String
  addressNPA: Int
  addressCanton: String
  organisation: String
  socialAssistant: SocialAssistantUpdateOneInput
  financialParticipation: FinancialParticipation
  financialParticipationComment: String
  borrowLaptops: Boolean
  foodCost: String
  batch: BatchUpdateOneRequiredInput
}

input StudentUpsertWithoutPresencesInput {
  update: StudentUpdateWithoutPresencesDataInput!
  create: StudentCreateWithoutPresencesInput!
}

input StudentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  sexe: Sexe
  sexe_not: Sexe
  sexe_in: [Sexe!]
  sexe_not_in: [Sexe!]
  privateEmail: String
  privateEmail_not: String
  privateEmail_in: [String!]
  privateEmail_not_in: [String!]
  privateEmail_lt: String
  privateEmail_lte: String
  privateEmail_gt: String
  privateEmail_gte: String
  privateEmail_contains: String
  privateEmail_not_contains: String
  privateEmail_starts_with: String
  privateEmail_not_starts_with: String
  privateEmail_ends_with: String
  privateEmail_not_ends_with: String
  pocoEmail: String
  pocoEmail_not: String
  pocoEmail_in: [String!]
  pocoEmail_not_in: [String!]
  pocoEmail_lt: String
  pocoEmail_lte: String
  pocoEmail_gt: String
  pocoEmail_gte: String
  pocoEmail_contains: String
  pocoEmail_not_contains: String
  pocoEmail_starts_with: String
  pocoEmail_not_starts_with: String
  pocoEmail_ends_with: String
  pocoEmail_not_ends_with: String
  residencePermit: String
  residencePermit_not: String
  residencePermit_in: [String!]
  residencePermit_not_in: [String!]
  residencePermit_lt: String
  residencePermit_lte: String
  residencePermit_gt: String
  residencePermit_gte: String
  residencePermit_contains: String
  residencePermit_not_contains: String
  residencePermit_starts_with: String
  residencePermit_not_starts_with: String
  residencePermit_ends_with: String
  residencePermit_not_ends_with: String
  birthday: DateTime
  birthday_not: DateTime
  birthday_in: [DateTime!]
  birthday_not_in: [DateTime!]
  birthday_lt: DateTime
  birthday_lte: DateTime
  birthday_gt: DateTime
  birthday_gte: DateTime
  nationality: String
  nationality_not: String
  nationality_in: [String!]
  nationality_not_in: [String!]
  nationality_lt: String
  nationality_lte: String
  nationality_gt: String
  nationality_gte: String
  nationality_contains: String
  nationality_not_contains: String
  nationality_starts_with: String
  nationality_not_starts_with: String
  nationality_ends_with: String
  nationality_not_ends_with: String
  addressStreet: String
  addressStreet_not: String
  addressStreet_in: [String!]
  addressStreet_not_in: [String!]
  addressStreet_lt: String
  addressStreet_lte: String
  addressStreet_gt: String
  addressStreet_gte: String
  addressStreet_contains: String
  addressStreet_not_contains: String
  addressStreet_starts_with: String
  addressStreet_not_starts_with: String
  addressStreet_ends_with: String
  addressStreet_not_ends_with: String
  addressCity: String
  addressCity_not: String
  addressCity_in: [String!]
  addressCity_not_in: [String!]
  addressCity_lt: String
  addressCity_lte: String
  addressCity_gt: String
  addressCity_gte: String
  addressCity_contains: String
  addressCity_not_contains: String
  addressCity_starts_with: String
  addressCity_not_starts_with: String
  addressCity_ends_with: String
  addressCity_not_ends_with: String
  addressNPA: Int
  addressNPA_not: Int
  addressNPA_in: [Int!]
  addressNPA_not_in: [Int!]
  addressNPA_lt: Int
  addressNPA_lte: Int
  addressNPA_gt: Int
  addressNPA_gte: Int
  addressCanton: String
  addressCanton_not: String
  addressCanton_in: [String!]
  addressCanton_not_in: [String!]
  addressCanton_lt: String
  addressCanton_lte: String
  addressCanton_gt: String
  addressCanton_gte: String
  addressCanton_contains: String
  addressCanton_not_contains: String
  addressCanton_starts_with: String
  addressCanton_not_starts_with: String
  addressCanton_ends_with: String
  addressCanton_not_ends_with: String
  organisation: String
  organisation_not: String
  organisation_in: [String!]
  organisation_not_in: [String!]
  organisation_lt: String
  organisation_lte: String
  organisation_gt: String
  organisation_gte: String
  organisation_contains: String
  organisation_not_contains: String
  organisation_starts_with: String
  organisation_not_starts_with: String
  organisation_ends_with: String
  organisation_not_ends_with: String
  socialAssistant: SocialAssistantWhereInput
  financialParticipation: FinancialParticipation
  financialParticipation_not: FinancialParticipation
  financialParticipation_in: [FinancialParticipation!]
  financialParticipation_not_in: [FinancialParticipation!]
  financialParticipationComment: String
  financialParticipationComment_not: String
  financialParticipationComment_in: [String!]
  financialParticipationComment_not_in: [String!]
  financialParticipationComment_lt: String
  financialParticipationComment_lte: String
  financialParticipationComment_gt: String
  financialParticipationComment_gte: String
  financialParticipationComment_contains: String
  financialParticipationComment_not_contains: String
  financialParticipationComment_starts_with: String
  financialParticipationComment_not_starts_with: String
  financialParticipationComment_ends_with: String
  financialParticipationComment_not_ends_with: String
  borrowLaptops: Boolean
  borrowLaptops_not: Boolean
  foodCost: String
  foodCost_not: String
  foodCost_in: [String!]
  foodCost_not_in: [String!]
  foodCost_lt: String
  foodCost_lte: String
  foodCost_gt: String
  foodCost_gte: String
  foodCost_contains: String
  foodCost_not_contains: String
  foodCost_starts_with: String
  foodCost_not_starts_with: String
  foodCost_ends_with: String
  foodCost_not_ends_with: String
  presences_every: PresenceWhereInput
  presences_some: PresenceWhereInput
  presences_none: PresenceWhereInput
  batch: BatchWhereInput
  AND: [StudentWhereInput!]
  OR: [StudentWhereInput!]
  NOT: [StudentWhereInput!]
}

input StudentWhereUniqueInput {
  id: ID
}

type Subscription {
  batch(where: BatchSubscriptionWhereInput): BatchSubscriptionPayload
  presence(where: PresenceSubscriptionWhereInput): PresenceSubscriptionPayload
  socialAssistant(where: SocialAssistantSubscriptionWhereInput): SocialAssistantSubscriptionPayload
  student(where: StudentSubscriptionWhereInput): StudentSubscriptionPayload
}
`