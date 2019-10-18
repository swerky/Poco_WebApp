import moment from 'moment';

export default interface StudentInterface {
  id?: string
  firstName: string
  lastName?: string
  sexe?: string
  privateEmail?: string
  pocoEmail?: string
  residencePermit?: string
  birthday?: moment.Moment | null
  nationality?: string
  addressStreet?: string
  addressCity?: string
  addressNPA?: number | null
  addressCanton?: string
  organisation?: string
  socialAssistant?: SocialAssistantInterface
  financialParticipation?: string 
  financialParticipationComment?: string | null
  borrowLaptops?: boolean
  foodCost?: string | null
  presences?: PresenceInterface[] | null
  batch?: BatchClass
  /*createDate?: moment.Moment
  updateDate?: moment.Moment*/
}

export interface SocialAssistantInterface {
  id?: string | null // null if needed to be created
  firstName: string
  lastName: string
  phone?: string
  email?: string
}

export interface PresenceInterface {
  id?: string
  date: moment.Moment
  timeMissed: moment.Moment
  goodExcuse: boolean
  reason: string
  createAt: moment.Moment
  updateAt: moment.Moment
}

export interface BatchClass {
  id?: string | null
  name: string
  startingTime?: moment.Moment
  endTime?: moment.Moment
}